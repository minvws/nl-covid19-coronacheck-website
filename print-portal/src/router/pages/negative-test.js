import ChoiceTestLocation from '@/components/views/2-b-choice-test-location/ChoiceTestLocation'
import ProvideCode from '@/components/views/3-collect/negative-test/provide-code/ProvideCode'
import NegativeTestOverview from '@/components/views/3-collect/negative-test/happy/NegativeTestOverview';
import NegativeTestRedirect from '@/components/views/3-collect/negative-test/happy/NegativeTestRedirect';
import PrintNegativeTest from '@/components/views/4-print/PrintNegativeTest';
import TestResultPending from '@/components/views/3-collect/negative-test/unhappy/TestResultPending';
import NegativeTestNotPossible from '@/components/views/3-collect/negative-test/unhappy/NegativeTestNotPossible';
import TestResultOtherSomethingWrong from '@/components/views/3-collect/negative-test/unhappy/TestResultOtherSomethingWrong';
import TestResultNone from '@/components/views/3-collect/negative-test/unhappy/TestResultNone';

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
        component: NegativeTestOverview
    }, {
        path: '/jouw-testresultaat-redirect',
        name: 'NegativeTestRedirect',
        component: NegativeTestRedirect,
        meta: {
            title: 'views.negativeTestOverview.pageHeader'
        }
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
        path: '/testlocatie-er-gaat-iets-mis',
        name: 'TestResultOtherSomethingWrong',
        component: TestResultOtherSomethingWrong,
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
        component: PrintNegativeTest,
        meta: {
            title: 'views.printNegativeTest.both.pageHeader'
        }
    }
]

export default negativeTestPages
