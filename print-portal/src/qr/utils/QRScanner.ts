import QrScanner from 'qr-scanner'
import { getImagesFromPDFFile } from '@/qr/utils/PDFJsLib'
import i18n from '@/i18n';
import { decodeQRtoDCC } from '@/qr/utils/DCCDecoder'
import { FilterTypes } from '@/types/filter-types'

export const isEuropeanQR = (qr: string) => {
    const regex = new RegExp(/^HC[0-9A-Z]\:/);
    return regex.test(qr);
}

export const isDutchQR = (qr: string) => {
    const regex = new RegExp(/^NL[0-9A-Z]\:/);
    return regex.test(qr);
}

const LETTER_COMBINATION_LENGTH = 6

export const isValidLetterCombination = (code: string) => {
    const ex = `^[0-9A-Z]{${LETTER_COMBINATION_LENGTH}}$`
    const regex = new RegExp(ex);
    return regex.test(code);
}

export const isValidLetterCombinationLengthExceeded = (code: string) => {
    return code.length > LETTER_COMBINATION_LENGTH
}

export const isValidLetterCombinationLengthError = (code: string) => {
    if (isValidLetterCombinationLengthExceeded(code)) {
        return LETTER_COMBINATION_LENGTH
    }
    return undefined
}

export const isValidQR = (qr: string) => {
    return isEuropeanQR(qr)
}

const isOfType = (scan: string, filter: string) => {
    const { result: { events } } = decodeQRtoDCC(scan)
    const types : { type: string} [] | undefined = events;
    const match = !types?.find(({ type }) => type !== filter)
    return match
}
export const NO_QR_CODE_FOUND = `Scanner error: ${QrScanner.NO_QR_CODE_FOUND}`
export const ERROR_INVALID_QR = 'ERROR_INVALID_QR'

export const scanQR = async (input: string | File) => {
    const result = await QrScanner.scanImage(input, { returnDetailedScanResult: true })
    const scan = result?.data;
    if (!scan) return null
    if (!isValidQR(scan) || !isOfType(scan, FilterTypes.VACCINATION)) {
        return Promise.reject(ERROR_INVALID_QR)
    }
    return scan
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
        return Promise.reject(message)
    }
    return results
}

export default QrScanner
