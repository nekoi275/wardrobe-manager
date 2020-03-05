<template>
  <div class="container" v-show="open">
    <div class="overlay" @click="close()"></div>
    <div class="modal">
      <img :src="ImageUrl" />
    </div>
  </div>
</template>

<script>
export default {
  name: "modal-image",
  computed: {
    ImageUrl() {
      return this.$store.state.table.image.url;
    },
    open() {
      return this.$store.state.table.image.shown;
    }
  },
  methods: {
    close() {
      this.$store.commit("toggleImage");
    }
  }
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.container {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  position: fixed;
  z-index: 10;
}
.container .overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
}
.container .modal {
  position: absolute;
  z-index: 10;
  box-sizing: border-box;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  top: 50%;
  background-color: var(--modal-color);
  border-radius: 3px;
}
img {
  width: 100%;
  height: 100%;
}
</style>
