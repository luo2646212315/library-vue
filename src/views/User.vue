<template>
  <div>
    <!-- <HeaderFloat></HeaderFloat> -->
    <UserHeader @getSelect="getSelect"></UserHeader>
    <transition>
      <component :is="command"></component>
    </transition>
  </div>
</template>

<script>
import UserHeader from "../components/user/UserHeader";
import bookshelf from "../components/user/Bookshelf";
import userInfo from "../components/user/UserInfo";
import message from "../components/user/Message";
import upload from "../components/user/Upload";
export default {
  name: "UserInfo",
  created() {
  },
  props: {
    msg: String
  },
  components: {
    UserHeader,
    bookshelf,
    userInfo,
    message,
    upload
  },
  data() {
    return {
      command: "userInfo"
    };
  },
  methods: {
    getSelect(val) {
      var s = val.replace("/user/", "");
      this.command = s;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
