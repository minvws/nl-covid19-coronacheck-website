<script>
import Page from '@/components/elements/Page';
import PageIntro from '@/components/elements/PageIntro';
import NegativeTest from './NegativeTest';

export default {
    name: 'YourTestResults',
    components: { Page, PageIntro, NegativeTest },
    data() {
        return {
            isLoading: true,
            accessToken: ''
        }
    },
    computed: {
        negativeTestProofEvents() {
            return this.$store.getters['proofEvents/getProofEvents']('negativetest');
        },
        latestNegativeTest() {
            if (this.negativeTestProofEvents.length > 0) {
                const negativeTests = this.negativeTestProofEvents.map(proofEvent => proofEvent.negativetest);
                if (negativeTests.length === 1) {
                    return negativeTests[0];
                } else {
                    // if there are multiple (which should never be the case actually)
                    // we sort them and pick the most recent
                    return negativeTests.sort((a, b) => {
                        return new Date(b.sampleDate) - new Date(a.sampleDate);
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
        },
        holder() {
            return this.$store.state.holder;
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
            if (this.$route.params.flow === '2.0') {
                this.$router.push({ name: 'ProvideCode' });
            } else {
                // 3.0 has to skip the redirect page, so we cannot do go(-1)
                this.$router.push({ name: 'ChoiceTestLocation' });
            }
        },
        goHome() {
            this.$router.push({ name: 'Home' });
        },
        openModalTestResultsAbout() {
            this.$store.commit('modal/set', {
                messageHead: this.$t('message.info.testResultAbout.head'),
                messageBody: this.$t('message.info.testResultAbout.body', this.holder),
                closeButton: true
            })
        },
        openModalTestResultsSomethingWrong() {
            this.$store.commit('modal/set', {
                messageHead: this.$t('message.info.testResultSomethingWrong.head'),
                messageBody: this.$t('message.info.testResultSomethingWrong.body', this.holder),
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
            <div  v-if="latestNegativeTest">
                <PageIntro
                    :head="$t('views.yourTestResults.pageHeader')"
                    :intro="$t('views.yourTestResults.pageIntro')"/>

                <div class="section-block">
                    <div class="YourTestResults__header">
                        {{$t('views.yourTestResults.retrievedTestResult')}}
                        <button
                            @click="openModalTestResultsAbout()"
                            type="button"
                            class="info-button">
                            <img src="assets/img/icons/info.svg" alt=""/>
                        </button>
                    </div>
                    <div class="proof-events">
                        <NegativeTest
                            :negative-test="latestNegativeTest"
                            :holder="holder"/>
                    </div>
                    <div class="section-block__footer">
                        <button
                            @click="createTestCertificate()"
                            type="button"
                            class="btn">
                            {{$t('views.yourTestResults.createTestProofButton')}}
                        </button>
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
                        <button
                            @click="goHome()"
                            type="button"
                            class="btn">
                            {{$t('goBackToStart')}}
                        </button>
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
