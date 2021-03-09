<template>
  <div  class="text-end">
    <button
      v-if="this.isModal"
      :type="this.type"
      :disabled="this.disabled"
      @click="this.onClick"
      class="btn btn-primary"
      :class="{ icon: this.icon }"
      data-bs-toggle="modal"
      data-bs-target="#myModal"
    >
      <slot></slot>
    </button>

    <button
      v-else
      :type="this.type"
      :disabled="this.disabled"
      @click="this.onClick"
      class="btn btn-primary"
      :class="{
        icon: this.icon,
        'style-button': this.styleButton,
        'style-icon': this.styleIcon,
        'style-pagintion': this.stylePagintion,
        'actived': this.actived,
      }"
    >
      <slot></slot>
    </button>
  </div>
</template>

<script>
export default {
  name: "BaseButton",
  props: [
    "type",
    "disabled",
    "icon",
    "isModal",
    "styleIcon",
    "stylePagintion",
    "actived",
    "styleButton"
  ],
  methods: {
    onClick(event) {
      this.$emit("myEvent", event);
    },
  },
};
</script>
<style scoped>
#base-button {
}
.icon {
  width: 35px;
  height: 30px;
}

.btn.btn-primary {
  margin: 0;
}
.style-button{
  width: 200px;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 2px;
  font-size: 14px;
}
.style-icon {
  background-color: transparent;
  padding: 10px;
  border: none;
  display: flex;
  align-items: center;
}

.style-pagintion {
  background-color: transparent;
  width: 40px;
  height: 40px;
  color: #000;
}
.style-pagintion:hover{
  background-color: teal;
  color: white;
  transition: all ease .3s ;
}
.actived{
  background-color: teal;
  color: white;
}

.btn:focus {
    box-shadow: none;
}

</style>
