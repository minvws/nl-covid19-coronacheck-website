<script>
export default {
    name: 'LogoRijksoverheid',
    props: {
        width: {
            type: Number,
            required: false,
            default: 45
        }
    },
    components: {},
    computed: {},
    methods: {}
}
</script>

<template>
    <img
        :alt="$t('logo-government')"
        :width="width"
        src="assets/img/rijksoverheid/label_ministerie.svg"/>
</template>

<style lang="scss">
.LogoRijksoverheid {

}
</style>
