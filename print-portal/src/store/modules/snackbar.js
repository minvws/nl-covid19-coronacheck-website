const state = {
    visible: false,
    message: '',
    autoCloseTimeout: 0
};

const getters = {};

const actions = {};

const mutations = {
    message(state, message) {
        state.message = message;
    },
    show(state, { duration } = { duration: 0 }) {
        state.visible = true;

        // if duration, auto close the snackbar after duration, see #TAIGA-4791
        if (state.autoCloseTimeout) {
            clearTimeout(state.autoCloseTimeout)
            state.autoCloseTimeout = 0
        }
        if (!duration) return;
        state.autoCloseTimeout = setTimeout(() => {
            state.visible = false;
        }, duration)
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
