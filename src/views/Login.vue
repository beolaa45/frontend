<template>
  <div id="login">
    <form @submit="checkForm">
      <div class="mb-3">
        <label for="email" class="form-label">Email address*</label>
        <input
          v-model="email"
          type="text"
          class="form-control"
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
        />
        <div v-if="errors.password" class="alert alert-danger" role="alert">
          {{ errors.password }}
        </div>
      </div>
      <div class="alert alert-primary" role="alert">
        <router-link to="/register">Register</router-link>
      </div>
      <div v-if="errors.emailPassword" class="alert alert-danger" role="alert">
        {{ errors.emailPassword }}
      </div>

      <button type="submit" class="btn btn-primary ">
        <span >Login</span>
        <div v-if="user.loadingLogIn" class="spinner-border spinner-border-sm" size="1x" role="status">
          <span class="sr-only"></span>
        </div>
      </button>
    </form>
  </div>
</template>
<script>
import { mapMutations, mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      errors: {},
      email: null,
      password: null,
    };
  },
  computed: {
    ...mapGetters("auth", ["user"])
  },
  methods: {
    ...mapMutations("auth", ["handleLogIn"]),
    ...mapActions("auth", ["logIn"]),
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
      } else if (this.password.length < 6) {
        this.errors = {
          ...this.errors,
          password: "password must be at least 6 characters ",
        };
      } 

      if (Object.keys(this.errors).length < 1) {
        //  this["auth/handleLogIn"](true)
        const data = {
          email: this.email,
          password: this.password
        }
        this.logIn(data)
        // this.$store.commit("auth/handleLogIn", true);
        // this.$store.commit("auth/handleShowModalLogIn", true);
        // return this.$router.push("/");
      }
      e.preventDefault();
    },
    validEmail: function (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
  },
};
</script>
<style scoped>
#login {
  margin-top: 100px;
}
.mb-3 {
  text-align: left;
}
.spinner-border{
  margin-left:  10px;
}
.alert {
  text-align: right;
  padding: 2px 20px;
  background-color: white;
  border: none;
  margin-top: 10px;
}

</style>
