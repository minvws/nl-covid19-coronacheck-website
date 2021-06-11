import { jsPDF as JsPDF } from 'jspdf';
import dateTool from '@/tools/date';
import montserrat from '@/assets/fontAsBase64';
import { QRSizeInCm } from '@/data/constants'
import i18n from '@/i18n'
import store from '@/store'

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
// const borderRadius = 6;

const createImageOnTheFly = async (src) => {
    return new Promise((resolve, reject) => {
        const img = document.createElement('img');
        img.onload = () => {
            resolve(img);
        }
        img.src = src;
    })
};

const getBirthDayString = (userData) => {
    let day, month;
    const exceptions = ['00', 'X', 'XX', 'x', 'xx'];
    if (userData.birthDay.length > 0) {
        if (exceptions.indexOf(userData.birthDay) === -1) {
            // design wants a leadig zero
            day = Number(userData.birthDay);
            if (day < 10) {
                day = '0' + day;
            }
        } else {
            // leave the exception as is
            day = this.userData.birthDay;
        }
    } else {
        // represent empty property with a dash
        day = '-';
    }
    if (userData.birthMonth.length > 0) {
        if (exceptions.indexOf(userData.birthMonth) === -1) {
            month = dateTool.monthNumberToMonthNameAbbr(Number(userData.birthMonth));
        } else {
            month = this.userData.birthDay;
        }
    } else {
        month = '-';
    }
    return day + ' ' + month;
}

const getValidUntil = (userData) => {
    const maxValidityHours = store.state.holderConfig.maxValidityHours
    return dateTool.addHoursToDate((userData.sampleTime * 1000), maxValidityHours, true);
}

export const getFileName = (userData) => {
    const holderString = userData.firstNameInitial + userData.lastNameInitial + getBirthDayString;
    const info = [
        dateTool.dateTimeToString((this.userData.sampleTime * 1000), 'yyyyMMdd'),
        'coronacheck',
        'testbewijs',
        holderString
    ];
    return info.join('_') + '.pdf';
}

const initDoc = () => {
    const settings = {
        orientation: 'p',
        format: 'a4'
    };
    const doc = new JsPDF(settings);
    doc.addFileToVFS('montserrat.ttf', montserrat.regular);
    doc.addFileToVFS('montserrat-bold.ttf', montserrat.bold);
    doc.addFont('montserrat.ttf', 'montserrat', 'normal')
    doc.addFont('montserrat-bold.ttf', 'montserrat', 'bold')
    doc.setFont('montserrat');
    return doc;
}

const getTextItems = (type, territory, userData, locale) => {
    return [
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
            text: userData.firstNameInitial + userData.lastNameInitial,
            fontWeight: 700,
            position: [tableBaseCol2X, tableBaseY]
        }, {
            text: i18n.t('pdf.dayOfBirth'),
            position: [pageMarginLeft, (tableBaseY + lineHeight)]
        }, {
            text: getBirthDayString(userData),
            fontWeight: 700,
            position: [tableBaseCol2X, (tableBaseY + lineHeight)]
        }, {
            text: i18n.t('pdf.testedAt'),
            position: [pageMarginLeft, (tableBaseY + 3 * lineHeight)]
        }, {
            text: dateTool.dateTimeToString((userData.sampleTime * 1000), 'dd-MM-yyyy HH:mm', locale),
            fontWeight: 700,
            position: [tableBaseCol2X, (tableBaseY + 3 * lineHeight)]
        }, {
            text: i18n.t('pdf.validUntil'),
            position: [pageMarginLeft, (tableBaseY + 4 * lineHeight)]
        }, {
            text: getValidUntil(userData),
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
}

const getImageItems = async (type, territory, urlQR) => {
    const imageCoronacheck = await createImageOnTheFly('assets/img/pdf/coronacheck.png');
    const imageFoldInstructions = await createImageOnTheFly('assets/img/pdf/fold-instructions.png');
    return [
        {
            url: urlQR,
            x: pageMarginLeft,
            y: qrCodeY,
            width: (QRSizeInCm * 10),
            height: (QRSizeInCm * 10)
        }, {
            url: imageCoronacheck,
            x: 10,
            y: (pageHeight - bottomBarHeight + 8),
            width: 70,
            height: 15
        }, {
            url: imageFoldInstructions,
            x: 65,
            y: (instructionsBaseY - 6),
            width: 35,
            height: 10
        }
    ]
}

const drawImageItems = (doc, imageItems) => {
    const imageSettings = [null, 'SLOW']
    for (const imageItem of imageItems) {
        doc.addImage(imageItem.url, 'PNG', imageItem.x, imageItem.y, imageItem.width, imageItem.height, ...imageSettings);
    }
}

const drawLines = (doc) => {
    doc.setDrawColor(224, 224, 223);
    doc.line(0, (pageHeight / 2), pageWidth, (pageHeight / 2));
    doc.line((pageWidth / 2), 0, (pageWidth / 2), pageHeight);
}

const drawTextItems = (doc, textItems) => {
    const regular = ['montserrat', 'normal', 400];
    const bold = ['montserrat', 'normal', 700];
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
}

export const getDocument = async (type, territory, userData, urlQR, locale) => {
    const doc = initDoc();
    const textItems = getTextItems(type, territory, userData, locale);
    const imageItems = await getImageItems(type, territory, urlQR);
    drawImageItems(doc, imageItems);
    drawLines(doc);
    drawTextItems(doc, textItems)
    return doc;
}

// questions table (do before the artwork image which should be on top
// doc.setFillColor(239, 247, 249);
// doc.roundedRect(questionsTableBaseX, questionsTableBaseY, (pageWidth / 2 - 20), 60, borderRadius, borderRadius, 'F');
