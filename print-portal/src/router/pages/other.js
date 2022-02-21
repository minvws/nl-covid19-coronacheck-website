import Home from '@/components/views/1-home/Home.vue';
import ChoiceProof from '@/components/views/2-a-choice-proof/ChoiceProof';
import NotSupportedBrowser from '@/components/views/error-pages/NotSupportedBrowser.vue'

export const BROWSER_NOT_SUPPORTED = 'BrowserNotSupported'

const otherPages = [
    {
        path: '/',
        component: Home,
        name: 'Home'
    },
    {
        path: '/keuze-papieren-bewijs',
        component: ChoiceProof,
        name: 'ChoiceProof'
    },
    {
        path: '/te-oude-internetbrowser',
        component: NotSupportedBrowser,
        name: BROWSER_NOT_SUPPORTED
    }
];

export default otherPages;
