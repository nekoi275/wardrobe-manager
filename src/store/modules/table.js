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

const actions = {
    showData({state, rootState}) {
        var data = state.cache[state.current];
        for (let key in rootState.sidebar.filters) {
            let values = rootState.sidebar.filters[key];
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
        state.view[state.current] = data;
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
    state, mutations, getters, actions
}