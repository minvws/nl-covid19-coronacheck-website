const state = {
    visible: false,
    closeOnPageChange: false,
    message: ''
};

const getters = {
    closeOnPageChange: ({ closeOnPageChange }) => closeOnPageChange
};

const actions = {

};

const mutations = {
    message(state, message) {
        state.message = message;
    },
    show(state) {
        state.visible = true;
    },
    close(state, closeOnPageChange = false) {
        if (closeOnPageChange) {
            state.closeOnPageChange = true
            return
        }
        state.visible = false;
        state.closeOnPageChange = false
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
