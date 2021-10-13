const state = {
    open: false,
    tabs: {
        filter: false,
        tables: false,
        views: false
    },
    view: {
        tableView: true,
        cardView: false
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
        state.tabs.views = tab == 'views';
    },
    switchView(state, view) {
        state.view.tableView = view == 'tableView';
        state.view.cardView = view == 'cardView';
    },
    deactivateTabs(state) {
        state.tabs.filter = false;
        state.tabs.tables = false;
        state.tabs.views = false;
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