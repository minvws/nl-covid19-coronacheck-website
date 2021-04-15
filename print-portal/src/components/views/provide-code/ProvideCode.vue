<script>
import PreferMobile from '@/components/elements/PreferMobile';
import ProvideTestCode from './ProvideTestCode';
import ProvideVerificationCode from './ProvideVerificationCode';
import axios from 'axios';
import TestResult from '@/classes/TestResult';
import luhnModN from '@/tools/luhn-mod-n';
import Navigation from '@/components/elements/Navigation';
import FaqMobileLink from '@/components/elements/FaqMobileLink';
import dateTool from '@/tools/date';
import Footer from '@/components/elements/Footer';

export default {
    name: 'ProvideCode',
    components: { Footer, FaqMobileLink, Navigation, ProvideVerificationCode, ProvideTestCode, PreferMobile },
    data () {
        return {
            testCodeStatus: {
                error: ''
            },
            verificationCodeStatus: {
                error: ''
            }
        }
    },
    computed: {
        showVerificationCodeModule() {
            return this.testResultStatus === 'verification_required' || this.testResultStatus === 'complete';
        },
        testCode() {
            return this.$store.state.testCode;
        },
        verificationCode() {
            return this.$store.state.verificationCode;
        },
        numberOfHyphens() {
            return (this.testCode.match(/-/g) || []).length;
        },
        testProviderIdentifier() {
            return this.numberOfHyphens > 0 ? this.testCode.split('-')[0] : null;
        },
        testProvider() {
            if (this.testProviderIdentifier) {
                return this.$store.getters['testProviders/getTestProviderByIdentifier'](this.testProviderIdentifier);
            } else {
                return null;
            }
        },
        token() {
            return this.numberOfHyphens > 0 ? this.testCode.split('-')[1] : null;
        },
        checksumSet() {
            return this.numberOfHyphens > 1 ? this.testCode.split('-')[2] : null;
        },
        checkSum() {
            return this.checksumSet ? this.checksumSet[0] : null;
        },
        luhn() {
            return luhnModN.generateCheckCharacter(this.token.toUpperCase());
        },
        checkSumIsValid() {
            return this.checkSum ? (this.luhn === this.checkSum) : false;
        },
        testResultStatus() {
            return this.$store.state.testResultStatus;
        },
        isTestCodeValid() {
            return this.numberOfHyphens === 2 &&
                this.testProviderIdentifier.length === 3 &&
                (this.testProvider !== null && this.testProvider !== undefined) &&
                this.checksumSet.length === 2 &&
                this.checkSumIsValid;
        }
    },
    methods: {
        async getSignedResult(includeVerificationCode) {
            return new Promise((resolve, reject) => {
                let responseForSignedResult, data;
                const url = this.testProvider.result_url;
                const headers = {
                    'Authorization': `Bearer ${this.token}`,
                    'CoronaCheck-Protocol-Version': '2.0',
                    'Content-Type': 'application/json'
                };

                if (includeVerificationCode) {
                    data = { 'verificationCode': this.verificationCode };
                } else {
                    data = null;
                }

                axios({
                    method: 'post',
                    headers: headers,
                    url: url,
                    data: data
                }).then((response) => {
                    if (response.data && response.data.payload) {
                        const payload = JSON.parse(atob(response.data.payload));
                        if (payload.status) {
                            this.$store.commit('setTestResultStatus', payload.status);
                        } else {
                            this.$store.commit('setTestResultStatus', 'unknown_error')
                        }
                        if (this.testResultStatus === 'complete') {
                            this.setTimerForValidityTestResult(payload.result);
                            this.testCodeStatus.error = '';
                            const testResult = new TestResult(payload.result);
                            this.$store.commit('setTestResult', testResult);
                            this.$store.commit('setSignature', response.data);
                            this.$router.push({ name: 'YourTestResult' });
                        } else if (this.testResultStatus === 'pending') {
                            this.$router.push({ name: 'TestResultPending' })
                        }
                    }
                }).catch((error) => {
                    if (error.response) {
                        const status = error.response.status;
                        switch (status) {
                        case 401:
                            responseForSignedResult = this.handle401(error.response)
                            break;
                        default:
                            responseForSignedResult = 'unknown_error';
                        }
                        this.$store.commit('setTestResultStatus', responseForSignedResult);

                        if (this.testResultStatus === 'verification_required') {
                            this.testCodeStatus.error = '';
                            if (includeVerificationCode) {
                                this.verificationCodeStatus.error = 'Geen geldige verificatie code';
                            }
                        }

                        if (this.testResultStatus === 'invalid_token') {
                            this.testCodeStatus.error = 'Geen geldige code';
                        }
                    } else {
                        const message = '<strong>Sorry, er gaat iets mis</strong><br><br>Dat komt door een technische fout. Neem contact op met de helpdesk van CoronaCheck.';
                        this.$store.commit('modal/set', { message, closeButton: true });
                    }
                })
            })
        },
        setTimerForValidityTestResult(testResult) {
            const url = 'https://api-ct.bananenhalen.nl/v3/holder/config/';
            axios({
                method: 'get',
                url: url
            }).then((response) => {
                const dateNow = response.headers.date;
                const dateSample = testResult.sampleDate;
                const maxValidity = this.$store.state.holderConfig.maxValidityHours;
                const invalidAt = dateTool.addHoursToDate(dateSample, maxValidity, false);
                const timeToInvalidation = invalidAt.getTime() - new Date(dateNow).getTime();
                setTimeout(() => {
                    const message = 'Uw testuitslag is niet meer geldig';
                    this.$store.commit('invalidate');
                    this.$store.commit('modal/set', { message, closeButton: true });
                    this.$router.push({ name: 'ProvideCode' });
                }, timeToInvalidation)
            }).catch((error) => {
                console.log(error);
            })
        },
        // todo please pay extra attention to this code while reviewing
        handle401(response) {
            if (response.data && response.data.payload) {
                const payload = JSON.parse(atob(response.data.payload));
                if (payload.status) {
                    return payload.status;
                } else {
                    return 'unknown_error';
                }
            } else {
                return 'unknown_error';
            }
        }
    }
}
</script>

<template>
    <div class="ProvideCode">
        <div class="pagewrap">
            <Navigation
                :display-back-button="false"/>
            <div class="section">
                <div class="section-block">
                    <h2>
                        {{translate('enterCode')}}
                    </h2>
                    <p>
                        {{translate('testCodeDirection')}}
                    </p>

                    <form
                        v-on:submit.prevent
                        autocomplete="off">
                        <ProvideTestCode
                            :test-code-status="testCodeStatus"
                            :is-test-code-valid="isTestCodeValid"
                            :get-signed-result="getSignedResult"/>
                        <ProvideVerificationCode
                            v-if="showVerificationCodeModule"
                            :verification-code-status="verificationCodeStatus"
                            :get-signed-result="getSignedResult"/>
                    </form>
                </div>
            </div>
            <PreferMobile/>

            <FaqMobileLink/>
        </div>
        <Footer/>
    </div>
</template>

<style lang="scss">
.ProvideCode {

}
</style>
