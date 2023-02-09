import * as pdfjsLib from 'pdfjs-dist'
import {
    PDFPageProxy,
    PDFDocumentProxy
} from 'pdfjs-dist/types/src/display/api'
/* eslint-disable-next-line */
pdfjsLib.GlobalWorkerOptions.workerSrc = require('!!file-loader!pdfjs-dist/build/pdf.worker.js').default

export const getImageDataFromPDFPage = async (
    page: PDFPageProxy
): Promise<string> => {
    const canvas = document.createElement('canvas')
    const canvasContext = canvas.getContext('2d')
    if (!canvasContext) return ''

    const viewport = page.getViewport({ scale: 2 })
    canvas.height = viewport.height
    canvas.width = viewport.width

    const task = page.render({
        canvasContext,
        viewport
    })
    await task.promise
    return canvas.toDataURL('image/jpeg')
}

export const getImagesFromPDF = async (
    pdf: PDFDocumentProxy
): Promise<string[]> => {
    const pages = []
    for (let page = 1; page <= pdf.numPages; page++) {
        pages.push(pdf.getPage(page).then((page) => getImageDataFromPDFPage(page)))
    }
    const images = await Promise.all(pages)
    return images
}

export const getImagesFromPDFFile = async (file: File): Promise<string[]> => {
    const url = URL.createObjectURL(file)
    const doc = await pdfjsLib.getDocument({ url }).promise
    return getImagesFromPDF(doc)
}
