<template>
  <div class="sidebar" v-bind:class="{ open: open }">
    <div class="options">
      <div v-show="tabs.filter">
        <p>Тип</p>
        <select multiple>
          <option value="1">1</option>
          <option value="2">2</option>
        </select>
        <p>Производитель</p>
        <select multiple>
          <option value="1">1</option>
          <option value="2">2</option>
        </select>
        <p>Год покупки</p>
        <select multiple>
          <option value="1">1</option>
          <option value="2">2</option>
        </select>
        <p>Сезон</p>
        <select multiple>
          <option value="зима">Зима</option>
          <option value="осень-весна">Осень/Весна</option>
          <option value="лето">Лето</option>
        </select>
      </div>
      <div v-show="tabs.sort">
        <label>
          <input type="radio" name="sort" />
          <p>По типу</p>
        </label>
        <label>
          <input type="radio" name="sort" />
          <p>По производителю</p>
        </label>
        <label>
          <input type="radio" name="sort" />
          <p>По году покупки</p>
        </label>
        <label>
          <input type="radio" name="sort" />
          <p>По сезону</p>
        </label>
      </div>
      <div v-show="tabs.tables">
        <button
          class="small-btn"
          @click="changeTable({name: 'clothes', headers: [
        'Тип',
        'Производитель',
        'Цвет',
        'Описание',
        'Стоимость',
        'Год покупки',
        'Сезон'
      ]})"
        >Одежда</button>
        <button
          class="small-btn"
          @click="changeTable({name:'jewelry', headers: ['Тип', 'Описание', 'Стоимость', 'Год покупки', 'Страна']})"
        >Украшения</button>
        <button
          class="small-btn"
          @click="changeTable({name:'old', headers: [
        'Тип',
      'Производитель',
        'Цвет',
        'Описание',
        'Стоимость',
        'Год покупки',
        'Сезон'
      ]})"
        >Старое</button>
      </div>
    </div>
    <ul>
      <li class="filter" @click="switchTab('filter')" v-bind:class="{ active: tabs.filter }"></li>
      <li class="sort" @click="switchTab('sort')" v-bind:class="{ active: tabs.sort }"></li>
      <li class="tables" @click="switchTab('tables')" v-bind:class="{ active: tabs.tables }"></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "sidebar",
  computed: {
    open() {
      return this.$store.state.sidebar.open;
    },
    tabs() {
      return this.$store.state.sidebar.tabs;
    }
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
    changeTable(tableInfo) {
      this.$store.commit("changeTable", tableInfo);
    }
  }
};
</script>

<style scoped>
.sidebar {
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
.sidebar.open {
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
}
select[multiple] option {
  background: var(--neutral-color)
    linear-gradient(0deg, var(--neutral-color) 0%, var(--neutral-color) 100%);
  color: var(--modal-color);
}
select[multiple]:focus option:checked {
  background: var(--main-color)
    linear-gradient(0deg, var(--main-color) 0%, var(--main-color) 100%);
}
select[multiple] option:checked {
  background: var(--main-color)
    linear-gradient(0deg, var(--main-color) 0%, var(--main-color) 00%);
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
.sort {
  background-image: url("../assets/sort.png");
}
.tables {
  background-image: url("../assets/spreadsheet.png");
}
.small-btn {
  width: 110px;
}
</style>