import Vue from 'vue'
import App from './App.vue'
// import './registerServiceWorker'
import router from './router'
import store from './store';
import CurrentLanguage from '@/components/mixins/CurrentLanguage';

Vue.mixin(CurrentLanguage);

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
