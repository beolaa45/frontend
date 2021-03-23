<template>
  <div class="hello">
  <div class="d-flex justify-content-center">
    <BaseButton :type="'button'" v-on:myEvent="handleCreateVote">Create Vote</BaseButton>
  </div>
  </div>
</template>

<script>
import BaseButton from './BaseButton'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {
   BaseButton
  },
  data(){
    return {
     
    }
  },
  methods: {
    handleCreateVote(){
      this.$router.push('/createvote')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.header{
  font-size: 17px;
}
</style>
