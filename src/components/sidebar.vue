<template>
  <aside :class="{ open: open }">
    <div class="options">
      <div v-show="tabs.filter">
        <p>Тип</p>
        <select v-model="filterType" multiple>
          <option
            v-for="type in types"
            :key="type.id"
            :value="type"
            :class="{ selected: isSelected('type', type) }"
          >{{type}}</option>
        </select>
        <p v-if="currentTable !='jewelry'">Производитель</p>
        <select v-if="currentTable !='jewelry'" v-model="filterBrand" multiple>
          <option
            v-for="brand in brands"
            :key="brand.id"
            :value="brand"
            :class="{ selected: isSelected('brand', brand) }"
          >{{brand}}</option>
        </select>
        <p>Год покупки</p>
        <select v-model="filterYear" multiple>
          <option
            v-for="year in years"
            :key="year.id"
            :value="year"
            :class="{ selected: isSelected('year', year) }"
          >{{year}}</option>
        </select>
        <p v-show="currentTable !='jewelry'">Сезон</p>
        <select v-if="currentTable !='jewelry'" v-model="filterSeason" multiple>
          <option value="зима" :class="{ selected: isSelected('season', 'зима') }">Зима</option>
          <option
            value="осень-весна"
            :class="{ selected: isSelected('season', 'осень-весна') }"
          >Осень/Весна</option>
          <option value="лето" :class="{ selected: isSelected('season', 'лето') }">Лето</option>
          <option value="любой" :class="{ selected: isSelected('season', 'любой') }">Любой</option>
        </select>
        <button class="small-btn" @click="removeFilters()">Сброс</button>
      </div>
      <div v-show="tabs.tables">
        <router-link to="/clothes">
          <button class="small-btn" :class="{ active: isActiveTable('clothes')}">Одежда</button>
        </router-link>
        <router-link to="/jewelry">
          <button class="small-btn" :class="{ active: isActiveTable('jewelry')}">Украшения</button>
        </router-link>
        <router-link to="/old">
          <button class="small-btn" :class="{ active: isActiveTable('old')}">Старое</button>
        </router-link>
        <router-link to="/moodboard">
          <button class="small-btn" :class="{ active: isActiveMoodboard()}">Галерея</button>
        </router-link>
      </div>
      <div v-show="tabs.views">
        <router-link :to="{ name: 'viewRoute', params: { tableName: currentTable }}">
          <button class="small-btn" @click="switchView('tableView')" :class="{ active: view.tableView}">Таблица</button>
        </router-link>
        <router-link :to="{ name: 'viewRoute', params: { tableName: currentTable }}">
          <button class="small-btn" @click="switchView('cardView')" :class="{ active: view.cardView}">Карточки</button>
        </router-link>
      </div>
    </div>
    <ul>
      <li v-show="!isActiveMoodboard()" class="filter" @click="switchTab('filter')" :class="{ active: tabs.filter }"></li>
      <li class="tables" @click="switchTab('tables')" :class="{ active: tabs.tables }"></li>
      <li v-show="!isActiveMoodboard() && !isMobile" class="views" @click="switchTab('views')" :class="{ active: tabs.views }"></li>
    </ul>
  </aside>
</template>

<script>
export default {
  name: "sidebar",
  computed: {
    open() {
      return this.$store.state.sidebar.open;
    },
    isMobile() {
      return window.innerWidth <= 840;
    },
    tabs() {
      return this.$store.state.sidebar.tabs;
    },
    view() {
      return this.$store.state.sidebar.view;
    },
    currentTable() {
      return this.$store.state.table.current.name;
    },
    types() {
      return this.getProperties("type");
    },
    brands() {
      if (this.currentTable != "jewelry") {
        return this.getProperties("brand");
      } else {
        return [];
      }
    },
    years() {
      return this.getProperties("year");
    },
    filterType: {
      get() {
        return [];
      },
      set(value) {
        this.setFilter("type", value);
      },
    },
    filterBrand: {
      get() {
        return [];
      },
      set(value) {
        this.setFilter("brand", value);
      },
    },
    filterYear: {
      get() {
        return [];
      },
      set(value) {
        this.setFilter("year", value);
      },
    },
    filterSeason: {
      get() {
        return [];
      },
      set(value) {
        this.setFilter("season", value);
      },
    },
  },
  methods: {
    slideOpen() {
      if (!this.open) {
        this.$store.commit("sidebarToggle");
      }
    },
    switchTab(tab) {
      this.$store.commit("switchTabs", tab);
      this.slideOpen();
    },
    switchView(view) {
      this.$store.commit("switchView", view);
    },
    getProperties(prop) {
      var table = this.$store.state.table.cache[this.currentTable];
      if (table) {
        return new Set(
          table
            .map((item) => {
              if (item[prop]) return item[prop] 
              else return "no name";
            })
            .sort()
        );
      }
    },
    setFilter(name, value) {
      var filter = { name: name, value: value };
      this.$store.commit("setFilter", filter);
      this.$store.dispatch("showData");
    },
    isSelected(prop, value) {
      return this.$store.state.sidebar.filters[prop].includes(value);
    },
    isActiveMoodboard() {
      return this.$store.state.moodboard.shown
    },
    isActiveTable(name) {
      return this.currentTable === name && !this.$store.state.moodboard.shown;
    },
    removeFilters() {
      this.$store.commit("removeAllFilters");
      this.$store.dispatch("showData");
    },
  },
};
</script>

<style scoped>
aside {
  position: fixed;
  display: flex;
  z-index: 1;
  width: 200px;
  transform: translateX(-160px);
  transition: all 0.3s ease;
  top: 0;
  left: 0;
  bottom: 0;
  background-color: var(--neutral-color);
  border-right: 1px solid var(--main-color);
}
.open {
  transform: none;
}
.options {
  width: 80%;
  background-color: var(--modal-color);
  color: var(--neutral-color);
  box-sizing: border-box;
  padding: 10px;
}
select {
  width: 100%;
  background-color: var(--neutral-color);
  border: none;
  font-family: monospace;
  color: var(--modal-color);
}
.selected {
  background: var(--main-color)
    linear-gradient(0deg, var(--main-color) 0%, var(--main-color) 100%);
  color: var(--modal-color);
}
label {
  cursor: pointer;
  display: flex;
}
input[type="radio"] {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 1px solid var(--neutral-color);
  background-color: var(--neutral-color);
  border-radius: 100%;
  transition: all 0.2s ease;
}
input[type="radio"]:checked {
  border-width: 5px;
  border-color: var(--main-color);
  background-color: var(--neutral-color);
}
ul {
  width: 20%;
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
  padding: 20px;
  margin-top: 30px;
  box-sizing: border-box;
  background-size: 20px;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
}
li.active {
  background-color: var(--main-color);
}
.filter {
  background-image: url("../assets/funnel.png");
}
.tables {
  background-image: url("../assets/spreadsheet.png");
}
.views {
  background-image: url("../assets/vision.png");
}
.small-btn {
  width: 110px;
  margin-top: 20px;
}
.small-btn.active {
  background-color: transparent;
  border: 3px solid var(--main-color);
}
</style>