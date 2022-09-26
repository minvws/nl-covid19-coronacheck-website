import _base from './_base-module';
import SignedEvent from '@/classes/events/SignedEvent';
import HolderV2 from '@/classes/holder/HolderV2';
import { negativeTestConversionV2ToV3 } from '@/tools/version-conversion'
import ProofEvent from '@/classes/events/ProofEvent';
import HolderV3 from '@/classes/holder/HolderV3';
import { cmsDecode } from '@/tools/cms'

const state = {
    all: [],
    addedProofs: [],
    coupling: []
};

const isInFilter = (types, event, filter) => {
    return types.indexOf(event.type) > -1 || filter === 'all'
}
const getters = {
    ..._base.getters,
    getProofEvents: (state) => (filter) => {
        const types = filter.split(',');
        const proofEvents = [];
        for (const signedEvent of state.all) {
            const result = cmsDecode(signedEvent.payload);
            if (result.protocolVersion === '2.0') {
                const holder = new HolderV2(result.result.holder);
                const convertedProofEvent = negativeTestConversionV2ToV3(result.result);
                const event = new ProofEvent(convertedProofEvent)
                proofEvents.push(new SignedEvent({
                    holder,
                    event
                }))
            } else {
                const holder = new HolderV3(result.holder);
                for (const ev of result.events) {
                    const event = new ProofEvent(ev);
                    const providerIdentifier = result.providerIdentifier;
                    if (isInFilter(types, event, filter)) {
                        proofEvents.push(new SignedEvent({
                            holder,
                            event,
                            providerIdentifier
                        }))
                    }
                }
            }
        }
        state.addedProofs.filter(({ event }) => isInFilter(types, event, filter)).forEach(event => {
            // add QRS to proof events
            proofEvents.push(event)
        })
        return proofEvents;
    },
    all: ({ all, coupling }) => {
        return [...coupling, ...all.map(({ payload, signature, ...lala }) => {
            return {
                payload,
                signature
            }
        })]
    },
    getProofsWithFilterAndScope: ({ all }) => ({ filter, scope } = {}) => {
        return all.filter(event => {
            return event.filter === filter && event.scope === scope;
        })
    }
};

const actions = {
    createAll: ({ commit, dispatch }, payload) => {
        dispatch('clear', payload)
        commit('createAll', payload)
        // clear signed qrs
        commit('qrs/add', null, { root: true });
    },
    addProof: ({ commit }, events) => {
        commit('addProof', events)
        // clear signed qrs
        commit('qrs/add', null, { root: true });
    },
    clear: ({ commit }, { filter, scope }) => {
        commit('clear', { filter, scope })
    },
    clearAll: ({ commit }) => {
        commit('clearAll')
    }
};

const mutations = {
    createAll(state, { events, filter, scope }) {
        // add filter and scope to event, so we can keep track of the event filter
        events.forEach(event => {
            event.filter = filter
            event.scope = scope
        })
        state.all = [...state.all, ...events]
    },
    clear(state, { filter, scope }) {
        state.all = state.all?.filter(({ filter: currentFilter, scope: currentScope }) => {
            return filter !== currentFilter && scope !== currentScope
        }) || []
    },
    clearAll(state) {
        state.all = []
    },
    addProof (state, { issuer, result: { events, holder, ...data }, payload }) {
        events.forEach(event => {
            const signedEvent = new SignedEvent({
                ...data,
                holder: new HolderV3(holder),
                event: new ProofEvent({ issuer, ...event })
            })
            state.addedProofs.push(signedEvent)
        })
        state.coupling.push(payload)
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
