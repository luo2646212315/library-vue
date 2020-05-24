<template>
  <div id="user-header">
    <div class="middle top">
      <div class="left">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect1"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu index="/home">
            <template slot="title">
              <el-image style="width:60px; height:60px" :src="src" :fit="fit"></el-image>
            </template>
            <el-menu-item index="/standardHome/201">文学专区</el-menu-item>
            <el-menu-item index="/recreationHome">娱乐专区</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
      <div class="right">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item style="float:left;" index="/admin/userManagerment">
            <i class="el-icon-s-home"></i>用户管理
          </el-menu-item>
          <el-menu-item style="float:left" index="/admin/bookManagerment">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-shujia" />
            </svg>书籍管理
          </el-menu-item>
          <el-menu-item style="float:left" index="/admin/uploadManagerment">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-shujia" />
            </svg>上传管理
          </el-menu-item>
          <el-menu-item style="float:left" index="/admin/reptileManagerment">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-shujia" />
            </svg>爬虫管理
          </el-menu-item>
          <el-submenu style="float:right" index="/user">
            <template slot="title">
              <i class="el-icon-s-custom"></i>
              {{userInfo.userNickName}}
            </template>
            <el-menu-item index="/user/message">消息</el-menu-item>
            <el-menu-item index="/user/userInfo">个人中心</el-menu-item>
            <el-menu-item index="/user/upload">上传小说</el-menu-item>
            <el-menu-item index="/exit">退出</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderFloat",
  created() {
    var temp = this.$route.params.type;
    this.activeIndex = "/admin/" + temp;
  },
  data() {
    return {
      src: require("../../assets/images/logo.png"),
      fit: "fill",
      activeIndex: "/admin/userManagerment",
      input: "",
      type: ""
    };
  },
  methods: {
    handleSelect(key) {
      console.log(key);
      var nowUrl = this.$route.path;
      if (nowUrl === key) {
        location.reload();
        return;
      }
      if (key === "/exit") {
        this.$loginOut(this.userInfo.userId);
      } else if (key.includes("/admin")) {
        this.activeIndex = key;
      }
      this.$router.push({
        path: key
      });
    },
    handleSelect1(key) {
      this.$router.push({
        path: key
      });
    }
  },
  watch: {
    activeIndex: function() {
      this.$emit("getSelect", this.activeIndex);
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#user-header {
  background-color: rgb(84, 92, 100);
  text-align: center;
  height: 60px;
}
#user-header .top {
  font-size: 30px;
  color: white;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  margin: auto;
}
#user-header .middle {
  width: 1000px;
  margin: auto;
}
#user-header .left {
  width: 16%;
  height: 100%;
  float: left;
}
#user-header .right {
  width: 80%;
  height: 100%;
  float: right;
}
</style>
