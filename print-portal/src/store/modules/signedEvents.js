import _base from './_base-module';
import SignedEvent from '@/classes/events/SignedEvent';
import HolderV2 from '@/classes/holder/HolderV2';
import { negativeTestConversionV2ToV3 } from '@/tools/version-conversion'
import ProofEvent from '@/classes/events/ProofEvent';
import HolderV3 from '@/classes/holder/HolderV3';
import { cmsDecode } from '@/tools/cms'

const state = {
    all: []
};

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
                    if (types.indexOf(event.type) > -1 || filter === 'all') {
                        proofEvents.push(new SignedEvent({
                            holder,
                            event,
                            providerIdentifier
                        }))
                    }
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
