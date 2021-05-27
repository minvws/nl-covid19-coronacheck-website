<script>
import Page from '@/components/elements/Page';
import TestResult from './TestResult';

export default {
    name: 'YourTestResults',
    components: { Page, TestResult },
    computed: {
        testResult() {
            return this.$store.state.testResult;
        },
        signature() {
            return this.$store.state.signature;
        },
        hasQR() {
            return this.$store.state.qrCode.length > 0;
        },
        holderContent() {
            const holder = this.testResult.holder;
            return {
                firstNameInitial: holder.firstNameInitial,
                lastNameInitial: holder.lastNameInitial,
                birthDayStyled: holder.birthDayStyled,
                birthDayMonthStyled: holder.birthDayMonthStyled
            }
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
            this.$router.push({ name: 'ProvideCode' });
        },
        goHome() {
            this.$router.push({ name: 'Home' });
        },
        openModalTestResultsAbout() {
            this.$store.commit('modal/set', {
                messageHead: this.$t('message.info.testResultAbout.head'),
                messageBody: this.$t('message.info.testResultAbout.body', this.holderContent),
                closeButton: true
            })
        },
        openModalTestResultsSomethingWrong() {
            this.$store.commit('modal/set', {
                messageHead: this.$t('message.info.testResultSomethingWrong.head'),
                messageBody: this.$t('message.info.testResultSomethingWrong.body', this.holderContent),
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
            <div class="section-block">
                <div v-if="testResult">
                    <h2>
                        {{$t('views.yourTestResults.pageHeader')}}
                    </h2>
                    <div v-html="$t('views.yourTestResults.pageIntro')"/>
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
                        <TestResult
                            :testResult="testResult"/>
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

                <div v-else>
                    <h2>
                        {{$t('views.yourTestResults.noTestResultPresent')}}
                    </h2>
                    <p>
                        {{$t('views.yourTestResults.noTestResultPresentDirection')}}
                    </p>
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
