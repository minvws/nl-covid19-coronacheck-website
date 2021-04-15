<script>
import Navigation from '@/components/elements/Navigation';
import QRCode from 'qrcode'
import { jsPDF as JsPDF } from 'jspdf';
import montserrat from '@/assets/fontAsBase64';
import dateTool from '@/tools/date';

const cmToInch = 0.393700787;
const QRSizeInCm = 7;

export default {
    name: 'Print',
    components: { Navigation },
    computed: {
        testResult() {
            return this.$store.state.testResult;
        },
        qrCode() {
            return this.$store.state.qrCode;
        },
        maxValidityHours() {
            return this.$store.state.holderConfig.maxValidityHours;
        },
        validUntil() {
            return dateTool.addHoursToDate(this.testResult.sampleDate, this.maxValidityHours, true);
        },
        fileName() {
            const info = [
                dateTool.dateToString(this.testResult.sampleDate, 'yyyyMMdd'),
                'coronacheck',
                'testbewijs',
                this.testResult.holder.stringCompact
            ];
            return info.join('_') + '.pdf';
        }
    },
    methods: {
        goBack() {
            this.$router.push({ name: 'YourTestResult' });
        },
        goHome() {
            this.$router.push({ name: 'ProvideCode' });
        },
        downloadPDF() {
            if (this.qrCode.length > 0) {
                this.generateQRCode().then(async (urlQR) => {
                    const document = await this.getDocument(urlQR);
                    document.save(this.fileName);
                })
            } else {
                // todo
                console.error('No QR code')
            }
        },
        openPDF() {
            if (this.qrCode.length > 0) {
                this.generateQRCode().then(async (urlQR) => {
                    const document = await this.getDocument(urlQR);
                    this.open(document);
                })
            } else {
                // todo
                console.error('No QR code')
            }
        },
        async generateQRCode() {
            const dpi = 300;
            const sizeInPixels = Math.round(QRSizeInCm * cmToInch * dpi);
            const qrOptions = {
                width: sizeInPixels,
                height: sizeInPixels
            };
            return new Promise((resolve, reject) => {
                QRCode.toDataURL(this.qrCode, qrOptions)
                    .then(url => {
                        resolve(url);
                    })
                    .catch(err => {
                        console.error(err)
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
            const pageMarginLeft = 17;
            const lineHeight = 6;
            const lineHeightSmall = 5.5;
            const bottomBarHeight = 30;
            const qrCodeY = 30;
            const tableBaseY = 112;
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
                    text: 'Je testbewijs',
                    fontWeight: 700,
                    fontSize: 20,
                    position: [pageMarginLeft, pageMarginTop]
                }, {
                    text: 'Initialen',
                    fontSize: 10,
                    position: [pageMarginLeft, tableBaseY]
                }, {
                    text: this.testResult.holder.initials,
                    fontWeight: 700,
                    position: [tableBaseCol2X, tableBaseY]
                }, {
                    text: 'Geboortedag',
                    position: [pageMarginLeft, (tableBaseY + lineHeight)]
                }, {
                    text: this.testResult.holder.birthDayString,
                    fontWeight: 700,
                    position: [tableBaseCol2X, (tableBaseY + lineHeight)]
                }]

            const privacyItems = [{
                text: 'Getest op',
                position: [pageMarginLeft, (tableBaseY + 3 * lineHeight)]
            }, {
                text: dateTool.dateToString(this.testResult.sampleDate),
                fontWeight: 700,
                position: [tableBaseCol2X, (tableBaseY + 3 * lineHeight)]
            }, {
                text: 'Geldig tot',
                position: [pageMarginLeft, (tableBaseY + 4 * lineHeight)]
            }, {
                text: this.validUntil,
                fontWeight: 700,
                position: [tableBaseCol2X, (tableBaseY + 4 * lineHeight)]
            }];

            const texItemsB = [{
                text: 'INSTRUCTIES',
                fontWeight: 700,
                position: [pageMarginLeft, instructionsBaseY]
            }, {
                text: `1. Print dit testbewijs op A4 zonder de schaal aan te passen (mag in zwart-wit)

2. Neem een geldig identiteitsbewijs mee naar de activiteit

3. Laat het testbewijs (en eventueel ook je toegangskaartje) zien bij de ingang


Let op: dit is géén toegangsticket voor je activiteit`,
                position: [pageMarginLeft, (instructionsBaseY + 3 * lineHeight)],
                width: (pageWidth / 2 - (2 * pageMarginLeft))
            }, {
                text: 'Laat je jouw testbewijs liever op je telefoon zien? Gebruik dan de code uit de e-mail in de CoronaCheck-app',
                fontWeight: 400,
                fontSize: 10,
                lineHeight: lineHeightSmall,
                position: [footerBaseX, footerBaseY],
                width: (pageWidth / 2 - (2 * pageMarginLeft))
            }, {
                text: 'VRAGEN?',
                fontWeight: 700,
                fontSize: 10,
                position: [(questionsTableBaseX + questionsTablePadding), (questionsTableBaseY + questionsTablePadding)]
            }, {
                text: `Bekijk de meestgestelde vragen op www.CoronaCheck.nl

Stuur een e-mail naar helpdesk@coronacheck.nl of bel naar 0800-1421 (gratis)`,
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
            doc.addImage(urlQR, 'PNG', pageMarginLeft, qrCodeY, 70, 70, ...imageSettings);
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
        },
        open(document) {
            const string = document.output('datauristring');
            const embed = '<embed width="100%" height="100%" src="' + string + '"/>';
            const action = window.open();
            action.document.open();
            action.document.write(embed);
            action.document.close();
        }
    }
}
</script>

<template>
    <div class="Print">
        <div class="pagewrap">
            <Navigation
                :display-back-button="qrCode.length > 0"
                :callback-back="goBack"/>
            <div class="section">
                <div class="section-block">
                    <div v-if="qrCode.length > 0">
                        <h2>
                            {{translate('yourTestProof')}}
                        </h2>
                        <p>
                            {{translate('yourTestProofDirection')}}
                        </p>
                        <div class="Print__container">
                            <div class="Print__buttons">
                                <button
                                    type="button"
                                    class="button-standard button--full-width"
                                    @click="openPDF()">
                                    {{translate('openPDF')}}
                                </button>
                                <button
                                    type="button"
                                    class="button-standard button--full-width"
                                    @click="downloadPDF()">
                                    {{translate('downloadPDF')}}
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
                            {{translate('noTestProofPresent')}}
                        </h2>
                        <p>
                            {{translate('noTestProofPresentDirection')}}
                        </p>
                        <div class="section-block__footer">
                            <button
                                @click="goHome()"
                                type="button"
                                class="button-standard">
                                {{translate('retrieveTestResult')}}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
}
</style>
