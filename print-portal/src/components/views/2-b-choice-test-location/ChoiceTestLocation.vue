<script>
import Page from '@/components/elements/Page';
import PageChoice from '@/components/elements/PageChoice';
import PreferMobile from '@/components/elements/PreferMobile';

export default {
    name: 'ChoiceTestLocation',
    components: { Page, PageChoice, PreferMobile },
    computed: {},
    methods: {
        back() {
            this.$router.push({ name: 'ChoiceProof' })
        },
        loginWithDigid() {
            // digid
        },
        gotoRetrieveTest() {
            this.$router.push({ name: 'ProvideCode' });
        },
        openModal() {
            console.log('modal')
        }
    }
}
</script>

<template>
    <Page @back="back">
        <div class="section">
            <div class="section-block">
                <h2>
                    {{$t('views.choiceTestLocation.pageHeader')}}
                </h2>
                <div v-html="$t('views.choiceTestLocation.pageIntro')"/>
            </div>
            <div class="section-block">
                <div class="page-choices">
                    <PageChoice
                        @select="loginWithDigid"
                        :header="$t('views.choiceTestLocation.choiceGGDHead')"
                        :body="$t('views.choiceTestLocation.choiceGGDBody')"/>
                    <PageChoice
                        @select="gotoRetrieveTest"
                        :header="$t('views.choiceTestLocation.choiceOtherLocation')"
                        :body="''"/>
                </div>
            </div>
            <div class="section-block">
                <button
                    @click="openModal()"
                    type="button"
                    class="button-modest">
                    {{$t('views.choiceTestLocation.didNotGetTestedYet')}}
                </button>
            </div>
        </div>
        <PreferMobile/>
    </Page>
</template>

<style lang="scss">
.ChoiceTestLocation {

}
</style>
