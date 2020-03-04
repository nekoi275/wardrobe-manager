const state = {
    shown: false,
    role: '',
    currentData: {},
    currentImage: {}
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
    setImage(state, event) {
        let id = state.currentData.image || Date.now().toString(16);
        console.log(id);
        let formData = new FormData();
        formData.append('image', event.target.files[0]);
        formData.append('id', id);
        state.currentImage = formData;
        state.currentData.image = id;
    }
}

export default {
    state, mutations
}