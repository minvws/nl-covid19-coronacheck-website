<script>
import dateTool from '@/tools/date';
import signer from '@/interfaces/signer';
import { handleRejectionSigner } from '@/tools/error-handler';

export default {
    name: 'overview-mixin',
    computed: {
        signedEvents() {
            const signedEvents = this.$store.getters['signedEvents/getProofEvents'](this.filter);
            // currently we do not de-double anymore
            // const filteredForUnique = []
            // // we check for unique events
            // for (const signedEvent of signedEvents) {
            //     const existingKeys = filteredForUnique.map(s => s.event.unique);
            //     if (existingKeys.indexOf(signedEvent.event.unique) === -1) {
            //         filteredForUnique.push(signedEvent)
            //     }
            // }
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
                signer.sign(this.$store.state.signedEvents.all).then(response => {
                    // currently check if there is domestic result. From 2.1 on
                    // we have to check if there is either domestic or eu
                    if (response.data) {
                        if (response.data.domestic) {
                            this.$store.commit('qrs/add', response.data);
                            this.$router.push({ name: this.pages.print });
                        } else {
                            this.$router.push({ name: this.pages.domesticRejected });
                        }
                    }
                }).catch(error => {
                    handleRejectionSigner(error);
                })
            } else {
                this.$router.push({ name: this.pages.print });
            }
            this.$store.commit('snackbar/close');
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
