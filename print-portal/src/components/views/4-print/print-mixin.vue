<script>
export default {
    name: 'print-mixin',
    computed: {
        hasDomestic() {
            return this.$store.state.qrs.proof.domestic;
        },
        hasEuropean() {
            return this.$store.state.qrs.proof.european;
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
