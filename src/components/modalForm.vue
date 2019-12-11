<template>
  <div class="container" v-show="open">
    <div class="overlay" v-on:click="modalToggle()"></div>
    <div class="modal">
      <div class="title" v-if="role === 'add'">Добавить новую вещь</div>
      <div class="title" v-if="role === 'edit'">Редактировать</div>
      <div class="content">
        <form action="#" target="_self">
          <span class="required-msg" v-show="!validate()">Это поле обязательное</span>
          <label>
            <span>Тип</span>
            <input type="text" name="type" v-model="formData.type" required />
          </label>
          <label>
            <span>Производитель</span>
            <input type="text" name="brand" v-model="formData.brand" />
          </label>
          <label>
            <span>Описание</span>
            <input type="text" name="description" v-model="formData.description" />
          </label>
          <label>
            <span>Стоимость</span>
            <input type="number" name="price" v-model="formData.price" />
          </label>
          <span class="required-msg" v-show="!validate()">Это поле обязательное</span>
          <label>
            <span>Год покупки</span>
            <input type="number" name="year" min="1990" max="2050" v-model="formData.year" required />
          </label>
          <label>
            <span>Сезон</span>
            <select name="season" v-model="formData.season" required>
              <option value="зима">Зима</option>
              <option value="осень-весна">Осень/Весна</option>
              <option value="лето">Лето</option>
              <option value="любой">Любой</option>
            </select>
          </label>
          <input type="hidden" v-model="formData.id" />
          <button v-on:click="add()" v-if="role === 'add'" type="button">Добавить</button>
          <button v-on:click="closeEdit()" v-if="role === 'edit'" type="button">Изменить</button>
          <button v-on:click="modalToggle()" type="reset">Закрыть</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "modal-form",
  computed: {
    open() {
      return this.$store.state.modal.open;
    },
    role() {
      return this.$store.state.modal.role;
    },
    formData: {
      get() {
        return this.$store.state.currentData;
      }
      /* set() {
        if (this.validate()) {
          this.$store.commit("edit");
        }
      } */
    }
  },
  methods: {
    modalToggle() {
      this.$store.commit("modalToggle");
    },
    add() {
      if (this.validate()) {
        this.$store.commit("add");
        this.modalToggle();
      }
    },
    closeEdit() {
      if (this.validate()) {
        this.modalToggle();
      }
    },
    validate() {
      return this.formData.type != "" && this.formData.year != "";
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
  background-color: #1b1c4a;
  border-radius: 3px;
}
.container .modal .title {
  text-align: center;
  border-bottom: 1px solid #573a5a;
  padding: 20px;
  color: #e9e6dd;
  font-weight: bold;
}
.container .modal .content {
  padding: 20px;
}
label {
  display: flex;
  color: #e9e6dd;
  align-items: center;
  width: 100%;
  cursor: pointer;
  justify-content: flex-end;
}
input,
select {
  box-sizing: border-box;
  padding: 5px;
  margin: 10px;
  border-radius: 3px;
  transition: all 0.3s ease;
  border: 3px solid transparent;
  width: 60%;
}
input:focus {
  border: 3px solid #573a5a;
}
span {
  margin-left: 30px;
}
.required-msg {
  margin-left: 30px;
  color: #f84747;
  font-size: 10pt;
}
</style>
