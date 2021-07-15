import Vue from 'vue';
import Vuex from 'vuex';
import _base from './modules/_base-module';
import modal from './modules/modal';
import snackbar from './modules/snackbar';
import languages from './modules/languages';
import testProviders from './modules/testProviders';
import eventProviders from './modules/eventProviders';
import signedEvents from './modules/signedEvents';
import qrs from './modules/qrs';

Vue.use(Vuex)

const state = {
    // general
    holderConfig: null,
    userConsent: false,
    // negativeTest v2 flow
    testCode: (process.env.NODE_ENV === 'development') ? 'TST-TTTTTTTTTT-G2' : '',
    verificationNeeded: false,
    verificationCode: (process.env.NODE_ENV === 'development') ? '123456' : '',
    testResultStatus: 'idle',
    signedAt: null
};

const getters = {
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
    }
};

const mutations = {
    updateProperty(state, payload) {
        return _base.mutations.updateProperty(state, payload);
    },
    setTestResultStatus(state, testResultStatus) {
        state.testResultStatus = testResultStatus;
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
    resetProvideCode(state) {
        // clear all except testcode
        state.verificationCode = '';
        state.verificationNeeded = false;
        state.testResultStatus = 'idle';
    },
    clearAll(state) {
        state.testCode = '';
        state.verificationNeeded = false;
        state.verificationCode = '';
        state.testResultStatus = 'idle';
        state.signedEvents = [];
        state.qrs.proof = null;
        state.signedAt = null;
    },
    sessionEnded(state) {
        state.testCode = '';
        state.verificationNeeded = false;
        state.verificationCode = '';
        state.testResultStatus = 'idle';
        state.signedEvents = [];
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
        qrs
    }
})
