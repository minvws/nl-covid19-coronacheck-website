<script>
import TestResult from './TestResult';
import Navigation from '@/components/elements/Navigation';
import Footer from '@/components/elements/Footer';

export default {
    name: 'YourTestResults',
    components: { Footer, Navigation, TestResult },
    computed: {
        testResult() {
            return this.$store.state.testResult;
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
                    this.$router.push({ name: 'Print' });
                } else {
                    this.$axios({
                        method: 'post',
                        url: '/staticproof/paper',
                        data: this.signature
                    }).then((response) => {
                        if (response.data.status === 'ok' && response.data.error === 0) {
                            this.$store.commit('setQrCode', response.data.qr.data);
                            this.$store.commit('setQrData', response.data.qr.attributesIssued);
                            this.$router.push({ name: 'Print' });
                        }
                    }).catch((error) => {
                        this.$store.commit('modal/set', {
                            messageHead: this.$t('generalError'),
                            messageBody: this.$t('generalErrorBody') + '<p>' + error + '</p>',
                            closeButton: true
                        });
                    })
                }
            } else {
                this.$store.commit('modal/set', {
                    messageHead: this.$t('generalError'),
                    messageBody: this.$t('generalErrorBody'),
                    closeButton: true
                });
            }
        },
        goBack() {
            this.$router.push({ name: 'ProvideCode' });
        }
    }
}
</script>

<template>
    <div class="YourTestResults">
        <div class="pagewrap">
            <Navigation
                :display-back-button="testResult !== null"
                :callback-back="goBack"/>
            <div class="section">
                <div class="section-block">
                    <div v-if="testResult">
                        <h2>
                            {{$t('yourNegativeTestresult')}}
                        </h2>
                        <div v-html="$t('yourNegativeTestresultDirection')"/>
                        <div class="YourTestResults__header">
                            {{$t('retrievedTestResult')}}
                            <router-link
                                :to="{ name: 'HelpTestResult', hash: '#HolderIdentityCharacters' }"
                                type="button"
                                class="info-button">
                                <img src="assets/img/icons/info.svg" alt=""/>
                            </router-link>
                        </div>
                        <div class="YourTestResults__results">
                            <TestResult
                                :testResult="testResult"/>
                            <router-link
                                :to="{ name: 'HelpTestResult' }"
                                type="button"
                                class="button-modest">
                                {{$t('somethingIsWrong')}}
                            </router-link>
                        </div>
                        <div class="section-block__footer">
                            <button
                                @click="createTestCertificate()"
                                type="button"
                                class="button-standard">
                                {{$t('createTestProof')}}
                            </button>
                        </div>
                    </div>

                    <div v-else>
                        <h2>
                            {{$t('noTestResultPresent')}}
                        </h2>
                        <p>
                            {{$t('noTestResultPresentDirection')}}
                        </p>
                        <div class="section-block__footer">
                            <button
                                @click="goBack()"
                                type="button"
                                class="button-standard">
                                {{$t('goBackToStart')}}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
    </div>
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
