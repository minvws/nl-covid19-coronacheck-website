import Vue from 'vue'
import VueRouter from 'vue-router'

import negativeTestPages from './pages/negative-test'
import recoveryPages from './pages/recovery'
import vaccinationPages from './pages/vaccination'
import otherPages from './pages/other'
import errorPages from './pages/error-pages'
import i18n from '@/i18n';
import store from '@/store'

Vue.use(VueRouter)

const routes = [
    ...otherPages,
    ...negativeTestPages,
    ...vaccinationPages,
    ...recoveryPages,
    ...errorPages
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
    const pagesWithoutConsentNeeded = ['Home', 'VaccinationRedirect', 'NegativeTestRedirect', 'RecoveryRedirect']
    // check for user consent, otherwise redirect to home (disabled for development)
    if (process.env.NODE_ENV !== 'development' && pagesWithoutConsentNeeded.indexOf(to.name) === -1 && !store.state.userConsent) {
        next({ name: 'Home' })
    } else {
        next();
    }
})

router.afterEach((to, from) => {
    const defaultTitle = 'CoronaCheck Print Portaal';
    // Use next tick to handle router history correctly
    // see: https://github.com/vuejs/vue-router/issues/914#issuecomment-384477609
    Vue.nextTick(() => {
        let pageTitleKey, pageTitle;
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
