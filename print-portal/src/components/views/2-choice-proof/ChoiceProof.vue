<script>
import Page from '@/components/elements/Page';
import PageChoice from '@/components/elements/PageChoice';

export default {
    name: 'ChoiceProof',
    components: { PageChoice, Page },
    computed: {
        maxValidityHoursForTestResult() {
            return this.$store.state.holderConfig.maxValidityHours
        }
    },
    methods: {
        back() {
            this.$router.push({ name: 'Home' })
        },
        gotoTestPage() {
            this.$router.push({ name: 'ProvideCode' });
        },
        gotoVaccinationPage() {
            this.$router.push({ name: 'CollectVaccination' });
        }
    }
}
</script>

<template>
    <Page
        @back="back">
        <div class="section">
            <div class="section-block">
                <h2>
                    {{$t('views.choiceProof.pageHeader')}}
                </h2>
                <div v-html="$t('views.choiceProof.pageIntro', { maxValidityHoursForTestResult: maxValidityHoursForTestResult })"/>
            </div>
            <div class="section-block">
                <PageChoice
                    @select="gotoTestPage"
                    :header="$t('views.choiceProof.choiceTestHeader')"
                    :body="$t('views.choiceProof.choiceTestBody')"/>
                <PageChoice
                    @select="gotoVaccinationPage"
                    :header="$t('views.choiceProof.choiceVaccinationHeader')"
                    :body="$t('views.choiceProof.choiceVaccinationBody')"/>
            </div>
        </div>
    </Page>
</template>

<style lang="scss">
.ChoiceProof {

}
</style>
