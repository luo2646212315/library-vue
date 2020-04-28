<template>
  <div>
    <!-- <HeaderFloat></HeaderFloat> -->
    <UserHeader></UserHeader>
  </div>
</template>

<script>
// import HeaderFloat from "../components/HeaderFloat";
import UserHeader from "../components/UserHeader";
export default {
  name: "UserInfo",
  props: {
    msg: String
  },
  components: {
    // HeaderFloat,
    UserHeader
  },
  data() {
    return {};
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
