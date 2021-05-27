<script>
import Page from '@/components/elements/Page';
import PageIntro from '@/components/elements/PageIntro';
import PageChoice from '@/components/elements/PageChoice';
import PreferMobile from '@/components/elements/PreferMobile';

export default {
    name: 'ChoiceProof',
    components: { Page, PageIntro, PageChoice, PreferMobile },
    computed: {
        maxValidityHoursForTestResult() {
            return this.$store.state.holderConfig.maxValidityHours
        }
    },
    methods: {
        back() {
            this.$router.push({ name: 'Home' })
        },
        gotoChoiceTestLocation() {
            this.$router.push({ name: 'ChoiceTestLocation' });
        },
        gotoVaccinationPage() {
            this.$router.push({ name: 'CollectVaccination' });
        }
    }
}
</script>

<template>
    <Page @back="back">
        <div class="section">
            <PageIntro
                :head="$t('views.choiceProof.pageHeader')"
                :intro="$t('views.choiceProof.pageIntro', { maxValidityHoursForTestResult: maxValidityHoursForTestResult })"/>
            <div class="section-block">
                <div class="page-choices">
                    <PageChoice
                        @select="gotoChoiceTestLocation"
                        :header="$t('views.choiceProof.choiceTestHeader')"
                        :body="$t('views.choiceProof.choiceTestBody')"/>
                    <PageChoice
                        @select="gotoVaccinationPage"
                        :header="$t('views.choiceProof.choiceVaccinationHeader')"
                        :body="$t('views.choiceProof.choiceVaccinationBody')"/>
                </div>
            </div>
        </div>
        <PreferMobile/>
    </Page>
</template>

<style lang="scss">
.ChoiceProof {

}
</style>
