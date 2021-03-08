<template>
  <div id="app">
    {{user.islogIn}}
    <div v-if="user.isLogIn" id="nav">
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <router-link exact to="/">Home</router-link>
        </li>
        <li class="nav-item">
          <a href="#" @click="handleLogout">Logout</a>
        </li>
      </ul>
    </div>

    <!-- <button type="button" class="btn btn-primary" @click="Toasty" id="liveToastBtn">
      Show live toast
    </button> -->

    <div
      v-if="showModalLogIn"
      class="align-items-center text-white border-0"
      v-bind:class="{ 'bg-primary': user.auth, 'bg-warning': user.errorLogIn }"
      id="toast"
    >
      <div class="d-flex">
        <div v-if="user.auth" class="toast-body">Login Success.</div>
        <div v-if="user.errorLogIn" class="toast-body">Login fail.</div>
        <button
          type="button"
          class="btn-close btn-close-white me-2 m-auto"
          data-bs-dismiss="toast"
          aria-label="Close"
          @click="handleModalLogIn"
        ></button>
      </div>
    </div>

    <div
      v-if="showModalRegister"
      class="align-items-center text-white bg-warning border-0"
      id="toastRegister"
    >
      <div class="d-flex">
        <div v-if="showModalRegister" class="toast-body">Register Success.</div>
        <button
          type="button"
          class="btn-close btn-close-white me-2 m-auto"
          data-bs-dismiss="toast"
          aria-label="Close"
          @click="handleModalRegister"
        ></button>
      </div>
    </div>

    <router-view />
  </div>
</template>
<script>
// import Modal from "./components/Modal"
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";
export default {
  name: "App",
  data() {
    return {
      primary: true,
      warning: false
    };
  },
  watch: {

  },
  computed: {
    ...mapGetters("auth", [
      "isLogIn",
      "showModalLogIn",
      "showModalRegister",
      "user",
    ]),
  },
  methods: {
    ...mapMutations("auth", ["handleShowModalLogIn", "defaultState"]),
    handleLogout() {
      console.log("logout");
      this.$store.commit("auth/handleLogout", null);
      this.$router.push("login");
    },
    handleModalLogIn() {
      this.handleShowModalLogIn(false);
    },
   
    handleModalRegister() {
      this.$store.commit("auth/handleShowModalRegister", false);
    },
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  max-width: 500px;
  margin: 0 auto;
}
#toast,
#toastRegister {
  /* display: none; */
  position: fixed;
  top: 0;
  left: 50%;
  transform: translate(-50%);
}
.nav {
  justify-content: space-between;
}
#nav {
  padding: 30px;
}
.btn{
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
