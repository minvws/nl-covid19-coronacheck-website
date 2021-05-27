<script>
import Page from '@/components/elements/Page';
import { detect } from 'detect-browser';

export default {
    name: 'Print',
    components: { Page },
    props: {
        qrCode: {
            type: String,
            required: true
        },
        document: {
            required: false
        }
    },
    computed: {
        browser() {
            return detect();
        },
        browserIsIE() {
            return this.browser.name === 'ie';
        }
    },
    methods: {
        goHome() {
            this.$router.push({ name: 'Home' });
        },
        goBack() {
            this.$emit('back');
        },
        openPDF() {
            if (this.document) {
                const string = this.document.output('datauristring');
                const embed = '<embed width="100%" height="100%" src="' + string + '"/>';
                const action = window.open();
                action.document.open();
                action.document.write(embed);
                action.document.close();
            } else {
                this.somethingGeneralWentWrong();
            }
        },
        downloadPDF() {
            if (this.document) {
                this.document.save(this.fileName);
            } else {
                this.somethingGeneralWentWrong();
            }
        },
        somethingGeneralWentWrong() {
            const confirmAction = () => {
                this.$router.push({ name: 'ProvideCode' });
            }
            this.$store.commit('modal/set', {
                messageHead: this.$t('pdf.generalError'),
                messageBody: this.$t('pdf.generalErrorBody'),
                confirm: true,
                confirmAction,
                confirmYes: this.$t('pdf.goBackToStart'),
                confirmNo: this.$t('pdf.close')
            });
        }
    }
}
</script>

<template>
    <Page
        class="Print"
        @back="goBack"
        :display-back-button="qrCode.length > 0">
        <div class="section">
            <div class="section-block">
                <div v-if="qrCode.length > 0">
                    <slot></slot>
                    <div class="Print__container">
                        <div
                            :class="{'browser-ie': browserIsIE}"
                            class="Print__buttons">
                            <button
                                type="button"
                                :class="{'button--inactive': !document}"
                                :disabled="!document"
                                id="open-pdf"
                                class="btn button--full-width"
                                @click="openPDF()">
                                {{$t('openPDF')}}
                            </button>
                            <button
                                type="button"
                                :class="{'button--inactive': !document }"
                                :disabled="!document"
                                id="download-pdf"
                                class="btn button--full-width"
                                @click="downloadPDF()">
                                {{$t('openPDF')}}
                            </button>
                        </div>
                        <div class="Print__image">
                            <img
                                alt="Holder QR code maken"
                                width="248"
                                src="assets/img/artwork/holder_qrcode_maken_full.svg"/>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <h2>
                        {{$t('noTestProofPresent')}}
                    </h2>
                    <p>
                        {{$t('noTestProofPresentDirection')}}
                    </p>
                    <div class="section-block__footer">
                        <button
                            @click="goHome()"
                            type="button"
                            class="btn">
                            {{$t('retrieveTestResult')}}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </Page>
</template>

<style lang="scss">
@import "@/styles/variables/index";

.Print {

    .Print__container {
        margin-top: $length-xl;
        display: flex;

        .Print__buttons {
            width: 212px;

            button {
                margin-bottom: $length-s;
            }

            #open-pdf {
                display: block;

                // hide the open button on mobile. This sometimes fails and besides that it creates undesirable user experience
                @include mobile() {
                    display: none;
                }

                @include mobile-landscape-X() {
                    display: none;
                }
            }

            #download-pdf {
                display: none;

                @include mobile() {
                    display: block;
                }

                @include mobile-landscape-X() {
                    display: block;
                }
            }

            &.browser-ie {

                #open-pdf {
                    display: none;
                }

                #download-pdf {
                    display: block;
                }
            }
        }

        .Print__image {
            width: calc(100% - 212px);
            display: flex;
            justify-content: flex-end;
            margin-top: -$length-s;

            img {
                width: 248px;
                margin-right: -$length-xl;
            }
        }
    }

    @include tablet() {

        .Print__container {

            .Print__image {

                img {
                    margin-right: 0;
                }
            }
        }
    }

    @include mobile() {

        .Print__container {
            display: block;

            .Print__buttons {
                margin-bottom: $length-xxl--mobile;
            }

            .Print__image {
                width: 100%;
                margin: 0;

                img {
                    margin: 0 auto;
                }
            }
        }
    }

    .Print__container {
        margin-top: $length-xl;
        display: flex;

        .Print__buttons {

        }
    }
}
</style>