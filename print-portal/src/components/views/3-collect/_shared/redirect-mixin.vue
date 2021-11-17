<script>
import signedEventsInterface from '@/interfaces/signed-events'
import { cmsDecode } from '@/tools/cms'
import { handleRejection, getErrorCode } from '@/tools/error-handler';
import { differenceInCalendarDays } from 'date-fns';
import { Client as ClientError, Step, Provider } from '@/data/constants/error-codes'

export default {
    name: 'redirect-mixin',
    computed: {
        type() {
            return this.filter.split(',')[0];
        }
    },
    methods: {
        back() {
            const callback = () => {
                if (this.isLoading) {
                    // todo cancel all processes
                }
                this.$store.commit('clearAll')
                this.$store.commit('signedEvents/clear')
                this.$router.push({ name: this.pages.cancel });
            }
            this.$store.commit('modal/set', {
                messageHead: this.$t('message.info.areYouSureToCancel.head'),
                messageBody: this.$t('message.info.areYouSureToCancel.body', { type: this.type }),
                confirm: true,
                confirmAction: callback,
                confirmYes: this.$t('message.info.areYouSureToCancel.yes'),
                confirmNo: this.$t('message.info.areYouSureToCancel.no'),
                closeButton: false
            })
        },
        gotoPreviousPage() {
            this.$store.commit('snackbar/close');
            this.$router.push({ name: this.pages.previous });
        },
        async completeAuthentication() {
            this.isLoading = true;

            try {
                const user = await this.authVaccinations.completeAuthentication()
                try {
                    const response = await signedEventsInterface.getTokens(user.id_token)
                    this.notifyDigidFinished();
                    this.collectEvents(response.data.tokens);
                } catch (error) {
                    const detailedCodeNoBSN = 99782;
                    const detailedCodeSessionExpired = 99708;

                    const hasErrorCode = (error, errorCode) => {
                        const payload = error?.response?.data?.payload
                        if (payload) {
                            const cmsDecoded = cmsDecode(payload);
                            return cmsDecoded?.code === errorCode;
                        }
                        const code = error?.response?.data?.code
                        return code === errorCode;
                    }

                    if (hasErrorCode(error, detailedCodeNoBSN)) {
                        this.$router.push({ name: 'ErrorNoBsn' });
                    } else if (hasErrorCode(error, detailedCodeSessionExpired)) {
                        this.$router.push({ name: 'ErrorSessionExpired' });
                    } else {
                        const callback = () => {
                            this.completeAuthentication();
                        }
                        handleRejection(error, {
                            flow: this.filter,
                            step: Step.ACCESS_TOKENS,
                            provider_identifier: Provider.NON_PROVIDER
                        }, callback)
                    }
                }
            } catch (error) {
                // note: this is a custom error of the frontend library
                // the digid backend also provides a error_desc
                // but oidc-client removes this info from the custom error it returns
                // as well as the error.response.status

                const isCanceled = (error) => {
                    return error?.message === 'saml_authn_failed';
                }

                const tooBusy = (error) => {
                    // the response login_required is a hack to communicate too busy mode
                    return error?.error === 'login_required';
                }

                const errorCodeInformation = {
                    flow: this.filter,
                    step: Step.TVS_DIGID,
                    provider_identifier: Provider.NON_PROVIDER
                }

                if (isCanceled(error)) {
                    this.gotoPreviousPage();
                    const type = this.$t('message.info.digidCanceled.' + this.type)
                    this.$store.commit('modal/set', {
                        messageHead: this.$t('message.info.digidCanceled.head'),
                        messageBody: this.$t('message.info.digidCanceled.body', { type }),
                        closeButton: true
                    })
                } else if (tooBusy(error)) {
                    const errorCode = getErrorCode(error, errorCodeInformation);
                    this.$router.push({ name: 'ServerBusy', query: { error: errorCode } });
                } else {
                    if (error?.message) {
                        errorCodeInformation.errorBody = error.message;
                    }
                    const callback = () => {
                        this.completeAuthentication();
                    }
                    handleRejection(error, errorCodeInformation, callback);
                }
            }
        },
        notifyDigidFinished() {
            const proofType = this.$t('components.digid.proofType.' + this.type)
            this.$store.commit('snackbar/message', this.$t('message.info.digidFinished.body', { type: proofType }))
        },
        collectEvents(tokenSets) {
            this.$store.commit('signedEvents/clear');
            this.isLoading = true;
            signedEventsInterface.collect(tokenSets, this.filter, this.eventProviders).then(results => {
                this.isLoading = false;
                this.analyseResult(results);
            });
        },
        analyseResult(results) {
            if (results) {
                const analysis = {
                    numberOfUnomi: 0,
                    numberOfErrors: 0,
                    // signed event is the object with the holder
                    // it could be there but have zero proof events
                    numberOfEventProvidersWithSignedEvents: 0,
                    numberOfEventProvidersWithProofEvents: 0
                }

                for (const eventProvider of results) {
                    if (eventProvider.unomi.result) {
                        analysis.numberOfUnomi++;
                    }
                    if (eventProvider.unomi.error || eventProvider.events.error) {
                        analysis.numberOfErrors++;
                    }
                    if (eventProvider.events.result) {
                        analysis.numberOfEventProvidersWithSignedEvents++;
                        try {
                            const payload = cmsDecode(eventProvider.events.result.payload);
                            if (payload.events && payload.events.length > 0) {
                                analysis.numberOfEventProvidersWithProofEvents++;
                            }
                        } catch (error) {
                            analysis.numberOfErrors++;
                            eventProvider.events.parsingError = true;
                        }
                    }
                }

                if (analysis.numberOfEventProvidersWithProofEvents > 0) {
                    if (analysis.numberOfErrors > 0) {
                        this.$store.commit('modal/set', {
                            messageHead: this.$t('message.error.collectEventsWithErrors.head'),
                            messageBody: this.$t('message.error.collectEventsWithErrors.body'),
                            closeButton: true
                        });
                    }
                    this.checkResult(results);
                } else {
                    if (analysis.numberOfErrors > 0) {
                        const errorCodes = [];
                        for (const eventProvider of results) {
                            let errorCode;
                            if (eventProvider.unomi.error) {
                                errorCode = getErrorCode(eventProvider.unomi.error, {
                                    flow: this.filter,
                                    step: Step.UNOMI,
                                    provider_identifier: eventProvider.eventProvider
                                });
                                errorCodes.push(errorCode);
                            }
                            if (eventProvider.events.error) {
                                errorCode = getErrorCode(eventProvider.events.error, {
                                    flow: this.filter,
                                    step: Step.EVENT,
                                    provider_identifier: eventProvider.eventProvider
                                });
                                errorCodes.push(errorCode);
                            }
                            if (eventProvider.events.parsingError) {
                                errorCode = getErrorCode(eventProvider.events.error, {
                                    flow: this.filter,
                                    step: Step.EVENT,
                                    provider_identifier: eventProvider.eventProvider,
                                    clientSideCode: ClientError.JSON.DECODE_ERROR
                                });
                                errorCodes.push(errorCode);
                            }
                        }
                        this.$router.push({ name: 'ErrorGeneral', query: { errors: errorCodes.join('+') } });
                    } else {
                        this.$router.push({ name: this.pages.noResult });
                    }
                }
            } else {
                this.generalError();
            }
        },
        // dataIsCorrupt(result) {
        //     for (const signedEvent of result.events) {
        //         const payload = cmsDecode(signedEvent.payload);
        //         if (payload.events) {
        //             for (const proofEvent of payload.events) {
        //                 const type = proofEvent.type
        //                 const proofEventOfType = proofEvent[type];
        //                 let dateFields;
        //                 switch (type) {
        //                 case 'vaccination':
        //                     dateFields = ['date']
        //                     break;
        //                 case 'negativetest':
        //                 case 'recovery':
        //                 case 'positivetest':
        //                     dateFields = ['sampleDate']
        //                     break;
        //                 }
        //                 for (const dateField of dateFields) {
        //                     if (proofEventOfType[dateField]) {
        //                         const dateValue = proofEventOfType[dateField];
        //                         if (!dateTool.isValidDateString(dateValue)) {
        //                             return payload.providerIdentifier;
        //                         }
        //                     } else {
        //                         return payload.providerIdentifier;
        //                     }
        //                 }
        //             }
        //         }
        //     }
        //     return '';
        // },
        // eventIsIncomplete(result) {
        //     for (const signedEvent of result.events) {
        //         const payload = cmsDecode(signedEvent.payload);
        //         if (payload.status !== 'complete') {
        //             return payload.providerIdentifier;
        //         }
        //     }
        //     return '';
        // },
        createEvents(signedEvents) {
            this.$store.commit('signedEvents/createAll', signedEvents);
        },
        areAllRecoveriesExpired(proofEvents) {
            const expirationDays = this.$store.getters.getRecoveryEventValidityDays()
            for (const proofEvent of proofEvents) {
                if (!proofEvent.event.positivetest) {
                    return false
                }

                const sampleDate = proofEvent.event.positivetest.sampleDate
                var diffDays = differenceInCalendarDays(
                    new Date(),
                    new Date(sampleDate)
                )
                if (diffDays <= expirationDays) {
                    return false
                }
            }

            return true
        },
        checkResult(results) {
            const signedEvents = [];
            for (const result of results) {
                if (result.events.result) {
                    signedEvents.push(result.events.result);
                }
            }
            this.createEvents(signedEvents);
            const proofEvents = this.$store.getters['signedEvents/getProofEvents'](this.filter);
            // we check for the lengt of the proof events. Even when there are sigend events, it is possible
            // the do not have any (proof) events inside them
            if (proofEvents.length > 0) {
                if (this.areAllRecoveriesExpired(proofEvents)) {
                    this.$router.push({ name: 'RecoveryExpired' });
                } else {
                    this.$router.push({ name: this.pages.overview });
                }
            } else {
                this.$router.push({ name: this.pages.noResult });
            }
        },
        generalError() {
            this.gotoPreviousPage();
            this.$store.commit('modal/set', {
                messageHead: this.$t('message.error.general.head'),
                messageBody: this.$t('message.error.general.body'),
                closeButton: true
            });
        }
    },
    mounted() {
        // after redirect we've lost the consent
        this.$store.commit('setUserConsent', true);
        this.completeAuthentication();
    }
}
</script>
