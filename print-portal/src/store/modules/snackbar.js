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
    show(state) {
        state.visible = true;
    },
    close(state, { duration } = { duration: 0 }) {
        // if duration, auto close the snackbar after duration, see #TAIGA-4791
        if (state.autoCloseTimeout) {
            clearTimeout(state.autoCloseTimeout)
            state.autoCloseTimeout = 0
        }
        if (duration) {
            state.autoCloseTimeout = setTimeout(() => {
                state.visible = false;
                state.message = '';
                state.autoCloseTimeout = 0;
            }, duration)
            return
        }
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
