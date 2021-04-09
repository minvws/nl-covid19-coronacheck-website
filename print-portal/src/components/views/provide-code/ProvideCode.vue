<script>
import PreferMobile from '@/components/elements/PreferMobile';
import ProvideTestCode from './ProvideTestCode';
import ProvideVerificationCode from './ProvideVerificationCode';
import axios from 'axios';
import TestResult from '@/classes/TestResult';

export default {
    name: 'ProvideCode',
    components: { ProvideVerificationCode, ProvideTestCode, PreferMobile },
    data () {
        return {
            testCodeStatus: {
                error: ''
            },
            verificationCodeStatus: {
                error: '',
                expired: false
            },
            expirationTimer: null
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
        testProviderIdentifier() {
            return this.testCode.split('-')[0];
        },
        testProvider() {
            if (this.testProviderIdentifier) {
                return this.$store.getters['testProviders/getTestProviderByIdentifier'](this.testProviderIdentifier);
            } else {
                return null;
            }
        },
        token() {
            return this.testCode.split('-')[1];
        },
        testResultStatus() {
            return this.$store.state.testResultStatus;
        },
        isTestCodeValid() {
            // todo refine
            return this.testCode.length > 3 && this.token.length > 1 && this.testProvider !== null && this.testProvider !== undefined;
        }
    },
    methods: {
        startExpirationTimer() {
            clearTimeout(this.expirationTimer);
            this.verificationCodeStatus.expired = false;
            this.expirationTimer = setTimeout(() => {
                this.verificationCodeStatus.expired = true;
            }, 10000)
        },
        expire() {
            this.verificationCodeStatus.expired = true;
        },
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
                            this.testCodeStatus.error = '';
                            const testResult = new TestResult(payload.result);
                            this.$store.commit('setTestResult', testResult);
                            this.$store.commit('setSignature', response.data);
                            this.$router.push({ name: 'YourTestResults' });
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
                                this.expire();
                            } else {
                                this.startExpirationTimer();
                            }
                        }

                        if (this.testResultStatus === 'invalid_token') {
                            this.testCodeStatus.error = 'Geen geldige code';
                        }
                    }
                })
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
        },
        async getConfiguration() {
            const url = 'https://api-ct.bananenhalen.nl/v1/holder/config_ctp';
            axios({
                method: 'get',
                url: url
            }).then((response) => {
                if (response.data && response.data.payload) {
                    const config = JSON.parse(atob(response.data.payload));
                    this.$store.commit('testProviders/init', config.corona_test_providers);
                } else {
                    console.error('Something went wrong when retrieving config corona test providers')
                }
            }).catch((error) => {
                console.error(error);
            })
        }
    },
    mounted() {
        this.getConfiguration();
    }
}
</script>

<template>
    <div class="ProvideCode">
        <div class="pagewrap">
            <div class="section">
                <div class="section-block">
                    <h1>
                        Code invullen
                    </h1>
                    <p>
                        Vul de code in die je van je testlocatie hebt gekregen. Of klik op de link in de e-mail die je van je
                        testlocatie hebt ontvangen.
                    </p>

                    <form autocomplete="off">
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
        </div>
    </div>
</template>

<style lang="scss">
.ProvideCode {

}
</style>
