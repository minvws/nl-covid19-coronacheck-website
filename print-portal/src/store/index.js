import Vue from 'vue';
import Vuex from 'vuex';
import _base from './modules/_base-module';
import modal from './modules/modal';
import languages from './modules/languages';
import testProviders from './modules/testProviders';

Vue.use(Vuex)

const state = {
    holderConfig: null,
    testCode: (process.env.NODE_ENV === 'development') ? 'TST-TTTTTTTTTT-G2' : '',
    verificationCode: (process.env.NODE_ENV === 'development') ? '123456' : '',
    testResultStatus: 'idle',
    verificationNeeded: false,
    testResult: null,
    userConsent: false,
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
    setTestResult(state, testResult) {
        state.testResult = testResult;
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
    giveUserConsent(state) {
        state.userConsent = true;
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
        state.signature = '';
        state.qrCode = '';
        state.qrData = null;
    },
    invalidate(state) {
        state.testCode = '';
        state.verificationCode = '';
        state.verificationNeeded = false;
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
        testProviders
    }
})
