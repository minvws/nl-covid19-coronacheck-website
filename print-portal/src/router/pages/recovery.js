import CollectRecovery from '@/components/views/3-collect/recovery/CollectRecovery'
import RecoveryRedirect from '@/components/views/3-collect/recovery/happy/RecoveryRedirect'
import RecoveryExpired from '@/components/views/3-collect/recovery/unhappy/RecoveryExpired'
import RecoveryOverview from '@/components/views/3-collect/recovery/happy/RecoveryOverview'
import RecoveryNone from '@/components/views/3-collect/recovery/unhappy/RecoveryNone'
import PrintRecovery from '@/components/views/4-print/PrintRecovery'
import RecoveryLayout from '@/components/views/3-collect/recovery/unhappy/RecoveryLayout'
import CollectPositiveTest from '@/components/views/3-collect/recovery/CollectPositiveTest'

const recoveryPages = [
    {
        path: '/ophalen-positive-test',
        name: 'CollectPositiveTest',
        component: CollectPositiveTest
    },
    {
        path: '/recovery-ophalen',
        name: 'CollectRecovery',
        component: CollectRecovery
    }, {
        path: '/recovery-redirect',
        name: 'RecoveryRedirect',
        component: RecoveryRedirect,
        meta: {
            title: 'views.recoveryOverview.pageHeader'
        }
    }, {
        path: '/recovery-overzicht',
        name: 'RecoveryOverview',
        component: RecoveryOverview
    }, {
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
                name: 'RecoveryOverview',
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
                name: 'RecoveryOverview',
                translationId: 'goToOverview',
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
