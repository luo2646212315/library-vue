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
          <div class="book-name">{{bookInfo.bookName}}</div>
          <div class="book-other">
            <div class="item">
              <div class="left-item">所属:</div>
              <div class="right-item">{{bookInfo.authorCountry}}</div>
            </div>
            <div class="item">
              <div class="left-item">作者:</div>
              <div class="right-item">{{bookInfo.bookAuthor}}</div>
            </div>
            <div class="item">
              <div class="left-item">关键词:</div>
              <div class="right-item">{{bookInfo.bookKeyWords}}</div>
            </div>
            <div class="item">
              <div class="left-book-desc">介绍:</div>
              <div class="right-book-desc">{{bookInfo.bookDesc}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="buttom-button">
        <el-row>
          <el-button type="primary" @click="dialogLendVisible = true">立即借阅</el-button>
          <el-button type="success" @click="dialogChapterVisible = true">目录查看</el-button>
        </el-row>
      </div>
      <div id="standard-book">
        <el-dialog title="图书借阅" :visible.sync="dialogLendVisible" width="30%">
          <div>
            <el-form
              :model="ruleForm"
              status-icon
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="价格:">
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
              <el-form-item label="归还日期:" prop="time">
                <el-date-picker
                  v-model="ruleForm.time"
                  align="right"
                  type="date"
                  placeholder="选择日期"
                  :picker-options="pickerOptions"
                ></el-date-picker>
              </el-form-item>

              <el-form-item v-model="totalMoney" label="合计:">
                <span>{{totalMoney}}</span> 金币
              </el-form-item>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogLendVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog title="书籍目录" :visible.sync="dialogChapterVisible">
          <div id="chapter">
            <div class="chapter-item" v-for="chapter in chapterList" :key="chapter.chapterNum">
              <span class="chapter-name">{{chapter.chapterName}}</span>
            </div>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../api/index";
export default {
  name: "bookDesc",
  props: {
    msg: String
  },
  created() {
    var bookName = this.$route.query.bookName;
    this.getStandardBookByName(bookName);
  },
  data() {
    return {
      fit: "fill",
      dialogLendVisible: false,
      dialogChapterVisible: false,
      bookInfo: {},
      chapterList: [
        {
          chapterNum: 1,
          chapterNumber: "第一章",
          chapterName: "叙",
          chapterContent: null
        }
      ],
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
          this.dialogLendVisible = false;
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getStandardBookByName(bookName) {
      api.getStandardBookByName(bookName).then(res => {
        this.bookInfo = res.data[0];
      });
    },
    getStandardBookChapterByUrl(bookUrl) {
      api.getStandardBookChapterByUrl(bookUrl).then(res => {
        this.chapterList = res.data[0];
      });
    }
  },
  watch: {
    "ruleForm.time": function() {
      this.settlement();
    },
    bookInfo: function() {
      this.getStandardBookChapterByUrl(this.bookInfo.bookDefaultUrl);
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
  background-color: white;
  /* border: 1px solid red; */
}
.right-desc .book-name {
  height: 60px;
  line-height: 60px;
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
.left-book-desc {
  text-align: right;
  width: 180px;
  min-height: 25px;
  line-height: 25px;
  float: left;
  font-size: small;
  color: #099 !important;
}
.right-book-desc {
  width: 380px;
  text-align: left;
  min-height: 25px;
  line-height: 25px;
  margin-left: 20px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 10;
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
#standard-book #chapter {
  min-height: 100px;
  max-height: 400px;
  overflow: auto;
}
#standard-book #chapter .chapter-item {
  width: 49%;
  height: 40px;
  line-height: 40px;
  text-align: left;
  float: left;
  font-size: 15px;
}
#standard-book #chapter .chapter-item :hover {
  cursor: pointer;
  color: red;
}
#standard-book #chapter .chapter-item .chapter-name {
  max-width: 100%;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
