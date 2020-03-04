<template>
  <div>
    <modal-form></modal-form>
    <sidebar></sidebar>
    <header>{{currentTable.displayName}}. Всего: {{count}}</header>
    <main @click="closeSidebar()">
      <div v-if="isMobile">
        <clothes-card v-for="item in items" :key="item.id" :item="item"></clothes-card>
      </div>
      <clothes-table v-if="!isMobile"></clothes-table>
      <button @click="openModal()" v-show="currentTable.name != 'old'">Добавить</button>
    </main>
  </div>
</template>

<script>
import clothesTable from "./components/clothesTable.vue";
import modalForm from "./components/modalForm.vue";
import sidebar from "./components/sidebar.vue";
import clothesCard from "./components/clothesCard.vue";

export default {
  name: "app",
  components: {
    clothesTable,
    modalForm,
    sidebar,
    clothesCard
  },
  computed: {
    currentTable() {
      return this.$store.state.table.current;
    },
    count() {
      return this.$store.state.table.itemsCount;
    },
    items() {
      return this.$store.state.table.view[this.currentTable.name];
    },
    isMobile() {
      return window.innerWidth <= 840;
    }
  },
  methods: {
    openModal() {
      var row = {
        type: "",
        description: "",
        price: "0",
        year: new Date().getFullYear()
      };
      if (this.currentTable.name == "clothes") {
        row.brand = "No name";
        row.color = "";
        row.season = "любой";
      }
      if (this.currentTable.name == "jewelry") {
        row.country = "";
      }
      this.$store.commit("setCurrentData", row);
      this.$store.commit("modalToggle");
      this.$store.commit("changeModalRole", "add");
    },
    closeSidebar() {
      if (this.$store.state.sidebar.open) {
        this.$store.commit("sidebarToggle");
        this.$store.commit("deactivateTabs");
      }
    }
  },
  beforeMount: function() {
    this.$store.commit("changeTable", {
      name: "clothes",
      displayName: "Одежда",
      headers: [
        { name: "type", displayName: "Тип", isSortable: true },
        { name: "brand", displayName: "Производитель", isSortable: true },
        { name: "color", displayName: "Цвет" },
        { name: "description", displayName: "Описание" },
        { name: "price", displayName: "Стоимость", isSortable: true },
        { name: "year", displayName: "Год покупки", isSortable: true },
        { name: "season", displayName: "Сезон", isSortable: true }
      ]
    });
    this.$store.dispatch("loadData");
  }
};
</script>

<style>
:root {
  --body-color: #dbdfea;
  --modal-color: #9da8c0;
  --main-color: #484757;
  --neutral-color: #eff5fa;
  --warning-color: #f73149;
}
html,
body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  font-size: 12pt;
  background-color: var(--body-color);
  height: 100%;
}
button {
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  border: 3px solid transparent;
  border-radius: 3px;
  padding: 10px;
  margin: 10px;
  cursor: pointer;
  color: var(--neutral-color);
  transition: 0.3s ease all;
  text-align: center;
  width: 200px;
  background-color: var(--main-color);
  font-family: "Tahoma";
  font-size: 12pt;
}
button:hover {
  background-color: var(--modal-color);
  border: 3px solid var(--main-color);
}
main {
  margin-left: 40px;
  height: 100vh;
}
header {
  background-color: var(--modal-color);
  padding: 10px;
  color: var(--neutral-color);
  margin-left: 40px;
}
</style>
