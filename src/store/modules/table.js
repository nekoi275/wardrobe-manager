import api from '../../api/api.js';

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
    current: { name: '', displayName: '' },
    headers: [],
    sorting: { field: '', isAscending: false },
    itemsCount: '',
    image: {
        shown: false,
        url: ''
    }

}

const mutations = {
    changeTable(state, tableInfo) {
        state.current.name = tableInfo.name;
        state.current.displayName = tableInfo.displayName;
        state.headers = tableInfo.headers;
    },
    countItems(state) {
        state.itemsCount = state.cache[state.current.name].length;
    },
    add(state, data) {
        state.view[state.current.name].push(data);
    },
    edit(state, data) {
        var record = this.getters.getById(data._id);
        Object.assign(record, data);
    },
    remove(state, id) {
        var index = this.getters.getArrayIndex(this.getters.getById(id));
        state.cache[state.current.name].splice(index, 1);
    },
    move(state, row) {
        state.cache[state.current.name].splice(this.getters.getArrayIndex(row), 1);
        state.cache[row.table].push({ ...row });
    },
    setData(state, data) {
        state.cache[state.current.name] = data;
    },
    setSorting(state, sorting) {
        state.sorting = sorting;
    },
    toggleImage(state) {
        state.image.shown = !state.image.shown;
    },
    setImageUrl(state, id) {
        state.image.url = api.imageUrl(id);
        
    },
    removeImageUrl(state) {
        state.image.url = '';
    }
}

const actions = {
    showData({ commit, state, rootState }) {
        var data = state.cache[state.current.name];
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
        state.view[state.current.name] = data;
        commit("countItems");
    }
}

const getters = {
    getById: state => id => {
        return state.cache[state.current.name].find(el => {
            return el._id === id
        });
    },
    getArrayIndex: state => el => {
        return state.cache[state.current.name].map(z => z._id).indexOf(el._id);
    }
}

export default {
    state, mutations, getters, actions
}