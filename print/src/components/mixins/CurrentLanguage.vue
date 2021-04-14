<script>
export default {
    name: 'CurrentLanguage',
    components: {},
    computed: {
        currentLanguage() {
            return this.$store.state.languages.current;
        }
    },
    methods: {}
}
</script>
