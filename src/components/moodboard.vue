<template>
  <div>
    <div class="moodboard-container">
      <div class="moodboard-image" v-for="imageURL in imageURLs" :key="imageURL.id">
        <img :src="imageURL">
        <span class="remove" @click="remove(id)"></span>
      </div>
    </div>
    <button>
      <input type="file" accept="image/png, image/jpeg, image/heic" @change="getImage" />
    </button>
    <button @click="submitImage()">Добавить</button>
  </div>
</template>

<script>
// import api from '../api/api.js';

export default {
  name: "moodboard",
  computed: {
    imageURLs() {
      return this.$store.state.moodboard.imageURLs;
    }
  },
  methods: {
    getImage(event) {
      this.$store.commit("setMoodBoardImageForUpload", event);
    },
    submitImage() {
      if (this.$store.state.moodboard.currentImage) {
        this.$store.dispatch("uploadMoodboardImage", () => {
          this.$store.commit("setImageUrl", this.$store.state.moodboard.currentImage.id);
        });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.moodboard-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 30px;
}
.moodboard-image {
  margin: 10px;
  position: relative;
}
.moodboard-image img {
  width: 500px;
  height: auto;
}
input {
  cursor: pointer;
}
.remove {
  background-image: url("../assets/garbage.png");
  position: absolute;
  right: 10px;
  top: 10px;
  width: 20px;
  height: 20px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  z-index: 10;
  cursor: pointer;
}
</style>