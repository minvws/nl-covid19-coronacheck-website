/*eslint-disable */
import { jsPDF as JsPDF } from 'jspdf';
import dateTool from '@/tools/date';
import montserrat from '@/assets/fontAsBase64';
import { QRSizeInCm } from '@/data/constants'
import i18n from '@/i18n'
import store from '@/store'


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
const lineHeight = 5;
const marginQuestionsFrame = 4;
const questionsFrameHeight = 54;
const questionsFrameTop = (pageHeight / 2) - marginLeft - questionsFrameHeight;
const questionsFrameInnerLeft = rightPartLeft + marginQuestionsFrame;
const questionsFrameInnerWidth = partWidth - (2 * marginQuestionsFrame);

const regular = ['montserrat', 'normal', 400];
const bold = ['montserrat', 'normal', 700];

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
            text: i18n.t('pdf.' + territory + '.title'),
            fontWeight: 700,
            fontSize: 22,
            position: [leftPartLeft, leftPartTop],
            width: partWidth,
            textAlign: 'center',
            lineHeight: 10
        }, {
            //text: i18n.t('pdf.' + territory + '.intro'),
            text: [
                {
                    text: 'Reis je buiten Nederland? Gebruik dan dit EU digitaal coronacertificaat.\n\nBekijk voor vertrek welke test- of vaccinatie- bewijzen geldig zijn in het land dat je bezoekt:',
                    fontWeight: 400
                }, {
                    text: 'www.reopen.europa.eu/en',
                    fontWeight: 700,
                    color: [71, 142, 255]
                }
            ],
            fontWeight: 400,
            fontSize: 11,
            position: [leftPartLeft, 51],
            width: partWidth,
            textAlign: 'center'
        }, {
            text: i18n.t('pdf.instructions'),
            fontWeight: 700,
            fontSize: 18,
            position: [rightPartLeft, rightPartTop],
            width: partWidth
        }, {
            text: i18n.t('pdf.' + territory + '.' + type + '.instructions'),
            fontWeight: 400,
            fontSize: 11,
            position: [rightPartLeft, 27],
            width: partWidth
        }, {
            text: i18n.t('pdf.questions'),
            fontWeight: 700,
            fontSize: 11,
            position: [questionsFrameInnerLeft, (questionsFrameTop + marginQuestionsFrame + lineHeight)],
            width: questionsFrameInnerWidth
        }, {
            text: [
                {
                    text: 'Bekijk de meestgestelde vragen op CoronaCheck.nl of stuur een e-mail naar',
                    fontWeight: 400
                }, {
                    text: 'helpdesk@coronacheck.nl',
                    fontWeight: 700
                }, {
                    text: 'of bel naar',
                    fontWeight: 400
                }, {
                    text: '0800-1421',
                    fontWeight: 700
                }, {
                    text: '(gratis)',
                    fontWeight: 400
                }],
            fontWeight: 400,
            fontSize: 11,
            position: [questionsFrameInnerLeft, (questionsFrameTop + marginQuestionsFrame + (3 * lineHeight))],
            width: questionsFrameInnerWidth,
            lineHeight: lineHeight
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
        }
    ]
}

const getImageItems = async (type, territory, urlQR) => {
    const flag = await createImageOnTheFly('assets/img/pdf/flag-' + territory + '.png');
    const imageCoronacheck = await createImageOnTheFly('assets/img/pdf/coronacheck.png');
    const imageFoldInstructions = await createImageOnTheFly('assets/img/pdf/fold-instructions-v2.png');
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
    for (const textItem of textItems) {
        if (textItem.color) {
            doc.setTextColor(...textItem.color);
        } else {
            doc.setTextColor(0,0,0)
        }
        const textAlign = textItem.textAlign ? textItem.textAlign : 'left'
        // for center align jspdf needs to now the center x
        const x = (textItem.textAlign && textItem.width) ? textItem.position[0] + 0.5 * textItem.width : textItem.position[0];
        if (textItem.fontSize) {
            doc.setFontSize(textItem.fontSize);
        }
        if (textItem.fontWeight && textItem.fontWeight === 700) {
            doc.setFont(...bold);
        } else {
            doc.setFont(...regular);
        }
        if (textItem.width) {
            if (textItem.text instanceof Array) {
                drawTextItemWithMixedChunks(doc, textItem, x, textItem.position[1])
            } else {
                drawTextItemOverLines(doc, textItem, x, textAlign)
            }
        } else {
            doc.text(textItem.text, x, textItem.position[1], textAlign);
        }
    }
}

const drawTextItemWithMixedChunks = (doc, textItem, baseX, baseY) => {
    let addedX, addedY, currentAvailableWidth;
    const lh = textItem.lineHeight ? textItem.lineHeight : lineHeight;
    const spaceWidth = doc.getTextWidth(' ');
    const textAlign = textItem.textAlign;
    addedX = 0;
    addedY = 0;
    currentAvailableWidth = textItem.width;
    for (let chunk of textItem.text) {
        if (chunk.fontWeight && chunk.fontWeight === 700) {
            doc.setFont(...bold);
        } else {
            doc.setFont(...regular);
        }
        if (chunk.color) {
            doc.setTextColor(...chunk.color);
        } else {
            doc.setTextColor(0,0,0)
        }
        const text = chunk.text;
        if (doesTextFit(doc, text, currentAvailableWidth)) {
            // add manual space
            if (addedX > 0) {
                addedX += spaceWidth;
            }
            doc.text(text, (baseX + addedX), (baseY + addedY), textAlign);
            addedX += doc.getTextWidth(text)
            currentAvailableWidth = textItem.width - addedX;
        } else {
            if (hasSpaces(text)) {
                // fit first piece, goto newline
                const set = doc.splitTextToSize(chunk.text, currentAvailableWidth);
                // add manual space
                if (addedX > 0) {
                    addedX += spaceWidth;
                }
                doc.text(set[0], (baseX + addedX), (baseY + addedY), textAlign);
                addedX = 0;
                addedY += lh;
                // fill the rest
                set.shift();
                const remainingText = set.join(' ');
                const remainingSet = doc.splitTextToSize(remainingText, textItem.width);
                for (const item of remainingSet) {
                    const index = set.indexOf(item);
                    doc.text(item, (baseX + addedX), (baseY + addedY), textAlign);
                    if (index < set.length - 1) {
                        addedY += lh;
                    }
                }
                // leave x for next job
                const lastItem = remainingSet[remainingSet.length - 1];
                addedX = doc.getTextWidth(lastItem)
                currentAvailableWidth = textItem.width - addedX;
            } else {
                addedX = 0;
                addedY += lh;
                doc.text(text, (baseX + addedX), (baseY + addedY), textAlign);
                addedX += doc.getTextWidth(text)
                currentAvailableWidth = textItem.width - addedX;
            }

        }
    }
}

const hasSpaces = (text) => {
    return text.indexOf(' ') > -1;
}

const doesTextFit = (doc, text, availableWidth) => {
    const textWidth = doc.getTextWidth(text);
    return textWidth <= availableWidth;
}

const drawTextItemOverLines = (doc, textItem, x, textAlign) => {
    let index = 0;
    const set = doc.splitTextToSize(textItem.text, textItem.width);

    for (const item of set) {
        const lh = textItem.lineHeight ? textItem.lineHeight : lineHeight;
        doc.text(item, x, (textItem.position[1] + index * lh), textAlign);
        index++;
    }
}

const drawQuestionFrame = (doc) => {
    // questions table (do before the artwork image which should be on top
    doc.setFillColor(239, 247, 249);
    doc.roundedRect(rightPartLeft, questionsFrameTop, partWidth, questionsFrameHeight, 4, 4, 'F');
}

export const getDocument = async (pages, locale) => {
    const doc = initDoc();
    for (const page of pages) {
        if (pages.indexOf(page) > 0) {
            doc.addPage();
        }
        const textItems = getTextItems(page.type, page.territory, page.userData, locale);
        const imageItems = await getImageItems(page.type, page.territory, page.urlQR);
        drawQuestionFrame(doc);
        drawImageItems(doc, imageItems);
        drawLines(doc);
        drawTextItems(doc, textItems)
    }

    return doc;
}



/* eslint-enable */
