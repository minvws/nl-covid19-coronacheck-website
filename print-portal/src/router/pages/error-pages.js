import ServerBusy from '@/components/views/error-pages/ServerBusy';
import ErrorGeneral from '@/components/views/error-pages/ErrorGeneral';
import ErrorNoEvents from '@/components/views/error-pages/ErrorNoEvents';
import ErrorTokenFlow from '@/components/views/error-pages/ErrorTokenFlow';
import ErrorNoBsn from '@/components/views/error-pages/ErrorNoBsn';
import ErrorSessionExpired from '@/components/views/error-pages/ErrorSessionExpired';
import ErrorProofNotPossible from '@/components/views/error-pages/ErrorProofNotPossible';
import ErrorTimeout from '@/components/views/error-pages/ErrorTimeout';
import ErrorDigiD from '@/components/views/error-pages/ErrorDigiD';

const errorPages = [
    {
        path: '/sorry-het-is-erg-druk',
        component: ServerBusy,
        name: 'ServerBusy',
        meta: {
            pageHeader: 'error'
        }
    },
    {
        path: '/fout-algemeen',
        component: ErrorGeneral,
        name: 'ErrorGeneral',
        meta: {
            pageHeader: 'error'
        }
    },
    {
        path: '/sorry-het-is-niet-gelukt',
        component: ErrorNoEvents,
        name: 'ErrorNoEvents',
        meta: {
            pageHeader: 'error'
        }
    },
    {
        path: '/testlocatie-er-gaat-iets-mis',
        name: 'ErrorTokenFlow',
        component: ErrorTokenFlow,
        meta: {
            pageHeader: 'error'
        }
    },
    {
        path: '/bsn-niet-gevonden',
        name: 'ErrorNoBsn',
        component: ErrorNoBsn,
        meta: {
            pageHeader: 'error'
        }
    },
    {
        path: '/sessie-is-verlopen',
        name: 'ErrorSessionExpired',
        component: ErrorSessionExpired,
        meta: {
            pageHeader: 'error'
        }
    },
    {
        path: '/we-kunnen-geen-bewijs-maken',
        name: 'ErrorProofNotPossible',
        component: ErrorProofNotPossible,
        meta: {
            pageHeader: 'error'
        }
    },
    {
        path: '/server-niet-bereikbaar',
        name: 'ErrorTimeout',
        component: ErrorTimeout,
        meta: {
            pageHeader: 'error'
        }
    },
    {
        path: '/fout-verbinding-digid',
        name: 'ErrorDigiD',
        component: ErrorDigiD,
        meta: {
            pageHeader: 'error'
        }
    }
]

export default errorPages
