import Vue from 'vue'
import VueRouter from 'vue-router'
import ProvideCode from '@/components/views/provide-code/ProvideCode.vue'
import YourTestResults from '@/components/views/your-test-results/YourTestResults';
import Print from '@/components/views/print/Print';
import HelpTestResult from '@/components/views/help-pages/HelpTestResult';
import HelpTestResultSomethingWrong from '@/components/views/help-pages/HelpTestResultSomethingWrong';

Vue.use(VueRouter)

const locales = ['nl', 'en']

const routesBase = [
    {
        path: '/code-invullen',
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
];

const routes = [];

for (const route of routesBase) {
    for (const locale of locales) {
        const newRoute = { ...route };
        newRoute.path = '/' + locale + route.path;
        newRoute.name = locale + '/' + route.name;
        newRoute.meta = {
            key: route.name
        }
        routes.push(newRoute);
    }
}

routes.unshift({
    path: '/',
    name: 'ProvideCode',
    redirect: { name: 'nl/ProvideCode' },
    meta: {
        key: 'ProvideCode'
    }
})

const router = new VueRouter({
    base: process.env.BASE_URL,
    routes
})

export default router
