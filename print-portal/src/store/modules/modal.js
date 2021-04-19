const state = {
    visible: false,
    confirm: false,
    confirmAction: null,
    confirmYes: 'Yes',
    confirmNo: 'No',
    messageHead: '...',
    messageBody: '...',
    closeButton: true
};

const getters = {};

const actions = {};

const mutations = {
    set(state, options) {
        state.visible = true;
        state.confirm = options.confirm || false;
        state.confirmAction = options.confirmAction;
        state.confirmYes = options.confirmYes || 'Yes';
        state.confirmNo = options.confirmNo || 'No';
        state.messageHead = options.messageHead;
        state.messageBody = options.messageBody;
        state.closeButton = options.closeButton;
        state.closeAfter = options.closeAfter || false;
    },
    close(state) {
        state.visible = false;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
