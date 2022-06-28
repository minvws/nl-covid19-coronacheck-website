import { QRData } from '../mixins/qr-mixin'

export enum LetterCombinationStatus {
    ACCEPTED = 'accepted',
    REJECTED = 'rejected',
    BLOCKED = 'blocked',
    EXPIRED = 'expired'
}

export type LetterCombination = {
    code?: string,
    result?: string,
    qrData?: QRData,
    couplingCode?: string,
    credential?: string
}
