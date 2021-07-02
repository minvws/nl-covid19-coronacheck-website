import CollectVaccination from '@/components/views/3-collect/vaccination/CollectVaccination'
import VaccinationRedirect from '@/components/views/3-collect/vaccination/happy/VaccinationRedirect'
import VaccinationOverview from '@/components/views/3-collect/vaccination/happy/VaccinationOverview'
import PrintVaccination from '@/components/views/4-print/PrintVaccination';
import VaccinationsNone from '@/components/views/3-collect/vaccination/unhappy/VaccinationsNone'
import VaccinationsNotPossible from '@/components/views/3-collect/vaccination/unhappy/VaccinationsNotPossible'
import VaccinationsIncomplete from '@/components/views/3-collect/vaccination/unhappy/VaccinationsIncomplete'

const vaccinationPages = [
    {
        path: '/vaccinatie-ophalen',
        component: CollectVaccination,
        name: 'CollectVaccination'
    }, {
        path: '/jouw-vaccinaties',
        component: VaccinationOverview,
        name: 'VaccinationOverview'
    }, {
        path: '/jouw-vaccinaties-redirect',
        component: VaccinationRedirect,
        name: 'VaccinationRedirect'
    }, {
        path: '/geen-vaccinaties-beschikbaar',
        component: VaccinationsNone,
        name: 'VaccinationsNone',
        meta: {
            pageHeader: 'error'
        }
    }, {
        path: '/we-kunnen-geen-vaccinatie-bewijs-maken',
        component: VaccinationsNotPossible,
        name: 'VaccinationsNotPossible',
        meta: {
            pageHeader: 'error'
        }
    }, {
        path: '/niet-volledig-gevaccineerd',
        component: VaccinationsIncomplete,
        name: 'VaccinationsIncomplete',
        meta: {
            pageHeader: 'error'
        }
    }, {
        path: '/print-vaccinatie',
        name: 'PrintVaccination',
        component: PrintVaccination
    }
]

export default vaccinationPages
