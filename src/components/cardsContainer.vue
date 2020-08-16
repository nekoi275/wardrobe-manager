<template>
  <div>
    <button @click="openModal()" v-show="currentTable.name != 'old'">Добавить</button>
    <div class="card-container">
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
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>