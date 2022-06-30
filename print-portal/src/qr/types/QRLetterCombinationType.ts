import { QRData } from '../mixins/qr-mixin'
import { DCCResult } from '@/qr/utils/DCCDecoder'

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
    credential?: string,
    dcc?: DCCResult,
    validate?: boolean
}
