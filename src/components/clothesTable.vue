<template>
  <div>
    <table>
      <thead>
        <th v-for="header in headers" :key="header.id">
          <div :class="{ pointed: header.isSortable}" @click="sort(header)">{{header.displayName}}</div>
        </th>
        <th></th>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row.id">
          <td>{{row.type}}</td>
          <td v-if="currentTable != 'jewelry'">{{row.brand}}</td>
          <td v-if="currentTable != 'jewelry'" :style="{backgroundColor: row.color}"></td>
          <td>{{row.description}}</td>
          <td>{{row.price}}</td>
          <td>{{row.year}}</td>
          <td v-if="currentTable != 'jewelry'">{{row.season}}</td>
          <td>
            <span v-show="row.image" class="photo" @click="openImageModal(row.image)"></span>
            <span class="edit" @click="openModal('edit', row)"></span>
            <span class="remove" @click="remove(row)"></span>
            <span v-if="currentTable == 'clothes'" class="move" @click="move(row, 'old')"></span>
          </td>
        </tr>
      </tbody>
    </table>
    <modal-image></modal-image>
    <button @click="openModal('add', setModalRow())" v-show="currentTable != 'old'">Добавить</button>
  </div>
</template>

<script>
import modalImage from "./modalImage.vue";

export default {
  name: "clothes-table",
  components: {
    modalImage,
  },
  computed: {
    rows() {
      return this.$store.state.table.view[this.currentTable];
    },
    headers() {
      return this.$store.state.table.headers;
    },
    currentTable() {
      return this.$store.state.table.current.name;
    },
  },
  methods: {
    setModalRow() {
      let row = {
        type: "",
        description: "",
        price: 0,
        year: new Date().getFullYear(),
      };
      if (this.currentTable == "clothes") {
        row.brand = "no name";
        row.color = "";
        row.season = "любой";
      }
      return row;
    },
    openModal(role, row) {
      this.$store.commit("setCurrentData", { ...row });
      this.$store.commit("modalToggle");
      this.$store.commit("changeModalRole", role);
    },
    openImageModal(imageId) {
      this.$store.commit("setImageUrl", imageId);
      this.$store.commit("toggleImage");
    },
    remove(row) {
      this.$store.commit("setCurrentData", row);
      this.$store.dispatch("delete");
    },
    move(row, table) {
      this.$store.commit("setCurrentData", { ...row });
      this.$store.dispatch("edit", table);
    },
    sort(field) {
      if (field.isSortable) {
        if (this.$store.state.table.sorting.field == field.name) {
          this.$store.commit("setSorting", {
            field: field.name,
            isAscending: !this.$store.state.table.sorting.isAscending,
          });
        } else {
          this.$store.commit("setSorting", {
            field: field.name,
            isAscending: true,
          });
        }
        this.$store.dispatch("showData");
      }
    },
  },
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
.pointed {
  cursor: pointer;
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
.photo {
  background-image: url("../assets/photo.png");
}
</style>
