<script>
import Page from '@/components/elements/Page';
import PageIntro from '@/components/elements/PageIntro';
import { handleRejection } from '@/tools/error-handler';
import NoDigiD from '@/components/views/3-collect/_shared/NoDigiD';
import CcButtonDigiD from '@/components/elements/CcButtonDigiD';
import { Provider, Step } from '@/data/constants/error-codes'

export default {
    name: 'CollectRecovery',
    components: { CcButtonDigiD, NoDigiD, Page, PageIntro },
    computed: {},
    methods: {
        getToken() {
            this.authRecovery.startAuthentication().then(() => {
                //
            }).catch(error => {
                const callback = () => {
                    this.completeAuthentication();
                }
                handleRejection(error, {
                    flow: 'recovery',
                    step: Step.TVS_DIGID,
                    provider_identifier: Provider.NON_PROVIDER
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
                     <NoDigiD/>
                </div>
            </div>
        </div>
    </Page>
</template>

<style lang="scss"></style>
