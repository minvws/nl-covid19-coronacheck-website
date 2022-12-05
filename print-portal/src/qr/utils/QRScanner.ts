import QrScanner from 'qr-scanner'
import { getImagesFromPDFFile } from '@/qr/utils/PDFJsLib'
import { decodeQRtoDCC } from '@/qr/utils/DCCDecoder'
import { Event } from '@/qr/utils/HolderUtil'
import { FilterTypes } from '@/types/filter-types'
import {
    validateQR,
    VALIDATE_DCC_MISSING_HOLDER_NAMES,
    VALIDATE_DCC_INVALID_DCC,
    VALIDATE_DCC_BLOCKED_DCC,
    VALIDATE_DCC_FUZZY_MATCH_FAILED,
    VALIDATE_DCC_UNKNOWN_ERROR

} from '@/interfaces/validate-qr'

export const ERROR_PERMISSION_REJECTED = 'Camera not found.'
export const ERROR_QR_INVALID = 'ERROR_QR_INVALID'
export const ERROR_QR_INVALID_TYPE = 'ERROR_QR_INVALID_TYPE'
export const ERROR_QR_DOMESTIC = 'ERROR_QR_DOMESTIC'
export const ERROR_QR_DUPLICATE = 'ERROR_QR_DUPLICATE'
export const ERROR_QR_MISMATCH = 'ERROR_QR_MISMATCH'

export const isNoQRCodeFoundError = (error?: string) => {
    return error?.includes(QrScanner.NO_QR_CODE_FOUND) || false
}

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

export const isValidQR = (qr: string, events: Event[]) => {
    if (isDutchQR(qr)) {
        return Promise.reject(ERROR_QR_DOMESTIC)
    }
    if (!isEuropeanQR(qr)) {
        return Promise.reject(ERROR_QR_INVALID)
    }
    if (!isOfType(qr, FilterTypes.VACCINATION)) {
        return Promise.reject(ERROR_QR_INVALID_TYPE)
    }
    console.log({ events, la: decodeQRtoDCC(qr) })
    return validateQR(qr, events);
}

const getErrorPriority = (error: string) => {
    const QR_ERROR_ORDER = [
        VALIDATE_DCC_MISSING_HOLDER_NAMES,
        VALIDATE_DCC_INVALID_DCC,
        VALIDATE_DCC_BLOCKED_DCC,
        VALIDATE_DCC_FUZZY_MATCH_FAILED,
        VALIDATE_DCC_UNKNOWN_ERROR,
        ERROR_QR_MISMATCH,
        ERROR_QR_INVALID_TYPE,
        ERROR_QR_DOMESTIC,
        ERROR_QR_INVALID
    ]
    const index = QR_ERROR_ORDER.indexOf(error)
    if (index < 0) {
        if (isNoQRCodeFoundError(error)) return QR_ERROR_ORDER.length
        return QR_ERROR_ORDER.length + 1
    }
    return index
}

const sortErrorsOnPriority = (a: string, b: string) => {
    return getErrorPriority(a) - getErrorPriority(b)
}

const isOfType = (scan: string, filter: string) => {
    const { result: { events } } = decodeQRtoDCC(scan)
    const match = !events?.find(({ type }) => type !== filter)
    return match
}

export const scanQR = async (input: string | File, events: Event[]) => {
    const result = await QrScanner.scanImage(input, { returnDetailedScanResult: true })
    const qr = result?.data;
    if (!qr) return null
    await isValidQR(qr, events)
    return qr
}

export const getQRFromPDFile = async (file: File, events: Event[]) => {
    const images = await getImagesFromPDFFile(file)
    const scans = await Promise.allSettled(
        images.map((src) => scanQR(src, events))
    )
    const results = scans.reduce((cul, scan, i) => {
        const { value: result } = scan as { value: string }
        if (result) cul.push({ result, src: images[i] })
        return cul
    }, [] as { result: string, src: string} [])

    if (!results.length) {
        // no QR found, throw the error with highes priotity to show
        const errors = (scans as { reason: string }[])
            .filter(({ reason }) => reason)
            .map(({ reason }) => reason)
            .sort(sortErrorsOnPriority)
        return Promise.reject(errors[0])
    }
    return results
}

export default QrScanner
