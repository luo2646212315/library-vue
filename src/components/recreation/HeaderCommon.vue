<template>
  <div id="header">
    <div class="top">
      <div class="middle-div">
        <div class="top-top">
          <div class="user" v-show="!isLogin">
            <span class="login">
              <router-link to="/loginRegisterForget/login" tag="span">登录</router-link>
            </span> |
            <span class="register">
              <router-link to="/loginRegisterForget/register" tag="span">注册</router-link>
            </span>
            <span></span>
          </div>
          <div class="user" v-show="isLogin">
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link white">
                <i class="el-icon-s-custom"></i>
                <span>雪月风殇</span>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="/user/message">消息</el-dropdown-item>
                <el-dropdown-item command="/user/userInfo">个人中心</el-dropdown-item>
                <el-dropdown-item command="/user/upload">书籍上传</el-dropdown-item>
                <el-dropdown-item command="/user/exit">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="user" v-show="isAdmain">
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link white">
                <span>管理员</span>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="/userManager">用户管理</el-dropdown-item>
                <el-dropdown-item command="/bookManager">书籍管理</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
        <div class="top-buttom">
          <div class="left">
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                <el-image style="width:60px; height:60px" :src="src" :fit="fit"></el-image>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">美文名著</el-dropdown-item>
                <el-dropdown-item command="b">休闲娱乐</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="middle">
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
          <div class="right">
            <el-button style="  margin-top: 15px;" type="danger" plain>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-shujia" />
              </svg> 我的书架
            </el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="buttom">
      <div class="middle-div">
        <div class="buttom-left">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-mulu" />
          </svg> 作品分类
        </div>
        <div class="buttom-right"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderCommon",
  data() {
    return {
      src: require("../../assets/images/logo.png"),
      fit: "fill",
      selectType: "",
      input: "",
      isLogin: true,
      isAdmain: true
    };
  },
  methods: {
    s() {
      console.log(this.selectType);
    },
    handleCommand(command) {
      this.$message("click on item " + command);
      var nowUrl = this.$route.path;

      if (nowUrl === command) {
        location.reload();
        return;
      }
      if (command === "/exit") {
        console.log(command);
        this.isLogin = false;
        return;
      }
      this.$router.push({
        path: command
      });
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    qqLogin() {
      console.log("123");
      // api.qqLogin().then(res => {
      //   console.log(res);
      // });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#header {
  background-color: rgb(84, 92, 100);
  color: #333;
  text-align: center;
  height: 180px;
  padding: 0;
}
#header .top {
  height: 126px;
  width: 100%;
}
#header .buttom {
  height: 50px;
  width: 100%;
  background-color: #e9eef3;
}
.middle-div {
  width: 80%;
  height: 100%;
  margin: auto;
}
.buttom .buttom-left {
  float: left;
  height: 50px;
  line-height: 50px;
  width: 20%;
  font-size: 20px;
  border-left: 1px #b3c0d1 solid;
  border-right: 1px #b3c0d1 solid;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.buttom .buttom-right {
  float: left;
  /* border: 1px solid red; */
  height: 100%;
  width: 79%;
}
.top .top-top {
  height: 50px;
  /* border: 1px solid red; */
}
.top .top-buttom {
  height: 70px;
  /* border: 1px solid red; */
}
.top-buttom .left {
  float: left;
  width: 20%;
  height: 100%;
  /* border: 1px solid red; */
}
.top-buttom .middle {
  float: left;
  height: 100%;
  /* border: 1px solid red; */
  width: 60%;
}
.top-buttom .right {
  height: 100%;
  /* border: 1px solid red; */
  float: left;
  width: 18%;
}
.top-buttom .middle .search {
  width: 60%;
  margin: auto;
  margin-top: 15px;
}
.el-select .el-input {
  width: 120px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.el-dropdown-link {
  color: #000;
}
.top-top .user {
  margin-top: 10px;
  float: right;
  height: 30px;
  line-height: 30px;
  width: 20%;
  /* border: 1px solid red; */
}
.top-top .user span:hover {
  color: red;
  cursor: pointer;
}
.user .login {
  color: orange;
}
.user .register {
  color: white;
}
.white {
  color: white;
}
</style>
