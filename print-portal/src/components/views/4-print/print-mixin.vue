<script>
import QRCode from 'qrcode'
import { jsPDF as JsPDF } from 'jspdf';
import montserrat from '@/assets/fontAsBase64';
import dateTool from '@/tools/date';

const cmToInch = 0.393700787;
const QRSizeInCm = 8;

export default {
    name: 'Print',
    data() {
        return {
            document: null
        }
    },
    computed: {
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
                    month = dateTool.monthNumberToMonthNameAbbr(Number(this.qrData.birthMonth));
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
                dateTool.dateTimeToString((this.qrData.sampleTime * 1000), 'yyyyMMdd', this.currentLanguage.locale),
                'coronacheck',
                'testbewijs',
                this.holderString
            ];
            return info.join('_') + '.pdf';
        }
    },
    methods: {
        createDocument() {
            this.generateQRCode().then(async (urlQR) => {
                this.document = await this.getDocument(urlQR);
            })
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
                text: dateTool.dateTimeToString((this.qrData.sampleTime * 1000), 'dd-MM-yyyy HH:mm', this.currentLanguage.locale),
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
