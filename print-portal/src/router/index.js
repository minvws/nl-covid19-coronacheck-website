import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/views/1-home/Home.vue'
import ChoiceProof from '@/components/views/2-choice-proof/ChoiceProof'
import ProvideCode from '@/components/views/3-a-test/provide-code/ProvideCode'
import YourTestResults from '@/components/views/3-a-test/your-test-results/YourTestResults';
import TestResultPending from '@/components/views/3-a-test/your-test-results/TestResultPending';
import CollectVaccination from '@/components/views/3-b-vaccination/CollectVaccination'
import YourVaccinations from '@/components/views/3-b-vaccination/YourVaccinations'
import Print from '@/components/views/4-print/Print';
import store from '@/store'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: Home,
        name: 'Home'
    }, {
        path: '/keuze-papieren-bewijs',
        component: ChoiceProof,
        name: 'ChoiceProof'
    }, {
        path: '/vaccinatie-ophalen',
        component: CollectVaccination,
        name: 'CollectVaccination'
    }, {
        path: '/jouw-vaccinaties',
        component: YourVaccinations,
        name: 'YourVaccinations'
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
    // check for user consent, otherwise redirect to home (disabled for development)
    if (process.env.NODE_ENV !== 'development' && pagesWithoutConsentNeeded.indexOf(to.name) === -1 && !store.state.userConsent) {
        next({ name: 'Home' })
    } else {
        next();
    }
})

export default router
