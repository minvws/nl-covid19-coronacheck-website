import Vue from 'vue'
import VueRouter from 'vue-router'

import negativeTestPages from './pages/negative-test'
import recoveryPages from './pages/recovery'
import vaccinationPages from './pages/vaccination'
import otherPages, { BROWSER_NOT_SUPPORTED } from './pages/other'
import errorPages from './pages/error-pages'
import i18n from '@/i18n';
import store from '@/store'
import QRRoutes, { RouterNames as Route } from '@/qr/router'
import { Routes as PAPRoutes } from '@/pap/router'

Vue.use(VueRouter)

const routes = [
    ...otherPages,
    ...negativeTestPages,
    ...vaccinationPages,
    ...recoveryPages,
    ...errorPages,
    ...QRRoutes,
    ...PAPRoutes
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 };
    }
})

const AUTO_CLOSE_SNACKBAR_ROUTES = [Route.VACCINATION_OVERVIEW_LIST, Route.RECOVERY_OVERVIEW_LIST]

router.beforeEach((to, from, next) => {
    // auto close snackbar when page changes from these pages when snackbar is open
    if (store.getters['snackbar/closeOnPageChange'] && AUTO_CLOSE_SNACKBAR_ROUTES.includes(from?.name)) {
        store.commit('snackbar/close');
    }

    const generalPages = [
        'Home',
        'ErrorGeneral',
        'ServerBusy',
        BROWSER_NOT_SUPPORTED
    ]

    const pagesWithoutConsentNeeded = [
        'VaccinationRedirect',
        'NegativeTestRedirect',
        'RecoveryRedirect',
        'RecoveryExpired',
        ...generalPages
    ]

    // show 'browser not supported page' when on IE
    const isIE = (!!window.MSInputMethodContext && !!document.documentMode)
    if (isIE && !generalPages.includes(to.name)) {
        next({ name: BROWSER_NOT_SUPPORTED })
        return
    }
    // check for user consent, otherwise redirect to home (disabled for development)
    if ((process.env.NODE_ENV !== 'development') && pagesWithoutConsentNeeded.indexOf(to.name) === -1 && !store.state.userConsent) {
        next({ name: 'Home' })
    } else {
        next();
    }
})

router.afterEach((to, from) => {
    // Use next tick to handle router history correctly
    // see: https://github.com/vuejs/vue-router/issues/914#issuecomment-384477609
    Vue.nextTick(() => {
        let pageTitleKey, pageTitle;
        const defaultTitle = i18n.t('pageTitle')
        if (to.meta.title) {
            pageTitleKey = to.meta.title;
        } else {
            pageTitleKey = 'views.' + (to.name.charAt(0).toLowerCase() + to.name.slice(1)) + '.pageHeader';
        }
        if (to.name !== 'Home') {
            pageTitle = i18n.t(pageTitleKey) + ' | ' + defaultTitle;
        }
        document.title = pageTitle || defaultTitle;
    });
});

export default router
