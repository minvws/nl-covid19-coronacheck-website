import { CameraFacingMode } from '@/qr/types/QRScannerDataType'
import QrScanner from 'qr-scanner'
import i18n from '@/i18n';

export type QrScannerExtend<T> = Partial<T> & {
  _getCameraStream: () => Promise<{
    stream: MediaStream
    facingMode: CameraFacingMode
  }>
}
export const isEuropeanQR = (qr: string) => {
    const regex = new RegExp(/^HC[0-9A-Z]\:/);
    return regex.test(qr);
}

export const isDutchQR = (qr: string) => {
    const regex = new RegExp(/^NL[0-9A-Z]\:/);
    return regex.test(qr);
}

export const isValidQR = (qr: string) => {
    return isDutchQR(qr) || isEuropeanQR(qr)
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

export default QrScanner
