import Vue from 'vue';
import Vuex from 'vuex';
import _base from './modules/_base-module';
import modal from './modules/modal';
import snackbar from './modules/snackbar';
import languages from './modules/languages';
import testProviders from './modules/testProviders';
import eventProviders from './modules/eventProviders';
import signedEvents from './modules/signedEvents';
import auth from './modules/auth';
import qrs from './modules/qrs';
import { isFuture } from 'date-fns';

Vue.use(Vuex)

const state = {
    // general
    holderConfig: null,
    userConsent: false,
    // negativeTest v2 flow
    testCode: '',
    verificationNeeded: false,
    verificationCode: (process.env.NODE_ENV === 'development') ? '123456' : '',
    signedAt: null,
    // we keep this registration for the focus of screenreaders.
    visitedHomePage: false,
    slotModalActive: false
};

const getters = {
    visitorPassEnabled: ({ holderConfig }) => {
        return holderConfig?.visitorPassEnabled === true
    },
    is1G: ({ holderConfig }) => {
        const policies = holderConfig?.disclosurePolicy
        if (Array.isArray(policies) && policies.length === 1) {
            return policies[0].toUpperCase() === '1G'
        }
        return false
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
    actions: {},
    modules: {
        modal,
        snackbar,
        languages,
        testProviders,
        eventProviders,
        signedEvents,
        qrs,
        auth
    }
})
