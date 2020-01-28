import Vue from 'vue'
import Vuex from 'vuex'
import sidebarModule from './modules/sidebar.js'
import formModule from './modules/form.js'
import tableModule from './modules/table.js'
import actionsModule from './modules/actions.js'

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        sidebar: sidebarModule,
        form: formModule,
        table: tableModule,
        actions: actionsModule
    },
    mutations: {
        showData(state) {
            var data = state.table.cache[state.table.current];
            for (let key in state.sidebar.filters) {
                let values = state.sidebar.filters[key];
                if (values.length) {
                    data = data.filter(item => { return values.includes(item[key]) });
                }
            }
            data.sort((item1, item2) => {
                var field = state.table.sorting.field;
                var result = 0;
                if (item1[field] > item2[field]) {
                    result = 1;
                }
                if (item1[field] < item2[field]) {
                    result = -1;
                }
                if (!state.table.sorting.isAscending) {
                    result = -result;
                }
                return result;
            });
            state.table.view[state.table.current] = data;
        },
    }
});
