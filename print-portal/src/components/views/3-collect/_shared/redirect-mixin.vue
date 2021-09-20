<script>
import signedEventsInterface from '@/interfaces/signed-events'
import { cmsDecode } from '@/tools/cms'
import { handleRejection, getErrorCode } from '@/tools/error-handler';

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
        completeAuthentication() {
            this.isLoading = true;

            this.authVaccinations.completeAuthentication().then((user) => {
                signedEventsInterface.getTokens(user.id_token).then(response => {
                    this.notifyDigidFinished();
                    if (response.data && response.data.payload) {
                        const payload = cmsDecode(response.data.payload);
                        this.collectEvents(payload.tokens);
                    }
                }).catch((error) => {
                    const detailedCodeNoBSN = 99782;
                    const detailedCodeSessionExpired = 99708;

                    const hasErrorCode = (error, errorCode) => {
                        if (error.response && error.response.data) {
                            const cmsDecoded = cmsDecode(error.response.data.payload);
                            if (cmsDecoded.code) {
                                return cmsDecoded.code === errorCode;
                            } else {
                                return false;
                            }
                        }

                        return error && error.response && error.response.data && error.response.data &&
                            error.response.data.code && error.response.data.code === errorCode;
                    }

                    if (hasErrorCode(error, detailedCodeNoBSN)) {
                        this.$router.push({ name: 'ErrorNoBsn' });
                    } else if (hasErrorCode(error, detailedCodeSessionExpired)) {
                        this.$router.push({ name: 'ErrorSessionExpired' });
                    } else {
                        handleRejection(error, { flow: this.filter, step: '30', provider_identifier: '000' })
                    }
                });
            }).catch((error) => {
                // note: this is a custom error of the frontend library
                // the digid backend also provides a error_desc
                // but oidc-client removes this info from the custom error it returns
                // as well as the error.response.status

                const isCanceled = (error) => {
                    return error && error.message && error.message === 'saml_authn_failed';
                }

                const isAppAuthError = (error) => {
                    const options = [
                        'invalid_request',
                        'invalid_client',
                        'invalid_grant',
                        'unauthorized_client',
                        'unsupported_grant_type',
                        'invalid_scope'
                    ]
                    return error && error.message && options.indexOf(error.message) > -1;
                }

                const tooBusy = (error) => {
                    // the response login_required is a hack to communicate too busy mode
                    return error && error.error && error.error === 'login_required';
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
                    this.$router.push({ name: 'ServerBusy' });
                } else if (isAppAuthError(error)) {
                    const errorCode = getErrorCode(error, { flow: this.filter, step: '10', provider_identifier: '000', errorBody: error.message });
                    this.$router.push({ name: 'ErrorGeneral', query: { errors: errorCode } });
                } else {
                    handleRejection(error, { flow: this.filter, step: '10', provider_identifier: '000' });
                }
            });
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
                                errorCode = getErrorCode(eventProvider.unomi.error, { flow: this.filter, step: '40', provider_identifier: eventProvider.eventProvider });
                                errorCodes.push(errorCode);
                            }
                            if (eventProvider.events.error) {
                                errorCode = getErrorCode(eventProvider.events.error, { flow: this.filter, step: '50', provider_identifier: eventProvider.eventProvider });
                                errorCodes.push(errorCode);
                            }
                            if (eventProvider.events.parsingError) {
                                errorCode = getErrorCode(eventProvider.events.error, { flow: this.filter, step: '50', provider_identifier: eventProvider.eventProvider, clientSideCode: '030' });
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
                this.$router.push({ name: this.pages.overview });
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
