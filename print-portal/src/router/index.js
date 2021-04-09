import Vue from 'vue'
import VueRouter from 'vue-router'
import ProvideCode from '@/components/views/provide-code/ProvideCode.vue'
import YourTestResults from '@/components/views/your-test-results/YourTestResults';
import Print from '@/components/views/print/Print';
import HelpTestResult from '@/components/views/help-pages/HelpTestResult';
import HelpTestResultSomethingWrong from '@/components/views/help-pages/HelpTestResultSomethingWrong';

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
    }, {
        path: '/uitleg-testresultaat',
        name: 'HelpTestResult',
        component: HelpTestResult
    }, {
        path: '/testresultaat-er-klopt-iets-niet',
        name: 'HelpTestResultSomethingWrong',
        component: HelpTestResultSomethingWrong
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
