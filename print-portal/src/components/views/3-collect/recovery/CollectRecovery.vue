<script>
import Page from '@/components/elements/Page';
import PageIntro from '@/components/elements/PageIntro';
import { handleRejection } from '@/tools/error-handler';
import NoDigiD from '@/components/views/3-collect/_shared/NoDigiD';
import CcButtonDigiD from '@/components/elements/CcButtonDigiD';
import { StepTypes } from '@/types/step-types'
import { FlowTypes } from '@/types/flow-types'
import { ProviderTypes } from '@/types/provider-types'

export default {
    name: 'CollectRecovery',
    components: { CcButtonDigiD, NoDigiD, Page, PageIntro },
    props: {
        auth: {
            type: String,
            required: true
        }
    },
    computed: {
        flow: () => FlowTypes.RECOVERY
    },
    methods: {
        getToken() {
            this.getAuthProvider(this.flow, this.auth).startAuthentication().then(() => {
                //
            }).catch(error => {
                const callback = () => {
                    this.completeAuthentication();
                }
                handleRejection(error, {
                    flow: this.flow,
                    step: StepTypes.TVS_DIGID,
                    provider_identifier: ProviderTypes.NON_PROVIDER
                },
                callback
                );
            })
        },
        back() {
            this.$router.push({ name: 'ChoiceProof' })
        }
    }
}
</script>

<template>
    <Page
        @back="back">
        <div class="section">
            <PageIntro
                :head="$t('views.collectRecovery.pageHeader')"
                :intro="$t('views.collectRecovery.pageIntro')"/>
            <div class="section-block">
                 <div class="section-block__footer">
                     <CcButtonDigiD
                         id="digid-recovery"
                         @select="getToken()"/>
                     <NoDigiD :flow="flow"/>
                </div>
            </div>
        </div>
    </Page>
</template>

<style lang="scss"></style>
