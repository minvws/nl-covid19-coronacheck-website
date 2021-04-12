<script>
    export default {
        name: 'modal',
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
            closeAfter() {
                return this.$store.state.modal.closeAfter;
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
    <div
        :class="{'popup--active': showModal}"
        class="cover">
        <div class="modal">
            <div
                v-html="message"
                class="modal__body">
            </div>

            <div class="modal__footer">
                <div
                    v-if="showConfirm"
                    class="modal__confirm">
                    <div
                        @click="confirm()"
                        class="button button--ok">
                        {{confirmText}}
                    </div>
                    <div
                        @click="refute()"
                        class="button">
                    {{refuteText}}
                    </div>
                </div>
            </div>

            <div
                v-if="showCloseButton"
                @click="close()"
                class="close-button"></div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .modal {
        background-color: #fff;
        position: absolute;
        width: 500px;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 10000;
        top: 40%;
        transition: top 1s ease;
        box-shadow: 0 0 4px 0 rgba(0,0,0,0.40);


        .modal__body {
            padding: 30px 50px;
            font-size: 16px;
        }

        .modal__footer {
            position: relative;
            padding: 8px 30px 30px 30px;
            display: flex;
            align-items: center;

            .modal__confirm {
                display: flex;
                align-items: center;
                width: 100%;
                justify-content: flex-end;

                .button {
                    margin-right: 8px;
                    padding: 8px;
                    border: 1px solid #ddd;
                    cursor: pointer;
                    border-radius: 4px;
                    text-transform: uppercase;
                    height: 32px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    letter-spacing: 0.3pt;

                    &.button--ok {
                        background: $black-1;
                        color: $white-1;
                    }

                    &:last-child {
                        margin-right: 0;
                    }
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