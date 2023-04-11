import axios, { AxiosError } from 'axios';
import { timeoutTime as timeout } from '@/data/constants'
import { Event } from '@/qr/utils/HolderUtil';

export const VALIDATE_DCC_FUZZY_MATCH_FAILED = 'VALIDATE_DCC_FUZZY_MATCH_FAILED';
export const VALIDATE_DCC_MISSING_HOLDER_NAMES = 'VALIDATE_DCC_MISSING_HOLDER_NAMES';
export const VALIDATE_DCC_INVALID_DCC = 'VALIDATE_DCC_INVALID_DCC';
export const VALIDATE_DCC_BLOCKED_DCC = 'VALIDATE_DCC_BLOCKED_DCC';
export const VALIDATE_DCC_DIFFERENT_INITIALS = 'VALIDATE_DCC_DIFFERENT_INITIALS';
export const VALIDATE_DCC_UNKNOWN_ERROR = 'VALIDATE_DCC_UNKNOWN_ERROR';

export const QrValidationCodes: Record<string, number> = {
    [VALIDATE_DCC_MISSING_HOLDER_NAMES]: 99792,
    [VALIDATE_DCC_INVALID_DCC]: 99793,
    [VALIDATE_DCC_BLOCKED_DCC]: 99794,
    [VALIDATE_DCC_FUZZY_MATCH_FAILED]: 99795,
    [VALIDATE_DCC_DIFFERENT_INITIALS]: 99796
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
        const error = e as AxiosError & any;
        const code = error?.response?.data?.code
        const codes = Object.keys(QrValidationCodes).map((key) => ([QrValidationCodes[key], key]))
        const response = codes.find(([value]) => value === code)?.[1]
        return Promise.reject(response || VALIDATE_DCC_UNKNOWN_ERROR)
    }
}
