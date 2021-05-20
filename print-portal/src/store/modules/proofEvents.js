import _base from './_base-module';
import ProofEvent from '@/classes/events/ProofEvent';

const Model = ProofEvent;

const state = {
    all: []
};

const getters = {
    ..._base.getters
};

const actions = {};

const mutations = {
    create(state, proofEvent) {
        const existingIds = state.all.map(p => p.unique);
        if (existingIds.indexOf(proofEvent.unique) === -1) {
            _base.mutations.create(state, proofEvent, Model);
        }
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
