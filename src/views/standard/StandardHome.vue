<template>
  <div class="StandardHome">
    <Header :bookTypes="bookTypes"></Header>
    <HomeIndex :bookTypes="bookTypes"></HomeIndex>
  </div>
</template>

<script>
import Header from "../../components/standard/Header";
import HomeIndex from "../../components/standard/HomeIndex";
export default {
  name: "StandardHome",
  props: {
    msg: String
  },
  created() {},
  components: {
    Header,
    HomeIndex
  },
  data() {
    return {
      bookTypes: []
    };
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
