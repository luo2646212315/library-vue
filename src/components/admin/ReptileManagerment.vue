<template>
  <div id="reptileManager">
    <div class="reptileManager-middle">
      <div class="left"></div>
      <div class="right"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "reptileManager",
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
<style scoped>
#reptileManager {
  width: 100%;
  height: 800px;
}
#reptileManager .reptileManager-middle {
  width: 1000px;
  height: 100%;
  margin: auto;
  border: 1px solid red;
}
</style>
