import store from '@/store';
import router from '@/router';
import i18n from '@/i18n'

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
    if (error & error.response && error.response.status && error.response.status === 429) {
        router.push({ name: 'ServerBusy' });
    } else {
        router.push({ name: 'ErrorGeneral', query: { error: getErrorCode(error, errorCodeInformation) } });
    }
}

export const getErrorCode = (error, errorCodeInformation) => {
    console.dir(error);
    console.log(errorCodeInformation);
    const flow = getFlowCode(errorCodeInformation.flow);
    const errorCode = (error.response && error.response.status) ? error.response && error.response.status : '-';
    const errorBody = (error.response && error.response.data) ? error.response.data : '-';
    // W stands for web (as i stands for iOS and A stands for Android
    return 'W' +
        flow + errorCodeInformation.step + ' ' +
        errorCodeInformation.provider_identifier + ' ' +
        errorCode + ' ' +
        errorBody;
}

const getFlowCode = (flow) => {
    switch (flow) {
    case 'onboarding':
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
    }
}
