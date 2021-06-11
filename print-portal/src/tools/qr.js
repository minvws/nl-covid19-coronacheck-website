import QRCode from 'qrcode';
import { QRSizeInCm, cmToInch } from '@/data/constants'

export const generateQR = (qrCode) => {
    const dpi = 300;
    const sizeInPixels = Math.round(QRSizeInCm * cmToInch * dpi);
    const qrOptions = {
        width: sizeInPixels,
        height: sizeInPixels,
        margin: 0,
        errorCorrectionLevel: 'L'
    };
    return new Promise((resolve, reject) => {
        QRCode.toDataURL(qrCode, qrOptions)
            .then(url => {
                resolve(url);
            })
            .catch(error => {
                reject(error);
            })
    })
}
