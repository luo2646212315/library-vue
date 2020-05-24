<template>
  <div>
    <!-- <HeaderFloat></HeaderFloat> -->
    <AdminHeader @getSelect="getSelect"></AdminHeader>
    <transition>
      <component :is="command"></component>
    </transition>
  </div>
</template>

<script>
import AdminHeader from "../components/admin/AdminHeader";
import userManagerment from "../components/admin/UserManagerment";
import bookManagerment from "../components/admin/BookManagerment";
import uploadManagerment from "../components/admin/UploadManagerment";
import reptileManagerment from "../components/admin/ReptileManagerment";
export default {
  name: "Admin",
  created() {},
  props: {
    msg: String
  },
  components: {
    AdminHeader,
    userManagerment,
    bookManagerment,
    uploadManagerment,
    reptileManagerment
  },
  data() {
    return {
      command: "userManagerment"
    };
  },
  methods: {
    getSelect(val) {
      var s = val.replace("/admin/", "");
      this.command = s;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>