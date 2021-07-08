<script>
import CcModestButton from './CcModestButton';

export default {
    name: 'Modal',
    components: { CcModestButton },
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
        },
        closeText() {
            return this.$store.state.modal.closeText.length > 0 ? this.$store.state.modal.closeText : this.$t('close');
        },
        confirmAlert() {
            return this.$store.state.modal.confirmAlert;
        }
    },
    methods: {
        close() {
            this.$store.commit('modal/close');
            this.elementThatHadFocusBeforeModal.focus();
        },
        confirm() {
            // check if it is a function
            if (this.confirmAction && {}.toString.call(this.confirmAction) === '[object Function]') {
                this.confirmAction();
            } else {
                // console.log('Confirm callback is not a function.');
            }
            this.close();
        },
        refute() {
            this.close();
        },
        setFocus() {
            this.$refs.focusStart.focus();
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
                    this.elementThatHadFocusBeforeModal = document.activeElement;
                    this.setFocus();
                })
            }
        }
    },
    mounted() {
        window.addEventListener('keydown', e => {
            if (e.key === 'Escape') {
                this.close();
            }
        });

        this.$refs.tabStart.addEventListener('focus', (event) => {
            this.setFocus();
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
            ref="tabStart"
            tabindex="0"></div>
        <div
            @click="close()"
            class="cover__clickable-area"></div>
        <div class="modal__container">
            <div
                class="modal"
                role="alertdialog"
                :aria-modal="showModal"
                aria-labelledby="modal__head"
                aria-describedby="modal__body">
                <h1
                    v-html="messageHead"
                    ref="focusStart"
                    tabindex="-1"
                    id="modal__head">
                </h1>
                <div
                    v-html="messageBody"
                    id="modal__body">
                </div>
                <div
                    v-if="showModal"
                    id="modal__footer">
                    <CcModestButton
                        v-if="showConfirm"
                        @select="refute()"
                        :label="refuteText"/>

                    <CcModestButton
                        v-if="showConfirm"
                        @select="confirm()"
                        :label="confirmText"
                        :alert="confirmAlert"/>

                    <CcModestButton
                        v-if="showCloseButton"
                        @select="close()"
                        :label="closeText"/>
                </div>
            </div>
        </div>
        <div
            ref="tabEnd"
            tabindex="0"></div>
    </div>
</template>

<style lang="scss">
@import "@/styles/variables/index";

@keyframes fadeIn {
    from { opacity: 0; }
      to { opacity: 1; }
}

.cover {
    background: rgba(0,0,0,0.4);
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: none;
    pointer-events: none;
    z-index: 1;

    .cover__clickable-area {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
    }

    &.popup--active {
        display: block;
        animation: fadeIn 0.3s cubic-bezier(.4,0,.2,1);
        pointer-events: all;
    }
}

.modal__container {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 460px;
    height: calc(100% - 40px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    pointer-events: none;

    @include mobile() {
        width: 100%;
        height: 100%;
    }
}

.modal {
    background-color: #fff;
    transition: top 1s ease;
    border-radius: 5px;
    max-width: 100%;
    overflow-y: auto;
    pointer-events: all;

    #modal__head {
        padding: $length-l $length-l 0 $length-l;
        margin-bottom: $grid-x2;
        font-weight: 700;
        outline: none;
        font-size: inherit;
        font-family: inherit;
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

        .CcModestButton {
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
        overflow: auto;
    }
}
</style>
