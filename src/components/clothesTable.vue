<template>
  <table>
    <thead>
      <th v-for="header in headers" :key="header.id">{{header}}</th>
      <th></th>
    </thead>
    <tbody>
      <tr v-for="row in rows" :key="row.id">
        <td>{{row.type}}</td>
        <td>{{row.brand}}</td>
        <td v-bind:style="{backgroundColor: row.color.hex}"></td>
        <td>{{row.description}}</td>
        <td>{{row.price}}</td>
        <td>{{row.year}}</td>
        <td>{{row.season}}</td>
        <td>
          <span class="edit" @click="openModal('edit', row)"></span>
          <span class="remove" @click="remove(row)"></span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "clothes-table",
  computed: {
    rows() {
      var current = this.$store.state.currentTable;
      return this.$store.state.tables[current];
    },
    headers() {
      return this.$store.state.headers;
    }
  },
  methods: {
    openModal(role, row) {
      this.$store.commit("setCurrentData", Object.assign({}, row));
      this.$store.commit("modalToggle");
      this.$store.commit("changeModalRole", role);
    },
    remove(row) {
      this.$store.commit("remove", row);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
  box-sizing: border-box;
}
thead {
  background: var(--main-color);
  position: sticky;
  top: 0;
  border-bottom: 3px solid var(--neutral-color);
  font-weight: initial;
  color: var(--neutral-color);
}
thead th {
  padding: 15px;
}
tbody tr {
  border-bottom: 1px solid var(--neutral-color);
}
tbody tr:hover {
  background-color: var(--neutral-color);
  border-bottom: 1px solid var(--neutral-color);
}
tbody tr td {
  padding: 10px;
}
span {
  display: inline-block;
  margin-left: 10px;
  cursor: pointer;
  width: 20px;
  height: 20px;
}
.edit {
  background-image: url('../assets/document.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.remove {
  background-image: url('../assets/garbage.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
</style>
