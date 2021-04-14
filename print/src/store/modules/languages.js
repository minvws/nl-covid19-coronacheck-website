import _base from './_base-module';
import Language from '@/classes/Language';

const Model = Language;

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
        return _base.mutations.init(state, set, Model);
    },
    setCurrent(state, item) {
        return _base.mutations.setCurrent(state, item)
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
