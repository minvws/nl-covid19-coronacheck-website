import CollectRecovery from '@/components/views/3-collect/recovery/CollectRecovery'
import RecoveryRedirect from '@/components/views/3-collect/recovery/happy/RecoveryRedirect'
import RecoveryOverview from '@/components/views/3-collect/recovery/happy/RecoveryOverview'
import RecoveryNone from '@/components/views/3-collect/recovery/unhappy/RecoveryNone'
import RecoveryNotPossible from '@/components/views/3-collect/recovery/unhappy/RecoveryNotPossible'
import PrintRecovery from '@/components/views/4-print/PrintRecovery'

const recoveryPages = [
    {
        path: '/recovery-ophalen',
        name: 'CollectRecovery',
        component: CollectRecovery
    }, {
        path: '/recovery-redirect',
        name: 'RecoveryRedirect',
        component: RecoveryRedirect
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
    }, {
        path: '/recovery-niet-mogelijk',
        name: 'RecoveryNotPossible',
        component: RecoveryNotPossible,
        meta: {
            pageHeader: 'error'
        }
    }, {
        path: '/print-recovery',
        name: 'PrintRecovery',
        component: PrintRecovery
    }
]

export default recoveryPages
