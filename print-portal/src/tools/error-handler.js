import store from '@/store';
import i18n from '@/i18n'

const hasInternetConnection = () => {
    return window.navigator.onLine;
}

const messageInternetConnection = () => {
    store.commit('modal/set', {
        messageHead: i18n.t('message.error.noInternet.head'),
        messageBody: i18n.t('message.error.noInternet.body'),
        closeButton: true
    });
}

const messageServerBusy = () => {
    store.commit('modal/set', {
        messageHead: i18n.t('message.error.serverBusy.head'),
        messageBody: i18n.t('message.error.serverBusy.body'),
        closeButton: true
    });
}

const messageGeneralWithError = (error) => {
    store.commit('modal/set', {
        messageHead: i18n.t('message.error.generalWithError.head'),
        messageBody: i18n.t('message.error.generalWithError.body', { code: error }),
        closeButton: true
    });
}

const messageGeneral = () => {
    store.commit('modal/set', {
        messageHead: i18n.t('message.error.general.head'),
        messageBody: i18n.t('message.error.general.body'),
        closeButton: true
    });
}

export const handleRejectionSigner = (error) => {
    if (!hasInternetConnection()) {
        messageInternetConnection();
        return;
    }
    if (error) {
        if (error.response && error.response.status && error.response.status === 429) {
            messageServerBusy();
        } else {
            store.commit('modal/set', {
                messageHead: i18n.t('message.error.signerFailed.head'),
                messageBody: i18n.t('message.error.signerFailed.body'),
                closeButton: true
            });
        }
    } else {
        messageGeneral();
    }
}

export const handleRejection = (error) => {
    if (!hasInternetConnection()) {
        messageInternetConnection();
        return;
    }
    if (error) {
        if (error.response && error.response.status && error.response.status === 429) {
            messageServerBusy();
        } else {
            messageGeneralWithError(error);
        }
    } else {
        messageGeneral();
    }
}
