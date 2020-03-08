<template>
  <div class="card">
    <div class="card-image" :style="{backgroundImage: 'url(' + getImageUrl(this.data.image) + ')'}"></div>
    <table>
      <tr v-for="property in properties" :key="property.id">
        <td>{{property.displayName}}:</td>
        <td v-if="property.name != 'color'">{{data[property.name]}}</td>
        <td v-if="property.name === 'color'" :style="{backgroundColor: data.color.hex}"></td>
      </tr>
    </table>
    <footer>
      <span class="edit" @click="openModal('edit', data)"></span>
      <span class="remove" @click="remove(data)"></span>
      <span v-if="currentTable == 'clothes'" class="move" @click="move(data, 'old')"></span>
    </footer>
  </div>
</template>

<script>
import api from '../api/api.js';

export default {
  name: "clothes-card",
  props: ["item"],
  computed: {
    data() {
      return this.item;
    },
    properties() {
      return this.$store.state.table.headers;
    },
    currentTable() {
      return this.$store.state.table.current.name;
    }
  },
  methods: {
    openModal(role, item) {
      this.$store.commit("setCurrentData", {...item});
      this.$store.commit("modalToggle");
      this.$store.commit("changeModalRole", role);
    },
    remove(item) {
      this.$store.commit("setCurrentData", item);
      this.$store.dispatch("delete");
    },
    move(item, table) {
      this.$store.commit("setCurrentData", {...item});
      this.$store.dispatch("edit", table);
    },
    getImageUrl(image) {
      if (image) {
        return api.imageUrl(image);
      } else {
        return api.imageUrl('placeholder.png');
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
  width: 300px;
  margin: 20px auto;
  padding: 10px;
  background-color: var(--main-color);
  color: var(--neutral-color);
}
.card-image {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 300px;
}
table tr td {
  padding: 5px;
  width: 50%;
}
footer {
  background-color: var(--modal-color);
  padding: 10px;
  text-align: center;
}
span {
  display: inline-block;
  margin-left: 20px;
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