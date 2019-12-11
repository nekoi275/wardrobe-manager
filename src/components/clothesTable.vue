<template>
  <table>
    <thead>
      <th v-for="colName in colNames" :key="colName.id">{{colName}}</th>
      <th></th>
    </thead>
    <tbody>
      <tr v-for="row in rows" :key="row.id">
        <td>{{row.type}}</td>
        <td>{{row.brand}}</td>
        <td>{{row.color}}</td>
        <td>{{row.description}}</td>
        <td>{{row.price}}</td>
        <td>{{row.year}}</td>
        <td>{{row.season}}</td>
        <td>
          <span v-on:click="modalToggle('edit', row)">edit</span>
          <span v-on:click="removeTableRows()">remove</span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "clothes-table",
  data: function() {
    return {
      colNames: [
        "Тип",
        "Производитель",
        "Цвет",
        "Описание",
        "Стоимость",
        "Год покупки",
        "Сезон"
      ]
    };
  },
  computed: {
    rows() {
      return this.$store.state.table;
    },
  },
  methods: {
    modalToggle(role, row) {
      this.$store.commit("setCurrentData", row);
      this.$store.commit("modalToggle");
      this.$store.commit("changeModalRole", role);
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
}
thead {
  background: #573a5a;
  position: sticky;
  top: 0;
  border-bottom: 3px solid #e9e6dd;
  font-weight: initial;
  color: white;
}
thead th {
  padding: 15px;
}
tbody tr {
  border-bottom: 1px solid #e9e6dd;
}
tbody tr:hover {
  background-color: #cccccc;
  border-bottom: 1px solid #ffffff;
}
tbody tr td {
  padding: 10px;
}
span {
  margin-left: 10px;
  cursor: pointer;
}
</style>
