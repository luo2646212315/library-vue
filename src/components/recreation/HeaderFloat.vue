<template>
  <div id="header">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
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

      <el-menu-item index="/recreationHome">首页</el-menu-item>

      <el-menu-item index="/wanben">完本</el-menu-item>
      <el-menu-item index="/paihang">排行</el-menu-item>
      <el-submenu index="/all">
        <template slot="title">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-mulu" />
          </svg>全部作品
        </template>
        <el-menu-item index="/xuanhuan">玄幻</el-menu-item>
        <el-menu-item index="/xiuzhen">修真</el-menu-item>
      </el-submenu>

      <el-menu-item style="float:right" index="/user/bookshelf">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-shujia" />
        </svg>我的书架
      </el-menu-item>
      <el-submenu style="float:right" index="/user" v-if="isLogin">
        <template slot="title">
          <i class="el-icon-s-custom"></i> {{userInfo.userNickName}}
        </template>
        <el-menu-item index="/user/message">消息</el-menu-item>
        <el-menu-item index="/user/userInfo">个人中心</el-menu-item>
        <el-menu-item index="/user/upload">上传小说</el-menu-item>
        <el-menu-item index="/exit">退出</el-menu-item>
      </el-submenu>
      <div class="loginReg" v-if="!isLogin">
        <span class="login">
          <router-link to="/loginRegisterForget/login" tag="span">登录</router-link>
        </span> |
        <span class="register">
          <router-link to="/loginRegisterForget/register" tag="span">注册</router-link>
        </span>
      </div>
      <el-submenu style="float:right" index="/admain" v-show="isAdmin">
        <template slot="title">管理员</template>
        <el-menu-item index="/userManager">用户管理</el-menu-item>
        <el-menu-item index="/bookManager">书籍管理</el-menu-item>
      </el-submenu>
      <div style="float:right; margin-top: 10px;margin-right: 20px;" index="/search">
        <el-input placeholder="请输入作者、小说名" v-model="input" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "HeaderFloat",
  data() {
    return {
      fit: "fill",
      src: require("../../assets/images/logo.png"),
      activeIndex: "1",
      input: ""
    };
  },
  methods: {
    handleSelect(key) {
      var nowUrl = this.$route.path;
      if (nowUrl === key) {
        location.reload();
        return;
      }
      if (key != "/exit") {
        this.$router.push({
          path: key
        });
      } else {
        this.$loginOut(this.userInfo.userId);
      }
    }
  },
  computed:{
    isLogin(){
      return this.$store.state.isLogin;
    },
    isAdmin(){
      return this.$store.state.isAdmin;
    },
    userInfo(){
      return this.$store.state.userInfo;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.icon {
  font-size: 18px;
}
#header {
  background-color: rgb(84, 92, 100);
  text-align: center;
  height: 60px;
}
#header ul {
  width: 1200px;
  margin: auto;
}
.loginReg {
  float: right;
  height: 60px;
  width: 120px;
  line-height: 60px;
}
.loginReg span:hover {
  color: red;
  cursor: pointer;
}
.loginReg .login {
  color: orange;
}
.loginReg .register {
  color: white;
}
</style>
