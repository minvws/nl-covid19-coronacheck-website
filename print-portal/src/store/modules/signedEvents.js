import _base from './_base-module';
import SignedEvent from '@/classes/events/SignedEvent';

const state = {
    all: []
};

const getters = {
    ..._base.getters,
    getDecrypted(state) {
        return state.all.map(signedEvent => {
            return JSON.parse(atob(signedEvent.payload));
        })
    },
    getProofEvents: (state) => (type) => {
        const proofEvents = [];
        for (const signedEvent of state.all) {
            const result = JSON.parse(atob(signedEvent.payload));
            const holder = result.holder;
            for (const event of result.events) {
                if (event.type === type) {
                    proofEvents.push(new SignedEvent({
                        holder,
                        event
                    }))
                }
            }
        }
        return proofEvents;
    }
};

const actions = {};

const mutations = {
    createAll(state, signedEvents) {
        state.all = signedEvents;
    },
    clear(state) {
        state.all = []
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
