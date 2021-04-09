<script>
export default {
    name: 'Identity',
    components: {},
    computed: {},
    methods: {}
}
</script>

<template>
    <div class="Identity">
        <div class="logo-nederland">
            <img
                alt="Label Rijksoverheid"
                width="45"
                src="assets/img/rijksoverheid/label_ministerie.svg"/>
        </div>
        <div class="pagewrap">
            <img
                class="Identity__image"
                alt="Holder QR maken"
                width="356"
                src="assets/img/artwork/holder_qrcode_maken.svg"/>
        </div>
    </div>
</template>

<style lang="scss">
@import "@/styles/variables/index";

.Identity {
    background: $background-color-1;
    position: relative;
    height: 250px;
    display: flex;
    align-items: flex-end;

    .logo-nederland {
        position: absolute;
        left: 50%;
        top: 0;
        transform: translateX(-50%);
    }

    .Identity__image {
        display: block;
        height: auto;
        margin-left: 60px;
    }

    @include mobile() {
        justify-content: center;

        .Identity__image {

        }
    }
}
</style>
