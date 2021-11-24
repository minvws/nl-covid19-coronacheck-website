export const events = {
    USER: 'auth/USER'
}

const state = {
    user: null
};

const actions = {
    [events.USER]: ({ commit }, user) => {
        commit(events.USER, user)
    }
};

const mutations = {
    [events.USER]: (state, user) => {
        state.user = user
    }
};

const getters = {
    [events.USER]: ({ user }) => user
};

export default {
    state,
    getters,
    actions,
    mutations
}
