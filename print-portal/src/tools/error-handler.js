import store from '@/store';
import router from '@/router';
import i18n from '@/i18n'

const hasInternetConnection = () => {
    return window.navigator.onLine;
}

export const handleRejection = (error) => {
    if (!hasInternetConnection()) {
        store.commit('modal/set', {
            messageHead: i18n.t('message.error.noInternet.head'),
            messageBody: i18n.t('message.error.noInternet.body'),
            closeButton: true
        });
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
