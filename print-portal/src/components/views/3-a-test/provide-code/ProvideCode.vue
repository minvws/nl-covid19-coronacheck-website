<script>
import Page from '@/components/elements/Page';
import PageIntro from '@/components/elements/PageIntro';
import PreferMobile from '@/components/elements/PreferMobile';
import ProvideTestCode from './ProvideTestCode';
import ProvideVerificationCode from './ProvideVerificationCode';
import luhnModN from '@/tools/luhn-mod-n';
import FaqMobileLink from '@/components/elements/FaqMobileLink';
import { cmsDecode } from '@/tools/cms'

export default {
    name: 'ProvideCode',
    components: { Page, PageIntro, FaqMobileLink, ProvideVerificationCode, ProvideTestCode, PreferMobile },
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
            if (this.testCode.length > 0) {
                if (this.isTestCodeValid) {
                    this.getSignedResult({ includeVerificationCode: false });
                } else {
                    this.testCodeStatus.error = this.$t('views.provideCode.invalidTestCode');
                }
            } else {
                this.testCodeStatus.error = this.$t('views.provideCode.emptyTestCode');
            }
        },
        submitVerificationCode(options) {
            if (this.verificationCode.length > 0) {
                if (this.isVerificationCodeValid) {
                    this.getSignedResult({ includeVerificationCode: true });
                } else {
                    this.verificationCodeStatus.error = this.$t('views.provideCode.invalidVerificationCode');
                }
            } else {
                this.verificationCodeStatus.error = this.$t('views.provideCode.emptyVerificationCode');
            }
        },
        addNegativeTestV2(signedEvent) {
            this.testCodeStatus.error = '';
            this.$store.commit('signedEvents/createAll', [signedEvent]);
            this.$router.push({ name: 'YourTestResult', params: { flow: '2.0' } });
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
                        const payload = cmsDecode(response.data.payload);
                        if (payload.status) {
                            this.$store.commit('setTestResultStatus', payload.status);
                        } else {
                            this.$store.commit('setTestResultStatus', 'unknown_error')
                        }
                        if (this.testResultStatus === 'complete') {
                            this.addNegativeTestV2(response.data)
                        } else if (this.testResultStatus === 'pending') {
                            this.$router.push({ name: 'TestResultPending' })
                        }
                    }
                }).catch((error) => {
                    if (error.response) {
                        const status = error.response.status;
                        switch (status) {
                        case 401:
                            responseForSignedResult = this.handleError(error.response)
                            break;
                        case 403:
                            responseForSignedResult = this.handleError(error.response)
                            break;
                        default:
                            responseForSignedResult = 'unknown_error';
                        }
                        this.$store.commit('setTestResultStatus', responseForSignedResult);

                        if (this.testResultStatus === 'verification_required') {
                            this.$store.commit('setVerificationNeeded', true);
                            this.testCodeStatus.error = '';
                            if (options.includeVerificationCode) {
                                this.verificationCodeStatus.error = this.$t('views.provideCode.invalidVerificationCode');
                            }
                        } else {
                            this.$store.commit('setVerificationNeeded', false);
                        }

                        if (this.testResultStatus === 'invalid_token') {
                            this.testCodeStatus.error = this.$t('invalidTestCode');
                        }

                        if (this.testResultStatus === 'result_blocked') {
                            this.$store.commit('modal/set', {
                                messageHead: this.$t('message.error.general.head'),
                                messageBody: this.$t('message.error.general.body') + '<p>result_blocked</p>',
                                closeButton: true
                            });
                        }
                    } else {
                        this.$store.commit('modal/set', {
                            messageHead: this.$t('message.error.general.head'),
                            messageBody: (this.$t('message.error.general.body') + '<p>' + error + '</p>'),
                            closeButton: true
                        });
                    }
                })
            })
        },
        // setTimerForValidityTestResult(testResult) {
        //     if (this.timer) {
        //         clearTimeout(this.timer);
        //     }
        //     this.$axios({
        //         method: 'get',
        //         url: '/holder/config'
        //     }).then((response) => {
        //         const dateNow = response.headers.date;
        //         const dateSample = testResult.sampleDate;
        //         const maxValidity = this.$store.state.holderConfig.maxValidityHours;
        //         const invalidAt = dateTool.addHoursToDate(dateSample, maxValidity, false);
        //         const timeToInvalidation = invalidAt.getTime() - new Date(dateNow).getTime();
        //         this.timer = setTimeout(() => {
        //             this.$store.commit('clearAll');
        //             this.$store.commit('modal/set', {
        //                 messageHead: this.$t('message.error.expiredTestCode.head'),
        //                 messageBody: this.$t('message.error.expiredTestCode.body'),
        //                 closeButton: true
        //             });
        //             this.$router.push({ name: 'ProvideCode' });
        //         }, timeToInvalidation)
        //     }).catch((error) => {
        //         console.log(error);
        //     })
        // },
        handleError(response) {
            if (response.data && response.data.payload) {
                const payload = cmsDecode(response.data.payload);
                if (payload.status) {
                    return payload.status;
                } else {
                    return 'unknown_error';
                }
            } else {
                return 'unknown_error';
            }
        },
        back() {
            this.$router.push({ name: 'ChoiceTestLocation' });
        }
    }
}
</script>

<template>
    <Page @back="back">
        <div class="section">
            <PageIntro
                :head="$t('views.provideCode.pageHeader')"
                :intro="$t('views.provideCode.pageIntro')"/>
            <div class="section-block">
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
    </Page>
</template>
