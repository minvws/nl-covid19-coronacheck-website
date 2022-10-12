<script>
export default {
    name: 'Navigation',
    components: {},
    props: {
        displayBackButton: {
            type: Boolean,
            required: false,
            default: true
        }
    },
    computed: {},
    methods: {
        goBack() {
            this.$emit('back');
        }
    }
}
</script>

<template>
    <nav>
        <button
            v-if="displayBackButton"
            @click="goBack()"
            type="button"
            class="Navigation__button Navigation__back">
            <img
                alt=""
                src="assets/img/icons/arrow-left.svg"/>
            {{$t('back')}}
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
