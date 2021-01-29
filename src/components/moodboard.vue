<template>
  <div>
    <div class="moodboard-container">
      <figure v-for="image in images" :key="image.id">
        <img :src="api.imageUrl(image.id)" />
        <span class="remove" @click="remove(image._id)"></span>
      </figure>
    </div>
    <button>
      <input
        type="file"
        accept="image/png, image/jpeg, image/heic"
        :value="currentImageFile"
        @change="getImage"
      />
    </button>
    <button @click="submitImage()">Добавить</button>
  </div>
</template>

<script>
import api from "../api/api.js";

export default {
  name: "moodboard",
  data: function () {
    return {
      api: api,
    };
  },
  computed: {
    images() {
      return this.$store.state.moodboard.images;
    },
    currentImageFile() {
      return this.$store.state.moodboard.currentImage.file;
    },
  },
  methods: {
    getImage(event) {
      this.$store.commit("setMoodboardImageForUpload", event);
    },
    submitImage() {
      if (this.$store.state.moodboard.currentImage.file) {
        this.$store.dispatch("uploadMoodboardImage", (data) => {
          this.$store.commit("setMoodboardImage", data);
        });
      }
    },
    remove(id) {
      this.$store.commit("removeImage", id);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.moodboard-container {
  column-count: 3;
  column-gap: 10px;
}
img {
  max-width: 100%;
  display: block;
  position: relative;
}
figure {
  margin: 0;
  display: grid;
  grid-template-rows: 1fr auto;
  margin-bottom: 10px;
  break-inside: avoid;
}
figure > img {
  grid-row: 1 / -1;
  grid-column: 1;
}
input {
  cursor: pointer;
}
.remove {
  background-image: url("../assets/garbage.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: absolute;
  z-index: 10;
  cursor: pointer;
  grid-row: 1;
  padding: 10px;
  margin: 10px;
  justify-self: end;
}
</style>