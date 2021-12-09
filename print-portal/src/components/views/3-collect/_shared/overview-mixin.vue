<script>
import dateTool from '@/tools/date';
import signer from '@/interfaces/signer';
import { handleRejection } from '@/tools/error-handler';
import { StepTypes } from '@/types/step-types'
import { ProviderTypes } from '@/types/provider-types'

export default {
    name: 'overview-mixin',
    data() {
        return {
            proofSubmitted: false
        }
    },
    computed: {
        signedEvents() {
            const signedEvents = this.$store.getters['signedEvents/getProofEvents'](this.filter);
            return signedEvents.sort((a, b) => {
                return dateTool.getTime(a.event[a.event.type].date) - dateTool.getTime(b.event[b.event.type].date);
            })
        },
        // note proof event is hardcoded sorted on sample date. We cannot do this with every proof type
        // only negative test and recovery (but exactly these 2 are using this function, so currently leaving
        // as is, is okay)
        latestSignedEvent() {
            if (this.signedEvents.length > 0) {
                if (this.signedEvents.length === 1) {
                    return this.signedEvents[0];
                } else {
                    // if there are multiple (which should never be the case actually)
                    // we sort them and pick the most recent
                    const signedEvents = this.signedEvents.slice();
                    return signedEvents.sort((a, b) => {
                        return new Date(b.event[a.event.type].sampleDate) - new Date(a.event[b.event.type].sampleDate);
                    })[0];
                }
            } else {
                return null;
            }
        }
    },
    methods: {
        back() {
            const callback = () => {
                this.$store.commit('clearAll')
                this.$router.push({ name: 'ChoiceProof' });
            }
            this.$store.commit('modal/set', {
                messageHead: this.$t('message.info.areYouSureToCancel.head'),
                messageBody: this.$t('message.info.areYouSureToCancel.body', { type: this.type }),
                confirm: true,
                confirmAction: callback,
                confirmYes: this.$t('message.info.areYouSureToCancel.yes'),
                confirmNo: this.$t('message.info.areYouSureToCancel.no'),
                closeButton: false,
                confirmAlert: true
            })
            this.$store.commit('snackbar/close');
        },
        gotoPrint() {
            if (this.$store.state.qrs.proof === null) {
                this.proofSubmitted = true;
                signer.sign(this.$store.getters['signedEvents/all']).then(response => {
                    this.proofSubmitted = false;
                    if (response.data) {
                        if (response.data.domestic || (response.data.european && response.data.european.length > 0)) {
                            this.$store.commit('qrs/add', response.data);
                            this.$router.push({ name: this.pages.print });
                        } else {
                            this.$router.push({ name: 'ErrorProofNotPossible' });
                        }
                        this.setSignedAt(response);
                    }
                }).catch(error => {
                    this.proofSubmitted = false;
                    const callback = () => {
                        this.gotoPrint();
                    }
                    handleRejection(error, {
                        flow: this.filter,
                        step: StepTypes.SIGNER,
                        provider_identifier: ProviderTypes.NON_PROVIDER
                    }, callback);
                })
            } else {
                this.$router.push({ name: this.pages.print });
            }
            this.$store.commit('snackbar/close');
        },
        setSignedAt(response) {
            if (response && response.headers && response.headers.date) {
                this.$store.commit('setSignedAt', new Date(response.headers.date));
            }
        },
        openModalSomethingWrong() {
            const type = this.filter.split(',')[0]
            this.$store.commit('modal/set', {
                messageHead: this.$t('message.info.somethingWrong.' + type + '.head'),
                messageBody: this.$t('message.info.somethingWrong.' + type + '.body'),
                closeButton: true
            })
        }
    }
}
</script>
