<script>
import Page from '@/components/elements/Page';
import PageIntro from '@/components/elements/PageIntro';
import PageChoice from '@/components/elements/PageChoice';
import CcModestButton from '@/components/elements/CcModestButton';
import { RouterNames } from '@/qr/router';
import { authenticate } from '@/interfaces/auth-helper'
import { FlowTypes } from '@/types/flow-types';
import { AuthType } from '@/types/auth-types';

export default {
    name: 'ChoiceTestLocation',
    components: { Page, PageIntro, PageChoice, CcModestButton },
    data() {
        return {
            tooBusy: window.config.tooBusy
        }
    },
    computed: {
        buttonProps () {
            // do not show body and icon when PAP is enabled
            if (this.$store.isPapEnabled) {
                return {
                    body: ''
                }
            }
            return {
                body: this.$t('views.choiceTestLocation.choiceGGDBody'),
                'body-icon': 'assets/img/digid/logo_digid_rgb.svg'
            }
        }
    },
    methods: {
        back() {
            this.$router.push({ name: 'ChoiceProof' })
        },
        loginWithDigid() {
            if (this.$store.isPapEnabled) {
                this.$router.push({ name: RouterNames.CHOOSE_TEST_PROFIDER })
            } else {
                authenticate(FlowTypes.NEGATIVE_TEST, AuthType.MAX)
            }
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
                        v-bind="buttonProps"
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
    </Page>
</template>
