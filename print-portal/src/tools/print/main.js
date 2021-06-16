/*eslint-disable */

import { jsPDF as JsPDF } from 'jspdf';
import dateTool from '@/tools/date';
import montserrat from '@/assets/fontAsBase64';
import { getTextItems, getImageItems, getFrames, getLines } from './content';
import { drawTextItemOverLines, drawTextItemWithMixedChunks, htmlToChunks, regular, bold } from './text-helpers'

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

// const getValidUntil = (userData) => {
//     const maxValidityHours = store.state.holderConfig.maxValidityHours
//     return dateTool.addHoursToDate((userData.sampleTime * 1000), maxValidityHours, true);
// }

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

const drawImageItems = (doc, imageItems) => {
    const imageSettings = [null, 'SLOW']
    for (const imageItem of imageItems) {
        doc.addImage(imageItem.url, 'PNG', imageItem.x, imageItem.y, imageItem.width, imageItem.height, ...imageSettings);
    }
}

const drawLines = (doc, lines) => {
    for (const line of lines) {
        doc.setDrawColor(...line.color);
        doc.line(line.x1, line.y1, line.x2, line.y2);
    }
}

const drawTextItems = (doc, textItems) => {
    for (const textItem of textItems) {
        if (textItem.color) {
            doc.setTextColor(...textItem.color);
        } else {
            doc.setTextColor(0, 0, 0)
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
            if (textItem.hasHTML) {
                const text = htmlToChunks(textItem.text);
                drawTextItemWithMixedChunks(doc, text, textItem, x, textItem.position[1])
            } else {
                drawTextItemOverLines(doc, textItem, x, textAlign)
            }
        } else {
            doc.text(textItem.text, x, textItem.position[1], textAlign);
        }
    }
}

const drawFrames = (doc, frames) => {
    for (const frame of frames) {
        doc.setFillColor(...frame.color);
        doc.roundedRect(frame.x, frame.y, frame.width, frame.height, frame.rx, frame.ry, 'F');
    }
}

export const getDocument = async (pages, locale) => {
    const doc = initDoc();
    for (const page of pages) {
        if (pages.indexOf(page) > 0) {
            doc.addPage();
        }
        const frames = getFrames();
        const textItems = getTextItems(page.type, page.territory, page.qr, locale);
        const lines = getLines();
        const imageItems = await getImageItems(page.type, page.territory, page.urlQR);
        drawFrames(doc, frames);
        drawImageItems(doc, imageItems);
        drawLines(doc, lines);
        drawTextItems(doc, textItems)
    }
    return doc;
}
/* eslint-enable */