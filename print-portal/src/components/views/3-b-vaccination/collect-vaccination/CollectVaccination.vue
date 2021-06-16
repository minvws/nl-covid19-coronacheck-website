<script>
import Page from '@/components/elements/Page';
import PageIntro from '@/components/elements/PageIntro';
import CcButton from '@/components/elements/CcButton';
import CcModestButton from '@/components/elements/CcModestButton';

export default {
    name: 'CollectVaccination',
    components: { CcModestButton, Page, PageIntro, CcButton },
    computed: {},
    methods: {
        getToken() {
            this.authVaccinations.startAuthentication()
        },
        back() {
            this.$router.push({ name: 'ChoiceProof' })
        },
        dontHaveDigid() {
            window.open('https://www.digid.nl/digid-aanvragen-activeren#hoe-vraag-ik-digid-aan')
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
