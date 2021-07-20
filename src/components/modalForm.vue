<template>
  <div class="container" v-show="open">
    <div class="overlay" @click="close()"></div>
    <div class="modal" :class="{'modal-mobile': isMobile}">
      <header class="modal-header" v-if="role === 'add'">Добавить новую вещь</header>
      <header class="modal-header" v-if="role === 'edit'">Редактировать</header>
      <form>
        <input type="hidden" v-model="currentData.id">
        <span
          class="required-msg"
          v-show="currentData.type == '' && isSubmitted"
        >Это поле обязательное</span>
        <label>
          <span>Тип</span>
          <input type="text" v-model="currentData.type" required>
        </label>
        <label v-if="currentTable != 'jewelry'">
          <span>Производитель</span>
          <input type="text" v-model="currentData.brand">
        </label>
        <label>
          <span>Описание</span>
          <input type="text" v-model="currentData.description">
        </label>
        <label>
          <span>Стоимость</span>
          <input type="number" v-model.number="currentData.price">
        </label>
        <span
          class="required-msg"
          v-show="currentData.year == '' && isSubmitted"
        >Это поле обязательное</span>
        <label>
          <span>Год покупки</span>
          <input type="number" min="2000" max="2050" v-model.number="currentData.year" required>
        </label>
        <label v-if="currentTable != 'jewelry'">
          <span>Сезон</span>
          <select name="season" v-model="currentData.season" required>
            <option value="зима">зима</option>
            <option value="осень-весна">осень/весна</option>
            <option value="лето">лето</option>
            <option value="любой">любой</option>
          </select>
        </label>
        <label>
          <span>Фото</span>
          <input type="file" accept="image/png, image/jpeg, image/heic" @change="getImage">
        </label>
        <span
          class="required-msg"
          v-show="currentData.color == '' && isSubmitted && currentTable !='jewelry'"
        >Это поле обязательное</span>
        <label v-if="currentTable != 'jewelry'">
          <span>Цвет</span>
          <input type="text" v-model="currentData.color">
        </label>
        <label class="color-label" v-show="previewImage" v-if="currentTable != 'jewelry'">
          <canvas id="preview" width="200" height="200" @click="getColor"></canvas>
        </label>
        <button @click="submit()" v-if="role === 'add'" type="button" :class="{'modal-button': isMobile}">Добавить</button>
        <button @click="submit()" v-if="role === 'edit'" type="button" :class="{'modal-button': isMobile}">Изменить</button>
        <button @click="close()" type="reset" :class="{'modal-button': isMobile}">Закрыть</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'modal-form',
  data: () => {
    return {
      isSubmitted: false
    };
  },
  computed: {
    open() {
      return this.$store.state.form.shown;
    },
    role() {
      return this.$store.state.form.role;
    },
    currentData: {
      get() {
        return this.$store.state.form.currentData;
      }
    },
    currentTable() {
      return this.$store.state.table.current.name;
    },
    previewImage() {
      return this.$store.state.form.previewImage;
    },
    isMobile() {
      return window.innerWidth <= 840;
    }
  },
  watch: {
    previewImage(newImage) {
      if (this.currentTable !== 'jewelry') {
        const canvas = document.getElementById('preview');
        const ctx = canvas.getContext('2d');
        const img = new Image;
        img.onload = function() {
          ctx.drawImage(img,0,0,200,200);
        };
        img.src = newImage;
      }
    }
  },
  methods: {
    close() {
      if (this.currentTable !== 'jewelry') {
        const canvas = document.getElementById('preview');
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0,0,200,200);
      }
      this.isSubmitted = false;
      this.$store.commit('modalToggle');
    },
    getImage(event) {
      this.$store.commit('setImage', event);
    },
    submit() {
      this.isSubmitted = true;
      if (this.isValid()) {
        this.$store.dispatch('uploadImage', () => {
          this.$store.dispatch(this.role);
        });
        this.close();
      }
    },
    getColor(event) {
      const canvas = document.getElementById('preview');
      const ctx = canvas.getContext('2d');
      let x = event.offsetX;
      let y = event.offsetY;
      let imageData = ctx.getImageData(x, y, 1, 1).data;
      this.currentData.color = `rgb(${imageData[0]},${imageData[1]},${imageData[2]})`;
    },
    isValid() {
      return (
        this.currentData.type != '' &&
        this.currentData.year != '' &&
        (this.currentData.color != '' || this.currentTable == 'jewelry')
      );
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
.modal-mobile {
  width: 100%;
  height: 100%;
}
.modal-button {
  width: 100px;
}
.modal-header {
  text-align: center;
  border-bottom: 1px solid var(--main-color);
  padding: 15px;
  color: var(--neutral-color);
  font-weight: bold;
}
label {
  display: flex;
  color: var(--neutral-color);
  align-items: center;
  width: 100%;
  justify-content: flex-end;
}
input,
select {
  box-sizing: border-box;
  padding: 5px;
  margin: 8px;
  font-family: monospace;
  border-radius: 3px;
  transition: all 0.3s ease;
  border: 3px solid transparent;
  width: 60%;
}
input:focus {
  border: 3px solid var(--neutral-color);
}
input[type="file"] {
  cursor: pointer;
}
span {
  margin-left: 30px;
}
.required-msg {
  margin-left: 30px;
  color: var(--warning-color);
  font-size: 10pt;
}
.color-label {
  justify-content: center;
}
#preview {
  cursor: crosshair;
}
</style>
