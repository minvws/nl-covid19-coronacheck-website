import Home from '@/components/views/1-home/Home.vue'
import ChoiceProof from '@/components/views/2-a-choice-proof/ChoiceProof'
import ShortStayHome from '@/components/views/5-short-stay/ShortStayHome'

const otherPages = [{
    path: '/',
    component: Home,
    name: 'Home'
}, {
    path: '/keuze-papieren-bewijs',
    component: ChoiceProof,
    name: 'ChoiceProof'
},
{
    path: '/kort-verblijf',
    component: ShortStayHome,
    name: 'ShortStay'
}
]

export default otherPages
