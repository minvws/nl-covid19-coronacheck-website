<script>
import Navigation from '@/components/elements/Navigation';
import QRCode from 'qrcode'
import { jsPDF as JsPDF } from 'jspdf';
import montserrat from '@/assets/fontAsBase64';

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
        }
    },
    methods: {
        goBack() {
            this.$router.push({ name: 'YourTestResults' });
        },
        downloadPDF() {
            if (this.qrCode.length > 0) {
                this.generateQRCode().then((urlQR) => {
                    const document = this.getDocument(urlQR);
                    const documentName = 'corona-check-test.pdf';
                    document.save(documentName);
                })
            } else {
                // todo
                console.error('No QR code')
            }
        },
        openPDF() {
            if (this.qrCode.length > 0) {
                this.generateQRCode().then((urlQR) => {
                    const document = this.getDocument(urlQR);
                    this.open(document);
                })
            } else {
                // todo
                console.error('No QR code')
            }
        },
        async generateQRCode() {
            const dpi = 150;
            const size = QRSizeInCm * cmToInch * dpi;
            return new Promise((resolve, reject) => {
                QRCode.toDataURL(this.qrCode, { width: size, height: size })
                    .then(url => {
                        resolve(url);
                    })
                    .catch(err => {
                        console.error(err)
                    })
            })
        },
        getDocument(urlQR) {
            const doc = new JsPDF();
            const grid = 8;
            const pageHeight = 297;
            const pageWidth = 210;
            const bottomBarHeight = 30;
            const box2BaseY = (pageHeight / 2) + (2 * grid);
            const box4BaseX = (pageWidth / 2) + grid;
            const box4BaseY = pageHeight - bottomBarHeight + grid;
            const tableBaseY = 110;
            const tableBaseCol2X = 70;
            const lineHeight = 7;
            const lineHeightSmall = 5;
            const table2Padding = 8;
            const table2BaseY = box2BaseY + 55;
            // init
            doc.addFileToVFS('montserrat.ttf', montserrat.regular);
            doc.addFileToVFS('montserrat-bold.ttf', montserrat.bold);
            doc.addFont('montserrat.ttf', 'montserrat', 'normal')
            doc.addFont('montserrat-bold.ttf', 'montserrat', 'bold')
            doc.setFont('montserrat');
            const regular = ['montserrat', 'normal', 400];
            const bold = ['montserrat', 'normal', 700];

            const createImageOnTheFly = function(src) {
                const img = document.createElement('img');
                img.src = src;
                return img;
            }

            const textItems = [
                {
                    text: 'Je testbewijs',
                    fontWeight: 700,
                    fontSize: 20,
                    position: [grid, (grid * 2)]
                }, {
                    text: 'QR-code niet vouwen',
                    fontSize: 8,
                    position: [(grid + 0.5 * QRSizeInCm * 10), 95],
                    properties: { align: 'center' }
                }, {
                    text: 'Initialen',
                    fontSize: 10,
                    position: [grid, tableBaseY]
                }, {
                    text: this.testResult.holder.initials,
                    fontWeight: 700,
                    position: [tableBaseCol2X, tableBaseY]
                }, {
                    text: 'Geboortedag',
                    position: [grid, (tableBaseY + lineHeight)]
                }, {
                    text: '00-00-0000',
                    fontWeight: 700,
                    position: [tableBaseCol2X, (tableBaseY + lineHeight)]
                }, {
                    text: 'Getest op',
                    position: [grid, (tableBaseY + 3 * lineHeight)]
                }, {
                    text: '00-00-0000',
                    fontWeight: 700,
                    position: [tableBaseCol2X, (tableBaseY + 3 * lineHeight)]
                }, {
                    text: 'Geldig tot',
                    position: [grid, (tableBaseY + 4 * lineHeight)]
                }, {
                    text: '00-00-0000',
                    fontWeight: 700,
                    position: [tableBaseCol2X, (tableBaseY + 4 * lineHeight)]
                }, {
                    text: 'INSTRUCTIES',
                    position: [grid, box2BaseY]
                }, {
                    text: `1. Print deze pagina. Dat is je testbewijs
2. Neem geldige identificatie mee naar de activiteit
3. Toon de QR-code bij de toegang van je activiteit en eventueel je toegangskaartje.

Let op: Dit is géén toegangsticket voor je evenement`,
                    position: [grid, (box2BaseY + 2 * lineHeight)],
                    width: (pageWidth / 2 - (2 * grid))
                }, {
                    text: 'Wil je liever jouw testbewijs op je telefoon laten zien? Gebruik dan de code uit de e-mail in CoronaCheck-app.',
                    fontWeight: 400,
                    fontSize: 10,
                    lineHeight: lineHeightSmall,
                    position: [box4BaseX, box4BaseY],
                    width: (pageWidth / 2 - (2 * grid))
                }, {
                    text: 'Vragen?',
                    fontWeight: 700,
                    fontSize: 10,
                    position: [(box4BaseX + table2Padding), table2BaseY]
                }, {
                    text: `Bekijk de Meestgestelde vragen op www.coronaCheck.nl
Als je vraag er niet bij staat, stuur dan een email naar support@leadhealthcare.nl of bel naar 085-0658002.`,
                    lineHeight: lineHeightSmall,
                    position: [(box4BaseX + table2Padding), (table2BaseY + 2 * lineHeightSmall)],
                    width: (pageWidth / 2 - (2 * grid) - (2 * table2Padding))
                }
            ];

            // bottom bar
            doc.setFillColor(240, 240, 240);
            doc.rect(0, (pageHeight - bottomBarHeight), pageWidth, bottomBarHeight, 'F');

            // images
            doc.addImage(urlQR, 'PNG', grid, (grid * 3), 70, 70);
            doc.addImage(createImageOnTheFly('assets/img/temp/corona-check-print.png'), 'PNG', box4BaseX, box2BaseY - 5);
            doc.addImage(createImageOnTheFly('assets/img/temp/corona-check-logo.png'), 'PNG', grid, (pageHeight - bottomBarHeight + 5));
            doc.addImage(createImageOnTheFly('assets/img/temp/fold-instructions.png'), 'PNG', 65, box2BaseY - 10);

            // lines
            doc.setDrawColor(200, 200, 200);
            doc.line(0, (pageHeight / 2), pageWidth, (pageHeight / 2));
            doc.line((pageWidth / 2), 0, (pageWidth / 2), pageHeight);

            // table border
            doc.setDrawColor(0, 0, 0);
            doc.rect(box4BaseX, table2BaseY - table2Padding, (pageWidth / 2 - (2 * grid)), 50, 'S');

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
                :callback-back="goBack"/>
            <div class="section">
                <div class="section-block">
                    <h1>
                        Jouw testbewijs
                    </h1>
                    <p>
                        Lees hier welke informatie er in verwerkt is. Open of download de PDF en print hem als  testbewijs.
                    </p>
                    <div class="Print__container">
                        <div class="Print__buttons">
                            <button
                                class="button--full-width"
                                @click="openPDF()">
                                Open PDF
                            </button>
                            <button
                                class="button--full-width"
                                @click="downloadPDF()">
                                Download PDF
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
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@import "@/styles/variables/index";

.Print {

    .Print__container {
        margin-top: 40px;
        display: flex;

        .Print__buttons {
            width: 212px;
            margin-top: 40px;

            button {
                margin-bottom: 24px;
            }
        }

        .Print__image {
            width: calc(100% - 212px);
            display: flex;
            justify-content: flex-end;

            img {
                width: 100%;
                margin-right: -60px;
            }
        }
    }

    @include tablet() {

        .Print__container {
            display: block;

            .Print__buttons {
                width: 100%;
            }

            .Print__image {
                width: 100%;

                img {
                    width: 500px;
                }
            }
        }
    }
}
</style>
