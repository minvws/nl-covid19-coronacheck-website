import { ClientCode } from '@/data/constants/error-codes'

function b64DecodeUnicode(str) {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

export const cmsDecode = (encoded) => {
    const decoded = b64DecodeUnicode(encoded)
    try {
        return JSON.parse(decoded);
    } catch {
        throw new Error(ClientCode.DATA_VALIDATION.MALFORMATED_JSON)
    }
}
