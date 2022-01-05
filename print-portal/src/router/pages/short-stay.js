import ShortStayHome from '@/components/views/5-short-stay/ShortStayHome'
import ProvideCode from '@/components/views/3-collect/negative-test/provide-code/ProvideCode'
import { FilterTypes } from '@/types/filter-types'

export const RouterNames = {
    HOME: 'ShortStay',
    ASSESSMENT: 'ShortStayProvideAssessmentCode',
    CODE: 'ShortStayProvideCode'
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
            translation: 'views.shortStayProvideCode',
            filter: FilterTypes.VACCINATION_ASSESSMENT,
            clearTestCode: true
        }
    },
    {
        path: '/kort-verblijf-vaccinatie-ophalen',
        component: ProvideCode,
        name: RouterNames.CODE,
        props: {
            showFAQ: false,
            clearTestCode: true
        }
    }
]

export default routes
