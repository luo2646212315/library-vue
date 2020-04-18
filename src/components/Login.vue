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
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../api/index";
import router from "../router";
export default {
  data() {
    return {
      loading: false,
      backMsg: "",
      ruleForm: {
        name: "",
        password: ""
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
                //添加localstorge
                localStorage.setItem("library-token", res.data[1]);
                router.push({
                  path: "/"
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
    }
  }
};
</script>

<style>
#concent {
  height: 360px;
  width: 620px;
  text-align: center;
  margin: auto;
}
#formput {
  height: 220px;
  width: 400px;
  text-align: center;
  margin: auto;
  margin-top: 100px;
  padding: 10px;
  padding-top: 30px;
  padding-right: 105px;
  background-color: lightgrey;
}
a :hover {
  color: orange;
}
</style>