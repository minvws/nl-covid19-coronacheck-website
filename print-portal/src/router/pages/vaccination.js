import CollectVaccination from '@/components/views/3-collect/vaccination/CollectVaccination'
import VaccinationRedirect from '@/components/views/3-collect/vaccination/happy/VaccinationRedirect'
import VaccinationOverview from '@/components/views/3-collect/vaccination/happy/VaccinationOverview'
import PrintVaccination from '@/components/views/4-print/PrintVaccination';
import VaccinationsNone from '@/components/views/3-collect/vaccination/unhappy/VaccinationsNone'
import VaccinationsNotPossible from '@/components/views/3-collect/vaccination/unhappy/VaccinationsNotPossible'

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
        name: 'VaccinationRedirect',
        meta: {
            title: 'views.vaccinationOverview.pageHeader'
        }
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
        path: '/print-vaccinatie',
        name: 'PrintVaccination',
        component: PrintVaccination,
        meta: {
            title: 'views.printVaccination.both.pageHeader'
        }
    }
]

export default vaccinationPages
