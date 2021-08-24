<script>
import signedEventsInterface from '@/interfaces/signed-events'
import { cmsDecode } from '@/tools/cms'
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
        completeAuthentication() {
            this.isLoading = true;

            this.authVaccinations.completeAuthentication().then((user) => {
                // after redirect we've lost the consent
                this.notifyDigidFinished();
                signedEventsInterface.getTokens(user.id_token).then(response => {
                    if (response.data && response.data.payload) {
                        try {
                            const payload = cmsDecode(response.data.payload);
                            this.collectEvents(payload.tokens);
                        } catch (error) {
                            this.$router.push({ name: 'ErrorEventProvider', query: { error: error.message } });
                        }
                    }
                }).catch((error) => {
                    if (error.response && error.response.status && (error.response.status >= 400 && error.response.status < 500)) {
                        this.$router.push({ name: this.pages.previous });
                        this.$store.commit('modal/set', {
                            messageHead: this.$t('message.error.errorAccessTokens.head'),
                            messageBody: this.$t('message.error.errorAccessTokens.body', { code: error.response.status }),
                            closeButton: true
                        });
                    } else {
                        this.$router.push({ name: 'ErrorAccessTokens', query: { error: error.message } });
                    }
                });
            }).catch((error) => {
                // const confirmAction = () => {
                //     this.$router.push({ name: 'Home' });
                // }

                // todo check if the actions was cancelel
                // if () {
                // this.gotoPreviousPage();
                // const type = this.$t('message.info.digidCanceled.' + this.type)
                // this.$store.commit('modal/set', {
                //     messageHead: this.$t('message.info.digidCanceled.head'),
                //     messageBody: this.$t('message.info.digidCanceled.body', { type }),
                //     confirm: true,
                //     confirmAction,
                //     confirmYes: this.$t('goBackToStart'),
                //     confirmNo: this.$t('close')
                // })
                // } else {
                handleRejection(error)
                // }
            });
        },
        notifyDigidFinished() {
            const proofType = this.$t('components.digid.proofType.' + this.type)
            this.$store.commit('snackbar/message', this.$t('message.info.digidFinished.body', { type: proofType }))
        },
        collectEvents(tokenSets) {
            this.$store.commit('signedEvents/clear');
            this.isLoading = true;
            signedEventsInterface.collect(tokenSets, this.filter, this.eventProviders).then(result => {
                this.isLoading = false;
                this.analyseResult(result);
            }, (error) => {
                this.loading = false;
                this.$store.commit('modal/close');
                this.gotoPreviousPage();
                handleRejection(error)
            });
        },
        analyseResult(result) {
            if (result) {
                const analysis = {
                    error429: false,
                    errorAny: false,
                    hasResults: false,
                    hasAtLeastOneUnomi: false,
                    dataIsCorrupt: false,
                    dataIsIncomplete: false
                }
                const is429 = (error) => {
                    return error.response && error.response.status && error.response.status === 429;
                }
                const is5xx = (error) => {
                    return error.response && error.response.status && (error.response.status >= 500 && error.response.status < 600);
                }
                const is5xxOrNetwork = (error) => {
                    return is5xx(error) || error.message.toLowerCase() === 'network error';
                }
                const isErrorAny = (error) => {
                    return is5xx(error) || is5xxOrNetwork(error) || is429(error);
                }

                for (const error of result.errors) {
                    if (is429(error)) {
                        analysis.error429 = true
                    }
                    if (isErrorAny(error)) {
                        analysis.errorAny = true
                    }
                }
                for (const event of result.events) {
                    try {
                        const payload = cmsDecode(event.payload);
                        if (payload.events && payload.events.length > 0) {
                            analysis.hasResults = true
                        }
                    } catch (error) {
                        analysis.dataIsCorrupt = true;
                    }
                }
                analysis.hasAtLeastOneUnomi = result.hasAtLeastOneUnomi;
                // todo dataIsIncomplete

                console.log(analysis);
                if (analysis.hasResults) {
                    if (analysis.errorAny) {
                        this.$store.commit('modal/set', {
                            messageHead: this.$t('message.error.collectEventsWithErrors.head'),
                            messageBody: this.$t('message.error.collectEventsWithErrors.body'),
                            closeButton: true
                        });
                    }
                    this.createEvents(result);
                    this.checkResult();
                } else {
                    if (analysis.errorAny) {
                        this.$router.push({ name: 'ErrorNoEvents', query: { type: this.filter } })
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
        createEvents(result) {
            this.$store.commit('signedEvents/createAll', result.events);
        },
        checkResult() {
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
        this.$store.commit('setUserConsent', true);
        this.completeAuthentication();
    }
}
</script>
