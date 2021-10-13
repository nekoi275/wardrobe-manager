<template>
  <div>
    <clothes-table v-if="view.tableView"></clothes-table>
    <cards-container v-if="view.cardView"></cards-container>
  </div>
</template>

<script>
import cardsContainer from './cardsContainer.vue';
import clothesTable from './clothesTable.vue';
export default {
  name: 'viewRoute',
  components: {
    cardsContainer,
    clothesTable
  },
  computed: {
      view() {
      return this.$store.state.sidebar.view;
    }
  }
};
</script>
