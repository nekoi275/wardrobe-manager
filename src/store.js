import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        modal: { shown: false, role: '' },
        tablesView: {
            clothes: [],
            jewelry: [],
            old: []
        },
        tablesCache: {
            clothes: [],
            jewelry: [],
            old: []
        },
        currentTable: '',
        headers: [],
        currentData: {},
        filters: { type: [], brand: [], year: [], season: [] },
        sorting: { field: '', isAscending: false },
        sidebar: {
            open: false,
            tabs: {
                filter: false,
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
            state.sidebar.tabs.tables = tab == 'tables';
        },
        deactivateTabs(state) {
            state.sidebar.tabs.filter = false;
            state.sidebar.tabs.tables = false;
        },
        changeModalRole(state, role) {
            state.modal.role = role;
        },
        add(state, data) {
            state.tablesView[state.currentTable].push(data);
        },
        edit(state) {
            var data = this.getters.getById(state.currentData.id);
            Object.assign(data, state.currentData);
        },
        setCurrentData(state, row) {
            state.currentData = row;
        },
        setColor(state, color) {
            state.currentData.color = color;
        },
        remove(state, row) {
            state.tablesView[state.currentTable].splice(this.getters.getArrayIndex(row), 1);
        },
        changeTable(state, tableInfo) {
            state.currentTable = tableInfo.name;
            state.headers = tableInfo.headers;
        },
        move(state, row) {
            state.tablesView[state.currentTable].splice(this.getters.getArrayIndex(row), 1);
            state.tablesView.old.push(Object.assign({}, state.currentData));
        },
        setData(state, data) {
            state.tablesCache[state.currentTable] = data;
        },
        showData(state) {
            var data = state.tablesCache[state.currentTable];
            for (let key in state.filters) {
                let values = state.filters[key];
                if (values.length) {
                    data = data.filter(item => { return values.includes(item[key]) });
                }
            }
            data.sort((item1, item2) => {
                var field = state.sorting.field;
                var result = 0;
                if (item1[field] > item2[field]) {
                    result = 1;
                }
                if (item1[field] < item2[field]) {
                    result = -1;
                }
                if (!state.sorting.isAscending) {
                    result = -result;
                }
                return result;
            });
            state.tablesView[state.currentTable] = data;
        },
        setFilter(state, filter) {
            state.filters[filter.name] = filter.value;
        },
        setSorting(state, sorting) {
            state.sorting = sorting;
        }
    },
    actions: {
        loadData(ctx) {
            fetch("http://46.173.214.223/api/?table=" + ctx.state.currentTable)
                .then(response => {
                    return response.json();
                })
                .then(json => {
                    ctx.commit("setData", json);
                    ctx.commit("showData");
                });
        },
        add(ctx) {
            ctx.state.currentData.table = ctx.state.currentTable;
            fetch("http://46.173.214.223/api/", {
                method: 'POST',
                body: JSON.stringify(ctx.state.currentData),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    return response.json();
                })
                .then(json => ctx.commit("add", json));
        }
    },
    getters: {
        getById: state => id => {
            return state.tablesView[state.currentTable].find(el => {
                return el.id === id
            });
        },
        getArrayIndex: state => el => {
            return state.tablesView[state.currentTable].indexOf(el);
        }
    },
});