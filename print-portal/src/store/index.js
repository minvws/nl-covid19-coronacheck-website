import Vue from 'vue';
import Vuex from 'vuex';
import _base from './modules/_base-module';
import modal from './modules/modal';
import languages from './modules/languages';
import testProviders from './modules/testProviders';
import signedEvents from './modules/signedEvents';

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
    // print
    qrCode: '',
    qrData: null
};

const getters = {
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
    reset(state) {
        // clear all except testcode
        state.verificationCode = '';
        state.verificationNeeded = false;
        state.testResultStatus = 'idle';
        state.qrCode = '';
        state.qrData = null;
    },
    clearAll(state) {
        state.testCode = '';
        state.verificationNeeded = false;
        state.verificationCode = '';
        state.testResultStatus = 'idle';
        state.qrCode = '';
        state.qrData = null;
    }
}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions: {},
    modules: {
        modal,
        languages,
        testProviders,
        signedEvents
    }
})
