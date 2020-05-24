<template>
  <div id="footer">Footer</div>
</template>

<script>
export default {
  name: 'Footer',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  height: 100px;
  padding: 0;
}
</style>
