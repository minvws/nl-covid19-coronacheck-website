import Vue from 'vue';
import Vuex from 'vuex';
import _base from './modules/_base-module';
import modal from './modules/modal';
import languages from './modules/languages';
import testProviders from './modules/testProviders';

Vue.use(Vuex)

const state = {
    holderConfig: null,
    // todo remove before publication
    testCode: 'TST-TTTTTTTTTT-G2',
    // testCode: 'TST-STRXBJG8888-52',
    verificationCode: '123456',
    testResultStatus: 'idle',
    testResult: null,
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
    setHolderConfig(state, holderConfig) {
        state.holderConfig = holderConfig;
    },
    invalidate(state) {
        state.testCode = '';
        state.verificationCode = '';
        state.testResultStatus = '';
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
