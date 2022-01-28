<script>
import Page from '@/components/elements/Page';
import PageIntro from '@/components/elements/PageIntro';
import PreferMobile from '@/components/elements/PreferMobile';
import ProvideTestCode from './ProvideTestCode';
import ProvideVerificationCode from './ProvideVerificationCode';
import UserConsent from '@/components/views/1-home/UserConsent';
import ErrorLabel from '@/components/elements/ErrorLabel';
import luhnModN from '@/tools/luhn-mod-n';
import FaqMobileLink from '@/components/elements/FaqMobileLink';
import { cmsDecode } from '@/tools/cms'
import { hasInternetConnection, messageInternetConnection, getErrorCode } from '@/tools/error-handler';
import { ClientCode } from '@/data/constants/error-codes'
import { StepTypes } from '@/types/step-types'
import { FlowTypes } from '@/types/flow-types'
import { RegionTypes } from '@/types/region-types'

export default {
    name: 'ProvideCode',
    components: { Page, PageIntro, FaqMobileLink, ProvideVerificationCode, ProvideTestCode, PreferMobile, UserConsent, ErrorLabel },
    props: {
        showFAQ: {
            type: Boolean,
            required: false,
            default: true
        },
        translation: {
            type: String,
            required: false,
            default: 'views.provideCode'
        },
        filter: {
            type: String,
            required: false,
            default: undefined
        },
        clearTestCode: {
            type: Boolean,
            required: false,
            default: false
        },
        historyBack: {
            type: Boolean,
            required: false,
            default: false
        },
        exclude: {
            type: String,
            required: false
        },
        needsConsent: {
            type: Boolean,
            required: false,
            default: false
        },
        redirect: {
            type: Object,
            required: false
        },
        clearSignedEvents: {
            type: Boolean,
            required: false
        }
    },
    data () {
        return {
            testCodeStatus: {
                error: ''
            },
            verificationCodeStatus: {
                error: ''
            },
            timer: null,
            clickedNext: false
        }
    },
    mounted () {
        if (this.clearSignedEvents) {
            this.$store.dispatch('signedEvents/clearAll')
        }
        if (this.exclude === RegionTypes.SHORT_STAY) {
            const assessment = this.$store.getters['signedEvents/getProofEvents'](this.redirect.filter).length > 0
            if (!assessment) this.$router.replace({ name: this.redirect.name })
        }
    },
    computed: {
        consent() {
            return this.$store.state.userConsent;
        },
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
        setUserConsent(value) {
            this.$store.commit('setUserConsent', value);
        },
        submitTestCode() {
            this.clickedNext = true;
            if (this.needsConsent && !this.consent) {
                return
            }

            if (this.testCode.length > 0) {
                if (this.checkIfHasTestProvider) {
                    if (this.isTestCodeValid) {
                        this.getSignedResult({ includeVerificationCode: false });
                    } else {
                        this.testCodeStatus.error = this.translate('invalidTestCode');
                    }
                } else {
                    this.testCodeStatus.error = this.translate('unknownTestProvider');
                }
            } else {
                this.testCodeStatus.error = this.translate('emptyTestCode');
            }
        },
        submitVerificationCode(options) {
            if (this.verificationCode.length > 0) {
                if (this.isVerificationCodeValid) {
                    this.getSignedResult({ includeVerificationCode: true });
                } else {
                    this.verificationCodeStatus.error = this.translate('invalidVerificationCode');
                }
            } else {
                this.verificationCodeStatus.error = this.translate('emptyVerificationCode');
            }
        },
        addNegativeTest(signedEvent) {
            this.testCodeStatus.error = '';
            this.$store.dispatch('signedEvents/createAll', { events: [signedEvent], filter: this.filter });
            const type = this.historyBack ? 'replace' : 'push'
            this.$router[type]({ name: 'NegativeTestOverview', params: { flow: '2.0', filter: this.filter, exclude: this.exclude } });
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
                            const errorCode = getErrorCode(error, {
                                flow: FlowTypes.COMMERCIAL_TEST,
                                step: StepTypes.STORING,
                                provider_identifier: this.testProviderIdentifier,
                                clientSideCode: ClientCode.JSON.DECODE_ERROR
                            })
                            this.$router.push({ name: 'ErrorTokenFlow', query: { error: errorCode } });
                        }
                    }
                }).catch((error) => {
                    const callback = () => {
                        this.getSignedResult(options);
                    }
                    if (!hasInternetConnection()) {
                        messageInternetConnection(callback);
                    } else {
                        const errorCause = this.getCauseOfError(error);
                        const errorCode = getErrorCode(error, {
                            flow: FlowTypes.COMMERCIAL_TEST,
                            step: StepTypes.EVENT,
                            provider_identifier: this.testProviderIdentifier
                        });
                        switch (errorCause) {
                        case 'invalid_token':
                            this.testCodeStatus.error = this.translate('invalidTestCode');
                            break;
                        case 'verification_required':
                            this.$store.commit('setVerificationNeeded', true);
                            this.testCodeStatus.error = '';
                            if (options.includeVerificationCode || errorCause === 'invalid_token') {
                                this.verificationCodeStatus.error = this.translate('invalidVerificationCode');
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
            if (this.historyBack) {
                this.$router.go(-1)
                return
            }
            const ggdEnabled = this.$store.state.holderConfig.ggdEnabled
            if (ggdEnabled) {
                this.$router.push({ name: 'ChoiceTestLocation' });
            } else {
                this.$router.push({ name: 'ChoiceProof' });
            }
        },
        translate (id) {
            return this.$t(`${this.translation}.${id}`)
        }
    }
}
</script>

<template>
    <Page @back="back">
        <div class="section">
            <PageIntro
                :head="translate('pageHeader')"
                :intro="translate('pageIntro')"/>
            <div class="section-block">
                <form
                    v-on:submit.prevent
                    autocomplete="off">
                    <ProvideTestCode
                        @submit="submitTestCode"
                        :translation="translation"
                        :test-code-status="testCodeStatus"
                        :clear-test-code="clearTestCode"
                        :verification-needed="verificationNeeded">
                        <UserConsent
                            v-if="needsConsent"
                            @update="setUserConsent"
                            :consent="consent"
                            :label="$t('views.home.userConsentText')"
                        />
                        <ErrorLabel
                            v-if="clickedNext && !consent"
                            :label="$t('views.home.noConsentError')"/>
                    </ProvideTestCode>
                    <ProvideVerificationCode
                        v-if="verificationNeeded"
                        @submit-test-code="submitTestCode"
                        @submit-verification-code="submitVerificationCode"
                        :verification-code-status="verificationCodeStatus" />
                </form>
            </div>
        </div>
        <template v-if="showFAQ">
            <PreferMobile/>
            <FaqMobileLink/>
        </template>
    </Page>
</template>
