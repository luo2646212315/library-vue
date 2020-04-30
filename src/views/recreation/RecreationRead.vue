<template>
  <div>
    <HeaderFloat></HeaderFloat>
    <Read></Read>
  </div>
</template>

<script>
import HeaderFloat from "../../components/recreation/HeaderFloat";
import Read from "../../components/recreation/Read"
export default {
  name: "BookInfo",
  props: {
    msg: String
  },
  components: {
    HeaderFloat,
    Read
  },
  data() {
    return {};
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
