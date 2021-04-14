<script>
import TestResult from './TestResult';
import Navigation from '@/components/elements/Navigation';
import axios from 'axios';

export default {
    name: 'YourTestResults',
    components: { Navigation, TestResult },
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
                    const url = 'https://api-ct.bananenhalen.nl/staticproof/paper';
                    axios({
                        method: 'post',
                        url: url,
                        data: this.signature
                    }).then((response) => {
                        if (response.data.status === 'ok' && response.data.error === 0) {
                            this.$store.commit('setQrCode', response.data.qr.data);
                            this.$router.push({ name: 'Print' });
                        }
                    }).catch((error) => {
                        console.error(error);
                    })
                }
            } else {
                // todo
                console.error('no signature')
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
                            {{translate('yourNegativeTestresult')}}
                        </h2>
                        <p>
                            {{translate('yourNegativeTestresultDirection')}}
                        </p>
                        <div class="YourTestResults__header">
                            {{translate('retrievedTestResult')}}
                            <button
                                @click="goto('HelpTestResult')"
                                type="button"
                                class="info-button">
                            </button>
                        </div>
                        <div class="YourTestResults__results">
                            <TestResult
                                :testResult="testResult"/>
                            <button
                                @click="goto('HelpTestResult')"
                                type="button"
                                class="button-modest">
                                {{translate('somethingIsWrong')}}
                            </button>
                        </div>
                        <div class="section-block__footer">
                            <button
                                @click="createTestCertificate()"
                                type="button"
                                class="button-standard">
                                {{translate('createTestProof')}}
                            </button>
                        </div>
                    </div>

                    <div v-else>
                        <h2>
                            {{translate('noTestResultPresent')}}
                        </h2>
                        <p>
                            {{translate('noTestResultPresentDirection')}}
                        </p>
                        <div class="section-block__footer">
                            <button
                                @click="goBack()"
                                type="button"
                                class="button-standard">
                                {{translate('retrieveTestResult')}}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
