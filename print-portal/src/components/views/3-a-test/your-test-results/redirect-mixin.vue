<script>
import signedEventsTool from '@/tools/signed-events'
import { cmsDecode } from '@/tools/cms'
import dateTool from '@/tools/date';

export default {
    name: 'redirect-mixin',
    methods: {
        completeAuthentication() {
            this.isLoading = true;
            const confirmAction = () => {
                this.$router.push({ name: 'Home' });
            }

            this.authVaccinations.completeAuthentication().then((user) => {
                // after redirect we've lost the consent
                this.$store.commit('setUserConsent', true);
                this.notifyDigidFinished();
                this.collectEvents(user.id_token);
            }).catch(() => {
                this.gotoPreviousPage();
                this.$store.commit('modal/set', {
                    messageHead: this.$t('message.info.digidCanceled.head'),
                    messageBody: this.$t('message.info.digidCanceled.body'),
                    confirm: true,
                    confirmAction,
                    confirmYes: this.$t('goBackToStart'),
                    confirmNo: this.$t('close')
                })
            });
        },
        notifyDigidFinished() {
            this.$store.commit('modal/set', {
                messageHead: this.$t('message.info.digidFinished.head'),
                messageBody: this.$t('message.info.digidFinished.body'),
                closeButton: true,
                closeText: this.$t('message.info.digidFinished.closeText')
            })
        },
        collectEvents(token) {
            this.$store.commit('signedEvents/clear');
            this.isLoading = true;
            signedEventsTool.collect(token, this.type).then(result => {
                this.isLoading = false;
                if (result) {
                    const is429 = (statusCode) => {
                        return statusCode === 429
                    }
                    const is5xx = (statusCode) => {
                        return statusCode >= 500 && statusCode < 600;
                    }
                    const dateIsCorrupt = this.dataIsCorrupt(result);
                    const eventIsIncomplete = this.eventIsIncomplete(result);
                    if (dateIsCorrupt || eventIsIncomplete) {
                        const identifier = dateIsCorrupt.length > 0 ? dateIsCorrupt : eventIsIncomplete;
                        this.$store.commit('modal/set', {
                            messageHead: this.$t('message.error.parseErrorInResult.head'),
                            messageBody: this.$t('message.error.parseErrorInResult.body', { identifier }),
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
                    } else if (this.hasNoEventsAndError(result, is5xx)) {
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
                if (error && error.response && error.response.status) {
                    if (error.response.status === 429) {
                        this.$store.commit('modal/set', {
                            messageHead: this.$t('message.error.serverBusy.head'),
                            messageBody: this.$t('message.error.serverBusy.body'),
                            closeButton: true
                        });
                    }
                } else {
                    this.$store.commit('modal/set', {
                        messageHead: this.$t('message.error.general.head'),
                        messageBody: (this.$t('message.error.general.body') + '<p>' + error + '</p>'),
                        closeButton: true
                    });
                }
            });
        },
        hasBrokenPromise(result) {
            return result.events.length === 0 && this.hasAtLeastOneUnomi;
        },
        dataIsCorrupt(result) {
            for (const signedEvent of result.events) {
                const payload = cmsDecode(signedEvent.payload);
                if (payload.events) {
                    if (payload.holder && payload.holder.birthDate) {
                        if (!dateTool.isValidDateString(payload.holder.birthDate)) {
                            return payload.providerIdentifier;
                        }
                    }
                    for (const proofEvent of payload.events) {
                        const proofEventOfType = proofEvent[proofEvent.type];
                        if (proofEventOfType.date) {
                            if (!dateTool.isValidDateString(proofEventOfType.date)) {
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
                if (error.response && errorChecker(error.response.status)) {
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
        this.completeAuthentication();
    }
}
</script>
