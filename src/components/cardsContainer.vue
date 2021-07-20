<template>
  <div>
    <button @click="openModal('add', setModalRow())" v-show="currentTable.name != 'old'">Добавить</button>
    <div>
      <clothes-card v-for="item in items" :key="item.id" :item="item"></clothes-card>
    </div>
  </div>
</template>

<script>
import clothesCard from "./clothesCard.vue";

export default {
  components: {
    clothesCard
  },
  name: "cards-container",
  computed: {
    currentTable() {
      return this.$store.state.table.current;
    },
    items() {
      return this.$store.state.table.view[this.currentTable.name];
    },
  },
  methods: {
    openModal(role, item) {
      this.$store.commit("setCurrentData", { ...item });
      this.$store.commit("modalToggle");
      this.$store.commit("changeModalRole", role);
    },
    setModalRow() {
      let row = {
        type: "",
        description: "",
        price: 0,
        year: new Date().getFullYear(),
      };
      if (this.currentTable.name == "clothes") {
        row.brand = "no name";
        row.color = "";
        row.season = "любой";
      }
      return row;
    }
  },
};
</script>
