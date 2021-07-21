<script>
import CcModestButton from '@/components/elements/CcModestButton';
import modalMixin from './modal-mixin'

export default {
    name: 'Modal',
    components: { CcModestButton },
    mixins: [modalMixin],
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
    }
}
</script>

<template>
    <div class="cover">
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
                <div id="modal__footer">
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
    pointer-events: all;
    z-index: 1;
    animation: fadeIn 0.3s cubic-bezier(.4,0,.2,1);

    .cover__clickable-area {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
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
