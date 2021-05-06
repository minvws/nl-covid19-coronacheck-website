<script>
export default {
    name: 'Modal',
    components: {},
    props: {},
    data() {
        return {
            elementThatHadFocusBeforeModal: null
        }
    },
    computed: {
        messageHead() {
            return this.$store.state.modal.messageHead;
        },
        messageBody() {
            return this.$store.state.modal.messageBody;
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

        this.$refs.tabEnd.addEventListener('focus', (event) => {
            this.setFocus();
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
        <div
            class="modal"
            role="alertdialog"
            :aria-modal="showModal"
            aria-labelledby="modal__head"
            aria-describedby="modal__body">
            <div
                v-html="messageHead"
                id="modal__head">
            </div>
            <div
                v-html="messageBody"
                id="modal__body">
            </div>
            <div
                v-if="showModal"
                id="modal__footer">
                <button
                    v-if="showConfirm"
                    @click="refute()"
                    ref="refute"
                    type="button"
                    class="button-modest">
                    {{refuteText}}
                </button>
                <button
                    v-if="showConfirm"
                    @click="confirm()"
                    ref="confirm"
                    type="button"
                    class="button-modest button--ok">
                    {{confirmText}}
                </button>
                <button
                    v-if="showCloseButton"
                    @click="close()"
                    ref="close"
                    type="button"
                    class="button-modest">{{$t('close')}}</button>
            </div>
        </div>
        <div
            ref="tabEnd"
            tabindex="0"></div>
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

    #modal__head {
        padding: $length-l $length-l 0 $length-l;
        margin-bottom: $grid-x2;
        font-weight: 700;
    }

    #modal__body {
        padding: 0 $length-l;
        font-size: 16px;

        strong {
            font-size: 18px;
        }
    }

    #modal__footer {
        position: relative;
        padding: $length-l;
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
        border-radius: 0;
    }
}
</style>
