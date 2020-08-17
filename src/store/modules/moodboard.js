import api from '../../api/api.js';

const state = {
    shown: false,
    imageURLs: [],
    imageIDs: [],
    currentImage: {}
}

const mutations = {
    toggleMoodboard(state) {
        state.shown = !state.shown;
    },
    setImageUrl(state, id) {
        state.imageURLs.push(api.imageUrl(id));
    },
    setMoodBoardImageForUpload(state, event) {
        let id = "moodboard" + Date.now().toString(16);
        let formData = new FormData();
        formData.append('image', event.target.files[0]);
        formData.append('id', id);
        state.currentImage.file = formData;
        state.currentImage.id = id;
        state.imageIDs.push(id);
    }
}

export default {
    state,
    mutations
}