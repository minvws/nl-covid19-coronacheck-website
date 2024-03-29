import ErrorList from '@/components/elements/ErrorList.vue';

export default (id) => ({
    components: {
        ErrorList
    },
    computed: {
        errors() {
            const errors = this.$route.params.error ? [this.$route.params.error]
                : this.$route.params?.errors?.split('+') ?? []
            return errors.length ? errors : undefined
        },
        link () {
            const translation = `views.${id}.link`
            const link = this.$t(translation)
            return link === translation ? undefined : link;
        },
        hasErrorList () {
            return !!(this.errors || this.link)
        }
    }
})
