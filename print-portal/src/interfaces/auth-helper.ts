import { handleRejection } from '@/tools/error-handler';
import { StepTypes } from '@/types/step-types'
import { FlowTypes } from '@/types/flow-types'
import { ProviderTypes } from '@/types/provider-types'
import { AuthType } from '@/types/auth-types'

import AuthService from '@/interfaces/authentication';
import Vue from 'vue'

export const authenticate = async (flow: string, auth: AuthType) => {
    try {
        const service = Vue.prototype.getAuthProvider(flow, auth)
        await service.startAuthentication()
    } catch (error) {
        handleRejection(error, {
            flow,
            step: StepTypes.TVS_DIGID,
            provider_identifier: ProviderTypes.NON_PROVIDER
        },
        () => {
            authenticate(flow, auth)
        }
        );
    }
}

type AuthFlow = typeof FlowTypes.VACCINATION | typeof FlowTypes.NEGATIVE_TEST | typeof FlowTypes.RECOVERY

const redirects = {
    [AuthType.MAX]: {
        [FlowTypes.VACCINATION]: 'jouw-vaccinaties-redirect',
        [FlowTypes.NEGATIVE_TEST]: 'jouw-testresultaat-redirect',
        [FlowTypes.RECOVERY]: 'recovery-redirect'
    },
    [AuthType.PAP]: {
        [FlowTypes.VACCINATION]: 'pap-vaccinaties-redirect',
        [FlowTypes.NEGATIVE_TEST]: 'pap-testresultaat-redirect',
        [FlowTypes.RECOVERY]: 'pap-recovery-redirect'
    }
}

const createAuthProviders = (baseUrl: string, auth: AuthType, authority: string) => {
    const urls = redirects[auth]
    return Object.keys(urls).reduce((cul, flow) => {
        const redirect = `${baseUrl}${urls[flow]}`
        cul[flow] = new AuthService(redirect, authority)
        return cul
    }, {} as Record<string, AuthService>)
}

export const createAuthProvider = (baseUrl: string) => {
    const authProviders = {
        [AuthType.MAX]: createAuthProviders(baseUrl, AuthType.MAX, window.config.tvs),
        [AuthType.PAP]: createAuthProviders(baseUrl, AuthType.PAP, window.config.pap)
    }

    return (flow: AuthFlow, auth: AuthType) => {
        if (!auth) alert('no auth specified')
        console.log({ flow, auth });
        return authProviders[auth][flow]
    }
}

export const routeProps = ({ params: { auth = AuthType.MAX, ...params } }) => {
    return {
        ...params,
        auth
    }
}
