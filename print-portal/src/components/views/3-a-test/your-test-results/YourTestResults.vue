<script>
import Page from '@/components/elements/Page';
import PageIntro from '@/components/elements/PageIntro';
import NegativeTest from './NegativeTest';
import CcButton from '@/components/elements/CcButton';
import CcModestButton from '@/components/elements/CcModestButton';
import signer from '@/interfaces/signer';
import { handleRejection } from '@/tools/error-handler';

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
        gotoPrint() {
            if (this.$store.state.qrs.proof === null) {
                signer.sign(this.$store.state.signedEvents.all).then(response => {
                    this.$store.commit('qrs/add', response.data);
                    this.$router.push({ name: 'PrintTestResult' });
                }).catch(error => {
                    handleRejection(error);
                })
            } else {
                this.$router.push({ name: 'PrintTestResult' });
            }
            this.$store.commit('snackbar/close');
        },
        goBack() {
            const callback = () => {
                this.$store.commit('clearAll')
                this.$router.push({ name: 'ChoiceProof' });
            }
            this.$store.commit('modal/set', {
                messageHead: this.$t('message.info.areYouSureToCancelNegativeTest.head'),
                messageBody: this.$t('message.info.areYouSureToCancelNegativeTest.body'),
                confirm: true,
                confirmAction: callback,
                confirmYes: this.$t('message.info.areYouSureToCancelNegativeTest.yes'),
                confirmNo: this.$t('message.info.areYouSureToCancelNegativeTest.no'),
                closeButton: false,
                confirmAlert: true
            })
            this.$store.commit('snackbar/close');
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
    },
    mounted() {
        if (!this.latestNegativeTestSignedEvent) {
            this.$router.push({ name: 'TestResultNone' });
        }
    }
}
</script>

<template>
    <Page
        @back="goBack"
        class="YourTestResults">
        <div class="section">
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
                        @select="gotoPrint()"
                        :label="$t('views.yourTestResults.createTestProofButton')"/>
                    <div class="button__help-button">
                        <CcModestButton
                            @select="openModalTestResultsSomethingWrong()"
                            :label="$t('views.yourTestResults.somethingIsWrong')"/>
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
