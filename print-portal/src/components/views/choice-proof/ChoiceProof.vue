<script>
import Page from '@/components/elements/Page';
import PageChoice from '@/components/elements/PageChoice';

export default {
    name: 'ChoiceProof',
    components: { PageChoice, Page },
    computed: {},
    methods: {
        back() {
            this.$router.push({ name: 'Home' })
        },
        gotoTestPage() {

        },
        gotoVaccinationPage() {

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
                <div v-html="$t('views.choiceProof.pageIntro')"/>
            </div>
            <div class="section-block">
                <PageChoice
                    @select="gotoTestPage"
                    :header="'Test'"
                    :body="'Lorem ipsum'"/>
                <PageChoice
                    @select="gotoVaccinationPage"
                    :header="'Vaccinatie'"
                    :body="'Dolor sit amet'"/>
            </div>
        </div>
    </Page>
</template>

<style lang="scss">
.ChoiceProof {

}
</style>
