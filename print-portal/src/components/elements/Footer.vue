<script>
export default {
    name: 'Footer',
    components: {},
    computed: {},
    methods: {}
}
</script>

<template>
    <footer class="footer">
        <div class="pagewrap">
            <div v-html="$t('template.footer')" class="footer-inner"/>
        </div>
    </footer>
</template>

<style lang="scss">
@import "@/styles/variables/index";

.footer {
    margin-top: 100px;

    .pagewrap {
        // padding done by footer-inner
        padding: 0;
    }

    @include mobile() {
        margin-top: 64px;
    }

    @include mobile-landscape-X() {
        margin-top: 64px;
    }
}

</style>
