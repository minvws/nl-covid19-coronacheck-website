<script>
import CcModestButton from '@/components/elements/CcModestButton';
import modalMixin from './modal-mixin'
import ErrorList from '@/components/elements/ErrorList.vue';

export default {
    name: 'Modal',
    components: { CcModestButton, ErrorList },
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
        },
        actions () {
            return this.$store.state.modal.actions;
        },
        errors () {
            return this.$store.state.modal.errors;
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
                    id="modal__body">
                    <div v-html="messageBody" />
                    <ErrorList class="errors" v-if="errors && errors.length" v-bind="{ errors }" />
                </div>
                <div id="modal__footer">
                    <CcModestButton
                        v-if="showConfirm"
                        id="modal-refute"
                        @select="refute()"
                        :label="refuteText"/>
                    <CcModestButton
                        v-if="showConfirm"
                        id="modal-confirm"
                        @select="confirm()"
                        :label="confirmText"
                        :alert="confirmAlert"/>

                    <CcModestButton
                        v-if="showCloseButton"
                        id="modal-close"
                        @select="close()"
                        :label="closeText"/>

                     <CcModestButton
                        v-for="({ action, label }, i) in actions"
                        :key="`action-${i}`"
                        @select="() => {
                            close();
                            if (action) action()
                        }"
                        :label="label"/>
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
    max-height: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    pointer-events: none;
    overflow: hidden;

    @include mobile() {
        width: 100%;
        height: 100%;
        transform: none;
        left: 0;
        top: 0;
        max-height: 100%;
    }
}

.modal {
    background-color: #fff;
    transition: top 1s ease;
    border-radius: 5px;
    max-width: 100%;
    overflow-y: auto;
    pointer-events: all;
    overflow: hidden;

    div::-webkit-scrollbar {
        width: 6px;
    }

    div::-webkit-scrollbar-thumb {
        background: #8F8F93;
        border-radius: 8px;
        width: 6px;
        height: 322px;
    }

    &__content {
        overflow-y: auto;
        max-height: 540px;

        @include mobile() {
            max-height: calc(100% - 60px);
        }
    }

    #modal__head {
        padding: 30px $length-l 10px $length-l;
        margin-bottom: $grid-x2;
        font-weight: 700;
        font-size: 1.125rem;
        font-family: inherit;
        outline: none;
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
.errors {
    padding-top: 1em;
}
</style>
