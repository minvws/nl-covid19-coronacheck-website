import _base from './_base-module';

const state = {
    proof: null
};

const getters = {
    ..._base.getters
};

const actions = {};

const mutations = {
    add(state, proof) {
        state.proof = proof;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
