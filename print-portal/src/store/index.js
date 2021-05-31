import Vue from 'vue';
import Vuex from 'vuex';
import _base from './modules/_base-module';
import modal from './modules/modal';
import languages from './modules/languages';
import testProviders from './modules/testProviders';
import proofEvents from './modules/proofEvents';

Vue.use(Vuex)

const state = {
    // general
    holderConfig: null,
    userConsent: false,
    holder: null,
    // negativeTest v2 flow
    testCode: (process.env.NODE_ENV === 'development') ? 'TST-TTTTTTTTTT-G2' : '',
    verificationNeeded: false,
    verificationCode: (process.env.NODE_ENV === 'development') ? '123456' : '',
    testResultStatus: 'idle',
    // print
    signature: null,
    qrCode: '',
    qrData: null
};

const mutations = {
    updateProperty(state, payload) {
        return _base.mutations.updateProperty(state, payload);
    },
    setTestResultStatus(state, testResultStatus) {
        state.testResultStatus = testResultStatus;
    },
    setSignature(state, signature) {
        state.signature = signature;
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
    updateHolder(state, holder) {
        state.holder = holder;
    },
    reset(state) {
        // clear all except testcode
        state.verificationCode = '';
        state.verificationNeeded = false;
        state.testResultStatus = 'idle';
        state.signature = '';
        state.qrCode = '';
        state.qrData = null;
        state.holder = null;
    },
    clearAll(state) {
        state.holder = null;
        state.testCode = '';
        state.verificationNeeded = false;
        state.verificationCode = '';
        state.testResultStatus = 'idle';
        state.signature = '';
        state.qrCode = '';
        state.qrData = null;
    }
}

export default new Vuex.Store({
    state,
    mutations,
    actions: {},
    modules: {
        modal,
        languages,
        testProviders,
        proofEvents
    }
})
