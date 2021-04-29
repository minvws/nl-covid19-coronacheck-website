<script>
import PreferMobile from '@/components/elements/PreferMobile';
import ProvideTestCode from './ProvideTestCode';
import ProvideVerificationCode from './ProvideVerificationCode';
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
            },
            timer: null
        }
    },
    computed: {
        testCode() {
            return this.$store.state.testCode;
        },
        verificationCode() {
            return this.$store.state.verificationCode;
        },
        verificationNeeded() {
            return this.$store.state.verificationNeeded;
        },
        testResultStatus() {
            return this.$store.state.testResultStatus;
        },
        token() {
            return this.numberOfHyphens > 0 ? this.testCode.split('-')[1] : null;
        },
        // checks
        isTestCodeValid() {
            return this.checkIfHasTwoHyphens &&
                this.checkPrefixLength &&
                this.checkIfHasTestProvider &&
                this.checkSuffixLength &&
                this.checkCheckSumIsValid;
        },
        isVerificationCodeValid() {
            return this.checkIfIsCorrectLength && this.checkIfIsOnlyNumber;
        },
        checkIfHasTwoHyphens() {
            return this.numberOfHyphens === 2;
        },
        checkPrefixLength() {
            return this.testProviderIdentifier.length === 3;
        },
        checkIfHasTestProvider() {
            return this.testProvider !== null && this.testProvider !== undefined;
        },
        checkSuffixLength() {
            return this.checksumSet.length === 2;
        },
        checkCheckSumIsValid() {
            // return this.checkSum ? (this.luhn === this.checkSum) : false;
            return true;
        },
        checkIfIsCorrectLength() {
            return this.verificationCode.length >= 5;
        },
        checkIfIsOnlyNumber() {
            const pattern = /^\d+$/;
            return pattern.test(this.verificationCode);
        },
        // check helpers
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
        checksumSet() {
            return this.numberOfHyphens > 1 ? this.testCode.split('-')[2] : null;
        },
        checkSum() {
            return this.checksumSet ? this.checksumSet[0] : null;
        },
        luhn() {
            return luhnModN.generateCheckCharacter(this.token.toUpperCase());
        }
    },
    methods: {
        submitTestCode() {
            if (this.isTestCodeValid) {
                this.getSignedResult({ includeVerificationCode: false });
            } else {
                this.testCodeStatus.error = this.translate('invalidTestCode');
            }
        },
        submitVerificationCode(options) {
            if (this.isVerificationCodeValid) {
                this.getSignedResult({ includeVerificationCode: true });
            } else {
                this.verificationCodeStatus.error = this.translate('invalidVerificationCode');
            }
        },
        async getSignedResult(options) {
            return new Promise((resolve, reject) => {
                let responseForSignedResult, data;
                const url = this.testProvider.result_url;
                const headers = {
                    'Authorization': `Bearer ${this.token.toUpperCase()}`,
                    'CoronaCheck-Protocol-Version': '2.0',
                    'Content-Type': 'application/x-www-form-urlencoded'
                };

                if (options.includeVerificationCode) {
                    data = { 'verificationCode': this.verificationCode };
                } else {
                    data = null;
                }

                this.$axios({
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
                            this.$store.commit('setVerificationNeeded', true);
                            this.testCodeStatus.error = '';
                            if (options.includeVerificationCode) {
                                this.verificationCodeStatus.error = this.translate('invalidVerificationCode');
                            }
                        } else {
                            this.$store.commit('setVerificationNeeded', false);
                        }

                        if (this.testResultStatus === 'invalid_token') {
                            this.testCodeStatus.error = this.translate('invalidTestCode');
                        }
                    } else {
                        this.$store.commit('modal/set', {
                            messageHead: this.translate('generalError'),
                            messageBody: (this.translate('generalErrorBody') + '<p>' + error + '</p>'),
                            closeButton: true
                        });
                    }
                })
            })
        },
        setTimerForValidityTestResult(testResult) {
            if (this.timer) {
                clearTimeout(this.timer);
            }
            this.$axios({
                method: 'get',
                url: '/holder/config'
            }).then((response) => {
                const dateNow = response.headers.date;
                const dateSample = testResult.sampleDate;
                const maxValidity = this.$store.state.holderConfig.maxValidityHours;
                const invalidAt = dateTool.addHoursToDate(dateSample, maxValidity, false);
                const timeToInvalidation = invalidAt.getTime() - new Date(dateNow).getTime();
                this.timer = setTimeout(() => {
                    this.$store.commit('invalidate');
                    this.$store.commit('modal/set', {
                        messageHead: this.translate('expiredTestCodeHead'),
                        messageBody: this.translate('expiredTestCodeBody'),
                        closeButton: true
                    });
                    this.$router.push({ name: 'ProvideCode' });
                }, timeToInvalidation)
            }).catch((error) => {
                console.log(error);
            })
        },
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
        },
        goHome() {
            window.location = 'https://coronacheck.nl/nl/';
        }
    }
}
</script>

<template>
    <div class="ProvideCode">
        <div class="pagewrap">
            <Navigation
                :callback-back="goHome"/>
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
                            @submit="submitTestCode"
                            :test-code-status="testCodeStatus"
                            :verification-needed="verificationNeeded"/>
                        <ProvideVerificationCode
                            v-if="verificationNeeded"
                            @submit-test-code="submitTestCode"
                            @submit-verification-code="submitVerificationCode"
                            :verification-code-status="verificationCodeStatus"/>
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
