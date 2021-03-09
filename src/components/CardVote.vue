<template>
  <div>
    <div class="alert alert-info title-vote" role="alert">
      Title: {{ this.dataVote.title }}
      {{
        this.isListVoteUser
          ? "--- Ower: " + this.dataVote.owner.full_name
          : null
      }}
      <div v-show="isOwer ? isOwer === dataVote.user_id ? true :false : true" class="box-button">
        <BaseButton v-on:myEvent="this.editVote" icon="true"
          ><font-awesome-icon size="xs" icon="edit"
        /></BaseButton>
        <BaseButton :isModal="true" v-on:myEvent="this.deleteVote" icon="true"
          ><font-awesome-icon size="xs" icon="trash-alt"
        /></BaseButton>
      </div>
    </div>
    <ul class="list-group">
      <li
        v-for="item in dataVote.options"
        :key="item.id"
        class="list-group-item"
      >
        {{ item.title }}
        <div class="heart">
          <BaseButton
            v-if="item.isLike"
            v-on:myEvent="removeLike($event, item)"
            :styleIcon="true"
          >
            <span class="qty-vote">
              {{ item.totalLike }}
            </span>
            <font-awesome-icon :icon="['fa', 'heart']" color="red" />
          </BaseButton>
          <BaseButton
            v-if="!item.isLike"
            v-on:myEvent="addLike($event, item)"
            :styleIcon="true"
          >
            <span class="qty-vote">
              {{ item.totalLike }}
            </span>
            <font-awesome-icon :icon="['far', 'heart']" color="black" />
          </BaseButton>
        </div>
      </li>
      <BaseButton v-on:myEvent="this.addOption">
        <font-awesome-icon icon="plus-square" size="1x" />
      </BaseButton>
    </ul>
  </div>
</template>

<script>
import BaseButton from "./BaseButton";
export default {
  name: "CardVote",
  props: ["dataVote", "isListVoteUser", "isOwer"],
  data() {
    return {};
  },
  components: {
    BaseButton,
  },
  methods: {
    editVote() {
      this.$emit("editVote", this.dataVote);
    },
    deleteVote() {
      this.$emit("deleteVote", this.dataVote);
    },
    addOption() {
      this.$emit("addOptionVote", this.dataVote);
    },
    addLike(e, item) {
      let payload = {
        optionId: item.id,
        voteId: item.vote_id,
      };
      this.$emit("addLike", payload);
    },
    removeLike(e, item) {
      let payload = {
        optionId: item.id,
        voteId: item.vote_id,
      };
      this.$emit("disLike", payload);
      console.log(payload, e);
    },
    deleteVoteOption(value){
      console.log(value)
    }
  },
};
</script>

<style scoped>
.list-group-item {
  text-align: left;
  list-style: none;
   position: relative;
}
.title-vote {
  position: relative;
  text-align: left;
  padding: 10px;
}
.box-button {
  position: absolute;
  top: 50%;
  right: 10px;
  display: flex;

  transform: translateY(-50%);
}
.list-group > div {
  margin-top: 10px;
}
.box-button > *:last-child {
  margin-left: 10px;
}
.delete{
  position: absolute;
  top: 50%;
  right: -50px;
  transform: translateY(-50%);
}
ul > div > button {
  margin-bottom: 10px;
}
.heart {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
}
.qty-vote {
  color: #000;
  margin-right: 10px;
  padding: 0;
}
</style>