<template>
  <div id="register">
    <div id="concent">
      <div id="stepheader">
        <el-steps :active="active" finish-status="success">
          <el-step title="验证邮箱"></el-step>
          <el-step title="填写账号信息"></el-step>
          <el-step title="注册成功"></el-step>
        </el-steps>
      </div>
      <div class="form-father">
        <div v-show="active==0" id="first-step">
          <el-form
            :model="firstRuleForm"
            :rules="rules"
            ref="firstRuleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item prop="email">
              <el-input placeholder="请输入邮箱" v-model="firstRuleForm.email">
                <template slot="prepend">
                  <span class="el-icon-message"></span>
                </template>
              </el-input>
            </el-form-item>
            <div class="yan-btn">
              <el-form-item>
                <Silder v-if="!yanInput" @back="getSilderSuccess"></Silder>
              </el-form-item>
              <div v-show="yanInput">
                <el-form-item prop="yan">
                  <el-row :gutter="20">
                    <el-col :span="13">
                      <el-input
                        placeholder="邮箱验证码"
                        v-model="firstRuleForm.yan"
                        @focus="firstRuleForm.firstBoxMsg=''"
                      ></el-input>
                    </el-col>
                    <el-col :span="11">
                      <div>
                        <el-button :disabled="isSend" @click="sendMsg">{{buttonName}}</el-button>
                      </div>
                    </el-col>
                  </el-row>
                </el-form-item>
                <div v-html="firstRuleForm.firstBoxMsg"></div>
              </div>
            </div>
          </el-form>
        </div>
        <div v-show="active==1" id="second-step">
          <el-form
            :model="secondRuleForm"
            :rules="rules"
            ref="secondRuleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item prop="nickName">
              <el-input placeholder="请输入昵称" id="nickName" v-model="secondRuleForm.nickName">
                <template slot="prepend">
                  <label for="nickName" prop="nickName" class="el-icon-user-solid"></label>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                placeholder="请输入密码"
                id="password"
                show-password
                v-model="secondRuleForm.password"
              >
                <template slot="prepend">
                  <label for="password" class="el-icon-lock"></label>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="qPassword">
              <el-input
                placeholder="请再次输入密码"
                id="qPassword"
                show-password
                v-model="secondRuleForm.qPassword"
              >
                <template slot="prepend">
                  <label for="qPassword">确认密码</label>
                </template>
              </el-input>
            </el-form-item>
            <div v-html="secondRuleForm.secondBoxMsg"></div>
          </el-form>
        </div>
      </div>
      <el-button :disabled="fatherNext" style="margin-top: 10px; magin-left:100px" @click="next">下一步</el-button>
    </div>
  </div>
</template>

<script>
import Silder from "../components/Silder.vue";
import api from "../api/index";
export default {
  data() {
    var checkEmailExist = (rule, value, callback) => {
      api.checkEmailExist().then(
        res=>{
          console.log(res);
        }
      );
      if (this.secondRuleForm.password != value) {
        return callback(new Error("两次输入的密码不一致"));
      } else {
        return callback();
      }
    };
    //检查两次输入密码是否相同
    var checkPassword = (rule, value, callback) => {
      if (this.secondRuleForm.password != value) {
        return callback(new Error("两次输入的密码不一致"));
      } else {
        return callback();
      }
    };
    return {
      active: 0,
      yanInput: false,
      fatherNext: true,
      sonNext: false,
      buttonName: "发送验证码",
      isSend: false,
      time: 60,
      firstRuleForm: {
        email: "",
        yan: "",
        systemYan: "000000",
        firstBoxMsg: ""
      },
      secondRuleForm: {
        nickName: "",
        password: "",
        qPassword: "",
        secondBoxMsg: ""
      },
      rules: {
        email: [
          { required: true, message: "请输入需要绑定的邮箱", trigger: "blur" },
          {
            pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            message: "请输入正确的邮箱格式",
            trigger: "blur"
          },
           { required: true, trigger: "blur", validator: checkEmailExist }
        ],
        yan: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        nickName: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          {
            min: 1,
            max: 6,
            message: "长度在 1 到 6 个字符",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 18,
            message: "长度在 6 到 18 个字符",
            trigger: "blur"
          }
        ],
        qPassword: [
          { required: true, trigger: "blur", validator: checkPassword }
        ]
      }
    };
  },
  components: {
    Silder
  },
  methods: {
    next() {
      if (this.active == 1) {
        this.insertUser("secondRuleForm");
      }
      if (this.active == 0) {
        this.$refs["firstRuleForm"].validate(valid => {
          if (valid) {
            console.log("success submit!!");
            if (this.firstRuleForm.systemYan != this.firstRuleForm.yan) {
              this.firstRuleForm.firstBoxMsg =
                "<h4 style='color:red'>验证码不正确！！！</h4>";
              return;
            } else {
              this.active++;
            }
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      }
    },
    check() {
      this.silderShow = !this.silderShow;
    },
    getSilderSuccess(data) {
      this.yanInput = data;
    },
    //按钮倒计时
    sendMsg() {
      var email_reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      var sendFlag = email_reg.test(this.firstRuleForm.email);
      if (!sendFlag) {
        return;
      }
      //发送验证码
      this.sendYanCode();
      let me = this;
      me.isSend = true;
      let interval = window.setInterval(function() {
        me.buttonName = me.time + "秒后重新发送";
        --me.time;
        if (me.time < 0) {
          me.buttonName = "重新发送";
          me.time = 60;
          me.isSend = false;
          window.clearInterval(interval);
        }
      }, 1000);
    },
    //发送验证码
    sendYanCode() {
      console.log(this.firstRuleForm.email);
      api.sendEmailCode(this.firstRuleForm.email).then(res => {
        console.log(res);
        if (res.status == true) {
          this.$message({
            message: res.message,
            type: "success"
          });
          this.firstRuleForm.systemYan = res.data[0];
        } else {
          this.$message.error(res.errorMessage);
        }
      });
    },
    insertUser(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log("success submit!!");
          var userInfo = {
            userNickName: this.secondRuleForm.nickName,
            userPassword: this.secondRuleForm.password,
            userEmail: this.firstRuleForm.email
          }
          api
            .insertUser(userInfo)
            .then(res => {
              console.log(res);
              this.active++;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  watch: {
    "firstRuleForm.yan": function() {
      this.fatherNext = false;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#concent {
  line-height: 15px;
  height: 400px;
  width: 500px;
  margin: auto;
  border: 1px solid red;
}
.el-step__head {
  text-align: left;
  margin-left: 10px;
}
.el-step__main .el-step__title {
  font-size: 11px;
}
.form-father {
  width: 400px;
  height: 240px;
  margin: auto;
  margin-top: 30px;
  border: 1px solid red;
  margin-left: 0px;
}
.yan-btn {
  width: 100%;
  margin-top: 30px;
}
.yan-btn .el-button {
  width: 100%;
  font-size: 11px;
  height: 40px;
}
</style>
