<script>
import Page from '@/components/elements/Page';
import PageIntro from '@/components/elements/PageIntro';
import CcButton from '@/components/elements/CcButton';
import { handleRejection } from '@/tools/error-handler';
import NoDigiD from '@/components/views/3-collect/_shared/NoDigiD';

export default {
    name: 'CollectRecovery',
    components: { NoDigiD, Page, PageIntro, CcButton },
    computed: {},
    methods: {
        getToken() {
            this.authRecovery.startAuthentication().then(() => {
                //
            }).catch(error => {
                handleRejection(error, { flow: 'recovery', step: '10', provider_identifier: '000' });
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
                     <CcButton
                         id="digid-recovery"
                         @select="getToken()"
                         :label="$t('components.digid.loginDigid')"/>
                     <NoDigiD/>
                </div>
            </div>
        </div>
    </Page>
</template>

<style lang="scss"></style>
