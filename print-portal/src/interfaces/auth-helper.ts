import { handleRejection } from '@/tools/error-handler';
import { StepTypes } from '@/types/step-types'
import { FlowTypes } from '@/types/flow-types'
import { ProviderTypes } from '@/types/provider-types'

export const digidLogin = async (auth: any) => {
    try {
        await auth.startAuthentication()
    } catch (error) {
        handleRejection(error, {
            flow: FlowTypes.NEGATIVE_TEST,
            step: StepTypes.TVS_DIGID,
            provider_identifier: ProviderTypes.NON_PROVIDER
        },
        () => {
            digidLogin(auth)
        }
        );
    }
}
