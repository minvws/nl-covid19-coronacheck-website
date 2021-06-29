<script>
import Page from '@/components/elements/Page';
import { detect } from 'detect-browser';
import CcButton from '@/components/elements/CcButton';
import { getDocument, generateQR } from '@/tools/print/pdf/src/index';
import { handleRejection } from '@/tools/error-handler';
import { QRSizeInCm } from '@/data/constants'
import NLQR from '@/classes/QR/NLQR';
import EUQRnegativetest from '@/classes/QR/EUQRnegativetest';
import EUQRvaccination from '@/classes/QR/EUQRvaccination';

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
        },
        hasDomestic() {
            return this.$store.state.qrs.proof.domestic;
        },
        hasEuropean() {
            return this.$store.state.qrs.proof.european;
        },
        pageType() {
            if (this.hasDomestic && this.hasEuropean) {
                return 'both';
            } else {
                if (this.hasDomestic) {
                    return 'domestic';
                } else {
                    return 'european';
                }
            }
        }
    },
    methods: {
        async createDocument() {
            // todo remove this
            /*eslint-disable */
            const proof = {
                "domestic": null,
                "european": {
                    "expirationTime": "2021-07-27T09:07:28+00:00",
                    "dcc": {
                        "ver": "1.3.0",
                        "nam": {
                            "fn": "De Bouwer",
                            "fnt": "DE<BOUWER",
                            "gn": "Bob",
                            "gnt": "BOB"
                        },
                        "dob": "1960-01-01",
                        "v": null,
                        "t": [
                            {
                                "tg": "840539006",
                                "ci": "URN:UCI:01:NL:NGYCBFWBO5FJ7L53IHZY42#5",
                                "co": "NL",
                                "is": "Ministry of Health Welfare and Sport",
                                "tt": "LP6464-4",
                                "nm": "",
                                "ma": "1232",
                                "sc": "2021-06-28T14:12:02+00:00",
                                "tr": "260415000",
                                "tc": "Facility approved by the State of The Netherlands"
                            }
                        ],
                        "r": null
                    },
                    "qr": "HC1:NCFCS2FY7+J2DO3L7E*SG697CE64586MD2UV88JQTMZS342T%RHG-5F+6PMQ1JF13FEINSMPWKU/$L1F4%RB664%E7NGIN:4./4FQ0:N0DX3FQ5TC1ENNFVS0$VZARZ.BE1II6O:VC8CR7$LV5L-SLHTMSEH+.4FV3G2R%+VW/B7:HQUM0WF48D03B+N5:UQEEU-KI:%6MJ3F2B-7742K-U2BTOW5SRIK::93FB2+BSUJ+/EPZ33NHTE702OXS7%1H4T7E+GE:5I*B+KHV00R-H6TS56O*WN5SH8IRI94CILIWEI PN.4+AE8X142UR.DK17X%913Q448.BGP7UTNQEPUF*KP30JKS9JBVSBH KRD24I30WF3XKI9LZVC.TDG+C9LP1UC+I2P72 K26EONG721K1G22Q343QA K$QCWALGYA3IROWC6V5WZ7RU0YE5AM3:SBR*SFRMYIBLLG5IND00$LIL894+EUFC8V320OX:U*IM3ZLH7NJ2MQ6RH/MJF1QAW%2IBWOOMB%IS.2T3BM%KU-CQC02G+TA*HK8SS9VVSOMARMTU+T6MNP5FU3/JV4WWTU*2WM:MF:BE2CDDT/6E-N345W000FGW62O%DI"
                }
            }
            /* eslint-enable */
            const pages = [];
            if (proof.domestic) {
                const nlQR = new NLQR(proof.domestic);
                await generateQR(nlQR.qr, 'nl').then(async (urlQR) => {
                    const page = {
                        type: this.type,
                        territory: 'nl',
                        qr: nlQR,
                        urlQR: urlQR
                    }
                    pages.push(page)
                }, (error) => {
                    handleRejection(error);
                })
            }
            if (proof.european) {
                const getEUQR = (type, data) => {
                    switch (type) {
                    case 'vaccination':
                        return new EUQRvaccination(data)
                    case 'negativetest':
                        return new EUQRnegativetest(data)
                    // case 'recovery':
                    //     return new EUQRrecovery(data)
                    }
                }
                const euQR = getEUQR(this.type, proof.european);
                await generateQR(euQR.qr, 'eu').then(async (urlQR) => {
                    const page = {
                        type: this.type,
                        territory: 'eu',
                        qr: euQR,
                        urlQR: urlQR
                    }
                    pages.push(page)
                }, (error) => {
                    handleRejection(error);
                })
            }
            this.document = await getDocument(pages, this.currentLanguage.locale, this.metadata, QRSizeInCm);
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
