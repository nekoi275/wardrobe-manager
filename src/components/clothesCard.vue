<template>
  <div class="card">
    <img src="https://placeimg.com/640/480/nature" alt="item photo" />
    <table>
      <tr v-for="property in properties" :key="property.id">
        <td>{{property.displayName}} :</td>
        <td>{{item[property.name]}}</td>
      </tr>
    </table>
    <span class="edit" @click="openModal('edit', row)"></span>
    <span class="remove" @click="remove(row)"></span>
    <span v-if="currentTable == 'clothes'" class="move" @click="move(row, 'old')"></span>
  </div>
</template>

<script>
export default {
  name: "clothes-card",
  props: {
    item: Object
  },
  computed: {
    properties() {
      return this.$store.state.table.headers;
    },
    currentTable() {
      return this.$store.state.table.current.name;
    }
  },
  methods: {
    openModal(role, row) {
      this.$store.commit("setCurrentData", Object.assign({}, row));
      this.$store.commit("modalToggle");
      this.$store.commit("changeModalRole", role);
    },
    remove(row) {
      this.$store.commit("setCurrentData", row);
      this.$store.dispatch("delete");
    },
    move(row, table) {
      this.$store.commit("setCurrentData", Object.assign({}, row));
      this.$store.dispatch("edit", table);
    }
  }  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
}
span {
  display: inline-block;
  margin-left: 10px;
  cursor: pointer;
  width: 20px;
  height: 20px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.edit {
  background-image: url("../assets/document.png");
}
.remove {
  background-image: url("../assets/garbage.png");
}
.move {
  background-image: url("../assets/transfer.png");
}
</style>