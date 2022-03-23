import { CameraFacingMode } from '@/qr/types/QRScannerDataType'
import QrScanner from 'qr-scanner'

export type QrScannerExtend<T> = Partial<T> & {
  _getCameraStream: () => Promise<{
    stream: MediaStream
    facingMode: CameraFacingMode
  }>
}

export const NO_QR_CODE_FOUND = QrScanner.NO_QR_CODE_FOUND
export default QrScanner
