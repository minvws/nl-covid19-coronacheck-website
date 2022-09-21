import { AuthType } from '@/types/auth-types'
import { FlowTypes } from '@/types/flow-types'
import { Route } from 'vue-router'

export enum RouterNames {
    PAP_VACCINATION_REDIRECT = 'PAPVaccinationRedirect',
    PAP_POSITIVE_TEST_REDIRECT = 'PAPPositiveTestRedirect',
    PAP_RECOVERY_REDIRECT = 'PAPRecoveryRedirect'
}

const authRedirect = (flow: string, { params, query }: Route) => {
    return {
        query,
        params: {
            ...params,
            flow,
            auth: AuthType.PAP
        },
        replace: true
    }
}

export const Routes = [
    {
        path: '/pap-vaccinaties-redirect',
        name: RouterNames.PAP_VACCINATION_REDIRECT,
        redirect: (route: Route) => {
            return {
                name: 'VaccinationRedirect',
                ...authRedirect(FlowTypes.VACCINATION, route)
            }
        }
    },
    {
        path: '/pap-testresultaat-redirect',
        name: RouterNames.PAP_POSITIVE_TEST_REDIRECT,
        redirect: (route: Route) => {
            return {
                name: 'NegativeTestRedirect',
                ...authRedirect(FlowTypes.NEGATIVE_TEST, route)
            }
        }
    },
    {
        path: '/pap-recovery-redirect',
        name: RouterNames.PAP_RECOVERY_REDIRECT,
        redirect: (route: Route) => {
            return {
                name: 'RecoveryRedirect',
                ...authRedirect(FlowTypes.RECOVERY, route)
            }
        }
    }
]
