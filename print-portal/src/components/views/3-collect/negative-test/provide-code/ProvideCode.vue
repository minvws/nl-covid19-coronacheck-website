<script>
import Page from '@/components/elements/Page';
import PageIntro from '@/components/elements/PageIntro';
import PreferMobile from '@/components/elements/PreferMobile';
import ProvideTestCode from './ProvideTestCode';
import ProvideVerificationCode from './ProvideVerificationCode';
import luhnModN from '@/tools/luhn-mod-n';
import FaqMobileLink from '@/components/elements/FaqMobileLink';
import { cmsDecode } from '@/tools/cms'
import { hasInternetConnection, messageInternetConnection, getErrorCode } from '@/tools/error-handler';

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
        token() {
            return this.numberOfHyphens > 0 ? this.testCode.split('-')[1] : null;
        },
        // checks
        isTestCodeValid() {
            return this.checkIfHasTwoHyphens &&
                this.checkPrefixLength &&
                this.checkIfHasTestProvider &&
                this.checkSuffixLength &&
                ((this.luhnCheckIsEnabled && this.checkCheckSumIsValid) || !this.luhnCheckIsEnabled);
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
            return this.checkSum ? (this.luhn === this.checkSum) : false;
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
            return this.token ? luhnModN.generateCheckCharacter(this.token.toUpperCase()) : '';
        },
        luhnCheckIsEnabled() {
            return this.$store.state.holderConfig.luhnCheckEnabled;
        }
    },
    methods: {
        submitTestCode() {
            if (this.testCode.length > 0) {
                if (this.checkIfHasTestProvider) {
                    if (this.isTestCodeValid) {
                        this.getSignedResult({ includeVerificationCode: false });
                    } else {
                        this.testCodeStatus.error = this.$t('views.provideCode.invalidTestCode');
                    }
                } else {
                    this.testCodeStatus.error = this.$t('views.provideCode.unknownTestProvider');
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
        addNegativeTest(signedEvent) {
            this.testCodeStatus.error = '';
            this.$store.commit('signedEvents/createAll', [signedEvent]);
            this.$router.push({ name: 'NegativeTestOverview', params: { flow: '2.0' } });
        },
        async getSignedResult(options) {
            return new Promise((resolve, reject) => {
                let data;
                const url = this.testProvider.result_url;
                const headers = {
                    'Authorization': `Bearer ${this.token.toUpperCase()}`,
                    'CoronaCheck-Protocol-Version': '3.0',
                    'Content-Type': 'application/json'
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
                        try {
                            const payload = cmsDecode(response.data.payload);
                            const hasEvents = (payload) => {
                                if (payload.protocolVersion === '3.0') {
                                    return payload.events && payload.events.length > 0;
                                } else {
                                    return payload.result;
                                }
                            }
                            if (payload.status === 'complete') {
                                if (hasEvents(payload)) {
                                    this.addNegativeTest(response.data)
                                } else {
                                    this.$store.commit('clearAll');
                                    this.$router.push({ name: 'TestResultNone' })
                                }
                            } else if (payload.status === 'pending') {
                                this.$store.commit('clearAll');
                                this.$router.push({ name: 'TestResultPending' })
                            }
                        } catch (error) {
                            this.$store.commit('clearAll');
                            this.$router.push({ name: 'ErrorTokenFlow', query: { error: getErrorCode(error, { flow: 'commercial_test', step: '60', provider_identifier: this.testProviderIdentifier, clientSideCode: '030' }) } });
                        }
                    }
                }).catch((error) => {
                    if (!hasInternetConnection()) {
                        messageInternetConnection();
                    } else {
                        const errorCause = this.getCauseOfError(error);
                        const errorCode = getErrorCode(error, { flow: 'commercial_test', step: '50', provider_identifier: this.testProviderIdentifier });
                        switch (errorCause) {
                        case 'invalid_token':
                            this.testCodeStatus.error = this.$t('views.provideCode.invalidTestCode');
                            break;
                        case 'verification_required':
                            this.$store.commit('setVerificationNeeded', true);
                            this.testCodeStatus.error = '';
                            if (options.includeVerificationCode || errorCause === 'invalid_token') {
                                this.verificationCodeStatus.error = this.$t('views.provideCode.invalidVerificationCode');
                            }
                            break;
                        case '429':
                            this.$store.commit('clearAll');
                            this.$router.push({ name: 'ServerBusy', query: { error: errorCode } });
                            break
                        default:
                            this.$router.push({ name: 'ErrorTokenFlow', query: { error: errorCode } });
                            this.$store.commit('clearAll');
                            break
                        }
                    }
                })
            })
        },
        getCauseOfError(error) {
            if (error.response) {
                if (error.response.status === 429) {
                    return '429';
                } else {
                    if (error.response.data && error.response.data.payload) {
                        const payload = cmsDecode(error.response.data.payload);
                        if (payload.status) {
                            return payload.status;
                        } else {
                            return 'unknown_error';
                        }
                    } else {
                        if (error.response.status) {
                            return error.response.status;
                        } else {
                            return 'unknown_error';
                        }
                    }
                }
            } else {
                return 'unknown_error';
            }
        },
        back() {
            const ggdEnabled = this.$store.state.holderConfig.ggdEnabled
            if (ggdEnabled) {
                this.$router.push({ name: 'ChoiceTestLocation' });
            } else {
                this.$router.push({ name: 'ChoiceProof' });
            }
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
