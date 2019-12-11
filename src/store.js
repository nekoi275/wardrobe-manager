import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        modal: {open: false, role: ''},
        table: [],
        index: 0,
        currentData: {}
    },
    mutations: {
        modalToggle(state) {
            state.modal.open = !state.modal.open;
        },
        changeModalRole(state, role) {
            state.modal.role = role;
        },
        add(state) {
            var record = Object.assign({
                id: ++state.index
            }, state.currentData);
            state.table.push(record);
        },
        /* edit(state) {
            var data = state.table.find((el) => {el.id == state.currentData.id});
            Object.assign(data, state.currentData);
        }, */
        setCurrentData(state, row) {
            if (row) {
                state.currentData = row;
            } else {
                state.currentData = {
                    type: "",
                    brand: "No name",
                    description: "",
                    price: "0",
                    year: "",
                    season: "Любой"
                }
            }
        }
    },
    actions: {},
    getters: {},
});