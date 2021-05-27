<script>
export default {
    name: 'FaqMobileLink',
    components: {},
    computed: {},
    methods: {}
}
</script>

<template>
    <div class="section section--text-align-center only-mobile section--FaqMobileLink">
        <a
            href="https://coronacheck.nl/nl/faq"
            class="FaqMobileLink">
            {{$t('components.faq.viewFaq')}}
        </a>
    </div>
</template>

<style lang="scss">
@import "@/styles/variables/index";

.section--FaqMobileLink {

    &.only-mobile {

        @include mobile() {
            // display: initial makes it inline?
            display: block;
        }
    }
}

.FaqMobileLink {
    color: $color-RO_darkblue;
    font-weight: 700;
    font-size: 20px;
    text-decoration: none;
}
</style>
