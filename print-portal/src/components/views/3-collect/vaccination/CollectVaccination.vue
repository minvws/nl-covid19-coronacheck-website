<script>
import Page from '@/components/elements/Page';
import PageIntro from '@/components/elements/PageIntro';
import { handleRejection } from '@/tools/error-handler';
import NoDigiD from '@/components/views/3-collect/_shared/NoDigiD';
import TooBusyButton from '@/components/elements/TooBusyButton';
import CcButtonDigiD from '@/components/elements/CcButtonDigiD';
import { StepTypes } from '@/types/step-types'
import { FlowTypes } from '@/types/flow-types'
import { ProviderTypes } from '@/types/provider-types'

export default {
    name: 'CollectVaccination',
    components: { CcButtonDigiD, TooBusyButton, NoDigiD, Page, PageIntro },
    data() {
        return {
            tooBusy: window.config.tooBusy
        }
    },
    computed: {},
    methods: {
        getToken() {
            this.authVaccinations.startAuthentication().then(() => {
                //
            }).catch(error => {
                const callback = () => {
                    this.getToken();
                }
                handleRejection(error, {
                    flow: FlowTypes.VACCINATION,
                    step: StepTypes.TVS_DIGID,
                    provider_identifier: ProviderTypes.NON_PROVIDER
                }, callback);
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
                :head="$t('views.collectVaccination.pageHeader')"
                :intro="$t('views.collectVaccination.pageIntro')"/>
            <div class="section-block">
                 <div class="section-block__footer">
                     <TooBusyButton v-if="tooBusy"/>
                     <CcButtonDigiD
                         id="digid-vaccination"
                         v-if="!tooBusy"
                         @select="getToken()"/>
                     <NoDigiD/>
                </div>
            </div>
        </div>
    </Page>
</template>

<style lang="scss"></style>
