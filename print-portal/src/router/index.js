import Vue from 'vue'
import VueRouter from 'vue-router'
import ProvideCode from '@/components/views/provide-code/ProvideCode.vue'
import YourTestResults from '@/components/views/your-test-results/YourTestResults';
import Print from '@/components/views/print/Print';
import HelpTestResult from '@/components/views/help-pages/HelpTestResult';
import urlDictionary from '@/data/url-dictionary';

Vue.use(VueRouter)

const locales = ['nl', 'en']

const routesBase = [
    {
        name: 'ProvideCode',
        component: ProvideCode
    }, {
        name: 'YourTestResult',
        component: YourTestResults
    }, {
        name: 'Print',
        component: Print
    }, {
        name: 'HelpTestResult',
        component: HelpTestResult
    }
];

const routes = [];

for (const route of routesBase) {
    for (const locale of locales) {
        const newRoute = { ...route };
        newRoute.name = locale + '/' + route.name;
        newRoute.meta = {
            key: route.name
        }
        newRoute.path = '/' + locale + '/' + urlDictionary[route.name][locale];
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
    // mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
