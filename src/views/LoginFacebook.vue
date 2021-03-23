<template>
  <div class="login-facebook">
    <h1>Redirecting...</h1>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';
export default {
    data(){
        return {
            codeFacebook: ''
        }
    },
    methods: {
        ...mapMutations("auth", ["getCodeLoginFacebook"]),
        ...mapActions("auth", ["loginFacebook"]),
        getCodeFacebook(){
            const queryString = window.location.search;
            console.log(queryString);
            const urlParams = new URLSearchParams(queryString);
            let code = urlParams.get("code")
            this.getCodeLoginFacebook(code)
            this.loginFacebook({query : {code}})
            
            
        }
    },
  mounted: function () {
    this.$nextTick(function () {
      // Code that will run only after the
      // entire view has been rendered
      console.log("mod")
          this.getCodeFacebook()
      
    });
  },
  destroyed(){
      this.getCodeLoginFacebook(null)
  }
};
</script>

<style scoped>
  .login-facebook{
    margin-top: 10px;
  }
</style>