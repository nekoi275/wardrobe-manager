const state = {
    view: {
        clothes: [],
        jewelry: [],
        old: []
    },
    cache: {
        clothes: [],
        jewelry: [],
        old: []
    },
    current: '',
    headers: [],
    sorting: { field: '', isAscending: false }
}

const mutations = {
    changeTable(state, tableInfo) {
        state.current = tableInfo.name;
        state.headers = tableInfo.headers;
        window.location.hash = tableInfo.name;
    },
    add(state, data) {
        state.view[state.current].push(data);
    },
    edit(state, data) {
        var record = this.getters.getById(data._id);
        Object.assign(record, data);
    },
    remove(state, id) {
        var index = this.getters.getArrayIndex(this.getters.getById(id));
        state.cache[state.current].splice(index, 1);
    },
    move(state, row) {
        state.cache[state.current].splice(this.getters.getArrayIndex(row), 1);
        state.cache[row.table].push(Object.assign({}, row));
    },
    setData(state, data) {
        state.cache[state.current] = data;
    },
    
    setSorting(state, sorting) {
        state.sorting = sorting;
    }
}

const getters = {
    getById: state => id => {
        return state.cache[state.current].find(el => {
            return el._id === id
        });
    },
    getArrayIndex: state => el => {
        return state.cache[state.current].map(z => z._id).indexOf(el._id);
    }
}

export default {
    state, mutations, getters
}