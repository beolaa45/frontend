<template>
  <div class="change-password">
    <BaseInput
      :title="'Old Password* '"
      :type="'password'"
      :id="'change-password-old-password'"
      :placeholder="''"
      :error="errorOldPassword"
      :value="oldPassword"
      v-on:myEvent="changeOldPassword"
    />
    <BaseInput
      :title="'New Password* '"
      :type="'password'"
      :id="'change-password-new-password'"
      :placeholder="''"
      :error="errorNewPassword"
      :value="newPassword"
      v-on:myEvent="changeNewPassword"
    />
    <BaseInput
      :title="'Confirm Password* '"
      :type="'password'"
      :id="'change-password-confirm-password'"
      :placeholder="''"
      :error="errorConfirmPassword"
      :value="confirmNewPassword"
      v-on:myEvent="changeConfirmNewPassword"
    />
    <div class="submit d-flex justify-content-center">
      <BaseButton v-on:myEvent="onSubmit">Change Password</BaseButton>
    </div>
  </div>
</template>

<script>
import BaseInput from "../components/BaseInput";
import BaseButton from "../components/BaseButton";
import { mapActions } from "vuex";
export default {
  name: "ChangePassword",
  components: {
    BaseInput,
    BaseButton,
  },
  data() {
    return {
      oldPassword: "",
      errorOldPassword: "",
      newPassword: "",
      errorNewPassword: "",
      confirmNewPassword: "",
      errorConfirmPassword: "",
    };
  },
  methods: {
    ...mapActions("auth", ["changePassword"]),
    changeOldPassword(value) {
      console.log(value);
      this.oldPassword = value;
      if (!this.oldPassword) {
        this.errorOldPassword = "Old Password required";
      } else if (this.oldPassword.length < 8) {
        this.errorOldPassword = "Old Password must be at least 8 characters";
      } else {
        this.errorOldPassword = null;
      }
    },
    changeNewPassword(value) {
      this.newPassword = value;
      if (!this.newPassword) {
        this.errorNewPassword = "New Password required";
      } else if (this.newPassword.length < 8) {
        this.errorNewPassword = "New Password must be at least 8 characters";
      } else {
        this.errorNewPassword = null;
      }
    },
    changeConfirmNewPassword(value) {
      this.confirmNewPassword = value;
      if (!this.confirmNewPassword) {
        this.errorConfirmPassword = "Confirm New Password required";
      } else if (this.confirmNewPassword !== this.newPassword) {
        this.errorConfirmPassword = "Both password need to be the same";
      } else {
        this.errorConfirmPassword = null;
      }
    },
    onSubmit(e) {
      this.changeOldPassword(this.oldPassword);
      this.changeNewPassword(this.newPassword);
      this.changeConfirmNewPassword(this.confirmNewPassword);
      if (
        !this.errorConfirmPassword &&
        !this.errorNewPassword &&
        !this.errorOldPassword
      ) {
       
        let payload = {
          oldPassword: this.oldPassword,
          newPassword: this.newPassword,
          confirmPassword: this.confirmNewPassword,
        };
         console.log("sumit", payload);
        this.changePassword(payload);
      }
      e.preventDefault();
    },
  },
};
</script>

<style scoped>
.submit {
}
</style>