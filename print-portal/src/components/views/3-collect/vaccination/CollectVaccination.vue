<script>
import Page from '@/components/elements/Page';
import PageIntro from '@/components/elements/PageIntro';
import CcButton from '@/components/elements/CcButton';
import { handleRejection } from '@/tools/error-handler';
import NoDigiD from '@/components/views/3-collect/_shared/NoDigiD';
import TooBusyButton from '@/components/elements/TooBusyButton';

export default {
    name: 'CollectVaccination',
    components: { TooBusyButton, NoDigiD, Page, PageIntro, CcButton },
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
                handleRejection(error, { flow: 'vaccination', step: '10', provider_identifier: '000' });
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
                     <CcButton
                         id="digid-vaccination"
                         v-if="!tooBusy"
                         @select="getToken()"
                         :label="$t('components.digid.loginDigid')"/>
                     <NoDigiD/>
                </div>
            </div>
        </div>
    </Page>
</template>

<style lang="scss"></style>
