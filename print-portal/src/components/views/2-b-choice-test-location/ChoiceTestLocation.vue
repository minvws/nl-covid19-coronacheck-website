<script>
import Page from '@/components/elements/Page';
import PageIntro from '@/components/elements/PageIntro';
import PageChoice from '@/components/elements/PageChoice';
import PreferMobile from '@/components/elements/PreferMobile';
import CcModestButton from '@/components/elements/CcModestButton';
import { handleRejection } from '@/tools/error-handler';

export default {
    name: 'ChoiceTestLocation',
    components: { Page, PageIntro, PageChoice, PreferMobile, CcModestButton },
    data() {
        return {
            tooBusy: window.config.tooBusy
        }
    },
    computed: {},
    methods: {
        back() {
            this.$router.push({ name: 'ChoiceProof' })
        },
        loginWithDigid() {
            this.authNegativeTests.startAuthentication().then(() => {
                //
            }).catch(error => {
                const callback = () => {
                    this.loginWithDigid();
                }
                handleRejection(error, { flow: 'negativetest', step: '10', provider_identifier: '000' }, callback);
            })
        },
        gotoRetrieveTest() {
            this.$router.push({ name: 'ProvideCode' });
        },
        openModal() {
            this.$store.commit('modal/set', {
                messageHead: this.$t('message.info.didNotGetTestedYet.head'),
                messageBody: this.$t('message.info.didNotGetTestedYet.body'),
                closeButton: true
            })
        }
    }
}
</script>

<template>
    <Page @back="back">
        <div class="section">
            <PageIntro
                :head="$t('views.choiceTestLocation.pageHeader')"
                :intro="$t('views.choiceTestLocation.pageIntro')"/>
            <div class="section-block">
                <div class="page-choices">
                    <PageChoice
                        id="digid-negative-test"
                        @select="loginWithDigid"
                        :header="$t('views.choiceTestLocation.choiceGGDHead')"
                        :body="$t('views.choiceTestLocation.choiceGGDBody')"
                        :body-icon="'assets/img/digid/logo_digid_rgb.svg'"
                        :inactive="tooBusy"/>
                    <div class="too-busy-message" v-if="tooBusy">
                        {{$t('tooBusy')}}
                    </div>
                    <PageChoice
                        id="other-location-negative-test"
                        @select="gotoRetrieveTest"
                        :header="$t('views.choiceTestLocation.choiceOtherLocation')"
                        :body="''"/>
                </div>
            </div>
            <div class="section-block">
                <CcModestButton
                    id="not-yet-tested"
                    @select="openModal()"
                    :label="$t('views.choiceTestLocation.didNotGetTestedYet')"/>
            </div>
        </div>
        <PreferMobile/>
    </Page>
</template>

<style lang="scss">
.ChoiceTestLocation {

}
</style>
