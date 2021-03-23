<template>
  <div class="users">
      <ModalConfirm
      v-if="this.dataModal"
      v-bind:dataModal="this.dataModal"
      v-on:myEventDelete="this.handleDeleteVote"
    />
    <Header>New list of votes</Header>
    <ul class="list-group" v-if="this.stateUsers.successVotes">
      <li
        class="list-group-item"
        v-for="item in stateUsers.successVotes.data.listVotes"
        v-bind:key="item.id"
      >
        <CardVote
            v-on:addLike="handleAddLike"
            v-on:disLike="handleDisLike"
            v-on:addOptionVote="handleAddOptionVote"
            v-on:editVote="handleEditVote"
            v-on:deleteVote="handleShowModalDeleteVote"
           :dataVote="item"
           :isListVoteUser="true"
           :isOwer="user.auth.id"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import Header from "../components/Header";
import CardVote from "../components/CardVote";
import { mapActions, mapGetters } from "vuex";
import ModalConfirm from "../components/ModalConfirm"
export default {
  name: "Users",
  components: {
    Header,
    CardVote,
    ModalConfirm
  },
  computed: {
    ...mapGetters("votesUsers", ["stateUsers"]),
    ...mapGetters("auth", ["user"]),
    getDataLitsVotes() {
      return {
        query: {
          page: this.currentPage,
          perPage: this.listPage,
        },
      };
    },
    getTotalPage(){
        // console.log("total",this.stateUsers.data.total / this.listPage)
    //    return Math.ceil(this.stateUsers.successVotes.data.total / this.listPage)
    if(this.stateUsers.successVotes){
        return Math.ceil(this.stateUsers.successVotes.data.total / this.listPage)
    }
    return 0
    }
  },
  methods: {
    ...mapActions("votesUsers", ["getListVotes", "addLike", "disLike", "deleteVote"]),
    handleAddLike(value){
        console.log(value)
        this.addLike(value)
    },
    handleDisLike(value){
        this.disLike(value)
    },
    handleAddOptionVote(value){
        console.log(value)
        this.$router.push({name: "options", params: {isUser: true, inforUser: value}})
    },
    handleEditVote(value){
       this.$router.push({
        name: "createvote",
        params: { isEditTitle: true, data: value },
      });
    },
    handleShowModalDeleteVote(value){
      this.dataModal = value;
    },
    handleDeleteVote() {
      console.log("delete", this.user);
      console.log(this.dataModal.id);
      this.deleteVote({ user: this.user, id: this.dataModal.id });
      // document.querySelector(".toast").toast("show");
    },
  },
  data() {
    return {
      currentPage: 1,
      dataModal: null,
      listPage: 5,
    };
  },
  mounted() {
    this.getListVotes(this.getDataLitsVotes);
  },
};
</script>

<style scoped>
</style>