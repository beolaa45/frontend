<template>
  <div >
    <div
      id="myModal"
      class="modal fade"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              You want delete Vote: {{ this.dataModal.title }}
            </h5>
             <BaseButton
              :type="'button'"
              v-on:myEvent="this.handleEventClose"
              :data-bs-dismiss="'modal'"
            
              :aria-label="'Close'"
              >
                <font-awesome-icon icon="times" />
              </BaseButton
            >
          </div>
          <div class="modal-body">
            <ul class="list-group">
              <li v-for="item in dataModal.options" :key='item.id' class="list-group-item">{{item.title}}</li>
            </ul>
          </div>
          <div class="modal-footer d-flex justify-content-between">
            <BaseButton
              :type="'button'"
              v-on:myEvent="this.handleEventClose"
              :data-bs-dismiss="'modal'"
              >Close</BaseButton
            >
            <BaseButton
              :type="'button'"
              v-on:myEvent="this.handleEventDelete"
              :data-bs-dismiss="'modal'"
              >Delete</BaseButton
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from "../components/BaseButton";

export default {
  name: "ModalConfirm",
  components: {
    BaseButton,
  },
  props: ["dataModal"],
  methods: {
    handleEventClose() {
      this.$emit("myEventClose");
    },
    handleEventDelete() {
      this.$emit("myEventDelete");
    },
  },
  mounted() {},
};
</script>

<style scoped>

</style>