import store from '@/store';
import router from '@/router';
import i18n from '@/i18n'
import { cmsDecode } from './cms';
import { getClientSideErrorCode, errorCodeTransformer, isDigiDFlowAndStepError } from '@/data/constants/error-codes';

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
        if (error?.response?.data?.code === 99552) {
            router.replace({ name: 'ErrorCode99552', query: { errors: errorCodes } });
        } else if (isDigiDFlowAndStepError(errorCodeInformation)) {
            router.push({ name: 'ErrorDigiD', query: { error: errorCodes } });
        } else {
            router.push({ name: 'ErrorGeneral', query: { errors: errorCodes } });
        }
    }
}

export const getErrorCode = (error, errorCodeInformation) => {
    let errorCode, errorBody;
    if (errorCodeInformation.clientSideCode) {
        errorCode = errorCodeInformation.clientSideCode;
    } else {
        errorCode = (error.response && error.response.status) ? error.response && error.response.status : '';
    }
    if (errorCodeInformation.errorBody) {
        errorBody = errorCodeInformation.errorBody;
    } else {
        if (error.response && error.response.data) {
            try {
                const cmsDecoded = cmsDecode(error.response.data.payload)
                if (cmsDecoded.code) {
                    errorBody = cmsDecoded.code;
                } else {
                    errorBody = '';
                }
            } catch (e) {
                if (error.response.data.code) {
                    errorBody = error.response.data.code;
                } else {
                    errorBody = '';
                }
            }
        } else {
            errorBody = '';
        }
    }

    // client side error
    if (error?.isAxiosError) {
        if (!errorCode) errorCode = getClientSideErrorCode(error?.code ?? error?.message)
        if (!errorBody) errorBody = error?.message ?? ''
    }

    const {
        provider_identifier: provider,
        flow,
        step
    } = errorCodeInformation

    return errorCodeTransformer({
        flow,
        step,
        provider,
        errorCode,
        errorBody
    })
}
