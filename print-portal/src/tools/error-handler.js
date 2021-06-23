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
            this.$store.commit('modal/set', {
                messageHead: this.$t('message.error.serverBusy.head'),
                messageBody: this.$t('message.error.serverBusy.body'),
                closeButton: true
            });
        } else {
            this.$store.commit('modal/set', {
                messageHead: this.$t('message.error.general.head'),
                messageBody: (this.$t('message.error.general.body') + '<p>' + error + '</p>'),
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
