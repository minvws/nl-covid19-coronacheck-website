<script>
export default {
    name: 'Footer',
    components: {},
    computed: {},
    methods: {}
}
</script>

<template>
    <div class="footer">
        <div class="pagewrap">
            <div v-html="$t('template.footer')" class="footer-inner"/>
        </div>
    </div>
</template>

<style lang="scss">
@import "@/styles/variables/index";

.footer {
    margin-top: 100px;

    .pagewrap {
        // padding done by footer-inner
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

    @include mobile() {
        margin-top: 64px;
    }

    @include mobile-landscape-X() {
        margin-top: 64px;
    }
}

</style>
