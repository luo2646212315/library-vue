<template>
  <div class="recreationHome">   
    <HeaderCommon></HeaderCommon>
    <HomeIndex></HomeIndex>
    <Footer></Footer>
  </div>
</template>

<script>
import HomeIndex from "../../components/recreation/HomeIndex";
import HeaderCommon from "../../components/recreation/HeaderCommon"
import Footer from "../../components/Footer"

// import api from "../api";
export default {
  name: "RecreationHome",
  components: {
    HomeIndex,
    HeaderCommon,
    Footer
  },
  created() {},
  data() {
    return {
      activeIndex2: "1"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    qqLogin() {
      console.log("123");
      // api.qqLogin().then(res => {
      //   console.log(res);
      // });
    }
  },
  watch: {}
};
</script>

<style>

</style>