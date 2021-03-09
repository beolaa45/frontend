<template>
  <div class="options-vote">
    <div class="mb-3">
      <Header v-if="params && params.isAddOption">{{ "Add Options" }}</Header>
      <Header v-else>{{ "Options Vote" }}</Header>
      <p v-if="this.sateVote.title" class="title text-start">
        Title:
        <span class="badge bg-info text-dark">
          {{ this.sateVote.title }}
        </span>
      </p>
      <ul v-if="sateVote.options.length > 0 ? true : false" class="list-group">
        <li
          class="list-group-item text-start active"
          v-for="item in sateVote.options"
          :key="item + new Date().getTime()"
        >
          {{ item }}
        </li>
      </ul>
      <ul
        v-if="sateVote.addOptions.length > 0 ? true : false"
        class="list-group"
      >
        <li
          class="list-group-item text-start bg-success active"
          v-for="item in sateVote.addOptions"
          :key="item + new Date().getTime()"
        >
          {{ item }}
        </li>
      </ul>
      <p class="text-start">Date and Time</p>
      <VueCtkDateTimePicker :error="this.boolenDate" v-model="date" />
      <div>
        <BaseInput
          :type="'text'"
          :placeholder="''"
          :title="'Description:'"
          :id="'description'"
          v-on:myEvent="changeDescription"
          :error="errorDescription"
        />
        <div class="box-button">
          <BaseButton v-on:myEvent="addOption">Add </BaseButton>
          <BaseButton
            v-if="
              Object.keys(this.params).length !== 0 && this.params.isAddOption
            "
            :disabled="
              sateVote.title && sateVote.addOptions.length < 1 ? true : false
            "
            v-on:myEvent="stepTwo"
            >Finish</BaseButton
          >
          <BaseButton
            v-else-if="
              Object.keys(this.params).length !== 0 && this.params.isUser
            "
            :disabled="
              sateVote.title && sateVote.addOptions.length < 1 ? true : false
            "
            v-on:myEvent="stepTwo"
            >Finish</BaseButton
          >
          <BaseButton
            v-else
            :disabled="
              sateVote.title && sateVote.options.length < 1 ? true : false
            "
            v-on:myEvent="stepTwo"
            >Finish</BaseButton
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import BaseButton from "../components/BaseButton";
import BaseInput from "../components/BaseInput";
import Header from "../components/Header";

export default {
  data() {
    return {
      date: "",
      boolenDate: false,
      description: "",
      errorDate: "",
      errorDescription: null,
      params: null,
    };
  },
  watch: {
    date() {
      if (!this.date) {
        this.errorDate = "Date require. ";
        this.boolenDate = true;
      } else {
        this.errorDate = null;
        this.boolenDate = false;
      }
      console.log(this.date);
    },
  },
  components: {
    BaseButton,
    BaseInput,
    Header,
  },
  computed: {
    ...mapGetters("vote", ["sateVote"]),
    ...mapGetters("auth", ["user"]),
  },
  methods: {
    ...mapActions("vote", [
      "handleAddOptions",
      "handleFinish",
      "addOptionsVote",
    ]),
    ...mapMutations("vote", [
      "addTitleParams",
      "addOptionParams",
      "addMoreOptionsParam",
      "clearOptions",
    ]),
    stepTwo() {
      if (this.sateVote?.title ) {
        if (Object.keys(this.params).length !== 0 && this.params.isAddOption) {
          console.log("ok");
          let data = {
            id: this.params.data.id,
            options: this.sateVote.addOptions,
          };
          this.addOptionsVote(data);
        } else if (
          Object.keys(this.params).length !== 0 &&
          this.params.isUser
        ) {
          let data = {
            voteId: this.params.inforUser.id,
            options: this.sateVote.addOptions,
            isUser: this.params.isUser,
          };
          this.addOptionsVote(data);
          console.log("ok", this.params.inforUser, data);
        } else {
          console.log(this.user);
          this.handleFinish(this.user.auth);
        }
      }
    },
    changeDescription(value) {
      this.description = value;
      console.log(value);
      if (this.description.length < 1) {
        this.errorDescription = "Description require. ";
      } else {
        this.errorDescription = false;
      }
    },
    addOption() {
      if (!this.date) {
        this.errorDate = "Date require. ";
        this.boolenDate = true;
      } else {
        this.errorDate = false;
        this.boolenDate = false;
      }
      if (!this.description) {
        this.errorDescription = "Description require.";
      } else {
        this.errorDescription = null;
      }
      if (this.date && this.description) {
        if (Object.keys(this.params).length !== 0) {
          this.addMoreOptionsParam(`${this.date}: ${this.description}`);
        } else {
          this.handleAddOptions(`${this.date}: ${this.description}`);
        }
      }
    },
    getParamVote() {
      console.log("getpram");
      console.log(this.$router.history.current?.params);
      this.params = this.$router?.history?.current?.params;
      console.log("add title");
      if (Object.keys(this.params).length !== 0) {
        if (this.params.isUser) {
          console.log("dfasdfasdfasdf okkkkkkkkkkkkkkkk");
          this.addTitleParams(this.params?.inforUser?.title);
          this.addOptionParams(
            this.params.inforUser.options.map((el) => el.title)
          );
        } else {
          console.log("add title");
          this.addTitleParams(this.params?.data?.title);
          this.addOptionParams(this.params.data.options.map((el) => el.title));
        }
      }
    },
  },
  created() {
    this.getParamVote();
    console.log("param", this.params);
  },
  destroyed() {
    this.clearOptions();
    console.log("destroyed");
  },
};
</script>

<style scoped>
.box-button {
  display: flex;
  justify-content: space-between;
}
.text-start {
  margin-bottom: 10px;
}
.list-group-item {
  text-overflow: ellipsis;
}
.text-dark {
  font-size: 17px;
}
</style>