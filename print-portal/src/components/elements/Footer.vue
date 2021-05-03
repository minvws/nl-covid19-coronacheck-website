<script>

export default {
    name: 'Footer',
    components: {},
    computed: {},
    methods: {}
}
</script>

<template src="./../../vue-partials/footer-nl.html"></template>

<style lang="scss">
@import "@/styles/variables/index";

.footer {

    .pagewrap {
        // padding done by footer-innter
        padding: 0;
    }

    .telephone--as-span {
        display: inline;

        @include mobile() {
            display: none;
        }
        @include mobile-landscape-X() {
            display: none;
        }
    }

    .telephone--as-anchor {
        display: none;

        @include mobile() {
            display: inline;
        }
        @include mobile-landscape-X() {
            display: inline;
        }
    }
}

</style>
