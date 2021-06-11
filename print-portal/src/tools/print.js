import { jsPDF as JsPDF } from 'jspdf';
import dateTool from '@/tools/date';
import montserrat from '@/assets/fontAsBase64';
import { QRSizeInCm } from '@/data/constants'
import i18n from '@/i18n'
import store from '@/store'

const createImageOnTheFly = async (src) => {
    return new Promise((resolve, reject) => {
        const img = document.createElement('img');
        img.onload = () => {
            resolve(img);
        }
        img.src = src;
    })
};

const getBirthDayString = (qrData) => {
    let day, month;
    const exceptions = ['00', 'X', 'XX', 'x', 'xx'];
    if (qrData.birthDay.length > 0) {
        if (exceptions.indexOf(qrData.birthDay) === -1) {
            // design wants a leadig zero
            day = Number(qrData.birthDay);
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
    if (qrData.birthMonth.length > 0) {
        if (exceptions.indexOf(qrData.birthMonth) === -1) {
            month = dateTool.monthNumberToMonthNameAbbr(Number(qrData.birthMonth));
        } else {
            month = this.qrData.birthDay;
        }
    } else {
        month = '-';
    }
    return day + ' ' + month;
}

const getValidUntil = (qrData) => {
    const maxValidityHours = store.state.holderConfig.maxValidityHours
    return dateTool.addHoursToDate((qrData.sampleTime * 1000), maxValidityHours, true);
}

export const getFileName = (qrData) => {
    const holderString = qrData.firstNameInitial + qrData.lastNameInitial + getBirthDayString;
    const info = [
        dateTool.dateTimeToString((this.qrData.sampleTime * 1000), 'yyyyMMdd'),
        'coronacheck',
        'testbewijs',
        holderString
    ];
    return info.join('_') + '.pdf';
}

export const getDocument = async (qrData, urlQR, locale) => {
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

    const textItems = [
        {
            text: i18n.t('pdf.yourTestProof'),
            fontWeight: 700,
            fontSize: 20,
            position: [pageMarginLeft, pageMarginTop]
        }, {
            text: i18n.t('pdf.initials'),
            fontSize: 10,
            position: [pageMarginLeft, tableBaseY]
        }, {
            text: qrData.firstNameInitial + qrData.lastNameInitial,
            fontWeight: 700,
            position: [tableBaseCol2X, tableBaseY]
        }, {
            text: i18n.t('pdf.dayOfBirth'),
            position: [pageMarginLeft, (tableBaseY + lineHeight)]
        }, {
            text: getBirthDayString(qrData),
            fontWeight: 700,
            position: [tableBaseCol2X, (tableBaseY + lineHeight)]
        }, {
            text: i18n.t('pdf.testedAt'),
            position: [pageMarginLeft, (tableBaseY + 3 * lineHeight)]
        }, {
            text: dateTool.dateTimeToString((qrData.sampleTime * 1000), 'dd-MM-yyyy HH:mm', locale),
            fontWeight: 700,
            position: [tableBaseCol2X, (tableBaseY + 3 * lineHeight)]
        }, {
            text: i18n.t('pdf.validUntil'),
            position: [pageMarginLeft, (tableBaseY + 4 * lineHeight)]
        }, {
            text: getValidUntil(qrData),
            fontWeight: 700,
            position: [tableBaseCol2X, (tableBaseY + 4 * lineHeight)]
        }, {
            text: i18n.t('pdf.instructions'),
            fontWeight: 700,
            position: [pageMarginLeft, instructionsBaseY]
        }, {
            text: i18n.t('pdf.instructionsText'),
            position: [pageMarginLeft, (instructionsBaseY + 3 * lineHeight)],
            width: (pageWidth / 2 - (2 * pageMarginLeft))
        }, {
            text: i18n.t('pdf.preferMobile'),
            fontWeight: 400,
            fontSize: 10,
            lineHeight: lineHeightSmall,
            position: [footerBaseX, footerBaseY],
            width: (pageWidth / 2 - (2 * pageMarginLeft))
        }, {
            text: i18n.t('pdf.questions'),
            fontWeight: 700,
            fontSize: 10,
            position: [(questionsTableBaseX + questionsTablePadding), (questionsTableBaseY + questionsTablePadding)]
        }, {
            text: i18n.t('pdf.footerText'),
            lineHeight: lineHeightSmall,
            position: [(questionsTableBaseX + questionsTablePadding), (questionsTableBaseY + questionsTablePadding + 2 * lineHeightSmall)],
            width: (pageWidth / 2 - 20 - (2 * questionsTablePadding))
        }];

    // bottom bar
    doc.setFillColor(239, 247, 249);
    doc.rect(0, (pageHeight - bottomBarHeight), pageWidth, bottomBarHeight, 'F');

    // questions table (do before the artwork image which should be on top
    doc.setFillColor(239, 247, 249);
    doc.roundedRect(questionsTableBaseX, questionsTableBaseY, (pageWidth / 2 - 20), 60, borderRadius, borderRadius, 'F');

    // images
    // use slow image compression after failing opening pdf on Chrome
    const imageSettings = [null, 'SLOW']
    const imageArtwork = await createImageOnTheFly('assets/img/pdf/artwork.png');
    const imageCoronacheck = await createImageOnTheFly('assets/img/pdf/coronacheck.png');
    const imageFoldInstructions = await createImageOnTheFly('assets/img/pdf/fold-instructions.png');
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
