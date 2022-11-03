import axios, { AxiosError } from 'axios';
import { timeoutTime as timeout } from '@/data/constants'
import { ERROR_QR_MISMATCH } from '@/qr/utils/QRScanner';
import { Event } from '@/qr/utils/HolderUtil';

enum ValidationCodes {
    VALIDATE_DCC_MISSING_HOLDER_NAMES = 99792,
    VALIDATE_DCC_INVALID_DCC = 99793,
    VALIDATE_DCC_BLOCKED_DCC = 99794,
    VALIDATE_DCC_FUZZY_MATCH_FAILED = 99795,
    VALIDATE_DCC_UNKNOWN = -1
}

export const validateQR = async (credential: string, events: Event[]) => {
    const holderNames = events.map(({ holder: { firstName, infix, lastName } }) => ({ firstName, infix, lastName }))
    try {
        await axios({
            method: 'post',
            url: `${window.config.api}/holder/validate_dcc`,
            data: { holderNames, credential },
            timeout
        })
        return Promise.resolve(true);
    } catch (e) {
        const error = e as AxiosError;
        const code = error?.response?.data?.code
        const response = ValidationCodes[code] ?? ValidationCodes.VALIDATE_DCC_UNKNOWN;
        return Promise.reject(response)
    }
}
