import CollectRecovery from '@/components/views/3-collect/recovery/CollectRecovery'
import RecoveryRedirect from '@/components/views/3-collect/recovery/happy/RecoveryRedirect'
import RecoveryExpired from '@/components/views/3-collect/recovery/unhappy/RecoveryExpired'
import RecoveryNone from '@/components/views/3-collect/recovery/unhappy/RecoveryNone'
import PrintRecovery from '@/components/views/4-print/PrintRecovery'
import RecoveryLayout from '@/components/views/3-collect/recovery/unhappy/RecoveryLayout'
import CollectPositiveTest from '@/components/views/3-collect/recovery/CollectPositiveTest'
import { RouterNames } from '@/qr/router'
import { routeProps } from '@/interfaces/auth-helper';

const recoveryPages = [
    {
        path: '/ophalen-positive-test',
        name: 'CollectPositiveTest',
        component: CollectPositiveTest,
        props: routeProps
    },
    {
        path: '/recovery-ophalen',
        name: 'CollectRecovery',
        component: CollectRecovery,
        props: routeProps
    }, {
        path: '/recovery-redirect',
        name: 'RecoveryRedirect',
        component: RecoveryRedirect,
        props: routeProps,
        meta: {
            title: 'views.recoveryOverview.pageHeader'
        }
    },
    {
        path: '/recovery-niet-gevonden',
        name: 'RecoveryNone',
        component: RecoveryNone,
        meta: {
            pageHeader: 'error'
        }
    },
    {
        path: '/recovery-niet-gevonden-new',
        name: 'RecoveryNoneNew',
        component: RecoveryLayout,
        props: {
            translationId: 'recoveryNone',
            route: {
                name: RouterNames.RECOVERY_OVERVIEW,
                translationId: 'goToOverview',
                replace: true
            }
        },
        meta: {
            pageHeader: 'error'
        }

    },
    {
        path: '/recovery-niet-geschrikt',
        name: 'RecoveryInvalid',
        component: RecoveryLayout,
        props: {
            translationId: 'recoveryInvalid',
            route: {
                name: 'Home',
                translationId: 'goBackToStart',
                replace: true
            }
        },
        meta: {
            pageHeader: 'error'
        }

    },
    {
        path: '/print-recovery',
        name: 'PrintRecovery',
        component: PrintRecovery,
        meta: {
            title: 'views.print.pageTitle'
        }
    }, {
        path: '/recovery-expired',
        name: 'RecoveryExpired',
        component: RecoveryExpired,
        meta: {
            pageHeader: 'error'
        }
    }
]

export default recoveryPages
