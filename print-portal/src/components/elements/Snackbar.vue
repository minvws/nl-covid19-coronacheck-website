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
        close() {
            this.$store.commit('snackbar/close');
        }
    },
    mounted() {
        window.addEventListener('keydown', e => {
            if (e.key === 'Escape') {
                // console.log('close');
                this.close();
            }
        });
    }
}
</script>

<template>
    <div class="snackbar">
        <div class="snackbar__message">
            {{message}}
        </div>
        <div
            @click="close"
            class="snackbar__close"></div>
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
    background: #3C4E6A;
    color: #fff;
    padding: 12px 48px 12px 12px;
    display: flex;
    border-radius: 4px;
    box-shadow: 3px 3px 8px rgba(0,0,0,0.2);
    max-width: calc(100% - 20px);

    &__message {

    }

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

        &:before, &:after {
            position: absolute;
            left: 11px;
            top: 2px;
            content: ' ';
            height: 18px;
            width: 2px;
            background-color: #fff;
        }

        &:before {
            transform: rotate(45deg);
        }
        &:after {
            transform: rotate(-45deg);
        }
    }
}
</style>
