import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        modalOpen: false,
        modalRole: 'add',
        formData: []
    },
    mutations: {
        modalToggle(state) {
            state.modalOpen = !state.modalOpen;
        },
        changeModalRole(state, role) {
            state.modalRole = role;
        },
        addFormData(state, data) {
            var record = Object.assign({}, data);
            state.formData.push(record);
        }
    },
    actions: {},
    getters: {},
});