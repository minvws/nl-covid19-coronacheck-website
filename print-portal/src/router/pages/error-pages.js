import ServerBusy from '@/components/views/error-pages/ServerBusy';
import ErrorGeneral from '@/components/views/error-pages/ErrorGeneral';
import ErrorNoEvents from '@/components/views/error-pages/ErrorNoEvents';
// import ErrorAccessTokens from '@/components/views/error-pages/ErrorAccessTokens';
// import ErrorTokenFlow from '@/components/views/error-pages/ErrorTokenFlow';

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
    }
]

// const errorPages = [{
//     path: '/sorry-het-is-erg-druk',
//     component: ServerBusy,
//     name: 'ServerBusy',
//     meta: {
//         pageHeader: 'error'
//     }
// }, {
//     path: '/sorry-er-gaat-iets-mis-access-tokens',
//     component: ErrorAccessTokens,
//     name: 'ErrorAccessTokens',
//     meta: {
//         pageHeader: 'error'
//     }
// }, {
//     path: '/sorry-het-is-niet-gelukt',
//     component: ErrorNoEvents,
//     name: 'ErrorNoEvents',
//     meta: {
//         pageHeader: 'error'
//     }
// }, {
//     path: '/testlocatie-er-gaat-iets-mis',
//     name: 'ErrorTokenFlow',
//     component: ErrorTokenFlow,
//     meta: {
//         pageHeader: 'error'
//     }
// }]

export default errorPages
