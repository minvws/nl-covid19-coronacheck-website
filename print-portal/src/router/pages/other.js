import Home from '@/components/views/1-home/Home.vue'
import ChoiceProof from '@/components/views/2-a-choice-proof/ChoiceProof'
import ServerBusy from '@/components/views/error-pages/ServerBusy';
import ErrorAccessTokens from '@/components/views/error-pages/ErrorAccessTokens';
import ErrorEventProvider from '@/components/views/error-pages/ErrorEventProvider';
import EventsError from '@/components/views/error-pages/EventsError';

const otherPages = [{
    path: '/',
    component: Home,
    name: 'Home'
}, {
    path: '/keuze-papieren-bewijs',
    component: ChoiceProof,
    name: 'ChoiceProof'
}, {
    path: '/sorry-het-is-erg-druk',
    component: ServerBusy,
    name: 'ServerBusy',
    meta: {
        pageHeader: 'error'
    }
}, {
    path: '/sorry-er-gaat-iets-mis-access-tokens',
    component: ErrorAccessTokens,
    name: 'ErrorAccessTokens',
    meta: {
        pageHeader: 'error'
    }
}, {
    path: '/sorry-er-gaat-iets-mis',
    component: ErrorEventProvider,
    name: 'ErrorEventProvider',
    meta: {
        pageHeader: 'error'
    }
}, {
    path: '/sorry-het-is-niet-gelukt',
    component: EventsError,
    name: 'EventsError',
    meta: {
        pageHeader: 'error'
    }
}]

export default otherPages
