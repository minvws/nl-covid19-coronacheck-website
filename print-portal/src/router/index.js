import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/views/home/Home.vue'
import Vaccination from '@/components/views/vaccination/Vaccination.vue'
import ProvideCode from '@/components/views/test/provide-code/ProvideCode.vue'
import YourTestResults from '@/components/views/test/your-test-results/YourTestResults';
import TestResultPending from '@/components/views/your-test-results/TestResultPending';
import Print from '@/components/views/print/Print';
import store from '@/store'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: Home,
        name: 'Home'
    }, {
        path: '/vaccination',
        component: Vaccination,
        name: 'Vaccination'
    }, {
        path: '/testuitslag-ophalen',
        component: ProvideCode,
        name: 'ProvideCode'
    }, {
        path: '/jouw-testresultaat',
        name: 'YourTestResult',
        component: YourTestResults
    }, {
        path: '/print-qr',
        name: 'Print',
        component: Print
    }, {
        path: '/testresultaat-nog-niet-bekend',
        name: 'TestResultPending',
        component: TestResultPending
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 };
    }
})

// todo remove Vaccination
const pagesWithoutConsentNeeded = ['Home', 'Vaccination']

router.beforeEach((to, from, next) => {
    // check for user consent, otherwise redirect to home
    if (pagesWithoutConsentNeeded.indexOf(to.name) === -1 && !store.state.userConsent) {
        next({ name: 'Home' })
    } else {
        next();
    }
})

export default router
