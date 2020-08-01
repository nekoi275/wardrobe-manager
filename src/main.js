import Vue from 'vue'
import App from './App.vue'
import {
  store
} from './store/store.js'
import VueRouter from 'vue-router'
import clothesTable from "./components/clothesTable.vue";

Vue.config.productionTip = false;
Vue.use(VueRouter);

function changeTable(tableInfo) {
  store.commit("changeTable", tableInfo);
  store.commit("countItems");
  var table = store.state.table.view[tableInfo.name];
  if (!table.length) {
    store.dispatch("loadData");
  }
}

const routesData = {
  clothesHeaders: [{
      name: "type",
      displayName: "Тип",
      isSortable: true
    },
    {
      name: "brand",
      displayName: "Производитель",
      isSortable: true
    },
    {
      name: "color",
      displayName: "Цвет"
    },
    {
      name: "description",
      displayName: "Описание"
    },
    {
      name: "price",
      displayName: "Стоимость",
      isSortable: true
    },
    {
      name: "year",
      displayName: "Год покупки",
      isSortable: true
    },
    {
      name: "season",
      displayName: "Сезон",
      isSortable: true
    },
  ],
  oldHeaders: [{
      name: "type",
      displayName: "Тип",
      isSortable: true
    },
    {
      name: "brand",
      displayName: "Производитель",
      isSortable: true
    },
    {
      name: "color",
      displayName: "Цвет"
    },
    {
      name: "description",
      displayName: "Описание"
    },
    {
      name: "price",
      displayName: "Стоимость",
      isSortable: true
    },
    {
      name: "year",
      displayName: "Год покупки",
      isSortable: true
    },
    {
      name: "season",
      displayName: "Сезон",
      isSortable: true
    },
  ],
  jewelryHeaders: [{
      name: "type",
      displayName: "Тип",
      isSortable: true
    },
    {
      name: "description",
      displayName: "Описание"
    },
    {
      name: "price",
      displayName: "Стоимость",
      isSortable: true
    },
    {
      name: "year",
      displayName: "Год покупки",
      isSortable: true
    },
    {
      name: "country",
      displayName: "Страна",
      isSortable: true
    },
  ]
};

const routes = [{
    path: '/',
    components: clothesTable
  },
  {
    path: '/clothes',
    component: clothesTable
  },
  {
    path: '/old',
    component: clothesTable
  },
  {
    path: '/jewelry',
    component: clothesTable
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  switch (to.path) {
    case '/':
      changeTable({
        name: 'clothes',
        displayName: 'Одежда',
        headers: routesData.clothesHeaders
      })
      break;
    case '/clothes':
      changeTable({
        name: 'clothes',
        displayName: 'Одежда',
        headers: routesData.clothesHeaders
      })
      break;
    case '/jewelry':
      changeTable({
        name: 'jewelry',
        displayName: 'Украшения',
        headers: routesData.jewelryHeaders
      })
      break;
    case '/old':
      changeTable({
        name: 'old',
        displayName: 'Старое',
        headers: routesData.oldHeaders
      })
      break;
  }
  next();
});

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')