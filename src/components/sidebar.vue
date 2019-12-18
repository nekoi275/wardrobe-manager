<template>
  <div class="sidebar" v-bind:class="{ open: open }">
    <div class="options"></div>
    <ul>
      <li class="filter" @click="slideOpen()"></li>
      <li class="sort" @click="slideOpen()"></li>
      <li class="hidden"></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "sidebar",
  computed: {
    open() {
      return this.$store.state.sidebar.open;
    }
  },
  methods: {
    slideOpen() {
      this.$store.commit("sidebarToggle");
    }
  }
};
</script>

<style scoped>
.sidebar {
  position: fixed;
  display: flex;
  z-index: 1;
  width: 200px;
  transform: translateX(-160px);
  transition: all 0.3s ease;
  top: 0;
  left: 0;
  bottom: 0;
  background-color: #cccccc;
  border-right: 1px solid #573a5a;
}
.sidebar.open {
  transform: none;
}
.options {
  width: 80%;
  background-color: #1b1c4a;
}
ul {
  width: 20%;
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
  padding: 20px;
  margin-top: 30px;
  box-sizing: border-box;
  background-size: 20px;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
}
li.active {
  background-color: #573a5a;
}
.filter {
  background-image: url("../assets/funnel.png");
}
.sort {
  background-image: url("../assets/sort.png");
}
.hidden {
  background-image: url("../assets/visibility.png");
}
</style>