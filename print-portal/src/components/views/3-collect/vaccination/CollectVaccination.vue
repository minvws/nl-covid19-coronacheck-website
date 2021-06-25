<script>
import Page from '@/components/elements/Page';
import PageIntro from '@/components/elements/PageIntro';
import CcButton from '@/components/elements/CcButton';
import { handleRejection } from '@/tools/error-handler';
import NoDigiD from '@/components/views/3-collect/_shared/NoDigiD';

export default {
    name: 'CollectVaccination',
    components: { NoDigiD, Page, PageIntro, CcButton },
    computed: {},
    methods: {
        getToken() {
            this.authVaccinations.startAuthentication().then(() => {
                //
            }).catch(error => {
                handleRejection(error);
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
                     <CcButton
                         @select="getToken()"
                         :label="$t('components.digid.loginDigid')"/>
                     <NoDigiD/>
                </div>
            </div>
        </div>
    </Page>
</template>

<style lang="scss"></style>
