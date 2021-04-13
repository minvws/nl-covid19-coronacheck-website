import Vue from 'vue'
import App from './App.vue'
// import './registerServiceWorker'
import router from './router'
import store from './store';
import Translate from '@/components/mixins/Translate';
import RouterHelper from '@/components/mixins/RouterHelper';

Vue.mixin(Translate);
Vue.mixin(RouterHelper);

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
