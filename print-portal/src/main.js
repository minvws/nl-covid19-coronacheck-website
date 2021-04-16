import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import Translate from '@/components/mixins/Translate';
import axios from 'axios';

const axiosConfig = {
    baseURL: 'https://api-ct.bananenhalen.nl/v3'
};
Vue.prototype.$axios = axios.create(axiosConfig)

Vue.mixin(Translate);

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
