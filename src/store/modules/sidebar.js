const state = {
    open: false,
    tabs: {
        filter: false,
        tables: false
    },
    filters: { type: [], brand: [], year: [], season: [] }
}

const mutations = {
    sidebarToggle(state) {
        state.open = !state.open;
    },
    switchTabs(state, tab) {
        state.tabs.filter = tab == 'filter';
        state.tabs.tables = tab == 'tables';
    },
    deactivateTabs(state) {
        state.tabs.filter = false;
        state.tabs.tables = false;
    },
    setFilter(state, filter) {
        state.filters[filter.name] = filter.value;
    },
    removeAllFilters(state) {
        state.filters = { type: [], brand: [], year: [], season: [] };
    }
}

export default {
    state,
    mutations
}