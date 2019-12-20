import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        modal: { shown: false, role: '' },
        tables: {
            clothes:[],
            jewelry:[],
            old:[]
        },
        currentTable: "clothes",
        headers: [
            "Тип",
            "Производитель",
            "Цвет",
            "Описание",
            "Стоимость",
            "Год покупки",
            "Сезон"
        ],
        index: 0,
        currentData: {},
        sidebar: {
            open: false,
            tabs: {
                filter: false,
                sort: false,
                tables: false
            }
        }
    },
    mutations: {
        modalToggle(state) {
            state.modal.shown = !state.modal.shown;
        },
        sidebarToggle(state) {
            state.sidebar.open = !state.sidebar.open;
        },
        switchTabs(state, tab) {
            state.sidebar.tabs.filter = tab == 'filter';
            state.sidebar.tabs.sort = tab == 'sort';
            state.sidebar.tabs.tables = tab == 'tables';
        },
        deactivateTabs(state) {
            state.sidebar.tabs.filter = false;
            state.sidebar.tabs.sort = false;
            state.sidebar.tabs.tables = false;
        },
        changeModalRole(state, role) {
            state.modal.role = role;
        },
        add(state) {
            var record = Object.assign({
                id: ++state.index
            }, state.currentData);
            state.tables[state.currentTable].push(record);
        },
        edit(state) {
            var data = this.getters.getById(state.currentData.id);
            Object.assign(data, state.currentData);
        },
        setCurrentData(state, row) {
            if (row) {
                state.currentData = row;
            } else {
                state.currentData = {
                    type: "",
                    brand: "No name",
                    color: "",
                    description: "",
                    price: "0",
                    year: new Date().getFullYear(),
                    season: "Любой"
                }
            }
        },
        setColor(state, color) {
            state.currentData.color = color;
        },
        remove(state, row) {
            state.table.splice(this.getters.getArrayIndex(row), 1);
        },
        changeTable(state, tableInfo) {
            state.currentTable = tableInfo.name;
            state.headers = tableInfo.headers;
        }
    },
    actions: {},
    getters: {
        getById: state => id => {
            return state.tables[state.currentTable].find(el => {
                return el.id === id
            });
        },
        getArrayIndex: state => el => {
            return state.tables[state.currentTable].indexOf(el);
        }
    },
});