<template>
  <div id="header-bg">
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
          <el-menu-item index="/standardHome/wenxue">文学专区</el-menu-item>
          <el-menu-item index="/recreationHome">娱乐专区</el-menu-item>
        </el-submenu>

        <el-menu-item index="/standardHome/wenxue">首页</el-menu-item>
        <el-menu-item index="/standardHome/wenxue">文学</el-menu-item>
        <el-menu-item index="/standardHome/jingji">经济</el-menu-item>
        <el-menu-item index="/paihang">历史、地理</el-menu-item>
        <el-menu-item index="/paihang">政治、法律</el-menu-item>
        <el-submenu index="/more">
          <template slot="title">更多</template>
          <el-menu-item index="/falv">法律</el-menu-item>
          <el-menu-item index="/yuanlin">园林</el-menu-item>
        </el-submenu>

        <el-menu-item style="float:right" index="/user/bookshelf">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-shujia" />
          </svg>我的书架
        </el-menu-item>

        <el-submenu style="float:right" index="/user" v-if="$isLogin">
          <template slot="title">
            <i class="el-icon-s-custom"></i>
            {{$userInfo.userNickName}}
          </template>
          <el-menu-item index="/user/message">消息</el-menu-item>
          <el-menu-item index="/user/userInfo">个人中心</el-menu-item>
          <el-menu-item index="/user/upload">书籍上传</el-menu-item>
          <el-menu-item index="/exit">退出</el-menu-item>
        </el-submenu>
        <div class="loginReg" v-if="!$isLogin">
          <span class="login">
            <router-link to="/loginRegisterForget/login" tag="span">登录</router-link>
          </span> |
          <span class="register">
            <router-link to="/loginRegisterForget/register" tag="span">注册</router-link>
          </span>
        </div>
        <el-submenu style="float:right" index="/admain" v-show="$isAdmin">
          <template slot="title">管理员</template>
          <el-menu-item index="/userManager">用户管理</el-menu-item>
          <el-menu-item index="/bookManager">书籍管理</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    <div class="search">
      <el-input placeholder="请输入内容" v-model="input" class="input-with-select">
        <el-select @change="s" v-model="selectType" slot="prepend" placeholder="全部">
          <el-option label="全部" value="0"></el-option>
          <el-option label="餐厅名" value="1"></el-option>
          <el-option label="订单号" value="2"></el-option>
          <el-option label="用户电话" value="3"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderFloat",
  created() {},
  data() {
    return {
      src: require("../../assets/images/logo.png"),
      fit: "fill",
      selectType: "",
      activeIndex: "1",
      userInfo: "",
      input: ""
    };
  },
  methods: {
    s() {
      console.log(this.selectType);
    },
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
        this.$loginOut();
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#header-bg {
  width: 100%;
  height: 350px;
  background: url("../../assets/images/library.jpg") no-repeat;
  background-size: cover;
  padding-top: 50px;
  background-position: center;
}
#header {
  background-color: rgb(84, 92, 100);
  text-align: center;
  height: 60px;
}
#header ul {
  width: 80%;
  margin: auto;
}
.el-menu.el-menu--horizontal {
  border: none;
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
.search {
  width: 40%;
  margin: auto;
  margin-top: 130px;
}
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>
