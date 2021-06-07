<script>
import Page from '@/components/elements/Page';
import PageIntro from '@/components/elements/PageIntro';
import NegativeTest from './NegativeTest';
import CcButton from '@/components/elements/CcButton';

export default {
    name: 'YourTestResults',
    components: { Page, PageIntro, NegativeTest, CcButton },
    data() {
        return {
            isLoading: true,
            accessToken: ''
        }
    },
    computed: {
        negativeTestProofEvents() {
            return this.$store.getters['signedEvents/getProofEvents']('negativetest');
        },
        latestNegativeTestProofEvent() {
            if (this.negativeTestProofEvents.length > 0) {
                if (this.negativeTestProofEvents.length === 1) {
                    return this.negativeTestProofEvents[0];
                } else {
                    // if there are multiple (which should never be the case actually)
                    // we sort them and pick the most recent
                    const negativeTestProofEvents = this.negativeTestProofEvents.slice();
                    return negativeTestProofEvents.sort((a, b) => {
                        return new Date(b.event.negativetest.sampleDate) - new Date(a.event.negativetest.sampleDate);
                    })[0];
                }
            } else {
                return null;
            }
        },
        signature() {
            return this.$store.state.signature;
        },
        hasQR() {
            return this.$store.state.qrCode.length > 0;
        }
    },
    methods: {
        createTestCertificate() {
            if (this.signature) {
                if (this.hasQR) {
                    this.$router.push({ name: 'PrintTestResult' });
                } else {
                    this.$axios({
                        method: 'post',
                        url: '/holder/paper',
                        data: this.signature
                    }).then((response) => {
                        if (response.data.status === 'ok' && response.data.error === 0) {
                            this.$store.commit('setQrCode', response.data.qr.data);
                            this.$store.commit('setQrData', response.data.qr.attributesIssued);
                            this.$router.push({ name: 'PrintTestResult' });
                        }
                    }).catch((error) => {
                        this.$store.commit('modal/set', {
                            messageHead: this.$t('message.error.general.head'),
                            messageBody: this.$t('message.error.general.body') + '<p>' + error + '</p>',
                            closeButton: true
                        });
                    })
                }
            } else {
                this.$store.commit('modal/set', {
                    messageHead: this.$t('message.error.general.head'),
                    messageBody: this.$t('message.error.general.body'),
                    closeButton: true
                });
            }
        },
        goBack() {
            const callback = () => {
                this.$store.commit('clearAll')
                this.$store.commit('proofEvents/clear')
                if (this.$route.params.flow === '2.0') {
                    this.$router.push({ name: 'ProvideCode' });
                } else {
                    // 3.0 has to skip the redirect page, so we cannot do go(-1)
                    this.$router.push({ name: 'ChoiceTestLocation' });
                }
            }
            this.$store.commit('modal/set', {
                messageHead: this.$t('message.info.areYouSureToCancelNegativeTest.head'),
                messageBody: this.$t('message.info.areYouSureToCancelNegativeTest.body'),
                confirm: true,
                confirmAction: callback,
                confirmYes: this.$t('message.info.areYouSureToCancelNegativeTest.yes'),
                confirmNo: this.$t('message.info.areYouSureToCancelNegativeTest.no'),
                closeButton: false
            })
        },
        goHome() {
            this.$router.push({ name: 'Home' });
        },
        openModalTestResultsSomethingWrong() {
            this.$store.commit('modal/set', {
                messageHead: this.$t('message.info.testResultSomethingWrong.head'),
                messageBody: this.$t('message.info.testResultSomethingWrong.body', this.$store.state.holder),
                closeButton: true
            })
        }
    }
}
</script>

<template>
    <Page
        @back="goBack"
        class="YourTestResults">
        <div class="section">
            <div v-if="latestNegativeTestProofEvent">
                <PageIntro
                    :head="$t('views.yourTestResults.pageHeader')"
                    :intro="$t('views.yourTestResults.pageIntro')"/>

                <div class="section-block">
                    <div class="proof-events">
                        <NegativeTest
                            :signed-event="latestNegativeTestProofEvent"/>
                    </div>
                    <div class="section-block__footer">
                        <CcButton
                            @select="createTestCertificate()"
                            :label="$t('views.yourTestResults.createTestProofButton')"/>
                        <div class="button__help-button">
                            <button
                                @click="openModalTestResultsSomethingWrong()"
                                type="button"
                                class="button-modest">
                                {{$t('views.yourTestResults.somethingIsWrong')}}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div v-else>
                <PageIntro
                    :head="$t('views.yourTestResults.noTestResultPresent')"
                    :intro="$t('views.yourTestResults.noTestResultPresentDirection')"/>

                <div class="section-block">
                    <div class="section-block__footer">
                        <CcButton
                            @select="goHome()"
                            :label="$t('goBackToStart')"/>
                    </div>
                </div>
            </div>
        </div>
    </Page>
</template>

<style lang="scss">
@import "@/styles/variables/index";

.YourTestResults {

    .YourTestResults__header {
        position: relative;
        margin: $length-l 0 $grid-x2 0;
        font-weight: 700;
    }

    .YourTestResults__footer {
        margin-top: 70px;
    }
}
</style>
