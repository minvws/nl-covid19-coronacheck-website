<script>
export default {
    name: 'RouterHelper',
    components: {},
    computed: {},
    methods: {
        goto(routeName) {
            // we always use the route name, because it is
            // a) unique caused by the locale prefix
            // b) but generic caused by the routeName
            // in @/router/index the routes are created by multiplying all names with all languages
            this.$router.push({ name: this.currentLanguage.locale + '/' + routeName });
        }
    }
}
</script>
