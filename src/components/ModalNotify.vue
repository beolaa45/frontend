<template>
    <div
      v-if="this.show"
      class="align-items-center text-white  border-0"
      id="toastRegister"
      :class="{'bg-primary': this.success, 'bg-warning': this.error }"
    >
    
      <div class="d-flex">
         <div v-if="this.success" class="toast-body">
           Success.
        </div>
        <div v-if="this.error" class="toast-body">Fail.</div>
        <button
          type="button"
          class="btn-close btn-close-white me-2 m-auto"
          data-bs-dismiss="toast"
          aria-label="Close"
          @click="handleModalRegister"
        ></button>
      </div>
    </div>
</template>

<script>
export default {
   name: "ModalNotify",
    props: ["show", "success", "error", "childrent"],
    methods: {
        handleModalRegister(){
            this.$emit("event")
        }
    }
}
</script>

<style>

</style>