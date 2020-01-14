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
        edit(state, data) {
            var record = this.getters.getById(data._id);
            Object.assign(record, data);
        },
        setCurrentData(state, row) {
            state.currentData = row;
        },
        setColor(state, color) {
            state.currentData.color = color;
        },
        remove(state, id) {
            var index = this.getters.getArrayIndex(this.getters.getById(id));
            state.tablesCache[state.currentTable].splice(index, 1);
        },
        changeTable(state, tableInfo) {
            state.currentTable = tableInfo.name;
            state.headers = tableInfo.headers;
            window.location.hash = tableInfo.name;
        },
        move(state, row) {
            state.tablesCache[state.currentTable].splice(this.getters.getArrayIndex(row), 1);
            state.tablesCache[row.table].push(Object.assign({}, state.currentData));
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
        removeAllFilters(state) {
            state.filters = { type: [], brand: [], year: [], season: [] };
        },
        setSorting(state, sorting) {
            state.sorting = sorting;
        }
    },
    actions: {
        loadData(ctx) {
            fetch("api/?table=" + ctx.state.currentTable)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw Error("get error. Status: " + response.statusText);
                    }
                })
                .then(json => {
                    ctx.commit("setData", json);
                    ctx.commit("showData");
                })
                .catch(reason => console.error(reason));
        },
        add(ctx) {
            ctx.state.currentData.table = ctx.state.currentTable;
            fetch("api/", {
                method: 'POST',
                body: JSON.stringify(ctx.state.currentData),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw Error("create error. Status: " + response.statusText);
                    }
                })
                .then(json => ctx.commit("add", json))
                .catch(reason => console.error(reason));
        },
        edit(ctx, table) {
            if (table) {
                ctx.state.currentData.table = table;
            } else {
                ctx.state.currentData.table = ctx.state.currentTable;
            }
            var update = Object.assign({}, ctx.state.currentData);
            delete update._id;
            var data = {
                query: {
                    '_id': ctx.state.currentData._id
                },
                update: update
            }
            fetch("api/", {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw Error("update error. Status: " + response.statusText);
                    }
                })
                .then(json => {
                    if (table) {
                        ctx.commit("move", json);
                    } else {
                        ctx.commit("edit", json);
                    }
                    ctx.commit("showData");
                })
                .catch(reason => console.error(reason));
        },
        delete(ctx) {
            var id = ctx.state.currentData._id;
            fetch("api/?_id=" + id, {
                method: 'DELETE'
            })
                .then(response => {
                    if (response.ok) {
                        ctx.commit("remove", id);
                    } else {
                        throw Error("delete error. Status: " + response.statusText);
                    }
                })
                .catch(reason => console.error(reason));
        }
    },
    getters: {
        getById: state => id => {
            return state.tablesCache[state.currentTable].find(el => {
                return el._id === id
            });
        },
        getArrayIndex: state => el => {
            return state.tablesCache[state.currentTable].map(z => z._id).indexOf(el._id);
        }
    },
});
