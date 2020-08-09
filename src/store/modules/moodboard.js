const state = {
    shown: false
}

const mutations = {
    toggleMoodboard(state) {
        state.shown = !state.shown;
    },
}

export default {
    state,
    mutations
}