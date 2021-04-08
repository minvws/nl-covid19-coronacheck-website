import Vue from 'vue'
import VueRouter from 'vue-router'
import ProvideCode from '@/components/views/provide-code/ProvideCode.vue'
import YourTestResults from '@/components/views/your-test-results/YourTestResults';
import Print from '@/components/views/print/Print';

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'ProvideCode',
        component: ProvideCode
    }, {
        path: '/test-resultaten',
        name: 'YourTestResults',
        component: YourTestResults
    }, {
        path: '/print',
        name: 'Print',
        component: Print
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
