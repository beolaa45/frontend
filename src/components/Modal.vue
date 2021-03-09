<template>
  <div class="modal-spinner">
     <div class="spinner-border text-primary" role="status">
    <span class="visually-hidden"></span>
  </div>
  </div>
 
</template>

<script>
export default {
  name: "Modal",
  props: [],
  methods: {
    handleModalLogIn() {},
  },
};
</script>

<style scoped>
.modal-spinner{
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  background-color: rgba(46, 46, 46, 0.459);
}
</style>