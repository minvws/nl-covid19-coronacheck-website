import Vue from 'vue';
import Vuex from 'vuex';
import _base from './modules/_base-module';
import modal from './modules/modal';
import languages from './modules/languages';
import testProviders from './modules/testProviders';
import proofEvents from './modules/proofEvents';
import Holder from '@/classes/holder/Holder';

Vue.use(Vuex)

const state = {
    holderConfig: null,
    holder: null,
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
        state.holder = new Holder(holder);
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
    invalidate(state) {
        state.testCode = '';
        state.verificationCode = '';
        state.verificationNeeded = false;
        state.testResultStatus = 'idle';
        state.signature = '';
        state.qrCode = '';
        state.qrData = null;
        state.holder = null;
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
