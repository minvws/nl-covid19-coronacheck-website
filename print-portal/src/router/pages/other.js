import Home from '@/components/views/1-home/Home.vue'
import ChoiceProof from '@/components/views/2-a-choice-proof/ChoiceProof'
import ServerBusy from '@/components/views/general/ServerBusy';
import CollectError from '@/components/views/general/CollectError';

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
    path: '/sorry-het-is-niet-gelukt',
    component: CollectError,
    name: 'CollectError',
    meta: {
        pageHeader: 'error'
    }
}]

export default otherPages
