import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/views/1-home/Home.vue'
import ChoiceProof from '@/components/views/2-a-choice-proof/ChoiceProof'

// test happy
import ChoiceTestLocation from '@/components/views/2-b-choice-test-location/ChoiceTestLocation'
import ProvideCode from '@/components/views/3-collect/test/provide-code/ProvideCode'
import NegativeTestOverview from '@/components/views/3-collect/test/happy/NegativeTestOverview';
import NegativeTestRedirect from '@/components/views/3-collect/test/happy/NegativeTestRedirect';
import PrintTestResult from '@/components/views/4-print/PrintTestResult';
// test unhappy
import TestResultPending from '@/components/views/3-collect/test/unhappy/TestResultPending';
import TestResultNotPossible from '@/components/views/3-collect/test/unhappy/TestResultNotPossible';
import TestResultNone from '@/components/views/3-collect/test/unhappy/TestResultNone';

// recovery
import CollectRecovery from '@/components/views/3-collect/recovery/CollectRecovery'

// vaccination
import CollectVaccination from '@/components/views/3-collect/vaccination/CollectVaccination'
import VaccinationRedirect from '@/components/views/3-collect/vaccination/happy/VaccinationRedirect'
import VaccinationOverview from '@/components/views/3-collect/vaccination/happy/VaccinationOverview'
import PrintVaccination from '@/components/views/4-print/PrintVaccination';
// vaccination unhappy
import VaccinationsNone from '@/components/views/3-collect/vaccination/unhappy/VaccinationsNone'
import VaccinationsNotPossible from '@/components/views/3-collect/vaccination/unhappy/VaccinationsNotPossible'
import VaccinationsIncomplete from '@/components/views/3-collect/vaccination/unhappy/VaccinationsIncomplete'

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
        component: NegativeTestOverview,
        // flow set by either NegativeTestRedirect (3.0) or ProvideCode (2.0)
        props: true
    }, {
        path: '/jouw-testresultaat-redirect',
        name: 'NegativeTestRedirect',
        component: NegativeTestRedirect
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
        path: '/geen-negatieve-testuitslag',
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
        component: VaccinationOverview,
        name: 'VaccinationOverview'
    }, {
        path: '/jouw-vaccinaties-redirect',
        component: VaccinationRedirect,
        name: 'VaccinationOverviewRedirect'
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
        path: '/niet-volledig-gevaccineerd',
        component: VaccinationsIncomplete,
        name: 'VaccinationsIncomplete',
        meta: {
            pageHeader: 'error'
        }
    }, {
        path: '/print-vaccinatie',
        name: 'PrintVaccination',
        component: PrintVaccination
    }, {
        path: '/recovery-ophalen',
        name: 'CollectRecovery',
        component: CollectRecovery
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

const pagesWithoutConsentNeeded = ['Home', 'VaccinationOverviewRedirect', 'NegativeTestRedirect']

router.beforeEach((to, from, next) => {
    // check for user consent, otherwise redirect to home (disabled for development)
    if (process.env.NODE_ENV !== 'development' && pagesWithoutConsentNeeded.indexOf(to.name) === -1 && !store.state.userConsent) {
        next({ name: 'Home' })
    } else {
        next();
    }
})

export default router
