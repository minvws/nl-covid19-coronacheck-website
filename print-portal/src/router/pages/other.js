import Home from '@/components/views/1-home/Home.vue'
import ChoiceProof from '@/components/views/2-a-choice-proof/ChoiceProof'
import PrintTest from '@/components/views/4-print/PrintTest';

const otherPages = [{
    path: '/',
    component: Home,
    name: 'Home'
}, {
    path: '/keuze-papieren-bewijs',
    component: ChoiceProof,
    name: 'ChoiceProof'
}, {
    path: '/test',
    component: PrintTest,
    name: 'PrintTest'
}]

export default otherPages
