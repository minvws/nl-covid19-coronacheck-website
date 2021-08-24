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

export const handleRejectionSigner = (error) => {
    if (!hasInternetConnection()) {
        messageInternetConnection();
        return;
    }
    if (error) {
        if (error.response && error.response.status && error.response.status === 429) {
            router.push({ name: 'ServerBusy' });
        } else {
            store.commit('modal/set', {
                messageHead: i18n.t('message.error.signerFailed.head'),
                messageBody: i18n.t('message.error.signerFailed.body'),
                closeButton: true
            });
        }
    } else {
        router.push({ name: 'ErrorGeneral' });
    }
}

export const handleRejection = (error) => {
    if (!hasInternetConnection()) {
        messageInternetConnection();
        return;
    }
    if (error) {
        if (error.response && error.response.status && error.response.status === 429) {
            router.push({ name: 'ServerBusy' });
        } else {
            router.push({ name: 'ErrorGeneral', query: { error: error.message } });
        }
    } else {
        router.push({ name: 'ErrorGeneral' });
    }
}
