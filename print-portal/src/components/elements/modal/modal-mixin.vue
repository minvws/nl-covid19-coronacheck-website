<script>
export default {
    name: 'modal-mixin',
    data() {
        return {
            elementThatHadFocusBeforeModal: null
        }
    },
    methods: {
        setFocus() {
            this.$refs.focusStart.focus();
        }
    },
    mounted() {
        this.setFocus();
        window.addEventListener('keydown', e => {
            if (e.key === 'Escape') {
                this.close();
            }
        });

        this.$refs.tabEnd.addEventListener('focus', (event) => {
            this.setFocus();
        });
    }
}
</script>
