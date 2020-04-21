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
      <el-menu-item index="/home">首页</el-menu-item>
      <el-submenu index="/admain" v-show="isAdmain">
        <template slot="title">管理员</template>
        <el-menu-item index="/userManager">用户管理</el-menu-item>
        <el-menu-item index="/bookManager">书籍管理</el-menu-item>
        <el-submenu index="2-3">
          <template slot="title">选项4</template>
          <el-menu-item index="2-3-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>

      <el-submenu index="/meiwen">
        <template slot="title">美文名著</template>
        <el-menu-item index="/lishi">历史</el-menu-item>
        <el-menu-item index="/qingxiaoshuo">轻小说</el-menu-item>
      </el-submenu>
      <el-submenu index="/yule">
        <template slot="title">休闲娱乐</template>
        <el-menu-item index="/xuanhuan">玄幻</el-menu-item>
        <el-menu-item index="/xiuzhen">修真</el-menu-item>
      </el-submenu>
      <el-menu-item index="/wanben">完本</el-menu-item>
      <el-menu-item index="/paihang">排行</el-menu-item>

      <el-menu-item style="float:right" index="/bookshelf">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-shujia" />
        </svg>我的书架
      </el-menu-item>
      <el-submenu style="float:right" index="/user" v-if="isLogin">
        <template slot="title">雪月风殇</template>
        <el-menu-item index="/message">消息</el-menu-item>
        <el-menu-item index="/userInfo">个人中心</el-menu-item>
        <el-menu-item index="/upload">上传小说</el-menu-item>
        <el-menu-item index="/exit">退出</el-menu-item>
      </el-submenu>
      <div class="loginReg">
        <span class="login">登录</span> |
        <span class="register">注册</span>
      </div>
      <el-menu-item style="float:right" index="/search">
        <el-input placeholder="请输入作者、小说名" v-model="input" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "HeaderFloat",
  data() {
    return {
      activeIndex: "1",
      isLogin: false,
      isAdmain: true,
      input: ""
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#header {
  background-color: rgb(84, 92, 100);
  text-align: center;
  height: 60px;
}
#header ul {
  width: 80%;
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
