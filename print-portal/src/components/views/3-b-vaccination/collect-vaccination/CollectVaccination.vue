<script>
import Page from '@/components/elements/Page';
import PageIntro from '@/components/elements/PageIntro';
import CcButton from '@/components/elements/CcButton';

export default {
    name: 'CollectVaccination',
    components: { Page, PageIntro, CcButton },
    computed: {},
    methods: {
        getToken() {
            this.mgr.startAuthentication();
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
                         :label="$t('views.collectVaccination.loginDigid')"/>
                </div>
            </div>
        </div>
    </Page>
</template>

<style lang="scss"></style>
