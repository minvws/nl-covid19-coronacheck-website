import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/views/1-home/Home.vue'
import ChoiceProof from '@/components/views/2-a-choice-proof/ChoiceProof'
// test
import ChoiceTestLocation from '@/components/views/2-b-choice-test-location/ChoiceTestLocation'
import ProvideCode from '@/components/views/3-a-test/provide-code/ProvideCode'
import YourTestResults from '@/components/views/3-a-test/your-test-results/YourTestResults';
import YourTestResultsRedirect from '@/components/views/3-a-test/your-test-results/YourTestResultsRedirect';
import PrintTestResult from '@/components/views/4-print/PrintTestResult';
// test unhappy
import TestResultPending from '@/components/views/3-a-test/unhappy/TestResultPending';
import TestResultNotPossible from '@/components/views/3-a-test/unhappy/TestResultNotPossible';
import TestResultNone from '@/components/views/3-a-test/unhappy/TestResultNone';

// vaccination
import CollectVaccination from '@/components/views/3-b-vaccination/collect-vaccination/CollectVaccination'
import YourVaccinationsRedirect from '@/components/views/3-b-vaccination/your-vaccinations/YourVaccinationsRedirect'
import YourVaccinations from '@/components/views/3-b-vaccination/your-vaccinations/YourVaccinations'
import PrintVaccination from '@/components/views/4-print/PrintVaccination';
// vaccination unhappy
import VaccinationsNone from '@/components/views/3-b-vaccination/unhappy/VaccinationsNone'
import VaccinationsNotPossible from '@/components/views/3-b-vaccination/unhappy/VaccinationsNotPossible'

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
        path: '/testuitslag-ophalen',
        component: ProvideCode,
        name: 'ProvideCode'
    }, {
        path: '/jouw-testresultaat',
        name: 'YourTestResult',
        component: YourTestResults,
        // flow set by either YourTestResultsRedirect (3.0) or ProvideCode (2.0)
        props: true
    }, {
        path: '/jouw-testresultaat-redirect',
        name: 'YourTestResultsRedirect',
        component: YourTestResultsRedirect
    }, {
        path: '/testresultaat-nog-niet-bekend',
        name: 'TestResultPending',
        component: TestResultPending,
        meta: {
            pageHeader: 'error'
        }
    }, {
        path: '/testresultaat-niet-mogelijk',
        name: 'TestResultNotPossible',
        component: TestResultNotPossible,
        meta: {
            pageHeader: 'error'
        }
    }, {
        path: '/geen-negatieve-testuitslage',
        name: 'TestResultNone',
        component: TestResultNone,
        meta: {
            pageHeader: 'error'
        }
    }, {
        path: '/print-testuitslag',
        name: 'PrintTestResult',
        component: PrintTestResult
    }, {
        path: '/vaccinatie-ophalen',
        component: CollectVaccination,
        name: 'CollectVaccination'
    }, {
        path: '/jouw-vaccinaties',
        component: YourVaccinations,
        name: 'YourVaccinations'
    }, {
        path: '/jouw-vaccinaties-redirect',
        component: YourVaccinationsRedirect,
        name: 'YourVaccinationsRedirect'
    }, {
        path: '/geen-vaccinaties-beschikbaar',
        component: VaccinationsNone,
        name: 'VaccinationsNone',
        meta: {
            pageHeader: 'error'
        }
    }, {
        path: '/we-kunnen-geen-bewijs-maken',
        component: VaccinationsNotPossible,
        name: 'VaccinationsNotPossible',
        meta: {
            pageHeader: 'error'
        }
    }, {
        path: '/print-vaccinatie',
        name: 'PrintVaccination',
        component: PrintVaccination
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
