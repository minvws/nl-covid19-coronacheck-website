<script>
import Page from '@/components/elements/Page';
import PageIntro from '@/components/elements/PageIntro';
import PageChoice from '@/components/elements/PageChoice';

export default {
    name: 'ChoiceProof',
    components: { Page, PageIntro, PageChoice },
    methods: {
        back() {
            this.$router.push({ name: 'Home' })
        },
        gotoChoiceTestLocation() {
            const ggdEnabled = this.$store.state.holderConfig.ggdEnabled
            if (ggdEnabled) {
                this.$router.push({ name: 'ChoiceTestLocation' });
            } else {
                this.$router.push({ name: 'ProvideCode' });
            }
        },
        gotoCollectRecovery() {
            this.$router.push({ name: 'CollectRecovery' });
        },
        gotoCollectVaccination() {
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
                :intro="$t('views.choiceProof.pageIntro')"/>
            <div class="section-block">
                <div class="page-choices">
                    <PageChoice
                        id="proof-choice-vaccination"
                        @select="gotoCollectVaccination"
                        :header="$t('views.choiceProof.choiceVaccinationHeader')"
                        :body="$t('views.choiceProof.choiceVaccinationBody')"/>
                    <PageChoice
                        id="proof-choice-recovery"
                        @select="gotoCollectRecovery"
                        :header="$t('views.choiceProof.choiceRecoveryHeader')"
                        :body="$t('views.choiceProof.choiceRecoveryBody')"/>
                    <PageChoice
                        id="proof-choice-negative-test"
                        @select="gotoChoiceTestLocation"
                        :header="$t('views.choiceProof.choiceTestHeader')"
                        :body="$t('views.choiceProof.choiceTestBody')"/>
                </div>
            </div>
        </div>
    </Page>
</template>

<style lang="scss">
// .ChoiceProof {}
</style>
