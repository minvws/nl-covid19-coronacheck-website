import i18n from '@/i18n'
import { QRSizeInCm } from '@/data/constants'

const pageHeight = 297;
const pageWidth = 210;
const marginLeft = 10;
const marginLeftIntro = 20;
// jspdf uses the baseline of a text for an y position
const marginTop = 16;
const leftPartLeft = marginLeft;
const leftPartTop = 30;
const rightPartLeft = 0.5 * pageWidth + marginLeft;
const rightPartTop = marginTop;
const partWidth = 0.5 * pageWidth - (2 * marginLeft)
const partWidthIntro = 0.5 * pageWidth - (2 * marginLeftIntro)
const bottomPartTop = 0.5 * pageHeight + marginTop;
const marginQuestionsFrame = 4;
const questionsFrameHeight = 54;
const questionsFrameTop = (pageHeight / 2) - marginLeft - questionsFrameHeight;
const questionsFrameInnerLeft = rightPartLeft + marginQuestionsFrame;
const questionsFrameInnerWidth = partWidth - (2 * marginQuestionsFrame);
const fontSizeStandard = 9.5;
const QrPositionY = 178;
export const lineHeight = 4.5;

const createImage = async (src) => {
    return new Promise((resolve, reject) => {
        const img = document.createElement('img');
        img.onload = () => {
            resolve(img);
        }
        img.src = src;
    })
};

export const getTextItems = (type, territory, qr, locale) => {
    return [
        {
            text: i18n.t('pdf.' + territory + '.title'),
            fontWeight: 700,
            fontSize: 22,
            position: [leftPartLeft, leftPartTop],
            width: partWidth,
            textAlign: 'center',
            lineHeight: 9
        }, {
            text: i18n.t('pdf.' + territory + '.intro'),
            fontWeight: 400,
            fontSize: fontSizeStandard,
            position: [marginLeftIntro, 51],
            width: partWidthIntro,
            textAlign: 'center',
            hasHTML: true
        }, {
            text: i18n.t('pdf.instructions'),
            fontWeight: 700,
            fontSize: 18,
            position: [rightPartLeft, rightPartTop],
            width: partWidth
        }, {
            text: territory === 'nl' ? i18n.t('pdf.nl.instructions') : i18n.t('pdf.eu.' + type + '.instructions'),
            fontWeight: 400,
            fontSize: fontSizeStandard,
            position: [rightPartLeft, 27],
            width: partWidth
        }, {
            text: i18n.t('pdf.questions'),
            fontWeight: 700,
            fontSize: fontSizeStandard,
            position: [questionsFrameInnerLeft, (questionsFrameTop + marginQuestionsFrame + lineHeight)],
            width: questionsFrameInnerWidth
        }, {
            text: i18n.t('pdf.questionsContent'),
            fontWeight: 400,
            fontSize: fontSizeStandard,
            position: [questionsFrameInnerLeft, (questionsFrameTop + marginQuestionsFrame + (3 * lineHeight))],
            width: questionsFrameInnerWidth,
            lineHeight: lineHeight,
            hasHTML: true
        }, {
            text: i18n.t('pdf.' + territory + '.qrTitle'),
            fontWeight: 700,
            fontSize: 18,
            position: [leftPartLeft, bottomPartTop],
            width: partWidth,
            textAlign: 'center'
        }, {
            text: territory === 'nl' ? i18n.t('pdf.nl.propertiesLabel') : i18n.t('pdf.eu.' + type + '.propertiesLabel'),
            fontWeight: 700,
            fontSize: 18,
            position: [rightPartLeft, bottomPartTop],
            width: partWidth
        }, {
            text: getUserDetails(qr, territory, type),
            fontWeight: 400,
            fontSize: fontSizeStandard,
            position: [rightPartLeft, QrPositionY + (0.7 * lineHeight)],
            width: partWidth,
            hasHTML: true
        }
    ]
}

const getUserDetails = (qr, territory, type) => {
    let string = '';
    if (territory === 'nl') {
        string += i18n.t('pdf.nl.userData.initials') + ':<b>' + qr.initials + '</b><br>';
        string += i18n.t('pdf.nl.userData.dateOfBirth') + ':<b>' + qr.birthDateStringShort + '</b><br>';
        string += i18n.t('pdf.nl.userData.validFrom') + ':<b>' + qr.validFrom + '</b><br>';
        string += i18n.t('pdf.nl.userData.validUntil') + ':<b>' + qr.validUntil + '</b><br><br>';
        string += i18n.t('pdf.nl.userData.privacyNote');
        return string;
    } else {
        if (type === 'vaccination') {
            string += 'Surname(s) and first name(s):<b>' + qr.fullName + '</b><br>';
            string += 'Date of birth:<b>' + qr.birthDateString + '</b><br><br>';
            string += 'Disease targeted:<b>COVID-19</b><br>';
            string += 'Vaccine:<b>' + qr.vaccineBrand + '</b><br>';
            string += 'Vaccine medicinal product:<b>' + qr.vaccineType + '</b><br>';
            string += 'Vaccine manufacturer:<b>' + qr.vaccineManufacturer + '</b><br>';
            string += 'Vaccination doses:<b>' + qr.doseNumber + ' out of ' + qr.totalDoses + '</b><br>';
            string += 'Vaccination date:<b>' + qr.vaccinationDate + '</b><br>';
            string += 'Vaccinated in:<b>' + qr.vaccinationCountry + '</b><br>';
            string += 'Certificate issuer:<b>' + qr.certificateIssuer + '</b><br>';
            string += 'Certificate identifier:<b>' + qr.certificateIdentifier + '</b><br><br>';
            string += 'Valid from:<b>' + qr.validFrom + '</b><br><br>';
            return string
        } else {
            return 'UserData EU negative test (todo)';
        }
    }
}

export const getImageItems = async (type, territory, urlQR) => {
    const flag = await createImage('assets/img/pdf/flag-' + territory + '.png');
    const imageCoronacheck = await createImage('assets/img/pdf/coronacheck.png');
    const imageFoldInstructions = await createImage('assets/img/pdf/fold-instructions-v2.png');
    const QRSize = QRSizeInCm * 10;
    const coronacheckImageHeight = 10;
    const flagWidth = 63;
    const flagHeight = 42
    return [
        {
            url: flag,
            x: ((pageWidth / 2) - flagWidth) / 2,
            y: 87,
            width: flagWidth,
            height: flagHeight
        }, {
            url: urlQR,
            x: ((pageWidth / 2) - QRSize) / 2,
            y: QrPositionY,
            width: QRSize,
            height: QRSize
        }, {
            url: imageCoronacheck,
            x: questionsFrameInnerLeft,
            y: questionsFrameTop + questionsFrameHeight - coronacheckImageHeight - marginQuestionsFrame,
            width: 47,
            height: coronacheckImageHeight
        }, {
            url: imageFoldInstructions,
            x: 165,
            y: 6,
            width: 40,
            height: 15
        }
    ]
}

export const getFrames = () => {
    return [{
        color: [239, 247, 249],
        x: rightPartLeft,
        y: questionsFrameTop,
        width: partWidth,
        height: questionsFrameHeight,
        rx: 4,
        ry: 4
    }]
}

export const getLines = () => {
    return [{
        color: [29, 29, 29],
        x1: 0,
        y1: pageHeight / 2,
        x2: pageWidth,
        y2: pageHeight / 2
    }, {
        color: [224, 224, 223],
        x1: pageWidth / 2,
        y1: 0,
        x2: pageWidth / 2,
        y2: pageHeight
    }]
}
