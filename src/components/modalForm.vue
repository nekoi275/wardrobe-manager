<template>
  <div class="container" v-show="open">
    <div class="overlay" @click="close()"></div>
    <div class="modal">
      <div class="title" v-if="role === 'add'">Добавить новую вещь</div>
      <div class="title" v-if="role === 'edit'">Редактировать</div>
      <form action="#" target="_self">
        <span
          class="required-msg"
          v-show="currentData.type == '' && isSubmitted"
        >Это поле обязательное</span>
        <label>
          <span>Тип</span>
          <input type="text" v-model="currentData.type" required />
        </label>
        <label v-if="currentTable != 'jewelry'">
          <span>Производитель</span>
          <input type="text" v-model="currentData.brand" />
        </label>
        <span
          class="required-msg"
          v-show="colors == '' && isSubmitted && currentTable !='jewelry'"
        >Это поле обязательное</span>
        <div v-if="currentTable != 'jewelry'" class="colors">
          <span>Цвет</span>
          <color-picker v-model="colors"></color-picker>
        </div>
        <label>
          <span>Описание</span>
          <input type="text" v-model="currentData.description" />
        </label>
        <label>
          <span>Стоимость</span>
          <input type="number" v-model="currentData.price" />
        </label>
        <span
          class="required-msg"
          v-show="currentData.year == '' && isSubmitted"
        >Это поле обязательное</span>
        <label>
          <span>Год покупки</span>
          <input type="number" min="2000" max="2050" v-model="currentData.year" required />
        </label>
        <label v-if="currentTable != 'jewelry'">
          <span>Сезон</span>
          <select name="season" v-model="currentData.season" required>
            <option value="зима">Зима</option>
            <option value="осень-весна">Осень/Весна</option>
            <option value="лето">Лето</option>
            <option value="любой">Любой</option>
          </select>
        </label>
        <label v-if="currentTable == 'jewelry'">
          <span>Страна</span>
          <input type="text" v-model="currentData.country" />
        </label>
        <input type="hidden" v-model="currentData.id" />
        <button @click="submit()" v-if="role === 'add'" type="button">Добавить</button>
        <button @click="submit()" v-if="role === 'edit'" type="button">Изменить</button>
        <button @click="close()" type="reset">Закрыть</button>
      </form>
    </div>
  </div>
</template>

<script>
import { Compact } from 'vue-color';

export default {
  name: 'modal-form',
  components: {
    'color-picker': Compact
  },
  data: () => {
    return {
      isSubmitted: false,
      colors: ''
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
      return this.$store.state.table.current;
    }
  },
  methods: {
    close() {
      this.isSubmitted = false;
      this.$store.commit('modalToggle');
    },
    submit() {
      this.isSubmitted = true;
      if (this.isValid()) {
        if (this.currentTable != 'jewelry') {
          this.$store.commit('setColor', this.colors);
        }
        this.$store.dispatch(this.role);
        this.close();
      }
    },
    isValid() {
      return (
        this.currentData.type != '' &&
        this.currentData.year != '' &&
        (this.colors != '' || this.$store.currentTable == 'jewelry')
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
  box-sizing: border-box;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  top: 50%;
  background-color: var(--modal-color);
  border-radius: 3px;
}
.container .modal .title {
  text-align: center;
  border-bottom: 1px solid var(--main-color);
  padding: 15px;
  color: var(--neutral-color);
  font-weight: bold;
}
.container .modal .content {
  padding: 15px;
}
.colors {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: flex-end;
}
.colors span {
  color: var(--neutral-color);
  margin-right: 30px;
}
.colors div {
  margin: 8px;
}
label {
  display: flex;
  color: var(--neutral-color);
  align-items: center;
  width: 100%;
  cursor: pointer;
  justify-content: flex-end;
}
input,
select {
  box-sizing: border-box;
  padding: 5px;
  margin: 8px;
  border-radius: 3px;
  transition: all 0.3s ease;
  border: 3px solid transparent;
  width: 60%;
}
input:focus {
  border: 3px solid var(--neutral-color);
}
span {
  margin-left: 30px;
}
.required-msg {
  margin-left: 30px;
  color: var(--warning-color);
  font-size: 10pt;
}
</style>
