import Home from '@/components/views/1-home/Home.vue'
import ChoiceProof from '@/components/views/2-a-choice-proof/ChoiceProof'

const otherPages = [{
    path: '/',
    component: Home,
    name: 'Home'
}, {
    path: '/keuze-papieren-bewijs',
    component: ChoiceProof,
    name: 'ChoiceProof'
}]

export default otherPages
