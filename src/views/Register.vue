<template>
  <div id="register">
    <form @submit="checkForm">
      <div class="mb-3">
        <label for="fullName" class="form-label">Full Name*</label>
        <input
          v-model="fullName"
          type="text"
          class="form-control"
          id="fullName"
          placeholder="Full Name"
          :class="{error: errors.fullName}"
        />
        <div v-if="errors.fullName" class="alert alert-danger" role="alert">
          {{ errors.fullName }}
        </div>
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email address*</label>
        <input
          v-model="email"
          type="text"
          class="form-control"
          id="email"
          placeholder="name@example.com"
          :class="{error: errors.email}"
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
          :class="{error: errors.password}"
        />
        <div v-if="errors.password" class="alert alert-danger" role="alert">
          {{ errors.password }}
        </div>
      </div>
      <div class="mb-3">
        <label for="comfirmPassword" class="form-label"
          >Confirm Password*</label
        >
        <input
          v-model="comfirmPassword"
          type="password"
          class="form-control"
          id="comfirmPassword"
          :class="{error: errors.comfirmPassword}"
        />
        <div
          v-if="errors.comfirmPassword"
          class="alert alert-danger"
          role="alert"
        >
          {{ errors.comfirmPassword }}
        </div>
      </div>
      <div class="alert login alert-primary" role="alert">
        <router-link to="/login">Login</router-link>
      </div>
      <button type="submit" class="btn btn-primary">Register</button>
    </form>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  name: "Register",
  data() {
    return {
      errors: {},
      email: null,
      password: null,
      comfirmPassword: null,
      fullName: null,
    };
  },
  computed: {
    ...mapMutations(["auth/registerSucces"]),
  },
  methods: {
    checkForm(e) {
      this.errors = {};
      /// full name
      if (!this.fullName) {
        this.errors = { ...this.errors, fullName: "Full Name required." };
      }
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
      } else {
        //comfirm password
        if (!this.comfirmPassword || this.comfirmPassword !== this.password) {
          this.errors = {
            ...this.errors,
            comfirmPassword: "Both password need to be the same",
          };
        }
      }
      if (Object.keys(this.errors).length < 1) {
        console.log(
          "succes",
          this.$store.commit("auth/handleShowModalRegister", true)
        );
        return this.$router.push("login");
      }

      console.log("ok", e, this.email, this.password, this.comfirmPassword);
      e.preventDefault();
    },
    toastToggle(value) {
      let toastHTMLElement = document.getElementById("toast");
      toastHTMLElement.style.display = value;
    },
    validEmail: function (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
  },
};
</script>


<style scoped>
#register {
  padding-top: 100px;
}
.mb-3 {
  text-align: left;
}
.alert {
  margin-top: 10px;
  text-align: left;
  padding: 2px 20px;
  background-color: white;
  border: none;
  font-size: 13px;
}
.error{
  border: 1px solid red;
}
.login{
  text-align: right;
  font-size: 16px;
}
</style>
