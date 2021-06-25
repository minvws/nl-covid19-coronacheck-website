<script>
import Page from '@/components/elements/Page';
import PageIntro from '@/components/elements/PageIntro';
import CcButton from '@/components/elements/CcButton';
import CcModestButton from '@/components/elements/CcModestButton';
import { handleRejection } from '@/tools/error-handler';
import TooBusyButton from '@/components/elements/TooBusyButton';

export default {
    name: 'CollectVaccination',
    components: { TooBusyButton, CcModestButton, Page, PageIntro, CcButton },
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
                handleRejection(error);
            })
        },
        back() {
            this.$router.push({ name: 'ChoiceProof' })
        },
        dontHaveDigid() {
            const urls = {
                nl: 'https://www.digid.nl/digid-aanvragen-activeren#hoe-vraag-ik-digid-aan',
                en: 'https://www.digid.nl/en/apply-or-activate-digid'
            }
            window.open(urls[this.currentLanguage.locale])
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
                         v-if="!tooBusy"
                         @select="getToken()"
                         :label="$t('views.collectVaccination.loginDigid')"/>
                     <div>
                         <CcModestButton
                             @select="dontHaveDigid"
                             :label="$t('views.collectVaccination.dontHaveDigid')"
                             :margin-top="true"/>
                     </div>
                </div>
            </div>
        </div>
    </Page>
</template>

<style lang="scss"></style>
