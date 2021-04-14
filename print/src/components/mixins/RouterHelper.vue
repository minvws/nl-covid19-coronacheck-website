<script>
export default {
    name: 'RouterHelper',
    components: {},
    computed: {},
    methods: {
        goto(routeName) {
            this.$router.push({ name: routeName });
        }
    }
}
</script>
