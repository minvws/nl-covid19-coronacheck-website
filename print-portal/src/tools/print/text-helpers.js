import { lineHeight } from './content';

export const regular = ['montserrat', 'normal', 400];
export const bold = ['montserrat', 'normal', 700];
const parser = new DOMParser();

export const drawTextItemOverLines = (doc, textItem, x, textAlign) => {
    let index = 0;
    const set = doc.splitTextToSize(textItem.text, textItem.width);

    for (const item of set) {
        const lh = textItem.lineHeight ? textItem.lineHeight : lineHeight;
        doc.text(item, x, (textItem.position[1] + index * lh), textAlign);
        index++;
    }
}

export const drawTextItemWithMixedChunks = (doc, chunks, textItem, baseX, baseY) => {
    let addedX, addedY, currentAvailableWidth;
    const lh = textItem.lineHeight ? textItem.lineHeight : lineHeight;
    const spaceWidth = doc.getTextWidth(' ');
    const textAlign = textItem.textAlign;
    addedX = 0;
    addedY = 0;
    currentAvailableWidth = textItem.width;

    const lineBreak = () => {
        addedX = 0;
        addedY += lh;
        currentAvailableWidth = textItem.width;
    }

    for (const chunk of chunks) {
        if (chunk.break) {
            lineBreak();
        } else {
            // font weight 700 for bold
            if (chunk.fontWeight && chunk.fontWeight === 700) {
                doc.setFont(...bold);
            } else {
                doc.setFont(...regular);
            }
            if (chunk.color) {
                doc.setTextColor(...chunk.color);
            } else {
                doc.setTextColor(0, 0, 0)
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
                    lineBreak();
                    // fill the rest
                    set.shift();
                    const remainingText = set.join(' ');
                    const remainingSet = doc.splitTextToSize(remainingText, textItem.width);
                    for (const item of remainingSet) {
                        const index = remainingSet.indexOf(item);
                        doc.text(item, (baseX + addedX), (baseY + addedY), textAlign);
                        if (index < remainingSet.length - 1) {
                            addedY += lh;
                        }
                    }
                    // leave x for next job
                    const lastItem = remainingSet[remainingSet.length - 1];
                    addedX = doc.getTextWidth(lastItem)
                    currentAvailableWidth = textItem.width - addedX;
                } else {
                    lineBreak();
                    doc.text(text, (baseX + addedX), (baseY + addedY), textAlign);
                    addedX += doc.getTextWidth(text)
                    currentAvailableWidth = textItem.width - addedX;
                }
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

export const htmlToChunks = (text) => {
    const chunks = [];
    // parse the html string
    const html = parser.parseFromString(text, 'text/html');
    // find the children on the body node, these are the chunks
    const nodes = html.querySelector('body').childNodes
    for (const node of nodes) {
        const chunk = {};
        if (node.nodeType === 3) {
            chunk.text = node.nodeValue.trim();
        } else {
            // we assume no deeper nesting, the text is direct on the first (and only) childNode
            switch (node.tagName.toLowerCase()) {
            case 'b':
                chunk.fontWeight = 700;
                chunk.text = node.childNodes[0].nodeValue.trim();
                break;
            case 'a':
                chunk.color = [71, 142, 255];
                chunk.text = node.childNodes[0].nodeValue.trim();
                break;
            case 'br':
                chunk.break = true
                break;
            }
        }
        chunks.push(chunk);
    }
    return chunks;
}
