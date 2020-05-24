<template>
  <div id="uploadManager">
    <div class="uploadManager-middle">
      <div class="left">
        <el-menu
          @select="selectLoad"
          default-active="01"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="1">
            <svg class="icon" aria-hidden="true" style="font-size: 20px;margin-right: 5px;">
              <use xlink:href="#icon-shangchuan1" />
            </svg>
            <span slot="title">审核通过</span>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-document"></i>
              审核失败
            </template>
            <el-menu-item index="2-1">
              <i class="el-icon-document"></i>
              <span slot="title">系统原因</span>
            </el-menu-item>
            <el-menu-item index="2-2">
              <i class="el-icon-document"></i>
              <span slot="title">管理员原因</span>
            </el-menu-item>
          </el-submenu>
          <el-menu-item index="3">
            <i class="el-icon-document"></i>
            <span slot="title">未审核</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="right">
        <div v-show="loadChange=='1'">
          <div class="search">
            <el-form
              :inline="true"
              :model="search1"
              class="demo-form-inline"
              style="margin-top: 25px;"
            >
              <el-form-item label="书籍名称:">
                <el-input v-model="search1.bookName" clearable placeholder="请输入书籍名称"></el-input>
              </el-form-item>
              <el-form-item label="大类别:">
                <el-select v-model="search1.bookBigType" clearable placeholder="全部">
                  <el-option label="全部" value></el-option>
                  <el-option label="美文" value="01"></el-option>
                  <el-option label="娱乐" value="02"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="类型:" v-if="search1.bookBigType!==''">
                <el-select
                  v-if="search1.bookBigType==='01'"
                  v-model="search1.bookType"
                  clearable
                  placeholder="全部"
                >
                  <el-option label="全部" value></el-option>
                  <el-option
                    v-for="item in standardType"
                    :key="item.typeFlag"
                    :label="item.typeName"
                    :value="item.typeFlag"
                  ></el-option>
                </el-select>
                <el-select
                  v-if="search1.bookBigType==='02'"
                  v-model="search1.bookType"
                  clearable
                  placeholder="全部"
                >
                  <el-option label="全部" value></el-option>
                  <el-option
                    v-for="item in recreationType"
                    :key="item.typeFlag"
                    :label="item.typeName"
                    :value="item.typeFlag"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="是否新书:">
                <el-select v-model="search1.bookIsExist" clearable placeholder="全部">
                  <el-option label="全部" value></el-option>
                  <el-option label="是" value="00"></el-option>
                  <el-option label="否" value="11"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" plain @click="search1Button">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div>
            <el-table :data="successData" style="width: 100%">
              <el-table-column prop="ownerBookNames" label="书籍名称" show-overflow-tooltip></el-table-column>
              <el-table-column label="大类别" width="150">
                <template slot-scope="scope">
                  <span>{{ scope.row.bookBigType|transFromBookBigTypeFilter}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="bookTypeName" label="类型" show-overflow-tooltip width="150"></el-table-column>
              <el-table-column label="是否新书" width="200">
                <template slot-scope="scope">
                  <span>{{ scope.row.bookIsExist|transFromEnableFilter}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="uploadUserId" label="上传用户编号" width="150" show-overflow-tooltip></el-table-column>
              <el-table-column prop="urlBookChapterNum" label="章节数量" width="100"></el-table-column>
            </el-table>
          </div>
          <div class="page">
            <div class="block">
              <el-pagination
                @current-change="handleCurrentChange1"
                :current-page.sync="pageNo1"
                :page-size="pageSize"
                layout="total,prev, pager, next, jumper"
                :total="totalNum1"
              ></el-pagination>
            </div>
          </div>
        </div>
        <div v-show="loadChange=='2-1'">
          <div class="search">
            <el-form
              :inline="true"
              :model="search21"
              class="demo-form-inline"
              style="margin-top: 25px;"
            >
              <el-form-item label="书籍名称:">
                <el-input v-model="search21.bookName" clearable placeholder="请输入书籍名称"></el-input>
              </el-form-item>
              <el-form-item label="大类别:">
                <el-select v-model="search21.bookBigType" clearable placeholder="全部">
                  <el-option label="全部" value></el-option>
                  <el-option label="美文" value="01"></el-option>
                  <el-option label="娱乐" value="02"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="类型:" v-if="search21.bookBigType!==''">
                <el-select
                  v-if="search21.bookBigType==='01'"
                  v-model="search21.bookType"
                  clearable
                  placeholder="全部"
                >
                  <el-option label="全部" value></el-option>
                  <el-option
                    v-for="item in standardType"
                    :key="item.typeFlag"
                    :label="item.typeName"
                    :value="item.typeFlag"
                  ></el-option>
                </el-select>
                <el-select
                  v-if="search21.bookBigType==='02'"
                  v-model="search1.bookType"
                  clearable
                  placeholder="全部"
                >
                  <el-option label="全部" value></el-option>
                  <el-option
                    v-for="item in recreationType"
                    :key="item.typeFlag"
                    :label="item.typeName"
                    :value="item.typeFlag"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="是否新书:">
                <el-select v-model="search21.bookIsExist" clearable placeholder="全部">
                  <el-option label="全部" value></el-option>
                  <el-option label="是" value="00"></el-option>
                  <el-option label="否" value="11"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" plain @click="search21Button">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div>
            <el-table :data="error1Data" style="width: 100%">
              <el-table-column prop="ownerBookNames" label="书籍名称" show-overflow-tooltip></el-table-column>
              <el-table-column label="大类别" width="150">
                <template slot-scope="scope">
                  <span>{{ scope.row.bookBigType|transFromBookBigTypeFilter}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="bookTypeName" label="类型" show-overflow-tooltip width="150"></el-table-column>
              <el-table-column label="是否新书" width="200">
                <template slot-scope="scope">
                  <span>{{ scope.row.bookIsExist|transFromEnableFilter}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="uploadUserId" label="上传用户编号" width="150" show-overflow-tooltip></el-table-column>
              <el-table-column prop="urlBookChapterNum" label="章节数量" width="100"></el-table-column>
            </el-table>
          </div>
          <div class="page">
            <div class="block">
              <el-pagination
                @current-change="handleCurrentChange21"
                :current-page.sync="pageNo21"
                :page-size="pageSize"
                layout="total,prev, pager, next, jumper"
                :total="totalNum21"
              ></el-pagination>
            </div>
          </div>
        </div>
        <div v-show="loadChange=='2-2'">
          <div class="search">
            <el-form
              :inline="true"
              :model="search22"
              class="demo-form-inline"
              style="margin-top: 25px;"
            >
              <el-form-item label="书籍名称:">
                <el-input v-model="search22.bookName" clearable placeholder="请输入书籍名称"></el-input>
              </el-form-item>
              <el-form-item label="大类别:">
                <el-select v-model="search22.bookBigType" clearable placeholder="全部">
                  <el-option label="全部" value></el-option>
                  <el-option label="美文" value="01"></el-option>
                  <el-option label="娱乐" value="02"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="类型:" v-if="search22.bookBigType!==''">
                <el-select
                  v-if="search22.bookBigType==='01'"
                  v-model="search22.bookType"
                  clearable
                  placeholder="全部"
                >
                  <el-option label="全部" value></el-option>
                  <el-option
                    v-for="item in standardType"
                    :key="item.typeFlag"
                    :label="item.typeName"
                    :value="item.typeFlag"
                  ></el-option>
                </el-select>
                <el-select
                  v-if="search22.bookBigType==='02'"
                  v-model="search22.bookType"
                  clearable
                  placeholder="全部"
                >
                  <el-option label="全部" value></el-option>
                  <el-option
                    v-for="item in recreationType"
                    :key="item.typeFlag"
                    :label="item.typeName"
                    :value="item.typeFlag"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="是否新书:">
                <el-select v-model="search22.bookIsExist" clearable placeholder="全部">
                  <el-option label="全部" value></el-option>
                  <el-option label="是" value="00"></el-option>
                  <el-option label="否" value="11"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" plain @click="search22Button">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div>
            <el-table :data="error2Data" style="width: 100%">
              <el-table-column prop="ownerBookNames" label="书籍名称" show-overflow-tooltip></el-table-column>
              <el-table-column label="大类别" width="150">
                <template slot-scope="scope">
                  <span>{{ scope.row.bookBigType|transFromBookBigTypeFilter}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="bookTypeName" label="类型" show-overflow-tooltip width="150"></el-table-column>
              <el-table-column label="是否新书" width="200">
                <template slot-scope="scope">
                  <span>{{ scope.row.bookIsExist|transFromEnableFilter}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="uploadUserId" label="上传用户编号" width="150" show-overflow-tooltip></el-table-column>
              <el-table-column prop="urlBookChapterNum" label="章节数量" width="100"></el-table-column>
            </el-table>
          </div>
          <div class="page">
            <div class="block">
              <el-pagination
                @current-change="handleCurrentChange1"
                :current-page.sync="pageNo1"
                :page-size="pageSize"
                layout="total,prev, pager, next, jumper"
                :total="totalNum1"
              ></el-pagination>
            </div>
          </div>
        </div>
        <div v-show="loadChange=='3'">
          <div>
            <el-table :data="notData" style="width: 100%">
              <el-table-column prop="ownerBookNames" label="书籍名称" show-overflow-tooltip></el-table-column>
              <el-table-column label="大类别" width="150">
                <template slot-scope="scope">
                  <span>{{ scope.row.bookBigType|transFromBookBigTypeFilter}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="bookTypeName" label="类型" show-overflow-tooltip width="150"></el-table-column>
              <el-table-column label="是否新书" width="200">
                <template slot-scope="scope">
                  <span>{{ scope.row.bookIsExist|transFromEnableFilter}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="uploadUserId" label="上传用户编号" width="150" show-overflow-tooltip></el-table-column>
              <el-table-column prop="urlBookChapterNum" label="章节数量" width="100"></el-table-column>
              <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                  <el-button size="mini" type="success" plain @click="handlePass( scope.row)">通过</el-button>
                  <el-button size="mini" type="danger" @click="handleNoPass(scope.row)">不通过</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="page">
            <div class="block">
              <el-pagination
                @current-change="handleCurrentChange3"
                :current-page.sync="pageNo3"
                :page-size="pageSize"
                layout="total,prev, pager, next, jumper"
                :total="totalNum3"
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
  name: "uploadManager",
  created() {
    this.getStandardTypes();
    this.getRecreationTypes();
    this.initData();
  },
  props: {
    msg: String
  },
  components: {},
  data() {
    return {
      loadChange: "1",
      pageNo1: 1,
      pageNo21: 1,
      pageNo22: 1,
      pageNo3: 1,
      totalNum1: 0,
      totalNum21: 0,
      totalNum22: 0,
      totalNum3: 0,
      pageSize: 8,
      standardType: [],
      recreationType: [],
      successData: [],
      error1Data: [],
      error2Data: [],
      notData: [],
      search1: {
        bookName: "",
        bookBigType: "",
        bookType: "",
        bookIsExist: "",
        systemCheckStatus: "11",
        adminCheckStatus: "11"
      },
      search21: {
        bookName: "",
        bookBigType: "",
        bookType: "",
        bookIsExist: "",
        systemCheckStatus: "01",
        adminCheckStatus: ""
      },
      search22: {
        bookName: "",
        bookBigType: "",
        bookType: "",
        bookIsExist: "",
        systemCheckStatus: "11",
        adminCheckStatus: "00"
      },
      search3: {
        bookName: "",
        bookBigType: "",
        bookType: "",
        bookIsExist: "",
        systemCheckStatus: "11",
        adminCheckStatus: "01"
      }
    };
  },
  methods: {
    selectLoad(index) {
      this.loadChange = index;
    },
    getStandardTypes() {
      var _this = this;
      api.getBookType("01").then(res => {
        _this.standardType = res.data[0];
      });
    },
    getRecreationTypes() {
      var _this = this;
      api.getBookType("02").then(res => {
        _this.recreationType = res.data[0];
      });
    },
    getSuccessData() {
      api
        .selectUploadBySearch(this.search1, this.pageNo1, this.pageSize)
        .then(res => {
          this.successData = res.data[0].list;
          this.totalNum1 = res.data[0].total;
        });
    },
    getError1Data() {
      api
        .selectUploadBySearch(this.search21, this.pageNo21, this.pageSize)
        .then(res => {
          this.error1Data = res.data[0].list;
          this.totalNum21 = res.data[0].total;
        });
    },
    getError2Data() {
      api
        .selectUploadBySearch(this.search22, this.pageNo22, this.pageSize)
        .then(res => {
          this.error2Data = res.data[0].list;
          this.totalNum22 = res.data[0].total;
        });
    },
    getNotData() {
      api
        .selectUploadBySearch(this.search3, this.pageNo3, this.pageSize)
        .then(res => {
          this.notData = res.data[0].list;
          this.totalNum3 = res.data[0].total;
        });
    },
    initData() {
      this.getSuccessData();
      this.getError1Data();
      this.getError2Data();
      this.getNotData();
    },
    search1Button() {
      this.getSuccessData();
    },
    search21Button() {
      this.getError1Data();
    },
    search22Button() {
      this.getError2Data();
    },
    handlePass(row) {
      let f = confirm("确定要通过审核吗？");
      if (!f) {
        return;
      }
      api
        .updateUserUpload({
          uploadId: row.uploadId,
          bookIsExist: row.bookIsExist,
          ownerBookNames: row.ownerBookNames,
          bookBigType: row.bookBigType,
          uploadUserId: row.uploadUserId,
          adminCheckStatus: "11"
        })
        .then(res => {
          if (res.status) {
            this.$message({
              message: "书籍审核完成！",
              type: "success"
            });
            this.initData();
          } else {
            this.$message.error("书籍审核失败！");
          }
        });
    },
    handleNoPass(row) {
      let f = confirm("确定要不通过审核吗？");
      if (!f) {
        return;
      }
      api
        .updateUserUpload({
          uploadId: row.uploadId,
          bookIsExist: row.bookIsExist,
          ownerBookNames: row.ownerBookNames,
          bookBigType: row.bookBigType,
          uploadUserId: row.uploadUserId,
          adminCheckStatus: "00"
        })
        .then(res => {
          if (res.status) {
            this.$message({
              message: "书籍审核完成！",
              type: "success"
            });
            this.initData();
          } else {
            this.$message.error("书籍审核失败！");
          }
        });
    },
    handleCurrentChange1() {
      this.getSuccessData();
    },
    handleCurrentChange21() {
      this.getError1Data();
    },
    handleCurrentChange22() {
      this.getError2Data();
    },
    handleCurrentChange3() {
      this.getNotData();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#uploadManager {
  width: 100%;
  height: 800px;
}
#uploadManager .uploadManager-middle {
  width: 100%;
  height: 100%;
  margin: auto;
  /* border: 1px solid red; */
}
#uploadManager .uploadManager-middle .left {
  width: 205px;
  height: 100%;
  float: left;
  /* border: 1px solid red; */
}
#uploadManager .uploadManager-middle .left ul {
  text-align: left;
}
#uploadManager .uploadManager-middle .right {
  width: 1200px;
  height: 100%;
  float: left;
  margin-left: 30px;
  /* border: 1px solid red; */
}
#uploadManager .uploadManager-middle .page {
  height: 60px;
  padding-top: 25px;
  /* border: 1px solid red; */
}
.el-select {
  width: 90px;
}
</style>
