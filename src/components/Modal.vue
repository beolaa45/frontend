<template>
      <div v-if="showModalLogIn" class="align-items-center text-white bg-primary border-0" id="toast">
      <div class="d-flex">
        <div v-if="showModalLogIn" class="toast-body">Login Success.</div>
        <div v-if="registerSucces" class="toast-body">Register Success.</div>
        <button
          type="button"
          class="btn-close btn-close-white me-2 m-auto"
          data-bs-dismiss="toast"
          aria-label="Close"
          @click="handleModalLogIn"
        ></button>
      </div>
    </div>
</template>

<script>
export default {
    name: "Modal",
    props: ["ishow", "children", "onClickName"],
    methods:{
        handleModalLogIn(){
            $this.$emit(`${this.onClickName}`, false)
        }
    }
}
</script>

<style scoped>

</style>