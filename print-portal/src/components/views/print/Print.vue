<script>
import Navigation from '@/components/elements/Navigation';
import QRCode from 'qrcode'
import { jsPDF as JsPDF } from 'jspdf';
import montserrat from '@/assets/fontAsBase64';
import dateTool from '@/tools/date';
import Footer from '@/components/elements/Footer';
import { detect } from 'detect-browser';

const cmToInch = 0.393700787;
const QRSizeInCm = 8;

export default {
    name: 'Print',
    components: { Footer, Navigation },
    data() {
        return {
            document: null
        }
    },
    computed: {
        qrCode() {
            return this.$store.state.qrCode;
        },
        qrData() {
            return this.$store.state.qrData;
        },
        maxValidityHours() {
            return this.$store.state.holderConfig.maxValidityHours;
        },
        validUntil() {
            return dateTool.addHoursToDate((this.qrData.sampleTime * 1000), this.maxValidityHours, true);
        },
        holderString() {
            // based on qr feedback, not from testresult.holder
            return this.qrData.firstNameInitial + this.qrData.lastNameInitial + this.birthDayString;
        },
        birthDayString() {
            let day, month;
            const exceptions = ['00', 'X', 'XX', 'x', 'xx'];
            if (this.qrData.birthDay.length > 0) {
                if (exceptions.indexOf(this.qrData.birthDay) === -1) {
                    // design wants a leadig zero
                    day = Number(this.qrData.birthDay);
                    if (day < 10) {
                        day = '0' + day;
                    }
                } else {
                    // leave the exception as is
                    day = this.qrData.birthDay;
                }
            } else {
                // represent empty property with a dash
                day = '-';
            }
            if (this.qrData.birthMonth.length > 0) {
                if (exceptions.indexOf(this.qrData.birthMonth) === -1) {
                    month = dateTool.monthNumberToMonthName(Number(this.qrData.birthMonth), this.currentLanguage.locale);
                } else {
                    month = this.qrData.birthDay;
                }
            } else {
                month = '-';
            }
            return day + ' ' + month;
        },
        fileName() {
            const info = [
                dateTool.dateToString((this.qrData.sampleTime * 1000), 'yyyyMMdd', this.currentLanguage.locale),
                'coronacheck',
                'testbewijs',
                this.holderString
            ];
            return info.join('_') + '.pdf';
        },
        browser() {
            return detect();
        },
        browserIsIE() {
            return this.browser.name === 'ie';
        }
    },
    methods: {
        goBack() {
            this.$router.push({ name: 'YourTestResult' });
        },
        goHome() {
            this.$router.push({ name: 'Home' });
        },
        createDocument() {
            this.generateQRCode().then(async (urlQR) => {
                this.document = await this.getDocument(urlQR);
            })
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
        },
        async generateQRCode() {
            const dpi = 300;
            const sizeInPixels = Math.round(QRSizeInCm * cmToInch * dpi);
            const qrOptions = {
                width: sizeInPixels,
                height: sizeInPixels,
                margin: 0,
                errorCorrectionLevel: 'L'
            };
            return new Promise((resolve, reject) => {
                QRCode.toDataURL(this.qrCode, qrOptions)
                    .then(url => {
                        resolve(url);
                    })
                    .catch(error => {
                        this.$store.commit('modal/set', {
                            messageHead: this.$t('pdf.generalError'),
                            messageBody: this.$t('pdf.generalErrorBody') + '<p>' + error + '</p>',
                            closeButton: true
                        });
                    })
            })
        },
        async createImageOnTheFly(src) {
            return new Promise((resolve, reject) => {
                const img = document.createElement('img');
                img.onload = () => {
                    resolve(img);
                }
                img.src = src;
            })
        },
        async getDocument(urlQR) {
            const settings = {
                orientation: 'p',
                format: 'a4'
            };
            const doc = new JsPDF(settings);
            const pageHeight = 297;
            const pageWidth = 210;
            // this is top paper to baseline first text
            const pageMarginTop = 20;
            const pageMarginLeft = 12;
            const lineHeight = 6;
            const lineHeightSmall = 5.5;
            const bottomBarHeight = 30;
            const qrCodeY = 27;
            const tableBaseY = 116;
            const tableBaseCol2X = 48;
            const instructionsBaseY = (pageHeight / 2) + 17;
            const questionsTableBaseX = (pageWidth / 2) + 10;
            const questionsTableBaseY = (pageHeight / 2) + 53;
            const questionsTablePadding = 8;
            const footerBaseX = questionsTableBaseX;
            const footerBaseY = pageHeight - bottomBarHeight + 10;
            const borderRadius = 6;
            // init
            doc.addFileToVFS('montserrat.ttf', montserrat.regular);
            doc.addFileToVFS('montserrat-bold.ttf', montserrat.bold);
            doc.addFont('montserrat.ttf', 'montserrat', 'normal')
            doc.addFont('montserrat-bold.ttf', 'montserrat', 'bold')
            doc.setFont('montserrat');
            const regular = ['montserrat', 'normal', 400];
            const bold = ['montserrat', 'normal', 700];

            const textItemsA = [
                {
                    text: this.$t('pdf.yourTestProof'),
                    fontWeight: 700,
                    fontSize: 20,
                    position: [pageMarginLeft, pageMarginTop]
                }, {
                    text: this.$t('pdf.initials'),
                    fontSize: 10,
                    position: [pageMarginLeft, tableBaseY]
                }, {
                    text: this.qrData.firstNameInitial + this.qrData.lastNameInitial,
                    fontWeight: 700,
                    position: [tableBaseCol2X, tableBaseY]
                }, {
                    text: this.$t('pdf.dayOfBirth'),
                    position: [pageMarginLeft, (tableBaseY + lineHeight)]
                }, {
                    text: this.birthDayString,
                    fontWeight: 700,
                    position: [tableBaseCol2X, (tableBaseY + lineHeight)]
                }]

            const privacyItems = [{
                text: this.$t('pdf.testedAt'),
                position: [pageMarginLeft, (tableBaseY + 3 * lineHeight)]
            }, {
                text: dateTool.dateToString((this.qrData.sampleTime * 1000), 'dd-MM-yyyy HH:mm', this.currentLanguage.locale),
                fontWeight: 700,
                position: [tableBaseCol2X, (tableBaseY + 3 * lineHeight)]
            }, {
                text: this.$t('pdf.validUntil'),
                position: [pageMarginLeft, (tableBaseY + 4 * lineHeight)]
            }, {
                text: this.validUntil,
                fontWeight: 700,
                position: [tableBaseCol2X, (tableBaseY + 4 * lineHeight)]
            }];

            const texItemsB = [{
                text: this.$t('pdf.instructions'),
                fontWeight: 700,
                position: [pageMarginLeft, instructionsBaseY]
            }, {
                text: this.$t('pdf.instructionsText'),
                position: [pageMarginLeft, (instructionsBaseY + 3 * lineHeight)],
                width: (pageWidth / 2 - (2 * pageMarginLeft))
            }, {
                text: this.$t('pdf.preferMobile'),
                fontWeight: 400,
                fontSize: 10,
                lineHeight: lineHeightSmall,
                position: [footerBaseX, footerBaseY],
                width: (pageWidth / 2 - (2 * pageMarginLeft))
            }, {
                text: this.$t('pdf.questions'),
                fontWeight: 700,
                fontSize: 10,
                position: [(questionsTableBaseX + questionsTablePadding), (questionsTableBaseY + questionsTablePadding)]
            }, {
                text: this.$t('pdf.footerText'),
                lineHeight: lineHeightSmall,
                position: [(questionsTableBaseX + questionsTablePadding), (questionsTableBaseY + questionsTablePadding + 2 * lineHeightSmall)],
                width: (pageWidth / 2 - 20 - (2 * questionsTablePadding))
            }];

            const textItems = (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'acceptance')
                ? [...textItemsA, ...privacyItems, ...texItemsB] : [...textItemsA, ...texItemsB];

            // bottom bar
            doc.setFillColor(239, 247, 249);
            doc.rect(0, (pageHeight - bottomBarHeight), pageWidth, bottomBarHeight, 'F');

            // questions table (do before the artwork image which should be on top
            doc.setFillColor(239, 247, 249);
            doc.roundedRect(questionsTableBaseX, questionsTableBaseY, (pageWidth / 2 - 20), 60, borderRadius, borderRadius, 'F');

            // images
            // use slow image compression after failing opening pdf on Chrome
            const imageSettings = [null, 'SLOW']
            const imageArtwork = await this.createImageOnTheFly('assets/img/pdf/artwork.png');
            const imageCoronacheck = await this.createImageOnTheFly('assets/img/pdf/coronacheck.png');
            const imageFoldInstructions = await this.createImageOnTheFly('assets/img/pdf/fold-instructions.png');
            doc.addImage(urlQR, 'PNG', pageMarginLeft, qrCodeY, (QRSizeInCm * 10), (QRSizeInCm * 10), ...imageSettings);
            doc.addImage(imageArtwork, 'PNG', (questionsTableBaseX + 17), (pageHeight / 2 + 14), 52, 44, ...imageSettings);
            doc.addImage(imageCoronacheck, 'PNG', 10, (pageHeight - bottomBarHeight + 8), 70, 15, ...imageSettings);
            doc.addImage(imageFoldInstructions, 'PNG', 65, (instructionsBaseY - 6), 35, 10, ...imageSettings);

            // lines
            doc.setDrawColor(224, 224, 223);
            doc.line(0, (pageHeight / 2), pageWidth, (pageHeight / 2));
            doc.line((pageWidth / 2), 0, (pageWidth / 2), pageHeight);

            // texts
            for (const textItem of textItems) {
                if (textItem.fontSize) {
                    doc.setFontSize(textItem.fontSize);
                }
                if (textItem.fontWeight && textItem.fontWeight === 700) {
                    doc.setFont(...bold);
                } else {
                    doc.setFont(...regular);
                }
                if (textItem.width) {
                    let index = 0;
                    const set = doc.splitTextToSize(textItem.text, textItem.width);
                    for (const item of set) {
                        const lh = textItem.lineHeight ? textItem.lineHeight : lineHeight;
                        doc.text(item, textItem.position[0], (textItem.position[1] + index * lh), textItem.properties);
                        index++;
                    }
                } else {
                    doc.text(textItem.text, textItem.position[0], textItem.position[1], textItem.properties);
                }
            }
            return doc;
        }
    },
    mounted() {
        if (this.qrCode.length > 0) {
            this.createDocument();
        }
    }
}
</script>

<template>
    <div
        id="content"
        class="Print">
        <div class="pagewrap">
            <Navigation
                :display-back-button="qrCode.length > 0"
                :callback-back="goBack"/>
            <div class="section">
                <div class="section-block">
                    <div v-if="qrCode.length > 0">
                        <h2>
                            {{$t('yourTestProof')}}
                        </h2>
                        <p>
                            {{$t('yourTestProofDirection')}}
                        </p>
                        <div class="Print__container">
                            <div
                                :class="{'browser-ie': browserIsIE}"
                                class="Print__buttons">
                                <button
                                    type="button"
                                    :class="{
                                        'button--inactive': !document
                                    }"
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
        </div>
        <Footer/>
    </div>
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
