<template>
  <div>
    <HeaderFloat></HeaderFloat>
    <SearchIndex></SearchIndex>
  </div>
</template>

<script>
import HeaderFloat from "../../components/recreation/HeaderFloat";
import SearchIndex from "../../components/recreation/SearchIndex";
export default {
  name: "Search",
  components: {
    HeaderFloat,
    SearchIndex
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
