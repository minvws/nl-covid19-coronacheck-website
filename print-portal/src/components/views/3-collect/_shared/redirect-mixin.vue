<script>
import signedEventsInterface from '@/interfaces/signed-events'
import { cmsDecode } from '@/tools/cms'
import dateTool from '@/tools/date';
import { handleRejection } from '@/tools/error-handler';

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
        checkResult() {
            const signedEvents = this.$store.getters['signedEvents/getProofEvents'](this.filter);
            if (signedEvents.length > 0) {
                this.$router.push({ name: this.pages.overview });
            } else {
                this.$router.push({ name: this.pages.noResult });
            }
            // todo
            // pending
            // not possible?
        },
        completeAuthentication() {
            this.isLoading = true;
            const confirmAction = () => {
                this.$router.push({ name: 'Home' });
            }

            this.authVaccinations.completeAuthentication().then((user) => {
                // after redirect we've lost the consent
                this.notifyDigidFinished();
                this.getTokens(user.id_token).then(response => {
                    if (response.data && response.data.payload) {
                        const payload = cmsDecode(response.data.payload)
                        this.collectEvents(payload.tokens);
                    }
                }).catch((error) => {
                    this.$router.push({ name: 'CollectError', query: { error: error.message } });
                });
            }).catch(() => {
                this.gotoPreviousPage();
                const type = this.$t('message.info.digidCanceled.' + this.type)
                this.$store.commit('modal/set', {
                    messageHead: this.$t('message.info.digidCanceled.head'),
                    messageBody: this.$t('message.info.digidCanceled.body', { type }),
                    confirm: true,
                    confirmAction,
                    confirmYes: this.$t('goBackToStart'),
                    confirmNo: this.$t('close')
                })
            });
        },
        notifyDigidFinished() {
            const proofType = this.$t('components.digid.proofType.' + this.type)
            this.$store.commit('snackbar/message', this.$t('message.info.digidFinished.body', { type: proofType }))
        },
        getTokens(token) {
            return new Promise((resolve, reject) => {
                signedEventsInterface.getTokens(token).then(response => {
                    resolve(response)
                })
            })
        },
        collectEvents(tokenSets) {
            this.$store.commit('signedEvents/clear');
            this.isLoading = true;
            signedEventsInterface.collect(tokenSets, this.filter, this.eventProviders).then(result => {
                this.isLoading = false;
                if (result) {
                    const is429 = (error) => {
                        return error.response && error.response.status && error.response.status === 429;
                    }
                    const is5xx = (error) => {
                        return error.response && error.response.status && (error.response.status >= 500 && error.response.status < 600);
                    }

                    const is5xxOrNetwork = (error) => {
                        return is5xx(error) || error.message.toLowerCase() === 'network error';
                    }

                    const dateIsCorrupt = this.dataIsCorrupt(result);
                    const eventIsIncomplete = this.eventIsIncomplete(result);
                    if (dateIsCorrupt || eventIsIncomplete) {
                        this.$store.commit('modal/set', {
                            messageHead: this.$t('message.error.parseErrorInResult.head'),
                            messageBody: this.$t('message.error.parseErrorInResult.body'),
                            closeButton: true
                        });
                        this.gotoPreviousPage()
                    } else if (this.hasEventsAndError(result, is429)) {
                        this.$store.commit('modal/set', {
                            messageHead: this.$t('message.error.someServerBusyButResult.head'),
                            messageBody: this.$t('message.error.someServerBusyButResult.body'),
                            closeButton: true
                        });
                        this.createEvents(result);
                        this.checkResult();
                    } else if (this.hasNoEventsAndError(result, is429)) {
                        this.$store.commit('modal/set', {
                            messageHead: this.$t('message.error.someServerBusyNoResult.head'),
                            messageBody: this.$t('message.error.someServerBusyNoResult.body'),
                            closeButton: true
                        });
                        this.gotoPreviousPage()
                    } else if (this.hasEventsAndError(result, is5xx)) {
                        this.$store.commit('modal/set', {
                            messageHead: this.$t('message.error.someServerErrorButResult.head'),
                            messageBody: this.$t('message.error.someServerErrorButResult.body'),
                            closeButton: true
                        });
                        this.createEvents(result);
                        this.checkResult();
                    } else if (this.hasNoEventsAndError(result, is5xxOrNetwork)) {
                        this.$store.commit('modal/set', {
                            messageHead: this.$t('message.error.someServerErrorNoResult.head'),
                            messageBody: this.$t('message.error.someServerErrorNoResult.body'),
                            closeButton: true
                        });
                        this.gotoPreviousPage()
                    } else if (this.hasBrokenPromise(result)) {
                        // will lead to 'no result' page (depending on vaccination / test)
                        this.checkResult();
                    } else {
                        // regular flow
                        this.createEvents(result);
                        this.checkResult();
                    }
                } else {
                    this.generalError();
                }
            }, (error) => {
                this.loading = false;
                this.$store.commit('modal/close');
                this.gotoPreviousPage();
                handleRejection(error)
            });
        },
        hasBrokenPromise(result) {
            return result.events.length === 0 && this.hasAtLeastOneUnomi;
        },
        dataIsCorrupt(result) {
            for (const signedEvent of result.events) {
                const payload = cmsDecode(signedEvent.payload);
                if (payload.events) {
                    for (const proofEvent of payload.events) {
                        const type = proofEvent.type
                        const proofEventOfType = proofEvent[type];
                        let dateFields;
                        switch (type) {
                        case 'vaccination':
                            dateFields = ['date']
                            break;
                        case 'negativetest':
                        case 'recovery':
                        case 'positivetest':
                            dateFields = ['sampleDate']
                            break;
                        }
                        for (const dateField of dateFields) {
                            if (proofEventOfType[dateField]) {
                                const dateValue = proofEventOfType[dateField];
                                if (!dateTool.isValidDateString(dateValue)) {
                                    return payload.providerIdentifier;
                                }
                            } else {
                                return payload.providerIdentifier;
                            }
                        }
                    }
                }
            }
            return '';
        },
        eventIsIncomplete(result) {
            for (const signedEvent of result.events) {
                const payload = cmsDecode(signedEvent.payload);
                if (payload.status !== 'complete') {
                    return payload.providerIdentifier;
                }
            }
            return '';
        },
        hasError(result, errorChecker) {
            let hasError = false
            for (const error of result.errors) {
                if (errorChecker(error)) {
                    hasError = true;
                }
            }
            return hasError;
        },
        hasEventsAndError(result, errorChecker) {
            return result.events.length > 0 && this.hasError(result, errorChecker);
        },
        hasNoEventsAndError(result, errorChecker) {
            return result.events.length === 0 && this.hasError(result, errorChecker);
        },
        createEvents(result) {
            this.$store.commit('signedEvents/createAll', result.events);
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
        this.$store.commit('setUserConsent', true);
        this.completeAuthentication();
    }
}
</script>
