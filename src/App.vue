<template>
  <div id="app">
    <Modal v-if="this.sateVote.loading" />
    <Modal v-if="this.sateVote.loadingDelete" />
    <Modal v-if="this.sateVote.loadingEdit" />
    <Modal v-if="this.sateVote.loadingAddOptions" />
    <Modal v-if="this.user.loadingLogIn" />
    <Modal v-if="this.user.loadingRegister" />
    <Modal v-if="this.user.loadingChangePassword" />

    <nav
      v-if="user.auth && user.auth.access_token"
      class="navbar navbar-expand-lg navbar-light bg-light"
    >
      <div class="container-fluid">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <font-awesome-icon :icon="['fas', 'bars']" color="black" />
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link" exact to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/list-vote-other-user"
                >Users</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/change-password"
                >Change Password</router-link
              >
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" @click="handleLogout">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <ModalNotify
      v-on:event="handleModalLogIn"
      :show="this.user.showModalLogIn"
      :success="this.user.auth"
      :error="this.user.errorLogIn"
    />
    <ModalNotify
      v-on:event="handleModalRegister"
      :show="this.user.showModalRegister"
      :success="this.user.successRegister"
      :error="this.user.errorRegister"
    />
    <ModalNotify
      v-on:event="hiddenModalVote"
      :show="this.sateVote.showModalVote"
      :success="true"
      :error="this.sateVote.error"
    />
    <ModalNotify
      v-on:event="hiddenModalDelete"
      :show="this.sateVote.showModalDelete"
      :success="this.sateVote.successDeleted"
      :error="this.sateVote.errorDelete"
    />
    <ModalNotify
      v-on:event="hiddenModalEdit"
      :show="this.sateVote.showModalEdit"
      :success="this.sateVote.successEdited"
      :error="this.sateVote.errorEdit"
    />
    <ModalNotify
      v-on:event="hiddenModalAddOptions"
      :show="this.sateVote.showModalAddOptions"
      :success="this.sateVote.successAddOptions"
      :error="this.sateVote.errorAddOptions"
    />
    <ModalNotify
      v-on:event="hiddenModalChangePassword"
      :show="this.user.showModalChangePassword"
      :success="this.user.successChangePassword"
      :error="this.user.errorChangePassword"
    />
    <router-view></router-view>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
import Modal from "./components/Modal";
import ModalNotify from "./components/ModalNotify";
export default {
  name: "App",
  data() {
    return {
      primary: true,
      warning: false,
    };
  },
  components: {
    Modal,
    ModalNotify,
  },
  watch: {},
  computed: {
    ...mapGetters("auth", [
      "isLogIn",
      "showModalLogIn",
      "showModalRegister",
      "user",
    ]),
    ...mapGetters("vote", ["sateVote"]),
  },
  methods: {
    ...mapMutations("auth", [
      "handleShowModalLogIn",
      "defaultState",
      "handleShowModalChangePassword",
    ]),
    ...mapMutations("vote", [
      "showModalVotes",
      "showModalDelete",
      "showModalEdit",
      "handleShowModalAddOptions",
    ]),
    handleLogout() {
      // this.$router.push("/change-password")
      this.$store.commit("auth/handleLogout", null);

      location.reload();
    },
    handleModalLogIn() {
      this.handleShowModalLogIn(false);
    },

    handleModalRegister() {
      this.$store.commit("auth/handleShowModalRegister", false);
    },
    hiddenModalVote() {
      this.showModalVotes(false);
    },
    hiddenModalDelete() {
      this.showModalDelete(false);
    },
    hiddenModalEdit() {
      this.showModalEdit(false);
    },
    hiddenModalAddOptions() {
      this.handleShowModalAddOptions(false);
    },
    hiddenModalChangePassword() {
      this.handleShowModalChangePassword(false);
    },
  },
  mounted() {},
};
</script>
<style>
#app {
  font-family: sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  max-width: 800px;
  margin: 0 auto;
  padding-bottom: 100px;
  padding: 10px;
}
.router-link-active {
  color: #000 !important;
}
#toast,
#toastRegister {
  /* display: none; */
  position: fixed;
  top: 0;
  left: 50%;
  transform: translate(-50%);
  width: 200px;
}
.nav {
  justify-content: flex-end;
}
.nav > * {
  margin-right: 10px;
  padding: 5px;
}
.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}
.nav-link {
  text-align: left;
  padding-left: 10px;
}
.navbar{
  margin-bottom: 30px;
}
</style>
