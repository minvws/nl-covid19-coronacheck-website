import ShortStayHome from '@/components/views/5-short-stay/ShortStayHome'
import ShortStayCodeError from '@/components/views/5-short-stay/ShortStayCodeError'
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
            needsConsent: false,
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
    }
]

export default routes
