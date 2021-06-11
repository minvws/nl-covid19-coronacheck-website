<script>
import Page from '@/components/elements/Page';
import PageIntro from '@/components/elements/PageIntro';
import NegativeTest from './NegativeTest';
import CcButton from '@/components/elements/CcButton';
import CcModestButton from '@/components/elements/ccModestButton';

export default {
    name: 'YourTestResults',
    components: { Page, PageIntro, NegativeTest, CcButton, CcModestButton },
    data() {
        return {
            isLoading: true,
            accessToken: ''
        }
    },
    computed: {
        negativeTestSignedEvents() {
            return this.$store.getters['signedEvents/getProofEvents']('negativetest');
        },
        latestNegativeTestSignedEvent() {
            if (this.negativeTestSignedEvents.length > 0) {
                if (this.negativeTestSignedEvents.length === 1) {
                    return this.negativeTestSignedEvents[0];
                } else {
                    // if there are multiple (which should never be the case actually)
                    // we sort them and pick the most recent
                    const negativeTestSignedEvents = this.negativeTestSignedEvents.slice();
                    return negativeTestSignedEvents.sort((a, b) => {
                        return new Date(b.event.negativetest.sampleDate) - new Date(a.event.negativetest.sampleDate);
                    })[0];
                }
            } else {
                return null;
            }
        },
        signedEvents() {
            return this.$store.state.signedEvents.all;
        },
        hasQR() {
            return this.$store.state.qrCode.length > 0;
        }
    },
    methods: {
        createTestCertificate() {
            if (this.signedEvents.length > 0) {
                if (this.hasQR) {
                    this.$router.push({ name: 'PrintTestResult' });
                } else {
                    this.$axios({
                        method: 'post',
                        url: '/holder/paper',
                        data: { events: this.signedEvents }
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
                this.$store.commit('signedEvents/clear')
                this.$router.push({ name: 'ChoiceProof' });
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
            <div v-if="latestNegativeTestSignedEvent">
                <PageIntro
                    :head="$t('views.yourTestResults.pageHeader')"
                    :intro="$t('views.yourTestResults.pageIntro')"/>

                <div class="section-block">
                    <div class="proof-events">
                        <NegativeTest
                            :signed-event="latestNegativeTestSignedEvent"/>
                    </div>
                    <div class="section-block__footer">
                        <CcButton
                            @select="createTestCertificate()"
                            :label="$t('views.yourTestResults.createTestProofButton')"/>
                        <div class="button__help-button">
                            <CcModestButton
                                @select="openModalTestResultsSomethingWrong()"
                                :label="$t('views.yourTestResults.somethingIsWrong')"/>
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
