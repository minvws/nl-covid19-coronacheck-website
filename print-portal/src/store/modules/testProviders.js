import _base from './_base-module';
import TestProvider from '@/classes/TestProvider';

const Model = TestProvider;

const state = {
    all: [],
    current: null
};

const getters = {
    ..._base.getters,
    getTestProviderByIdentifier: (state) => (identifier) => {
        const identifierToUpperCase = identifier.toUpperCase();
        return state.all.find(t => t.provider_identifier === identifierToUpperCase);
    }
};

const actions = {};

const mutations = {
    init(state, set) {
        state.all = [];
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
