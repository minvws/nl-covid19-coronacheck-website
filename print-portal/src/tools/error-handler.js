import store from '@/store';
import router from '@/router';
import i18n from '@/i18n'
import { cmsDecode } from './cms';
import { getResponseStatusCode, getClientSideErrorCode, errorCodeTransformer, isDigiDSamlError, isDigiDFlowAndStepError } from '@/data/constants/error-codes';

export const hasInternetConnection = () => {
    return window.navigator.onLine;
}

export const messageInternetConnection = (callback) => {
    store.commit('modal/set', {
        messageHead: i18n.t('message.error.noInternet.head'),
        messageBody: i18n.t('message.error.noInternet.body'),
        closeButton: false,
        confirm: true,
        confirmAction: callback,
        confirmYes: i18n.t('tryAgain'),
        confirmNo: i18n.t('close')
    });
}

export const handleRejection = (error, errorCodeInformation, callback) => {
    if (!hasInternetConnection()) {
        messageInternetConnection(callback);
        return;
    }
    const errorCodes = getErrorCode(error, errorCodeInformation);

    if (error.code === 'ECONNABORTED') {
        errorCodeInformation.clientSideCode = getClientSideErrorCode(error.code)
        router.push({ name: 'ErrorTimeout', query: { error: errorCodes } });
        return;
    }
    if (error?.response?.status === 429) {
        router.push({ name: 'ServerBusy', query: { error: errorCodes } });
    } else {
        if (isDigiDSamlError(error?.message)) {
            router.replace({ name: 'ErrorCodeSaml' });
        } else if (error?.response?.data?.code === 99552) {
            router.replace({ name: 'ErrorCode99552', query: { errors: errorCodes } });
        } else if (isDigiDFlowAndStepError(errorCodeInformation)) {
            router.push({ name: 'ErrorDigiD', query: { error: errorCodes } });
        } else {
            router.push({ name: 'ErrorGeneral', query: { errors: errorCodes } });
        }
    }
}
export const getErrorCode = (error, errorCodeInformation) => {
    const responseMessage = error?.message
    const responseCode = error?.code
    const status = error?.response?.status
    const statusCode = typeof status === 'number' ? status : ''
    const code = error?.response?.data?.code
    const encoded = error?.response?.data?.payload
    const clientBody = errorCodeInformation?.errorBody
    const clientResponseCode = getResponseStatusCode(clientBody) || responseMessage
    const axiosCode = error?.isAxiosError ? getClientSideErrorCode(responseCode ?? responseMessage) : ''

    let cmsCode = null
    if (encoded) {
        try {
            const cmsDecoded = cmsDecode(encoded)
            cmsCode = cmsDecoded.code;
        } catch (e) {
            cmsCode = e.message
        }
    }

    const {
        provider_identifier: provider,
        flow,
        step
    } = errorCodeInformation

    const errorCode = cmsCode || statusCode
    const errorBody = code || clientResponseCode || axiosCode
    return errorCodeTransformer({
        flow,
        step,
        provider,
        errorCode,
        errorBody
    })
}
