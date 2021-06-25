<script>
export default {
    name: 'overview-mixin',
    computed: {
        signedEvents() {
            return this.$store.getters['signedEvents/getProofEvents'](this.type);
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
                        return new Date(b.event[this.type].sampleDate) - new Date(a.event[this.type].sampleDate);
                    })[0];
                }
            } else {
                return null;
            }
        }
    }
}
</script>
