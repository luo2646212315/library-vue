<template>
  <div class="home">
    <el-container style="height: 1000px; border: 1px solid red;">
      <el-header style="height:180px; padding: 0">
        <div>
          <el-menu
            :default-active="activeIndex2"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-menu-item index="1">处理中心</el-menu-item>
            <el-submenu index="2">
              <template slot="title">我的工作台</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
              <el-menu-item index="2-3">选项3</el-menu-item>
              <el-submenu index="2-4">
                <template slot="title">选项4</template>
                <el-menu-item index="2-4-1">选项1</el-menu-item>
                <el-menu-item index="2-4-2">选项2</el-menu-item>
                <el-menu-item index="2-4-3">选项3</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-menu-item index="3" disabled>消息中心</el-menu-item>
            <el-menu-item index="4">
              <a href="https://www.ele.me" target="_blank" @click.prevent>订单管理</a>
            </el-menu-item>
            <el-menu-item index="5">
              <router-link to="/loginRegisterForget">登录</router-link>
            </el-menu-item>
            <el-menu-item index="5">
              <a href="#" @click="qqLogin()">qq登录</a>
            </el-menu-item>
          </el-menu>
        </div>
      </el-header>

      <el-main style="padding: 0">
        <div id="main-main">
          <div id="main-left">left</div>
          <div id="main-middle">middle</div>
          <div id="main-right">right</div>
        </div>
      </el-main>
      <el-footer style="height:100px; padding: 0">Footer</el-footer>
    </el-container>
  </div>
</template>

<script>
import api from "../api";
export default {
  name: "Home",
  components: {},
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    qqLogin() {
      api.qqLogin().then(res => {
        console.log(res);
      });
    }
  }
};
</script>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  height: 180px;
}

.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  height: 100px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  border: 1px solid green;
}

body > .el-container {
  margin-bottom: 40px;
}
body {
  margin: 0;
  padding: 0;
}
#main-main{
  margin: auto;
  width: 80%;
  height: 100%;
}
#main-left {
  width: 20%;
  height: 100%;
  float: left;
  border: 1px solid red;
}
#main-middle {
  width: 60%;
  height: 100%;
  float: left;
  border: 1px solid red;
}
#main-right {
  width: 19%;
  height: 100%;
  float: left;
  border: 1px solid red;
}
</style>