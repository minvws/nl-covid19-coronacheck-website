<script>
export default {
    name: 'Navigation',
    components: {},
    props: {
        callbackBack: {
            type: Function,
            required: false
        },
        displayBackButton: {
            type: Boolean,
            required: false,
            default: true
        }
    },
    computed: {},
    methods: {
        goBack() {
            this.callbackBack();
        }
    }
}
</script>

<template>
    <nav>
        <button
            v-if="displayBackButton && callbackBack"
            @click="goBack()"
            :aria-label="translate('back')"
            type="button"
            class="Navigation__button Navigation__back">
            <img
                alt=""
                src="assets/img/icons/arrow-left.svg"/>
            {{translate('back')}}
        </button>
    </nav>
</template>

<style lang="scss">
@import "@/styles/variables/index";

nav {
    height: $length-xl;
    display: flex;
    align-items: center;
    font-weight: 600;

    .Navigation__button {
        cursor: pointer;
        display: flex;
        align-items: center;
        font-weight: 700;
        font-size: 16px;

        img {
            width: $grid-x2;
            height: auto;
            display: block;
            margin-right: 10px;
        }
    }

    @include mobile() {
        height: $length-xl--mobile;

        .Navigation__button {
            display: none;
        }
    }
}
</style>
