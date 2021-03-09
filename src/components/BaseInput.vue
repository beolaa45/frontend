<template>
  <div >
    <div class="mb-3">
      <label :for="this.id" class="form-label d-flex justify-content-start">{{
        this.title
      }}</label>
      <input
        v-model="dataInput"
        :type="this.type"
        class="form-control"
        :id="this.id"
        :placeholder="this.placeholder"
        v-bind:class="{ error: this.error }"
        :value="this.value"
      />
      <div v-if="this.error" class="alert alert-danger" role="alert">
        {{ this.error }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseInput",
  props: ["type", "placeholder", "title", "id", "value", "error"],
  data() {
    return {
      dataInput: "",
    };
  },
  watch: {
    dataInput() {
      this.changTitle();
    },
  },
  methods: {
    changTitle() {
      this.$emit("myEvent", this.dataInput);
    },
    changDataInput() {
      this.dataInput = this.value ? this.value : "";
    },
  },
  mounted() {
    this.changDataInput();
  },
};
</script>

<style scoped>
.alert {
  padding: 0;
  background-color: white;
  border: none;
  text-align: left;
  margin-top: 5px;
  font-size: 13px;
}
.error {
  border: 1px solid red;
}
</style>