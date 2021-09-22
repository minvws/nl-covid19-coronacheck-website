import store from '@/store';
import router from '@/router';
import i18n from '@/i18n'
import { cmsDecode } from './cms';

export const hasInternetConnection = () => {
    return window.navigator.onLine;
}

export const messageInternetConnection = () => {
    store.commit('modal/set', {
        messageHead: i18n.t('message.error.noInternet.head'),
        messageBody: i18n.t('message.error.noInternet.body'),
        closeButton: true
    });
}

export const handleRejection = (error, errorCodeInformation) => {
    if (!hasInternetConnection()) {
        messageInternetConnection();
        return;
    }
    if (error.code === 'ECONNABORTED') {
        errorCodeInformation.clientSideCode = '001';
        router.push({ name: 'ErrorTimeout', query: { error: getErrorCode(error, errorCodeInformation) } });
        return;
    }
    if (error && error.response && error.response.status && error.response.status === 429) {
        router.push({ name: 'ServerBusy', query: { error: getErrorCode(error, errorCodeInformation) } });
    } else {
        if (isDigiDFlowAndStep(errorCodeInformation)) {
            router.push({ name: 'ErrorDigiD', query: { error: getErrorCode(error, errorCodeInformation) } });
        } else {
            router.push({ name: 'ErrorGeneral', query: { errors: getErrorCode(error, errorCodeInformation) } });
        }
    }
}

export const getErrorCode = (error, errorCodeInformation) => {
    let errorCode, errorBody;
    const flow = getFlowCode(errorCodeInformation.flow);
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
    // W stands for web (as i stands for iOS and A stands for Android
    return 'W ' +
        flow + errorCodeInformation.step + ' ' +
        errorCodeInformation.provider_identifier + ' ' +
        errorCode + ' ' +
        errorBody;
}

const isDigiDFlowAndStep = (errorCodeInformation) => {
    const flowCode = getFlowCode(errorCodeInformation.flow);
    return errorCodeInformation.step === '10' && (flowCode === '2' || flowCode === '3' || flowCode === '4');
}

const getFlowCode = (flow) => {
    switch (flow) {
    case 'onboarding':
    case 'startup':
        return '0';
    case 'commercial_test':
        return '1';
    case 'vaccination':
        return '2';
    case 'positivetest,recovery':
    case 'positivetest':
    case 'recovery':
        return '3'
    case 'negativetest':
        return '4'
    default:
        return '-1'
    }
}
