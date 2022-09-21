import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import CurrentLanguage from '@/components/mixins/CurrentLanguage.vue';
import axios from 'axios';
import i18n from './i18n';
import PortalVue from 'portal-vue'
import { timeoutTime } from '@/data/constants'
import { createAuthProvider } from '@/interfaces/auth-helper'
declare global {
    interface Window {
        config?: any;
    }
}

Vue.use(PortalVue)

Vue.prototype.getAuthProvider = createAuthProvider(window.location.origin, 'print');

const axiosConfig = {
    baseURL: window.config.api,
    timeout: timeoutTime
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
