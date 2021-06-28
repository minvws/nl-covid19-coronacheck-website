<script>
import Page from '@/components/elements/Page';
import { detect } from 'detect-browser';
import CcButton from '@/components/elements/CcButton';
import { getDocument } from '@/tools/print/pdf/src/index';
import { generateQR } from '@/tools/qr';
import NLQR from '@/classes/QR/NLQR';
import { handleRejection } from '@/tools/error-handler';
import { QRSizeInCm } from '@/data/constants'

export default {
    name: 'Print',
    components: { Page, CcButton },
    props: {
        type: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            document: null
        }
    },
    computed: {
        browser() {
            return detect();
        },
        browserIsIE() {
            return this.browser.name === 'ie';
        },
        fileName() {
            return 'coronacheck.pdf';
        },
        metadata() {
            return {
                title: this.$t('pdf.metadata.title'),
                author: this.$t('pdf.metadata.author')
            };
        }
    },
    methods: {
        createDocument(proof) {
            const nlQR = new NLQR(proof.domestic);
            generateQR(nlQR.qr).then(async (urlQR) => {
                const pages = [
                    {
                        type: this.type,
                        territory: 'nl',
                        qr: nlQR,
                        urlQR: urlQR
                    }
                ]
                this.document = await getDocument(pages, this.currentLanguage.locale, this.metadata, this.$t('pdf'), QRSizeInCm);
            }, (error) => {
                handleRejection(error);
            })
        },
        render() {
            this.document = null;
            this.$nextTick(() => {
                this.createDocument(this.$store.state.qrs.proof)
            });
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
                action.document.title = this.metadata.title;
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
                messageBody: this.$t('pdf.message.error.general.body'),
                confirm: true,
                confirmAction,
                confirmYes: this.$t('pdf.goBackToStart'),
                confirmNo: this.$t('pdf.close')
            });
        }
    },
    mounted() {
        this.render()
    },
    watch: {
        currentLanguage() {
            this.render()
        }
    }
}
</script>

<template>
    <Page
        class="Print"
        @back="goBack">
        <div class="section">
            <slot></slot>
            <div class="section-block">
                <div class="Print__container">
                    <div
                        :class="{'browser-ie': browserIsIE}"
                        class="Print__buttons">
                        <CcButton
                            @select="openPDF()"
                            id="open-pdf"
                            :disabled="!document"
                            :label="$t('views.print.openPDF')"
                            :full-width="true"/>
                        <CcButton
                            @select="downloadPDF()"
                            id="download-pdf"
                            :disabled="!downloadPDF"
                            :label="$t('views.print.openPDF')"
                            :full-width="true"/>
                    </div>
                    <div class="Print__image">
                        <img
                            alt="HolderV3 QR code maken"
                            width="248"
                            src="assets/img/artwork/holder_qrcode_maken_full.svg"/>
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
