<script>
export default {
    name: 'CcButtonDigiD',
    methods: {
        onClick() {
            this.$emit('select')
        }
    }
}
</script>

<template>
    <button
        type="button"
        @click="onClick"
        class="btn button-digid">
        <div class="btn__content">
            {{$t('components.digid.loginDigid')}}
            <img alt="" src="assets/img/digid/logo_digid_rgb.svg"/>
        </div>
    </button>
</template>

<style lang="scss">
.button-digid {
    padding: 13px 32px 13px 48px;

    .btn__content {
        display: flex;
        align-items: center;

        img {
            width: 20px;
            height: auto;
            margin-left: 12px;
        }
    }
}
</style>
