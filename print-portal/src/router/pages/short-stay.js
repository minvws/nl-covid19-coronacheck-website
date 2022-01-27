import ShortStayHome from '@/components/views/5-short-stay/ShortStayHome'
import ShortStayCodeError from '@/components/views/5-short-stay/ShortStayCodeError'
import ErrorCode99552 from '@/components/views/error-pages/ErrorCode99552';
import ProvideCode from '@/components/views/3-collect/negative-test/provide-code/ProvideCode'
import { FilterTypes } from '@/types/filter-types'
import { RegionTypes } from '@/types/region-types'

export const RouterNames = {
    HOME: 'ShortStay',
    ASSESSMENT: 'ShortStayProvideAssessmentCode',
    CODE: 'ShortStayProvideCode',
    NO_VACCINATION_ASSESSMENT_CODE: 'ShortStayNoAssessmentCode'
}
const routes = [
    {
        path: '/kort-verblijf',
        component: ShortStayHome,
        name: RouterNames.HOME
    },
    {
        path: '/kort-verblijf-beoordeeling-ophalen',
        component: ProvideCode,
        name: RouterNames.ASSESSMENT,
        props: {
            showFAQ: false,
            translation: 'views.shortStayProvideAssessmentCode',
            filter: FilterTypes.VACCINATION_ASSESSMENT,
            clearTestCode: true,
            historyBack: true,
            clearSignedEvents: true
        }
    },
    {
        path: '/kort-verblijf-vaccinatie-ophalen',
        component: ProvideCode,
        name: RouterNames.CODE,
        props: {
            showFAQ: false,
            clearTestCode: true,
            exclude: RegionTypes.SHORT_STAY,
            historyBack: true,
            redirect: {
                filter: FilterTypes.VACCINATION_ASSESSMENT,
                name: RouterNames.NO_VACCINATION_ASSESSMENT_CODE
            }
        }
    },
    {
        path: '/kort-verblijf-onbekende-code',
        component: ShortStayCodeError,
        name: RouterNames.NO_VACCINATION_ASSESSMENT_CODE
    },
    {
        path: '/fout-kort-verblijf',
        component: ErrorCode99552,
        name: 'ErrorCode99552',
        props: {
            exclude: RegionTypes.SHORT_STAY,
            filter: FilterTypes.NEGATIVE_TEST
        },
        meta: {
            pageHeader: 'error'
        }
    }
]

export default routes
