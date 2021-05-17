import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import CurrentLanguage from '@/components/mixins/CurrentLanguage';
import axios from 'axios';
import i18n from './i18n'
import Mgr from '@/services/SecurityService'

const mgr = new Mgr();
Vue.prototype.mgr = mgr;

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
    mgr,
    render: h => h(App)
}).$mount('#app')
