const state = {
    visible: false,
    message: ''
};

const getters = {};

const actions = {};

const mutations = {
    message(state, message) {
        state.message = message;
    },
    show(state) {
        state.visible = true;
    },
    close(state) {
        state.visible = false;
        state.message = '';
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
