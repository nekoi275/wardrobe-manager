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
    }
});
