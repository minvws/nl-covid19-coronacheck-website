<script>
export default {
    name: 'ImageHolder',
    components: {},
    computed: {},
    methods: {}
}
</script>

<template>
    <div class="ImageHolder">
        <img
            alt="Liever je testbewijs op je mobiel?"
            src="assets/img/artwork/mobile-phone-using-coronacheck_empty.png"/>

        <div
            v-html="$t('image.holder.overview')"
            class="label-1 label--bold label--h2"/>
        <div
            v-html="$t('image.holder.showQrIntro')"
            class="label-2"/>
        <div
            v-html="$t('image.holder.myQr')"
            class="label-3 label--bold label--h1"/>
        <div
            v-html="$t('image.holder.validText')"
            class="label-4"/>
        <div
            v-html="$t('image.holder.showQr')"
            class="label-5 label--white"/>
    </div>
</template>

<style lang="scss">
.ImageHolder {
    position: relative;
    font-size: 10px;
    line-height: 1.2;

    > div {
        position: absolute;
        color: #000;
    }

    .label--bold {
        font-weight: 700;
    }

    .label--white {
        color: #fff;
    }

    .label--h1 {
        font-size: 130%;
    }

    .label--h2 {
        font-size: 108%;
    }

    .label-1 {
        left: 36%;
        top: 10%;
    }

    .label-2 {
        left: 12%;
        top: 16%;
        width: 75%;
    }

    .label-3 {
        left: 16.5%;
        top: 30%;
    }

    .label-4 {
        left: 16.5%;
        top: 38.5%;
    }

    .label-5 {
        left: 17%;
        top: 48.7%;
        text-align: center;
        width: 29%;
        white-space: nowrap;
    }
}
</style>
