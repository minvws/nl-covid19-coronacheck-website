import store from '@/store';
import i18n from '@/i18n'

export const handleRejection = (error) => {
    if (!window.navigator.onLine) {
        store.commit('modal/set', {
            messageHead: i18n.t('message.error.noInternet.head'),
            messageBody: i18n.t('message.error.noInternet.body'),
            closeButton: true
        });
        return;
    }

    if (error) {
        if (error.response && error.response.status && error.response.status === 429) {
            store.commit('modal/set', {
                messageHead: i18n.t('message.error.serverBusy.head'),
                messageBody: i18n.t('message.error.serverBusy.body'),
                closeButton: true
            });
        } else {
            store.commit('modal/set', {
                messageHead: i18n.t('message.error.generalWithError.head'),
                messageBody: i18n.t('message.error.generalWithError.body', { code: error }),
                closeButton: true
            });
        }
    } else {
        store.commit('modal/set', {
            messageHead: i18n.t('message.error.general.head'),
            messageBody: i18n.t('message.error.general.body'),
            closeButton: true
        });
    }
}
