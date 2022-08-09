import _base from './_base-module';
import EventProvider from '@/classes/EventProvider';
import { UsageTypes } from '@/types/usage-types'

const Model = EventProvider;

const state = {
    all: [],
    current: null
};

const getters = {
    ..._base.getters,
    getTestProviderByIdentifier: (state) => (identifier) => {
        const identifierToUpperCase = identifier.toUpperCase();
        const provider = state.all.find(t => t.provider_identifier === identifierToUpperCase)
        return provider
    },
    getTestProviderByIdentifierAndUsage: (state, { getTestProviderByIdentifier }) => (identifier, filter, auth) => {
        const provider = getTestProviderByIdentifier(identifier)
        if (!filter) return provider
        if (!provider?.usage) return false
        if (!provider.auth?.includes(auth)) return false // auth type does not match
        const usage = provider.usage.map(usage => UsageTypes[usage])
        const filters = filter.split(',')
        const isValidUsage = filters.filter(filter => usage.includes(filter)).length === filters.length
        if (!isValidUsage) return false
        return provider
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
