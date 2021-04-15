<script>
export default {
    name: 'FaqMobileLink',
    components: {},
    computed: {},
    methods: {}
}
</script>

<template>
    <div class="section section--text-align-center only-mobile">
        <a
            href="https://coronacheck.nl/nl/faq"
            class="FaqMobileLink">
            Bekijk de meestgestelde vragen
        </a>
    </div>
</template>

<style lang="scss">
@import "@/styles/variables/index";

.FaqMobileLink {
    color: $color-overheid-1;
    font-weight: 700;
    font-size: 20px;
    text-decoration: none;
}
</style>
