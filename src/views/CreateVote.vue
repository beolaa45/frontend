<template>
  <div class="create-vote">
    <div>
      <Header>{{this.params && this.params.isEditTitle ? "Edit Title" : 'What’s the occasion?'}}</Header>
    </div>

    <div class="content">
      <BaseInput
        :isModal="true"
        :type="'text'"
        :placeholder="''"
        :title="'Title:'"
        :id="'title'"
        v-on:myEvent="changeTitle"
        :error="this.errorTitle"
        :value="this.title"
      />
      <div class="button-box">
        <BaseButton
          :isModal="this.params && this.params.isEditTitle"
          v-on:myEvent="stepOne"
          :disabled="this.errorTitle"
          >{{
            this.params && this.params.isEditTitle ? "Edit Title" : "Continue"
          }}</BaseButton
        >
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";
import BaseInput from "../components/BaseInput";
import BaseButton from "../components/BaseButton";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  name: "CreateVote",
  data() {
    return {
      title: "",
      errorTitle: "",
      params: null,
    };
  },
  watch: {},
  components: {
    Header,
    BaseInput,
    BaseButton,
  },
  computed: {
    ...mapGetters("auth", ["user"]),
    ...mapGetters("vote", ["sateVote"]),
  },
  methods: {
    ...mapActions("vote", ["editTitle"]),
    ...mapMutations("vote", ["handleAddTitle"]),
    stepOne(e) {
      if (this.params?.isEditTitle) {
        console.log("edit", this.params);
        let data = {user: this.user, id: this.params.data.id, title: this.title}
        this.editTitle(data)

      } else {
 
          if (!this.errorTitle) {
            console.log(this.title)
            this.handleAddTitle(this.title);
          }
 
          // if (!this.errorTitle) {
          //   this.handleAddTitle(this.title);
          // }
     
      }

      e.preventDefault();
    },
    changeTitle(value) {
      this.title = value;
      if ( this.title.length < 1) {
        this.errorTitle = "Title required. ";
      } else {
        this.errorTitle = null;
      }
    },
    getRouterParams() {
        this.params = this.$router?.history?.current?.params;
        this.title = this.params?.data?.title ? this.params?.data?.title : "";
        console.log(this.params);  
      
    },
    defaultTitle() {
      if (this.params && this.params?.dataInput?.title) {
        this.title = this.params.dataInput.title;
      }
    },
  },
  created() {
    this.getRouterParams();
  },
  updated: function () {
    this.$nextTick(function () {
      // Code that will run only after the
      // entire view has been re-rendered
      console.log("okfdsf");
    });
  },
};
</script>

<style scoped>
.button-box {
  display: flex;
  justify-content: flex-end;
}
</style>