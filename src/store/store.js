import Vue from 'vue'
import Vuex from 'vuex'
import sidebarModule from './modules/sidebar.js'
import formModule from './modules/form.js'
import tableModule from './modules/table.js'
import api from '../api/api.js'

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        sidebar: sidebarModule,
        form: formModule,
        table: tableModule
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
    },
    actions: {
        loadData(ctx) {
            api.get(ctx.state.table.current, json => {
                ctx.commit("setData", json);
                ctx.commit("showData");
            }, reason => console.error(reason));
        },
        add(ctx) {
            ctx.state.form.currentData.table = ctx.state.table.current;
            api.add(ctx.state.form.currentData, json => ctx.commit("add", json), reason => console.error(reason));
        },
        edit(ctx, table) {
            if (table) {
                ctx.state.form.currentData.table = table;
            } else {
                ctx.state.form.currentData.table = ctx.state.table.current;
            }
            var update = Object.assign({}, ctx.state.form.currentData);
            delete update._id;
            var data = {
                query: {
                    '_id': ctx.state.form.currentData._id
                },
                update: update
            }
            api.edit(data, json => {
                if (table) {
                    ctx.commit("move", json);
                } else {
                    ctx.commit("edit", json);
                }
                ctx.commit("showData");
            }, reason => console.error(reason));
        },
        delete(ctx) {
            var id = ctx.state.form.currentData._id;
            api.delete(id, () => ctx.commit("remove", id), reason => console.error(reason));
        }
    },
});
