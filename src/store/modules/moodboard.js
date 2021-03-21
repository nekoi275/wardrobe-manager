import api from '../../api/api.js';

const state = {
    shown: false,
    currentImage: {},
    images: []
}

const mutations = {
    toggleMoodboard(state) {
        if (state.images.length == 0) {
            api.get('moodboard', (data) => {
                data.forEach(element => {
                    state.images.push(element)
                });
            });
        }
        state.shown = !state.shown;
    },
    setMoodboardImage(state, data) {
        state.images.push(data);
        state.currentImage = {};
    },
    setMoodboardImageForUpload(state, event) {
        if (event.target.value) {
            let id = 'moodboard' + Date.now().toString(16);
            let formData = new FormData();
            formData.append('image', event.target.files[0]);
            formData.append('id', id);
            state.currentImage.file = formData;
            state.currentImage.id = id;
        }
    },
    removeImage(state, id) {
        let image = state.images.filter(element => element._id == id)[0];
        api.delete(id, () => {
            state.images.splice(state.images.indexOf(image), 1);
        });
        api.deleteImage(image.id, () => {}, reason => console.error(reason));
    }
}

export default {
    state,
    mutations
}