import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import CurrentLanguage from '@/components/mixins/CurrentLanguage';
import axios from 'axios';
import i18n from './i18n'
import AuthService from '@/interfaces/authentication'

let locationHref = window.location.href;
// production env has a / in the base url
if (locationHref[locationHref.length - 1] !== '/') {
    locationHref += '/';
}

const authVaccinations = new AuthService(locationHref + 'jouw-vaccinaties-redirect');
const authNegativeTests = new AuthService(locationHref + 'jouw-testresultaat-redirect');

Vue.prototype.authVaccinations = authVaccinations;
Vue.prototype.authNegativeTests = authNegativeTests;

const axiosConfig = {
    baseURL: window.config.api
};
Vue.prototype.$axios = axios.create(axiosConfig)

Vue.mixin(CurrentLanguage);

Vue.config.productionTip = false

new Vue({
    router,
    store,
    i18n,
    authVaccinations,
    authNegativeTests,
    render: h => h(App)
}).$mount('#app')
