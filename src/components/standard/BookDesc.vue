<template>
  <div id="bookDesc">
    <div class="bookDesc">
      <div class="top-nav">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>详情页面</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="middle-con">
        <div class="left-cover">
          <el-image style="width: 100%; height: 100%" src="../images/11.jpg" :fit="fit"></el-image>
        </div>
        <div class="right-desc">
          <div class="book-name">马克思恩格斯社会建设理论及其对建设社adad会主义和谐社会的指导</div>
          <div class="book-other">
            <div class="item">
              <div class="left-item">所属:</div>
              <div class="right-item">中国</div>
            </div>
            <div class="item">
              <div class="left-item">作者:</div>
              <div class="right-item">马云</div>
            </div>
            <div class="item">
              <div class="left-item">关键词:</div>
              <div class="right-item">长篇小说，戏剧</div>
            </div>
            <div class="item">
              <div class="left-item">介绍:</div>
              <div
                class="right-item"
              >本书共7篇，内容包括心态篇—全面备战从此开始、生活篇—饮食起居要有规律、策略篇—高效的复习策略、方法篇—高效的复习方法、应试篇—全身而过的不败经典、休整篇—好好休息迎接未来。</div>
            </div>
          </div>
        </div>
      </div>
      <div class="buttom-button">
        <el-row>
          <el-button type="primary" @click="dialogVisible = true">立即借阅</el-button>
          <el-button type="success">目录查看</el-button>
        </el-row>
      </div>
      <div>
        <el-dialog title="图书借阅" :visible.sync="dialogVisible" width="30%">
          <div>
            <el-form
              :model="ruleForm"
              status-icon
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="价格">
                <span>1.0金币 / 天</span>
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="截止为选择日期23:59,建议00:00加入书架"
                  placement="right"
                >
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-bangzhu666" />
                  </svg>
                </el-tooltip>
              </el-form-item>
              <el-form-item label="借阅至" prop="time" v-if="!autoReturn">
                <el-date-picker
                  v-model="ruleForm.time"
                  align="right"
                  type="date"
                  placeholder="选择日期"
                  :picker-options="pickerOptions"
                ></el-date-picker>
              </el-form-item>

              <el-form-item v-model="totalMoney" label="合计">
                <span>{{totalMoney}}</span> 金币
              </el-form-item>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "bookDesc",
  props: {
    msg: String
  },
  data() {
    return {
      fit: "fill",
      dialogVisible: false,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now();
        },
        shortcuts: [
          {
            text: "明天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周后",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      totalMoney: 0.0,
      ruleForm: {
        time: ""
      },
      rules: {
        time: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    settlement() {
      var ss = this.ruleForm.time.getTime() - new Date().getTime();
      var sss = ss / (3600 * 1000 * 24) + 2;
      var day = parseInt(sss);
      this.totalMoney = day * 1;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.dialogVisible = false;
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  watch: {
    "ruleForm.time": function() {
      this.settlement();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#bookDesc {
  height: 630px;

  width: 100%;
  background: #f7f6f2;
}
.bookDesc {
  height: 523px;
  width: 1200px;
  margin: auto;
  /* border: 1px solid red; */
}

.bookDesc .top-nav {
  height: 50px;

  padding-top: 20px;
}

.bookDesc .middle-con {
  height: 450px;
  width: 900px;
  margin: auto;
  /* border: 1px solid red; */
}
.bookDesc .middle-con .left-cover {
  height: 300px;
  width: 220px;
  margin-right: 50px;
  margin-top: 60px;
  float: left;
  /* border: 1px solid red; */
}
.bookDesc .middle-con .right-desc {
  height: 450px;
  width: 620px;
  float: left;
  /* border: 1px solid red; */
}
.right-desc .book-name {
  height: 60px;
  font-size: 22px;
  font-weight: bold;
}
.right-desc .book-other {
  padding-top: 20px;
  height: 370px;
  background-color: #fff;
}
.item {
  min-height: 38px;
  line-height: 38px;
}
.left-item {
  text-align: right;
  width: 180px;
  min-height: 38px;
  line-height: 38px;
  float: left;
  font-size: small;
  color: #099 !important;
}
.right-item {
  width: 380px;
  text-align: left;
  min-height: 38px;
  line-height: 38px;
  margin-left: 20px;
  font-family: 宋体;
  font-size: small;
  color: #000000;
  float: left;
}
.buttom-button {
  height: 100px;
  width: 900px;
  margin: auto;
  /* border: 1px solid red; */
}
.el-row {
  margin-top: 25px;
}
.el-button--primary {
  margin-right: 170px;
}
</style>
