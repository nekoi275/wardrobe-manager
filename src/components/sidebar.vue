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
    </div>
    <ul>
      <li class="filter" @click="showFilters()" v-bind:class="{ active: tabs.filter }"></li>
      <li class="sort" @click="showSorting()" v-bind:class="{ active: tabs.sort }"></li>
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
    showFilters() {
      this.$store.commit("switchTabs", "filter");
      this.slideOpen();
    },
    showSorting() {
      this.$store.commit("switchTabs", "sort");
      this.slideOpen();
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
  background-color: #cccccc;
  border-right: 1px solid #573a5a;
}
.sidebar.open {
  transform: none;
}
.options {
  width: 80%;
  background-color: #1b1c4a;
  color: #ffffff;
  box-sizing: border-box;
  padding: 10px;
}
select {
  width: 100%;
  background-color: #cccccc;
  border: none;
}
select[multiple] option {
  background: #cccccc linear-gradient(0deg, #cccccc 0%, #cccccc 100%);
  color: #1b1c4a;
}
select[multiple]:focus option:checked {
  background: #573a5a linear-gradient(0deg, #573a5a 0%, #573a5a 100%);
}
select[multiple] option:checked {
  background: #573a5a linear-gradient(0deg, #573a5a 0%, #573a5a 100%);
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
  border: 1px solid #e9e6dd;
  background-color: #e9e6dd;
  border-radius: 100%;
  transition: all 0.2s ease;
}
input[type="radio"]:checked {
  border-width: 5px;
  border-color: #573a5a;
  background-color: #e9e6dd
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
  background-color: #573a5a;
}
.filter {
  background-image: url("../assets/funnel.png");
}
.sort {
  background-image: url("../assets/sort.png");
}
</style>