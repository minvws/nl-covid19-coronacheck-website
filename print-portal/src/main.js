import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import CurrentLanguage from '@/components/mixins/CurrentLanguage';
import axios from 'axios';
import i18n from './i18n';
import AuthService from '@/interfaces/authentication';

import PortalVue from 'portal-vue'
Vue.use(PortalVue)

const getBaseUrl = () => {
    const chunks = window.location.href.split('/print');
    return chunks[0] + '/print/';
}
const baseUrl = getBaseUrl();
Vue.prototype.authVaccinations = new AuthService(baseUrl + 'jouw-vaccinaties-redirect');
Vue.prototype.authNegativeTests = new AuthService(baseUrl + 'jouw-testresultaat-redirect');
Vue.prototype.authRecovery = new AuthService(baseUrl + 'recovery-redirect');

const axiosConfig = {
    baseURL: window.config.api,
    timeout: 30000
};
Vue.prototype.$axios = axios.create(axiosConfig)

Vue.mixin(CurrentLanguage);

Vue.config.productionTip = false

new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app')
