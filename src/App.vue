<template>
  <div>
    <sidebar></sidebar>
    <div class="main-content" @click="closeSidebar()">
      <clothes-table></clothes-table>
      <button @click="openModal()" v-show="currentTable != 'old'">Добавить</button>
      <modal-form></modal-form>
    </div>
  </div>
</template>

<script>
import clothesTable from './components/clothesTable.vue';
import modalForm from './components/modalForm.vue';
import sidebar from './components/sidebar.vue';

export default {
  name: 'app',
  components: {
    clothesTable,
    modalForm,
    sidebar
  },
  computed: {
    currentTable() {
      return this.$store.state.currentTable;
    }
  },
  methods: {
    openModal() {
      var row = {
        type: '',
        description: '',
        price: '0',
        year: new Date().getFullYear()
      };
      if (this.currentTable == 'clothes') {
        row.brand = 'No name';
        row.color = '';
        row.season = 'любой';
      }
      if (this.currentTable == 'jewelry') {
        row.country = '';
      }
      this.$store.commit('setCurrentData', row);
      this.$store.commit('modalToggle');
      this.$store.commit('changeModalRole', 'add');
    },
    closeSidebar() {
      if (this.$store.state.sidebar.open) {
        this.$store.commit('sidebarToggle');
        this.$store.commit('deactivateTabs');
      }
    }
  },
  mounted: function() {
    this.$store.dispatch('loadData');
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
  font-family: "Tahoma";
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
.main-content {
  margin-left: 40px;
  height: 100vh;
}
</style>
