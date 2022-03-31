import QrScanner from 'qr-scanner'
import { getImagesFromPDFFile } from '@/qr/utils/PDFJsLib'
import i18n from '@/i18n';

export const isEuropeanQR = (qr: string) => {
    const regex = new RegExp(/^HC[0-9A-Z]\:/);
    return regex.test(qr);
}

export const isDutchQR = (qr: string) => {
    const regex = new RegExp(/^NL[0-9A-Z]\:/);
    return regex.test(qr);
}

export const isValidLetterCombination = (code: string) => {
    const regex = new RegExp(/^[0-9A-Z]{6}$/);
    return regex.test(code);
}

export const isValidQR = (qr: string) => {
    return isEuropeanQR(qr)
}
export const NO_QR_CODE_FOUND = `Scanner error: ${QrScanner.NO_QR_CODE_FOUND}`

export const scanQR = async (input: any) => { // @TODO: fix type
    const result = await QrScanner.scanImage(input)
    if (!result) return null
    if (!isValidQR(result)) {
        throw new Error(i18n.t('qr.error.invalidQR') as string);
    }
    return result
}

export const getQRFromPDFile = async (file: File) => {
    const images = await getImagesFromPDFFile(file)
    const scans = await Promise.allSettled(
        images.map((src) => scanQR(src))
    )
    const results = scans.reduce((cul, scan, i) => {
        const { value: result } = scan as { value: string }
        if (result) cul.push({ result, src: images[i] })
        return cul
    }, [] as { result: string, src: string} [])
    if (!results.length) {
        // no QR found, throw first error
        const message = (scans as { reason: string }[]).find(({ reason }) => reason)?.reason
        throw new Error(message);
    }
    return results
}

export default QrScanner
