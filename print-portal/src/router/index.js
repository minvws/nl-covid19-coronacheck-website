import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/views/1-home/Home.vue'
import ChoiceProof from '@/components/views/2-a-choice-proof/ChoiceProof'
import ChoiceTestLocation from '@/components/views/2-b-choice-test-location/ChoiceTestLocation'
import ProvideCode from '@/components/views/3-a-test/provide-code/ProvideCode'
import YourTestResults from '@/components/views/3-a-test/your-test-results/YourTestResults';
import TestResultPending from '@/components/views/3-a-test/your-test-results/TestResultPending';
import CollectVaccination from '@/components/views/3-b-vaccination/collect-vaccination/CollectVaccination'
import YourVaccinations from '@/components/views/3-b-vaccination/your-vaccinations/YourVaccinations'
import PrintTestResult from '@/components/views/4-print/PrintTestResult';
import PrintVaccination from '@/components/views/4-print/PrintVaccination';
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
        path: '/waar-ben-je-getest',
        component: ChoiceTestLocation,
        name: 'ChoiceTestLocation'
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
        path: '/print-testuitslag',
        name: 'PrintTestResult',
        component: PrintTestResult
    }, {
        path: '/print-vaccinatie',
        name: 'PrintVaccination',
        component: PrintVaccination
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
