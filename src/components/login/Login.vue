<template>
  <div id="login">
    <div id="concent">
      <div id="formput">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item prop="name">
            <el-input placeholder="请输入昵称/邮箱/手机号" id="name" v-model="ruleForm.name">
              <template slot="prepend">
                <label for="name" prop="name" class="el-icon-user-solid"></label>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input placeholder="请输入密码" id="password" show-password v-model="ruleForm.password">
              <template slot="prepend">
                <label for="password" class="el-icon-lock"></label>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="submitForm('ruleForm')"
              :loading="loading"
            >{{ loading ? '登陆中...' : '登录' }}</el-button>
            <el-button style="margin-left:80px" @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
          <el-form-item>
            <span>
              没有账号？
              <router-link to="register" tag="a">立即注册</router-link>
            </span>
            <span style="margin-left:30px">
              忘记密码？
              <router-link to="forget" tag="a">立刻找回</router-link>
            </span>
          </el-form-item>
          <el-form-item>
            <div id="other-login">
              <span>
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-weixin" />
                </svg>
              </span>
              <span @click="qqLogin">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-QQ" />
                </svg>
              </span>
              <span>
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-weibo" />
                </svg>
              </span>
              <span>
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-github" />
                </svg>
              </span>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { openWindow } from "../../window/openWindow";
import api from "../../api/index";
import router from "../../router";
export default {
  created() {
    var url = this.$route.query.redirect;
    if (url != null && url.trim() != "") {
      this.redirect = url;
    }
  },
  data() {
    return {
      loading: false,
      backMsg: "",
      redirect: "/",
      ruleForm: {
        name: "傻子",
        password: "123456"
      },
      rules: {
        name: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 18, message: "长度在 6 到 18 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log("success submit!!");
          if (this.loading) {
            return;
          }
          this.loading = true;
          api
            .loginByLocal(this.ruleForm.name, this.ruleForm.password)
            .then(res => {
              console.log(res);
              if (res.status == true) {
                this.$message({
                  message: res.message,
                  type: "success"
                });
                //添加vuex
                let userInfo = res.data[0];
                this.$store.commit("update", userInfo);
                //添加localstorge
                localStorage.setItem("library-token", res.data[1]);
                router.push({
                  path: this.redirect
                });
              } else {
                this.$message.error(res.errorMessage);
              }
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    qqLogin() {
      console.log("123");
      // let url;
      api.qqLogin().then(res => {
        console.log(res);
        openWindow(res, "QQ登录", 540, 540);
        window.addEventListener("message", this.loginQQHandler, false);
      });
    },
    loginQQHandler(e) {
      console.log(e);
      let res = e.data;
      if (res.status) {
        this.$message({
          message: res.message,
          type: "success"
        });
        //添加vuex
        let userInfo = res.data[0];
        this.$store.commit("update", userInfo);
        //添加localstorge
        localStorage.setItem("library-token", res.data[1]);
        router.push({
          path: this.redirect
        });
      } else {
        this.$message.error(res.errorMessage);
      }
      window.removeEventListener("message", this.loginQQHandler, false);
    }
  }
};
</script>

<style scoped>
#concent {
  height: 430px;
  width: 620px;
  text-align: center;
  margin: auto;
  /* border: 1px solid red; */
}
#formput {
  height: 290px;
  width: 400px;
  text-align: center;
  margin: auto;
  margin-top: 50px;
  padding: 10px;
  padding-top: 30px;
  padding-right: 105px;
  background-color: lightgrey;
  /* border: 1px solid red; */
}
a :hover {
  color: orange;
}
#other-login .icon {
  font-size: 30px;
}
#other-login span {
  margin-left: 20px;
}
#other-login span :hover {
  cursor: pointer;
}
</style>