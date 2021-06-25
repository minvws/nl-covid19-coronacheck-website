import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/views/1-home/Home.vue'
import ChoiceProof from '@/components/views/2-a-choice-proof/ChoiceProof'
import negativeTestPages from './pages/negative-test'
import recoveryPages from './pages/recovery'
import vaccinationPages from './pages/vaccination'

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
    },
    ...negativeTestPages,
    ...vaccinationPages,
    ...recoveryPages
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 };
    }
})

router.beforeEach((to, from, next) => {
    const pagesWithoutConsentNeeded = ['Home', 'VaccinationOverviewRedirect', 'NegativeTestRedirect', 'RecoveryRedirect']
    // check for user consent, otherwise redirect to home (disabled for development)
    if (process.env.NODE_ENV !== 'development' && pagesWithoutConsentNeeded.indexOf(to.name) === -1 && !store.state.userConsent) {
        next({ name: 'Home' })
    } else {
        next();
    }
})

export default router
