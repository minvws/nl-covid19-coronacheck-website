import _base from './_base-module';

const state = {
    all: [],
    current: null
};

const getters = {
    ..._base.getters
};

const actions = {};

const mutations = {
    init(state, set) {
        state.all = set;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
