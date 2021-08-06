import ServerBusy from '@/components/views/error-pages/ServerBusy';
import ErrorAccessTokens from '@/components/views/error-pages/ErrorAccessTokens';
import ErrorEventProvider from '@/components/views/error-pages/ErrorEventProvider';
import EventsError from '@/components/views/error-pages/EventsError';
import ErrorTokenFlow from '@/components/views/error-pages/ErrorTokenFlow';

const errorPages = [{
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
}, {
    path: '/testlocatie-er-gaat-iets-mis',
    name: 'ErrorTokenFlow',
    component: ErrorTokenFlow,
    meta: {
        pageHeader: 'error'
    }
}]

export default errorPages
