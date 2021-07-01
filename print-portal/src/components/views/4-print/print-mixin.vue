<script>
export default {
    name: 'print-mixin',
    computed: {
        proof() {
            return this.$store.state.qrs.proof
        },
        hasDomestic() {
            return this.proof.domestic;
        },
        hasEuropean() {
            return this.proof.european;
        },
        pageType() {
            if (this.hasDomestic && this.hasEuropean) {
                return 'both';
            } else {
                if (this.hasDomestic) {
                    return 'domestic';
                } else if (this.hasEuropean) {
                    return 'european';
                } else {
                    // you shouldnt end up on the page in this scenario
                    return 'none';
                }
            }
        }
    }
}
</script>
