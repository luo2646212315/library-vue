<template>
  <div class="StandardHome">
    <HeaderFloat></HeaderFloat>
    <Read></Read>
  </div>
</template>

<script>
import HeaderFloat from "../../components/standard/HeaderFloat";
import Read from "../../components/standard/Read";
export default {
  name: "StandardHome",
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
