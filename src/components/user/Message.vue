<template>
  <div id="message">
    <div class="message-middle">
      <div class="left"></div>
      <div class="right"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Message",
  created() {},
  props: {
    msg: String
  },
  components: {},
  data() {
    return {};
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#message {
  width: 100%;
  height: 800px;
}
#message .message-middle {
  width: 1000px;
  height: 100%;
  margin: auto;
  border: 1px solid red;
}
</style>
