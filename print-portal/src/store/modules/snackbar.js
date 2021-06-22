const state = {
    visible: false,
    message: ''
};

const getters = {};

const actions = {};

const mutations = {
    message(state, message) {
        state.visible = true;
        state.message = message;
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
