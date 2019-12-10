<template>
  <div class="modal-container" v-bind:class="{ active: modalOpen }">
    <div class="overlay" v-on:click="modalToggle()"></div>
    <div class="modal">
      <div class="modal-title" v-if="modalRole === 'add'">Добавить новую вещь</div>
      <div class="modal-title" v-if="modalRole === 'edit'">Редактировать</div>
      <div class="modal-content">
        <div>
          <label>
            <span>Тип</span>
            <input type="text" name="type" v-model="formData.type" required/>
          </label>
          <label>
            <span>Производитель</span>
            <input type="text" name="brand" v-model="formData.brand" required/>
          </label>
          <label>
            <span>Описание</span>
            <input type="text" name="description" v-model="formData.description"/>
          </label>
          <label>
            <span>Стоимость</span>
            <input type="number" name="price" v-model="formData.price" required/>
          </label>
          <label>
            <span>Год покупки</span>
            <input type="number" name="year" v-model="formData.year" required/>
          </label>
          <label>
            <span>Сезон</span>
            <select name="season" v-model="formData.season" required>
              <option value="зима">Зима</option>
              <option value="осень-весна">Осень/Весна</option>
              <option value="лето">Лето</option>
            </select>
          </label>
          <button v-on:click="addFormData()" v-if="modalRole === 'add'">Добавить</button>
          <button v-on:click="editFormData()" v-if="modalRole === 'edit'">Изменить</button>
          <button v-on:click="modalToggle()" type="reset">Закрыть</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "modal-form",
  data: function() {
    return {
      formData: {
        type: '',
        brand: '',
        description: '',
        price: '',
        year: '',
        season: ''
      }
    };
  },
  computed: {
    modalOpen() {
      return this.$store.state.modalOpen;
    },
    modalRole() {
      return this.$store.state.modalRole;
    }
  },
  methods: {
    modalToggle() {
      this.$store.commit("modalToggle");
    },
    addFormData() {
      this.$store.commit("addFormData", this.formData);
      this.modalToggle();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.modal-container {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  position: fixed;
  transition: all 0.3s ease;
  opacity: 0;
  visibility: hidden;
}
.modal-container.active {
  opacity: 1;
  visibility: visible;
}
.modal-container .overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
}
.modal-container .modal {
  position: absolute;
  box-sizing: border-box;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  top: 50%;
  background-color: #1b1c4a;
  border-radius: 3px;
}
.modal-container .modal .modal-title {
  text-align: center;
  border-bottom: 1px solid #573a5a;
  padding: 20px;
  color: #e9e6dd;
  font-weight: bold;
}
.modal-container .modal .modal-content {
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
</style>
