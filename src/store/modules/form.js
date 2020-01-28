const state = {
    shown: false, 
    role: '',
    currentData: {}
}

const mutations = {
    modalToggle(state) {
        state.shown = !state.shown;
    },        
    changeModalRole(state, role) {
        state.role = role;
    },
    setColor(state, color) {
        state.currentData.color = color;
    },
    setCurrentData(state, row) {
        state.currentData = row;
    },
}

export default {
    state, mutations
}