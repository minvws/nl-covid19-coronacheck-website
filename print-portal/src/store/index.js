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
    vaccinationWithPositiveTestEnabled: true // when true, show a consent and hide all faq's
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
    vaccinationWithPositiveTestEnabled: ({ vaccinationWithPositiveTestEnabled }) => {
        return vaccinationWithPositiveTestEnabled
    },
    is0G: (state, { disclosurePolicies }) => {
        // 0G when disclosurePolicies = []
        return Array.isArray(disclosurePolicies) && !disclosurePolicies.length
    },
    is1G: (state, { isPolicy }) => {
        // 1G when disclosurePolicies = ['1G']
        return isPolicy('1G');
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
    getTestManufacturer: (state) => (testManufacturerCode) => {
        return state.holderConfig.euTestManufacturers.find(euTestManufacturer => euTestManufacturer.code === testManufacturerCode)
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
    user: ({ user }) => user
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
        state.signedEvents = []; // @FIXME: are these being used?
        state.qrs.proof = null;
        state.signedAt = null;
    },
    sessionEnded(state) {
        state.testCode = '';
        state.verificationNeeded = false;
        state.verificationCode = '';
        state.signedEvents = []; // @FIXME: are these being used?
        state.qrs.proof = null;
        state.userConsent = false;
        state.signedAt = null;
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
