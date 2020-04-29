<template>
  <div>
    <HeaderFloat></HeaderFloat>
    <BookDesc></BookDesc>
  </div>
</template>

<script>
import HeaderFloat from "../../components/recreation/HeaderFloat";
import BookDesc from "../../components/recreation/BookDesc";
export default {
  name: "BookInfo",
  props: {
    msg: String
  },
  components: {
    HeaderFloat,
    BookDesc
  },
  data() {
    return {};
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
