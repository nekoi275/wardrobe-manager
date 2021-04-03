const state = {
    shown: false,
    role: '',
    currentData: {},
    currentImage: {},
    previewImage: null
}

const mutations = {
    modalToggle(state) {
        state.previewImage = null;
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
        let formData = new FormData();
        formData.append('image', event.target.files[0]);
        formData.append('id', id);
        state.currentImage = formData;
        state.currentData.image = id;
        const reader = new FileReader();
        reader.onload = function(e) {
            state.previewImage = e.target.result;
        }
        reader.readAsDataURL(event.target.files[0]);
    }
}

export default {
    state, mutations
}