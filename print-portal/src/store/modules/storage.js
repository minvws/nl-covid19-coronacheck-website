const key = 'withPositiveTest'
const withPositiveTest = localStorage?.getItem(key) === 'true';
localStorage?.removeItem(key);

export const events = {
    WITH_POSITIVE_TEST: 'storage/WITH_POSITIVE_TEST'
}

const state = {
    withPositiveTest
};

const actions = {
    [events.WITH_POSITIVE_TEST]: ({ commit }, value) => {
        commit(events.WITH_POSITIVE_TEST, value)
    }
};

const mutations = {
    [events.WITH_POSITIVE_TEST]: (state, value) => {
        state.withPositiveTest = value
        if (!localStorage) {
            console.warn('no localstorage')
            return
        }
        if (value) localStorage.setItem(key, value);
        else localStorage.removeItem(key);
    }
};

const getters = {
    [events.WITH_POSITIVE_TEST]: ({ withPositiveTest }) => withPositiveTest
};

export default {
    state,
    getters,
    actions,
    mutations
}
