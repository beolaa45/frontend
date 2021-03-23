<template>
  <div class="home">
    <div v-if="this.stateListVote"></div>
    <ModalConfirm
      v-if="this.dataModal"
      v-bind:dataModal="this.dataModal"
      v-on:myEventDelete="this.handleDeleteVote"
    />
    <div class="box-header">
      <div></div>
      <Header>List Votes of you</Header>
      <div class="create-vote">
        <HelloWorld />
      </div>
      
      
    </div>
    
    <div v-show="this.sateVote.loadingListVote" class="Spinner">
      <Spinner />
    </div>
    <h5 class="list-emty" v-if="this.stateListVote && this.stateListVote.data.votes.data.length == 0">
      The List Is Empty
    </h5>
    <ul class="list-vote" v-if="this.stateListVote">
      <li
        class="item-vote"
        v-for="item in stateListVote.data.votes.data"
        v-bind:key="item.id"
      >
        <CardVote
          v-on:disLike="handleDisLike"
          v-on:addLike="handleAddLike"
          v-on:editVote="handleEditVote"
          v-on:addOptionVote="handleAddOptionVote"
          v-on:deleteVote="handleShowModalDeleteVote"
          :dataVote="item"
        />
      </li>
    </ul>
    <div v-if="stateListVote.data.votes.data.length !== 0" class="pagintion">
      <BaseButton
        v-show="currenPage !== 1 "
        v-on:myEvent="reditectFirstPage"
        :stylePagintion="true"
      >
        <font-awesome-icon :icon="['fas', 'angle-left']" color="black" />
      </BaseButton>
      <BaseButton
        v-show="currenPage !== 1"
        v-on:myEvent="handlePevious"
        :stylePagintion="true"
      >
        <font-awesome-icon :icon="['fas', 'angle-double-left']" color="black" />
      </BaseButton>
      <ul v-if="this.stateListVote" class="list-group">
        <li
          class="list-group-item"
          v-for="page in Math.ceil(totalPage / listPage)"
          v-show="page > currenPage - 2 && page < currenPage + 2"
          :key="page"
        >
          <BaseButton
            v-if="page > currenPage - 2 && page < currenPage + 2"
            :stylePagintion="true"
            :actived="page === currenPage"
            v-on:myEvent="handleRedirectPage($event, page)"
          >
            {{ page }}
          </BaseButton>
        </li>
      </ul>
      <BaseButton
        v-show="currenPage !== Math.ceil(totalPage / listPage)"
        v-on:myEvent="handleNextPage"
        :stylePagintion="true"
      >
        <font-awesome-icon
          :icon="['fas', 'angle-double-right']"
          color="black"
        />
      </BaseButton>
      <BaseButton
        v-show="currenPage !== Math.ceil(totalPage / listPage)"
        v-on:myEvent="handleLastPage"
        :stylePagintion="true"
      >
        <font-awesome-icon :icon="['fas', 'angle-right']" color="black" />
      </BaseButton>
    </div>
  </div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue";
import { mapActions, mapGetters } from "vuex";
import CardVote from "../components/CardVote";
import Header from "../components/Header";
import ModalConfirm from "../components/ModalConfirm";
import Spinner from "../components/Spinner";
import BaseButton from "../components/BaseButton";
export default {
  name: "Home",
  props: "",
  components: {
    HelloWorld,
    CardVote,
    Header,
    ModalConfirm,
    Spinner,
    BaseButton,
  },
  data() {
    return {
      dataModal: null,
      listPage: 3,
      currenPage: 1,
    };
  },
  computed: {
    ...mapGetters("auth", ["user"]),
    ...mapGetters("vote", ["stateListVote", "sateVote", "totalPage"]),
  },
  watch: {
    currenPage: function() {
      this.getVote({
        auth: this.user,
        query: { page: this.currenPage, perPage: this.listPage },
      });
    },
  },

  methods: {
    ...mapActions("vote", ["getVote", "deleteVote", "addLike", "disLike"]),
    handleEditVote(value) {
      console.log(value);
      this.$router.push({
        name: "createvote",
        params: { isEditTitle: true, data: value },
      });
    },
    handleShowModalDeleteVote(value) {
      this.dataModal = value;
    },
    handleDeleteVote() {
      console.log("delete", this.user);
      console.log(this.dataModal.id);
      this.deleteVote({ user: this.user, id: this.dataModal.id });
      document.querySelector(".toast").toast("show");
    },
    handleAddOptionVote(value) {
      console.log(value);
      this.$router.push({
        name: "options",
        params: { isAddOption: true, data: value },
      });
    },
    handleAddLike(value) {
      console.log(value);
      this.addLike(value);
    },
    handleDisLike(value) {
      this.disLike(value);
    },
    handleRedirectPage(e, page) {
      if (this.currenPage !== page) {
        console.log(page);
        this.currenPage = page;
      }
    },
    handlePevious() {
      if (this.currenPage !== 1) {
        this.currenPage = this.currenPage - 1;
      }
    },
    reditectFirstPage() {
      if (this.currenPage !== 1) {
        this.currenPage = 1;
      }
    },
    handleNextPage() {
      if (this.currenPage !== Math.ceil(this.totalPage / this.listPage)) {
        this.currenPage = this.currenPage + 1;
      }
    },
    handleLastPage() {
      if (this.currenPage !== Math.ceil(this.totalPage / this.listPage)) {
        this.currenPage = Math.ceil(this.totalPage / this.listPage);
      }
    },
  },
  mounted() {
    console.log(this.user);
    // this.$router.push({path: '/', query: { page: 1, perPage: 5}})
    this.getVote({
      auth: this.user,
      query: { perPage: this.listPage, page: this.currenPage },
    });
    console.log("mounted");
  },
  updated() {
    this.$nextTick(function () {
      // this.getVote(this.user, { perPage: this.listPage, page: this.currenPage });

      console.log("updated");
    });
  },
};
</script>

<style scoped>
.title-vote {
  padding: 5px 5px;
  text-align: left;
  margin-top: 20px;
}
.list-vote {
  list-style: none;
  margin-top: 20px;
  padding-left: 0;
}
.item-vote {
  margin-bottom: 30px;
  /* border-bottom: 1px solid rgba(129, 129, 129, 0.63); */
}
.Spinner {
  margin-top: 20px;
}
.pagintion {
  display: flex;
  justify-content: center;
}
.pagintion > *:not(:last-child) {
  margin-right: 10px;
}
.list-group {
  display: flex;
  flex-direction: row;
  padding-left: 0;
}
.list-group-item {
  padding: 0;
  border: none;
  text-align: left;
}
.list-group > *:not(:last-child) {
  margin-right: 10px;
}
.box-header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
}
.list-emty{
  margin-top: 30px;
}
.create-vote{
  align-self: start;
  margin-top: 30px;
}
</style>