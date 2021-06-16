import i18n from '@/i18n'
import { QRSizeInCm } from '@/data/constants'

const pageHeight = 297;
const pageWidth = 210;
const marginLeft = 10;
// jspdf uses the baseline of a text for an y position
const marginTop = 16;
const leftPartLeft = marginLeft;
const leftPartTop = 30;
const rightPartLeft = 0.5 * pageWidth + marginLeft;
const rightPartTop = marginTop;
const partWidth = 0.5 * pageWidth - (2 * marginLeft)
const bottomPartTop = 0.5 * pageHeight + marginTop;
const marginQuestionsFrame = 4;
const questionsFrameHeight = 54;
const questionsFrameTop = (pageHeight / 2) - marginLeft - questionsFrameHeight;
const questionsFrameInnerLeft = rightPartLeft + marginQuestionsFrame;
const questionsFrameInnerWidth = partWidth - (2 * marginQuestionsFrame);
export const lineHeight = 5;

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
            lineHeight: 10
        }, {
            text: i18n.t('pdf.' + territory + '.intro'),
            fontWeight: 400,
            fontSize: 10,
            position: [leftPartLeft, 51],
            width: partWidth,
            textAlign: 'center',
            hasHTML: true
        }, {
            text: i18n.t('pdf.instructions'),
            fontWeight: 700,
            fontSize: 18,
            position: [rightPartLeft, rightPartTop],
            width: partWidth
        }, {
            text: i18n.t('pdf.' + territory + '.' + type + '.instructions'),
            fontWeight: 400,
            fontSize: 10,
            position: [rightPartLeft, 27],
            width: partWidth
        }, {
            text: i18n.t('pdf.questions'),
            fontWeight: 700,
            fontSize: 10,
            position: [questionsFrameInnerLeft, (questionsFrameTop + marginQuestionsFrame + lineHeight)],
            width: questionsFrameInnerWidth
        }, {
            text: i18n.t('pdf.questionsContent'),
            fontWeight: 400,
            fontSize: 10,
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
            text: i18n.t('pdf.' + territory + '.' + type + '.propertiesLabel'),
            fontWeight: 700,
            fontSize: 18,
            position: [rightPartLeft, bottomPartTop],
            width: partWidth
        }, {
            text: getUserDetails(qr, territory, type),
            fontWeight: 400,
            fontSize: 10,
            position: [rightPartLeft, bottomPartTop + 10],
            width: partWidth,
            hasHTML: true
        }
    ]
}

const getUserDetails = (qr, territory, type) => {
    let string = '';
    if (territory === 'nl') {
        string += '<b>' + i18n.t('pdf.nl.userData.initials') + ':</b>' + qr.initials + '<br>';
        string += '<b>' + i18n.t('pdf.nl.userData.dateOfBirth') + ':</b>' + qr.birthDateStringShort + '<br>';
        string += '<b>' + i18n.t('pdf.nl.userData.validFrom') + ':</b>' + qr.validFrom + '<br>';
        string += '<b>' + i18n.t('pdf.nl.userData.validUntil') + ':</b>' + qr.validUntil + '<br><br>';
        string += i18n.t('pdf.nl.userData.privacyNote');
        return string;
    } else {
        if (type === 'vaccination') {
            string += '<b>' + i18n.t('pdf.nl.userData.initials') + ':</b>' + qr.initials + '<br>';
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
            y: 178,
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
        color: [224, 224, 223],
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
