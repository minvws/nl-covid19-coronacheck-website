<script>
export default {
    name: 'Modal',
    components: {},
    props: {},
    computed: {
        message() {
            return this.$store.state.modal.message;
        },
        showConfirm() {
            return this.$store.state.modal.confirm;
        },
        confirmText() {
            return this.$store.state.modal.confirmYes;
        },
        refuteText() {
            return this.$store.state.modal.confirmNo;
        },
        confirmAction() {
            return this.$store.state.modal.confirmAction;
        },
        showModal() {
            return this.$store.state.modal.visible;
        },
        showCloseButton() {
            return this.$store.state.modal.closeButton;
        }
    },
    methods: {
        close() {
            this.$store.commit('modal/close');
        },
        confirm() {
            // check if it is a function
            if (this.confirmAction && {}.toString.call(this.confirmAction) === '[object Function]') {
                this.confirmAction();
            } else {
                console.log('Confirm callback is not a function.');
            }
            this.close();
        },
        refute() {
            this.close();
        },
        setFocus() {
            if (this.showConfirm) {
                this.$refs.refute.focus();
            } else if (this.showCloseButton) {
                this.$refs.close.focus();
            }
        }
    },
    watch: {
        closeAfter() {
            if (this.closeAfter) {
                setTimeout(() => {
                    this.close();
                }, 5000)
            }
        },
        showModal() {
            if (this.showModal) {
                // wait untill the v-if is active
                setTimeout(() => {
                    this.setFocus();
                })
            }
        }
    },
    mounted() {
        window.addEventListener('keydown', e => {
            if (e.key === 'Escape' && this.showConfirm) {
                this.close();
            }
        });
    }
}
</script>

<template>
    <div
        :class="{'popup--active': showModal}"
        class="cover">
        <div
            @click="close()"
            class="cover__clickable-area"></div>
        <div class="modal">
            <div
                v-html="message"
                class="modal__body">
            </div>

            <div
                v-if="showModal"
                class="modal__footer">
                <button
                    v-if="showConfirm"
                    @click="refute()"
                    ref="refute"
                    tabindex="1"
                    type="button"
                    class="button-modest">
                    {{refuteText}}
                </button>
                <button
                    v-if="showConfirm"
                    @click="confirm()"
                    ref="confirm"
                    tabindex="2"
                    type="button"
                    class="button-modest button--ok">
                    {{confirmText}}
                </button>
                <button
                    v-if="showCloseButton"
                    @click="close()"
                    ref="close"
                    tabindex="3"
                    type="button"
                    class="button-modest">{{translate('close')}}</button>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@import "@/styles/variables/index";

.cover {
    background: rgba(0,0,0,0.4);
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    transition: opacity 0.3s cubic-bezier(.4,0,.2,1);
    opacity: 0;
    pointer-events: none;

    .cover__clickable-area {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
    }

    &.popup--active {
        opacity: 1;
        pointer-events: all;
    }
}

.modal {
    background-color: #fff;
    position: absolute;
    width: 460px;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10000;
    top: 40%;
    transition: top 1s ease;
    border-radius: 5px;

    .modal__body {
        padding: $length-l;
        font-size: 16px;

        strong {
            font-size: 18px;
        }
    }

    .modal__footer {
        position: relative;
        padding: 0 $length-l $length-l $length-l;
        display: flex;
        align-items: center;

        .button-modest {
            margin-right: $length-xl;

            &:last-child {
                margin-right: 0;
            }
        }
    }

    @include mobile() {
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        transform: none;
    }
}
</style>
