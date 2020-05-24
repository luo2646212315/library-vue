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

      <el-menu-item
        :index="'/standardHome/'+bookType.typeFlag"
        v-for="bookType in bookTypes.slice(0,3)"
        :key="bookType.typeId"
      >{{bookType.typeName}}</el-menu-item>
      <el-submenu index="/more" v-show="bookTypes.slice(3).length>0">
        <template slot="title">更多</template>
        <el-menu-item
          :index="'/standardHome/'+bookType.typeFlag"
          v-for="bookType in bookTypes.slice(3)"
          :key="bookType.typeId"
        >{{bookType.typeName}}</el-menu-item>
      </el-submenu>
      <el-menu-item style="float:right" index="/user/bookshelf">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-shujia" />
        </svg>我的书架
      </el-menu-item>
      <el-submenu style="float:right" index="/user" v-if="isLogin">
        <template slot="title">
          <i class="el-icon-s-custom"></i>
          {{userInfo.userNickName}}
        </template>
        <el-menu-item index="/user/message">消息</el-menu-item>
        <el-menu-item index="/user/userInfo">个人中心</el-menu-item>
        <el-menu-item index="/user/upload">上传小说</el-menu-item>
        <el-menu-item index="/exit">退出</el-menu-item>
      </el-submenu>
      <div class="loginReg" v-if="!isLogin">
        <span class="login">
          <span @click="$toLogin()">登录</span>
        </span> |
        <span class="register">
          <router-link to="/loginRegisterForget/register" tag="span">注册</router-link>
        </span>
      </div>
      <el-submenu style="float:right" index="/admain" v-show="isAdmin">
        <template slot="title">管理员</template>
        <el-menu-item index="/admin/userManagerment">用户管理</el-menu-item>
        <el-menu-item index="/admin/bookManagerment">书籍管理</el-menu-item>
        <el-menu-item index="/admin/uploadManagerment">上传管理</el-menu-item>
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
import api from "../../api/index";
export default {
  name: "HeaderFloat",
  created() {
    this.getBookTypes("01");
  },
  data() {
    return {
      fit: "fill",
      src: require("../../assets/images/logo.png"),
      activeIndex: "1",
      input: "一念永恒",
      bookTypes: []
    };
  },
  methods: {
    handleSelect(key) {
      var nowUrl = this.$route.path;
      if (nowUrl === key) {
        location.reload();
        return;
      }
      if (key.includes("/standardHome/")) {
        let type = key.replace("/standardHome/", "");
        this.$router.push({
          name: "StandardHome",
          params: {
            bookType: type
          },
          query: {
            input: ""
          }
        });
      } else {
        if (key != "/exit") {
          this.$router.push({
            path: key
          });
        } else {
          this.$loginOut(this.userInfo.userId);
        }
      }
    },
    getBookTypes(bigType) {
      var _this = this;
      api.getBookType(bigType).then(res => {
        _this.bookTypes = res.data[0];
      });
    },
    search() {
      this.$router.push({
        name: "StandardHome",
        query: {
          input: this.input
        },
        params: {
          bookType: "0000"
        }
      });
    }
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin;
    },
    isAdmin() {
      return this.$store.state.isAdmin;
    },
    userInfo() {
      return this.$store.state.userInfo;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
