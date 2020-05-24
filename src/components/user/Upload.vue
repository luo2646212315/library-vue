<template>
  <div id="upload">
    <div class="upload-middle">
      <div class="left">
        <el-menu
          @select="selectLoad"
          default-active="01"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="01">
            <svg class="icon" aria-hidden="true" style="font-size: 20px;margin-right: 5px;">
              <use xlink:href="#icon-shangchuan1" />
            </svg>
            <span slot="title">新书上传</span>
          </el-menu-item>
          <el-menu-item index="02">
            <i class="el-icon-document"></i>
            <span slot="title">上传历史</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="right">
        <div v-show="loadChange=='01'">
          <el-steps :active="active" finish-status="success" style="width: 80%; margin: auto;">
            <el-step title="书籍校验"></el-step>
            <el-step title="信息填写"></el-step>
            <el-step title="等待审核"></el-step>
          </el-steps>
          <div id="form-father">
            <div v-if="active===0">
              <el-form
                :model="ruleForm1"
                :rules="rules"
                ref="ruleForm1"
                label-width="100px"
                class="demo-ruleForm"
              >
                <el-form-item label="书籍名称" prop="bookName">
                  <el-input v-model="ruleForm1.bookName"></el-input>
                  <span>(注：名著会自动加上"《》")</span>
                </el-form-item>
                <el-form-item label="书籍大类别" prop="bookBigType">
                  <el-radio-group v-model="ruleForm1.bookBigType">
                    <el-radio label="01">美文名著书籍</el-radio>
                    <el-radio label="02">休闲娱乐书籍</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-form>
            </div>
            <div v-if="active===1">
              <el-form ref="ruleForm2" :rules="rules" :model="ruleForm2" label-width="140px">
                <div v-if="!bookCheck">
                  <div v-if="bookTypeCheck==='01'">
                    <el-form-item label="书籍类型" prop="sBookType">
                      <el-select v-model="ruleForm2.sBookType" clearable placeholder="请选择">
                        <el-option
                          v-for="item in stypeSelect"
                          :key="item.typeFlag"
                          :label="item.typeName"
                          :value="item.typeFlag"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="作者所属国家" prop="sBookAuthorCountry">
                      <el-input v-model="ruleForm2.sBookAuthorCountry"></el-input>
                    </el-form-item>
                    <el-form-item label="作者" prop="sBookAuthor">
                      <el-input v-model="ruleForm2.sBookAuthor"></el-input>
                    </el-form-item>
                    <el-form-item label="关键词" prop="sKeyWords">
                      <el-tag
                        :key="index"
                        v-for="(tag,index) in ruleForm2.sKeyWords"
                        closable
                        :disable-transitions="false"
                        @close="handleClose(tag)"
                      >{{tag}}</el-tag>
                      <el-input
                        class="input-new-tag"
                        v-if="ruleForm2.inputVisible"
                        v-model="ruleForm2.inputKeyWords"
                        ref="saveTagInput"
                        size="small"
                        @keyup.enter.native="handleInputConfirm"
                        @blur="handleInputConfirm"
                      ></el-input>
                      <el-button
                        v-else-if="showInputButton"
                        class="button-new-tag"
                        size="small"
                        @click="showInput"
                      >+新增</el-button>
                    </el-form-item>
                  </div>
                  <div v-if="bookTypeCheck==='02'">
                    <el-form-item label="书籍类型" prop="rBookType">
                      <el-select v-model="ruleForm2.rBookType" clearable placeholder="请选择">
                        <el-option
                          v-for="item in rtypeSelect"
                          :key="item.typeFlag"
                          :label="item.typeName"
                          :value="item.typeFlag"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="作者" prop="rBookAuthor">
                      <el-input v-model="ruleForm2.rBookAuthor"></el-input>
                    </el-form-item>
                  </div>
                  <el-form-item label="详细描述" prop="desc">
                    <el-input
                      :autosize="{ minRows: 3, maxRows: 5}"
                      type="textarea"
                      placeholder="请输入内容"
                      resize="none"
                      v-model="ruleForm2.desc"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="封面选择(可以不选)">
                    <el-input
                      type="file"
                      v-model="ruleForm2.coverFileName"
                      id="bookCover"
                      @change="getCover"
                      multiple
                    />
                  </el-form-item>
                </div>
                <el-form-item label="文件选择" prop="file">
                  <el-input
                    id="bookFile"
                    @change="getFile"
                    type="file"
                    v-model="ruleForm2.fileName"
                    accept=".txt"
                  />
                </el-form-item>
              </el-form>
            </div>
            <div v-if="active===2">
              <div :class="uploadState?'successMsg':'errorMsg'" class="uploadMsg">{{uploadMsg}}</div>
              <div style="margin-top:100px">
                <el-button @click="back" type="primary" plain>{{uploadState?'继续上传':'重新上传'}}</el-button>
              </div>
            </div>
          </div>
          <el-button v-show="active<2" style="margin-top: 12px;" @click="next">下一步</el-button>
          <el-button v-show="active>0&&active<2" style="margin-top: 12px;" @click="pre">上一步</el-button>
        </div>
        <div v-show="loadChange=='02'">
          <div class="search">
            <el-form
              :inline="true"
              :model="search"
              class="demo-form-inline"
              style="margin-top: 25px;"
            >
              <el-form-item label="书籍名称">
                <el-input v-model="search.ownerBookNames" placeholder="请输入书籍名称"></el-input>
              </el-form-item>
              <el-form-item label="系统审核">
                <el-select v-model="search.systemCheckStatus" placeholder="全部">
                  <el-option label="全部" value></el-option>
                  <el-option label="未审核" value="01"></el-option>
                  <el-option label="通过" value="11"></el-option>
                  <el-option label="不通过" value="00"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="管理员审核">
                <el-select v-model="search.adminCheckStatus" placeholder="全部">
                  <el-option label="全部" value></el-option>
                  <el-option label="未审核" value="01"></el-option>
                  <el-option label="通过" value="11"></el-option>
                  <el-option label="不通过" value="00"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" plain @click="searchButton">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="ownerBookNames" label="书籍名称" width="180" show-overflow-tooltip></el-table-column>
            <el-table-column prop="urlBookChapterNum" label="章节数" width="180" show-overflow-tooltip></el-table-column>
            <el-table-column label="书籍大类别" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.bookBigType|transFromBookBigTypeFilter }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="bookTypeName" label="书籍类别" show-overflow-tooltip></el-table-column>
            <el-table-column label="系统审核" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.systemCheckStatus|transFromCheckFilter }}</span>
              </template>
            </el-table-column>
            <el-table-column label="管理员审核" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.adminCheckStatus|transFromCheckFilter }}</span>
              </template>
            </el-table-column>
          </el-table>
          <div class="page">
            <div class="block">
              <el-pagination
                @current-change="handleCurrentChange"
                :current-page.sync="search.pageNo"
                :page-size="search.pageSize"
                layout="total,prev, pager, next, jumper"
                :total="totalNum"
              ></el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../api/index";
export default {
  name: "BookUpload",
  created() {
    this.search.uploadUserId = this.$store.state.userInfo.userId;
    this.getBookType("01");
    this.getBookType("02");
    this.selectUploadByOther();
  },
  props: {
    msg: String
  },
  components: {},
  data() {
    return {
      loadChange: "01",
      active: 0,
      bookCheck: false,
      showInputButton: true,
      bookTypeCheck: "01",
      fileExist: false,
      uploadState: false,
      uploadMsg: "",
      totalNum: 0,
      stypeSelect: [
        {
          typeFlag: "101",
          typeName: "玄幻"
        }
      ],
      rtypeSelect: [],
      ruleForm1: {
        bookName: "",
        bookBigType: "",
        fileNum: 0
      },
      ruleForm2: {
        sKeyWords: [],
        inputVisible: false,
        inputKeyWords: "",
        sBookType: "",
        rBookType: "",
        sBookAuthorCountry: "",
        sBookAuthor: "",
        rBookAuthor: "",
        desc: "",
        fileName: "",
        file: null,
        coverFileName: "",
        cover: null
      },
      search: {
        ownerBookNames: "",
        systemCheckStatus: "",
        adminCheckStatus: "",
        uploadUserId: 0,
        pageNo: 1,
        pageSize: 10
      },
      tableData: [
        {
          ownerBookNames: "1",
          urlBookChapterNum: 25,
          bookBigType: "01",
          bookType: "104",
          systemCheckStatus: "00",
          adminCheckStatus: "00"
        }
      ],
      rules: {
        bookName: [
          { required: true, message: "请输入书籍名称", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" }
        ],
        bookBigType: [
          { required: true, message: "请选择书籍类别", trigger: "change" }
        ],
        sBookType: [
          { required: true, message: "请选择书籍类型", trigger: "change" }
        ],
        sBookAuthorCountry: [
          {
            required: true,
            message: "请输入作者所属国家，如中国",
            trigger: "blur"
          }
        ],
        sBookAuthor: [
          { required: true, message: "请输入作者", trigger: "blur" }
        ],
        sKeyWords: [
          { required: true, message: "请输入关键词", trigger: "blur" }
        ],
        rBookType: [
          { required: true, message: "请选择书籍类型", trigger: "change" }
        ],
        rBookAuthor: [
          { required: true, message: "请输入作者", trigger: "blur" }
        ],
        desc: [{ required: true, message: "请输入书籍描述", trigger: "blur" }],
        file: [{ required: true, message: "请选择书籍文件", trigger: "blur" }]
      }
    };
  },
  methods: {
    selectLoad(index, indexPath) {
      console.log(index + "--" + indexPath);
      this.loadChange = index;
    },
    next() {
      if (this.active === 0) {
        this.$refs["ruleForm1"].validate(valid => {
          if (valid) {
            this.checkBookExist(this.bookTypeCheck, this.ruleForm1.bookName);
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      }
      if (this.active === 1) {
        this.$refs["ruleForm2"].validate(valid => {
          if (valid) {
            if (this.bookTypeCheck === "01") {
              this.uploadStandardBook();
            } else if (this.bookTypeCheck === "02") {
              this.uploadRecreationBook();
            }
          } else {
            console.log("error submit!!");
            return false;
          }
        });
        this.resetForm("ruleForm2");
        this.active++;
      }
    },
    pre() {
      if (this.active > 0) this.active--;
    },
    back() {
      this.ruleForm1.bookName = "";
      this.ruleForm1.bookBigType = "";
      this.active = 0;
    },
    resetForm(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
    },
    limitMessage() {
      this.$message.error("您已经选择了一个文件！！！");
    },
    handleClose(tag) {
      this.ruleForm2.sKeyWords.splice(this.ruleForm2.sKeyWords.indexOf(tag), 1);
    },
    showInput() {
      this.ruleForm2.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.ruleForm2.inputKeyWords;
      if (inputValue) {
        this.ruleForm2.sKeyWords.push(inputValue);
      }
      this.ruleForm2.inputVisible = false;
      this.ruleForm2.inputKeyWords = "";
    },
    checkBookExist(bookBigType, bookName) {
      var name = bookName;
      if (bookBigType === "01") {
        name = "《" + bookName + "》";
      }
      api.checkBookExist(bookBigType, name).then(res => {
        this.bookCheck = res.data[0];
        if (this.bookCheck) {
          if (bookBigType === "01") {
            this.ruleForm2.sBookType = res.data[1];
          } else {
            this.ruleForm2.rBookType = res.data[1];
          }
          this.$message({
            message: "书籍已经存在，只需上传书籍文件即可！",
            type: "success"
          });
        } else {
          this.$message({
            message: "书籍不存在，请填写详细信息",
            type: "success"
          });
        }
        this.active++;
      });
    },
    getCover: function() {
      this.ruleForm2.cover = document.getElementById("bookCover").files[0];
    },
    getFile() {
      this.ruleForm2.file = document.getElementById("bookFile").files[0];
    },
    getBookType(bigType) {
      var _this = this;
      api.getBookType(bigType).then(res => {
        console.log(res);
        if (bigType === "01") {
          _this.stypeSelect = res.data[0];
        } else if (bigType === "02") {
          _this.rtypeSelect = res.data[0];
        }
      });
    },
    uploadStandardBook() {
      let words = "";
      this.ruleForm2.sKeyWords.forEach(item => {
        words = words + item + ",";
      });
      words = words.substring(0, words.lastIndexOf(","));
      const formData = new FormData();
      formData.append("bookName", "《" + this.ruleForm1.bookName + "》");
      formData.append("bookType", this.ruleForm2.sBookType);
      formData.append("authorCountry", this.ruleForm2.sBookAuthorCountry);
      formData.append("bookKeyWords", words);
      formData.append("bookAuthor", this.ruleForm2.sBookAuthor);
      formData.append("bookDesc", this.ruleForm2.desc);
      formData.append("isExist", this.bookCheck);
      formData.append("userId", this.$store.state.userInfo.userId);
      formData.append("cover", this.ruleForm2.cover);
      formData.append("bookFile", this.ruleForm2.file);
      api.uploadStandardBook(formData).then(res => {
        console.log(res);
        this.uploadState = res.status;
        this.uploadMsg = res.message;
        if (res.status) {
          this.$message({
            message: "书籍上传成功！",
            type: "success"
          });
        } else {
          this.$message.error(res.message);
        }
      });
    },
    uploadRecreationBook() {
      const formData = new FormData();
      formData.append("bookName", this.ruleForm1.bookName);
      formData.append("bookBigType", this.ruleForm2.rBookType);
      formData.append("bookAuthor", this.ruleForm2.rBookAuthor);
      formData.append("bookFullDescribe", this.ruleForm2.desc);
      formData.append("isExist", this.bookCheck);
      formData.append("userId", this.$store.state.userInfo.userId);
      formData.append("cover", this.ruleForm2.cover);
      formData.append("bookFile", this.ruleForm2.file);
      api.uploadRecreationBook(formData).then(res => {
        console.log(res);
        this.uploadState = res.status;
        this.uploadMsg = res.message;
        if (res.status) {
          this.$message({
            message: "书籍上传成功！",
            type: "success"
          });
        } else {
          this.$message.error(res.message);
        }
      });
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.selectUploadByOther();
    },
    selectUploadByOther() {
      api.selectUploadByOther(this.search).then(res => {
        this.tableData = res.data[0].list;
        this.totalNum = res.data[0].total;
      });
    },
    searchButton() {
      this.selectUploadByOther();
    }
  },
  watch: {
    "ruleForm1.bookBigType": function(val) {
      this.bookTypeCheck = val;
    },
    "ruleForm2.sKeyWords": function(val) {
      if (val.length >= 7) {
        this.showInputButton = false;
      } else {
        this.showInputButton = true;
      }
    },
    "ruleForm2.file": function(val) {
      console.log(val);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hidden {
  display: none;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
#upload {
  width: 100%;
  height: 800px;
}
#upload .upload-middle {
  width: 1000px;
  height: 100%;
  margin: auto;
  /* border: 1px solid red; */
}
#upload .upload-middle .left {
  width: 16%;
  height: 100%;
  float: left;
  /* border: 1px solid red; */
}
#upload .upload-middle .left ul {
  margin-top: 100px;
}
#upload .upload-middle .right {
  width: 80%;
  height: 100%;
  float: right;
  /* border: 1px solid red; */
}
#upload .upload-middle .right .search {
  height: 90px;
  width: 100%;
  /* border: 1px solid red; */
}
.el-step__head {
  text-align: left;
  margin-left: 10px;
}
.el-step__main .el-step__title {
  font-size: 11px;
}
#form-father {
  width: 60%;
  margin: auto;
  margin-top: 50px;
}
.uploadMsg {
  height: 50px;
  line-height: 50px;
  font-size: 23px;
}
.successMsg {
  color: green;
}
.errorMsg {
  color: red;
}
.el-select .el-input {
  width: 95px;
}
.el-form--inline .el-form-item {
  margin-right: 20px;
}
#upload .upload-middle .right .page {
  height: 60px;
  padding-top: 25px;
  /* border: 1px solid red; */
}
.el-select {
  width: 90px;
}
</style>
