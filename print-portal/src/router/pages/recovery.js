import CollectRecovery from '@/components/views/3-collect/recovery/CollectRecovery'
import RecoveryRedirect from '@/components/views/3-collect/recovery/happy/RecoveryRedirect'
import RecoveryOverview from '@/components/views/3-collect/recovery/happy/RecoveryOverview'
import RecoveryNone from '@/components/views/3-collect/recovery/unhappy/RecoveryNone'

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
        component: RecoveryNone
    }
]

export default recoveryPages
