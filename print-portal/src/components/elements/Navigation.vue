<script>
export default {
    name: 'Navigation',
    components: {},
    props: {
        callbackBack: {
            type: Function,
            required: false
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
            v-if="callbackBack"
            @click="goBack()"
            class="Navigation__button Navigation__back">
            <img
                alt="Pagina terug"
                src="assets/img/icons/arrow-left.svg"/>
            Terug
        </button>
    </nav>
</template>

<style lang="scss">
@import "@/styles/variables/index";

nav {
    height: 60px;
    display: flex;
    align-items: center;
    font-weight: 600;

    .Navigation__button {
        cursor: pointer;
        display: flex;
        align-items: center;
        font-weight: 700;

        img {
            width: 20px;
            height: auto;
            display: block;
            margin-right: 6px;
        }
    }

    @include tablet() {
        padding: 0 12px;
    }
}
</style>
