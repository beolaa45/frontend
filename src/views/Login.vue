<template>
  <div id="login">
    <form @submit="checkForm">
      <div class="mb-3">
        <label for="email" class="form-label">Email address*</label>
        <input
          v-model="email"
          type="text"
          class="form-control"
          v-bind:class="{ error: errors.email }"
          id="email"
          placeholder="name@example.com"
        />
        <div v-if="errors.email" class="alert alert-danger" role="alert">
          {{ errors.email }}
        </div>
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password*</label>
        <input
          v-model="password"
          type="password"
          class="form-control"
          id="password"
          placeholder="password"
          v-bind:class="{ error: errors.password }"
        />
        <div v-if="errors.password" class="alert alert-danger" role="alert">
          {{ errors.password }}
        </div>
      </div>
      <div class="alert register alert-primary" role="alert">
        <router-link to="/register">Register</router-link>
      </div>
      <div v-if="errors.emailPassword" class="alert alert-danger" role="alert">
        {{ errors.emailPassword }}
      </div>

      <button type="submit" class="btn btn-primary login">
        <span>Login</span>
        <div
          v-if="user.loadingLogIn"
          class="spinner-border spinner-border-sm"
          size="1x"
          role="status"
        >
          <span class="sr-only"></span>
        </div>
      </button>
      <div class="login-facebook">
        <BaseButton :type="'button'" :styleButton="true" v-on:myEvent="handleLoginFacebook"
          > Login Facebook
        </BaseButton>
      </div>
    </form>
  </div>
</template>
<script>
import { mapMutations, mapActions, mapGetters } from "vuex";
import BaseButton from "../components/BaseButton";
export default {
  data() {
    return {
      errors: {},
      email: null,
      password: null,
      urlLoginFacebook: "",
    };
  },
  components: {
    BaseButton,
  },
  watch: {
    getUrlLoginFacebook: function () {
      console.log("wtahc, face");
      this.urlLoginFacebook = this.getUrlLoginFacebook.data.url;
    },
  },
  computed: {
    ...mapGetters("auth", ["user", "getUrlLoginFacebook"]),
  },
  methods: {
    ...mapMutations("auth", ["handleLogIn", "clearLoginFacebook"]),
    ...mapActions("auth", ["logIn", "getPathLoginFacebook"]),
    checkForm(e) {
      this.errors = {};
      ///email
      if (!this.email) {
        this.errors = { ...this.errors, email: "Email required." };
      } else if (!this.validEmail(this.email)) {
        this.errors = { ...this.errors, email: "Valid email required." };
      }
      //password
      if (!this.password) {
        this.errors = { ...this.errors, password: "Password required." };
      } else if (this.password.length < 8) {
        this.errors = {
          ...this.errors,
          password: "password must be at least 8 characters ",
        };
      }

      if (Object.keys(this.errors).length < 1) {
        const data = {
          email: this.email,
          password: this.password,
        };
        this.logIn(data);
      }
      e.preventDefault();
    },
    validEmail: function (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    handleLoginFacebook() {
      console.log("ok");
      if (this.urlLoginFacebook) {
        window.open(this.urlLoginFacebook);
      }
    },
  },
  mounted() {
    this.getPathLoginFacebook();
  },
  destroyed() {
    this.clearLoginFacebook();
  },
};
</script>
<style scoped>
#login {
  margin-top: 100px;
  max-width: 700px;
}
.login {
  width: 200px;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 5px;
}
.mb-3 {
  text-align: left;
}
.spinner-border {
  margin-left: 10px;
}
.alert {
  text-align: left;
  padding: 2px 20px;
  background-color: white;
  border: none;
  margin-top: 10px;
  font-size: 13px;
  padding: 0;
}
.register {
  text-align: right;
}
.error {
  border: 1px solid red;
}

.login-facebook {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}
</style>
