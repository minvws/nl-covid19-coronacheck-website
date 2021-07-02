import ChoiceTestLocation from '@/components/views/2-b-choice-test-location/ChoiceTestLocation'
import ProvideCode from '@/components/views/3-collect/test/provide-code/ProvideCode'
import NegativeTestOverview from '@/components/views/3-collect/test/happy/NegativeTestOverview';
import NegativeTestRedirect from '@/components/views/3-collect/test/happy/NegativeTestRedirect';
import PrintNegativeTest from '@/components/views/4-print/PrintNegativeTest';
import TestResultPending from '@/components/views/3-collect/test/unhappy/TestResultPending';
import NegativeTestNotPossible from '@/components/views/3-collect/test/unhappy/NegativeTestNotPossible';
import TestResultNone from '@/components/views/3-collect/test/unhappy/TestResultNone';

const negativeTestPages = [
    {
        path: '/waar-ben-je-getest',
        component: ChoiceTestLocation,
        name: 'ChoiceTestLocation'
    }, {
        path: '/testuitslag-ophalen',
        component: ProvideCode,
        name: 'ProvideCode'
    }, {
        path: '/jouw-testresultaat',
        name: 'NegativeTestOverview',
        component: NegativeTestOverview,
        // flow set by either NegativeTestRedirect (3.0) or ProvideCode (2.0)
        props: true
    }, {
        path: '/jouw-testresultaat-redirect',
        name: 'NegativeTestRedirect',
        component: NegativeTestRedirect
    }, {
        path: '/testresultaat-nog-niet-bekend',
        name: 'TestResultPending',
        component: TestResultPending,
        meta: {
            pageHeader: 'error'
        }
    }, {
        path: '/testresultaat-niet-mogelijk',
        name: 'NegativeTestNotPossible',
        component: NegativeTestNotPossible,
        meta: {
            pageHeader: 'error'
        }
    }, {
        path: '/geen-negatieve-testuitslag',
        name: 'TestResultNone',
        component: TestResultNone,
        meta: {
            pageHeader: 'error'
        }
    }, {
        path: '/print-testuitslag',
        name: 'PrintNegativeTest',
        component: PrintNegativeTest
    }
]

export default negativeTestPages
