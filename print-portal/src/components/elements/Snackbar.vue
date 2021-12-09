<script>
export default {
    name: 'Snackbar',
    props: {},
    computed: {
        message() {
            return this.$store.state.snackbar.message;
        },
        displaySnackbar() {
            return this.$store.state.snackbar.visible;
        }
    },
    methods: {
        onKeyDown ({ key }) {
            if (key === 'Escape') {
                this.close();
            }
        },
        close() {
            this.$store.commit('snackbar/close');
            document.querySelector('h1,h2,h3')?.focus()
        },
        configureListeners(type) {
            window[`${type}EventListener`]('keydown', this.onKeyDown)
        }
    },
    beforeDestroy () {
        this.configureListeners('remove')
    },
    mounted() {
        this.$refs.button?.focus() // auto focus on close button
        this.configureListeners('add')
    }
}
</script>

<template>
    <div
        class="snackbar"
        role="dialog"
        aria-modal="false"
        aria-labelledby="message">
        <div
            id="message"
            class="snackbar__message">
            {{message}}
        </div>
        <button
            :aria-label="$t('ok')"
            @click="close"
            ref="button"
            class="snackbar__close">
            <img
                class="close"
                src="assets/img/icons/snackbar-close.svg"
                :alt="`${$t('ok')}`"/>
        </button>
    </div>
</template>
<style lang="scss" scoped>
@import "@/styles/variables/index";

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

.snackbar {
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    bottom: $grid-x6;
    z-index: 2;
    color: $color-snackbar-text;
    background: $color-snackbar-background;
    padding: 12px 48px 12px 12px;
    display: flex;
    border-radius: 4px;
    box-shadow: 3px 3px 8px rgba(0,0,0,0.2);
    max-width: calc(100% - 20px);

    &__close {
        position: absolute;
        right: 12px;
        top: 12px;
        cursor: pointer;
        width: 24px;
        height: 24px;
        text-align: center;
        border-radius: 3px;
        margin-left: $length-s;
        flex: 0;
    }

    @include mobile() {
        transform: none;
        left: 20px;
        right: 20px;
    }

    .close {
        height: 1.125rem;
    }
}
</style>
