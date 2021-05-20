import _base from './_base-module';
import Vaccination from '@/classes/Vaccination';

const Model = Vaccination;

const state = {
    all: []
};

const getters = {
    ..._base.getters
};

const actions = {};

const mutations = {
    init(state, set) {
        return _base.mutations.init(state, set, Model);
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
