<template>
  <div>
    <modal-form></modal-form>
    <sidebar></sidebar>
    <header class="page-header"
      v-show="!isMoodboard"
      @click="closeSidebar()"
    >{{currentTable.displayName}}. Всего: {{count}}</header>
    <main @click="closeSidebar()">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import modalForm from "./components/modalForm.vue";
import sidebar from "./components/sidebar.vue";

export default {
  name: "app",
  components: {
    modalForm,
    sidebar
  },
  computed: {
    currentTable() {
      return this.$store.state.table.current;
    },
    isMoodboard() {
      return this.$store.state.moodboard.shown;
    },
    count() {
      return this.$store.state.table.itemsCount;
    },
  },
  methods: {
    closeSidebar() {
      if (this.$store.state.sidebar.open) {
        this.$store.commit("sidebarToggle");
        this.$store.commit("deactivateTabs");
      }
    },
  },
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
  font-family: sans-serif;
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
main {
  margin-left: 40px;
  height: 100vh;
}
.page-header {
  background-color: var(--modal-color);
  padding: 10px;
  color: var(--neutral-color);
  margin-left: 40px;
}
</style>
