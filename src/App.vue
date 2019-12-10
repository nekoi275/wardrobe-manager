<template>
  <div>
    <clothes-table></clothes-table>
    <button v-on:click="modalToggle()">Добавить</button>
    <modal-form></modal-form>
  </div>
</template>

<script>
import clothesTable from "./components/clothesTable.vue";
import modalForm from "./components/modalForm.vue";

export default {
  name: "app",
  components: {
    clothesTable,
    modalForm
  },
  methods: {
    modalToggle() {
      this.$store.commit('modalToggle');
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
</style>
