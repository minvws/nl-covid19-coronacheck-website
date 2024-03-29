import Vue from 'vue';
import Vuex from 'vuex';
import qr from '@/qr/store/qr'
import _base from './modules/_base-module';
import modal from './modules/modal';
import snackbar from './modules/snackbar';
import languages from './modules/languages';
import testProviders from './modules/testProviders';
import eventProviders from './modules/eventProviders';
import signedEvents from './modules/signedEvents';
import auth from './modules/auth';
import qrs from './modules/qrs';
import storage from './modules/storage';
import { isFuture } from 'date-fns';

Vue.use(Vuex)

const state = {
    // general
    holderConfig: null,
    userConsent: false,
    isUserConsentDisabledOnHome: true, // when true, user does have to accept privacy-consent on home, UserConsent component is not rendered
    // negativeTest v2 flow
    testCode: '',
    verificationNeeded: false,
    verificationCode: (process.env.NODE_ENV === 'development') ? '123456' : '',
    signedAt: null,
    // we keep this registration for the focus of screenreaders.
    visitedHomePage: false,
    slotModalActive: false,
    vaccinationWithPositiveTestEnabled: true, // when true, show a consent and hide all faq's,
    showListBeforeOverview: true, // will show a list of proofs before an overview page
    flow: '', // vaccination | recovery,
    removeExpiredPositiveTestsWithPositiveTest: false, // see TAIGA--4532
    authType: '', // AuthType,
    groupProofsSummaryByProviderName: false
};

const getters = {
    visitorPassEnabled: ({ holderConfig }) => {
        return holderConfig?.visitorPassEnabled === true
    },
    disclosurePolicies: ({ holderConfig }) => {
        return holderConfig?.disclosurePolicies
    },
    isPolicy: (state, { disclosurePolicies }) => policy => {
        if (Array.isArray(disclosurePolicies) && disclosurePolicies.length === 1) {
            return disclosurePolicies[0].toUpperCase() === policy.toUpperCase()
        }
        return false
    },
    isPapEnabled: ({ holderConfig: { papEnabled } }) => {
        return papEnabled;
    },
    vaccinationWithPositiveTestEnabled: ({ vaccinationWithPositiveTestEnabled }) => {
        return vaccinationWithPositiveTestEnabled
    },
    removeExpiredPositiveTestsWithPositiveTest: ({ removeExpiredProofsWithPositiveTest }) => {
        return removeExpiredProofsWithPositiveTest
    },
    is0G: (state, { disclosurePolicies }) => {
        // 0G when disclosurePolicies = []
        return Array.isArray(disclosurePolicies) && !disclosurePolicies.length
    },
    is1G: (state, { isPolicy }) => {
        // 1G when disclosurePolicies = ['1G']
        return isPolicy('1G');
    },
    isListBeforeOverview: ({ showListBeforeOverview }) => {
        return showListBeforeOverview
    },
    isUserConsentDisabledOnHome: ({ isUserConsentDisabledOnHome }) => {
        return isUserConsentDisabledOnHome
    },
    getEuBrand: (state) => (euBrandCode) => {
        return state.holderConfig.euBrands.find(euBrand => euBrand.code === euBrandCode)
    },
    getEuTestType: (state) => (testTypeCode) => {
        return state.holderConfig.euTestTypes.find(euTestType => euTestType.code === testTypeCode)
    },
    getTestManufacturer: (state) => (manufacturer) => {
        const result = state.holderConfig.euTestManufacturers.find(({ code }) => code === manufacturer)
        if (!result) {
            const isName = Number.isNaN(parseInt(manufacturer))
            if (isName) {
                // manufacturer is not in list of test-manufacturers and manufacturer is not a number
                // return manufactor as name
                return { name: manufacturer }
            }
        }
        return result
    },
    euTestName: ({ holderConfig: { euTestNames } }) => (code) => {
        return euTestNames.find(({ code: target }) => target === code)?.name
    },
    getVaccineType: (state) => (vaccineTypeCode) => {
        return state.holderConfig.euVaccinations.find(euVaccination => euVaccination.code === vaccineTypeCode)
    },
    getVaccineManufacturer: (state) => (vaccineManufacturerCode) => {
        return state.holderConfig.euManufacturers.find(euManufacturer => euManufacturer.code === vaccineManufacturerCode)
    },
    getNlTestType: (state) => (testTypeCode) => {
        return state.holderConfig.nlTestTypes.find(nlTestType => nlTestType.code === testTypeCode)
    },
    getVaccineInfo: (state) => (hkpCode) => {
        return state.holderConfig.hpkCodes.find(vaccineInfo => vaccineInfo.code === hkpCode)
    },
    getRecoveryEventValidityDays: (state) => () => {
        // TODO: Remove this once recoveryGreencardRevisedValidityLaunchDate has passed
        const revisedRecoveryValidityDate = new Date(state.holderConfig.recoveryGreencardRevisedValidityLaunchDate)
        if (isFuture(revisedRecoveryValidityDate)) {
            return state.holderConfig.recoveryExpirationDays
        } else {
            return state.holderConfig.recoveryEventValidityDays
        }
    },
    user: ({ user }) => user,
    flow: ({ flow }) => flow,
    authType: ({ authType }) => authType,
    groupProofsSummaryByProviderName: ({ groupProofsSummaryByProviderName }) => groupProofsSummaryByProviderName
};

const mutations = {
    updateProperty(state, payload) {
        return _base.mutations.updateProperty(state, payload);
    },
    setQrCode(state, qrCode) {
        state.qrCode = qrCode;
    },
    clearQrCode(state) {
        state.qrCode = '';
    },
    setQrData(state, qrData) {
        state.qrData = qrData;
    },
    setUserConsent(state, value) {
        state.userConsent = value;
    },
    setHolderConfig(state, holderConfig) {
        state.holderConfig = holderConfig;
    },
    setVerificationNeeded(state, status) {
        state.verificationNeeded = status;
    },
    setSignedAt(state, time) {
        state.signedAt = time;
    },
    setVisitedHomePage(state) {
        state.visitedHomePage = true;
    },
    setSlotModalActivity(state, slotModalActivity) {
        state.slotModalActive = slotModalActivity;
    },
    resetProvideCode(state) {
        // clear all except testcode
        state.verificationCode = '';
        state.verificationNeeded = false;
    },
    clearAll(state) {
        state.testCode = '';
        state.verificationNeeded = false;
        state.verificationCode = '';
        state.signedEvents = { all: [], addedProofs: [], coupling: [] };
        state.qrs.proof = null;
        state.signedAt = null;
        state.flow = null
    },
    sessionEnded(state) {
        state.testCode = '';
        state.verificationNeeded = false;
        state.verificationCode = '';
        state.signedEvents = { all: [], addedProofs: [], coupling: [] };
        state.qrs.proof = null;
        state.userConsent = false;
        state.signedAt = null;
        state.flow = null
    },
    setFlow(state, flow) {
        state.flow = flow;
    },
    setAuthType(state, authType) {
        state.authType = authType;
    }
}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    modules: {
        modal,
        snackbar,
        languages,
        testProviders,
        eventProviders,
        signedEvents,
        qrs,
        auth,
        storage,
        qr
    }
})
