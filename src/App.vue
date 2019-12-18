<template>
  <div>
    <sidebar></sidebar>
    <div class="content" @click="closeSidebar()"> 
      <clothes-table></clothes-table>
      <button @click="openModal('add')">Добавить</button>
      <modal-form></modal-form>
    </div>
  </div>
</template>

<script>
import clothesTable from "./components/clothesTable.vue";
import modalForm from "./components/modalForm.vue";
import sidebar from "./components/sidebar.vue";

export default {
  name: "app",
  components: {
    clothesTable,
    modalForm,
    sidebar
  },
  methods: {
    openModal(role) {
      this.$store.commit("setCurrentData");
      this.$store.commit("modalToggle");
      this.$store.commit("changeModalRole", role);
    },
    closeSidebar() {
      this.$store.commit("sidebarToggle");
    }
  }
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  font-family: "Tahoma";
  font-size: 12pt;
  background-color: #ad9baf;
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
  color: white;
  transition: 0.3s ease all;
  text-align: center;
  width: 200px;
  background-color: #573a5a;
  font-family: "Tahoma";
  font-size: 12pt;
}
button:hover {
  background-color: #1b1c4a;
  border: 3px solid #573a5a;
}
.content {
  margin-left: 40px;
  height: 100vh;
}
</style>
