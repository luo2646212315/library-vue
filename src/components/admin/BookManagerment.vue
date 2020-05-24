<template>
  <div id="book-manager">
    <div class="book-manager-middle">
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
            <span slot="title">美文名著</span>
          </el-menu-item>
          <el-menu-item index="02">
            <i class="el-icon-document"></i>
            <span slot="title">休闲娱乐</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="right">
        <div v-show="loadChange=='01'">
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
              <el-form-item label="作者:">
                <el-input v-model="search1.bookAuthor" clearable placeholder="请输入书籍作者"></el-input>
              </el-form-item>
              <el-form-item label="类型:">
                <el-select v-model="search1.bookType" clearable placeholder="全部">
                  <el-option label="全部" value></el-option>
                  <el-option
                    v-for="item in standardType"
                    :key="item.typeFlag"
                    :label="item.typeName"
                    :value="item.typeFlag"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="上架:">
                <el-select v-model="search1.bookCheckStatus" clearable placeholder="全部">
                  <el-option label="全部" value></el-option>
                  <el-option label="是" value="11"></el-option>
                  <el-option label="否" value="00"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" plain @click="search1Button">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div>
            <el-table :data="meiwenData" style="width: 100%">
              <el-table-column prop="bookName" label="书籍名称" show-overflow-tooltip></el-table-column>
              <el-table-column prop="bookTypeName" label="类型" width="200"></el-table-column>
              <el-table-column prop="bookAuthor" label="作者" show-overflow-tooltip width="200"></el-table-column>
              <el-table-column label="是否上架" width="200">
                <template slot-scope="scope">
                  <span>{{ scope.row.bookCheckStatus|transFromPutOnFilter}}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="primary"
                    plain
                    @click="handlePutOff1(scope.$index, scope.row)"
                    v-if="scope.row.bookCheckStatus==='11'"
                  >下架</el-button>
                  <el-button
                    size="mini"
                    type="success"
                    plain
                    @click="handlePutOn1(scope.$index, scope.row)"
                    v-if="scope.row.bookCheckStatus==='00'"
                  >上架</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete1(scope.$index, scope.row)"
                  >删除</el-button>
                </template>
              </el-table-column>
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
        <div v-show="loadChange=='02'">
          <div class="search">
            <el-form
              :inline="true"
              :model="search2"
              class="demo-form-inline"
              style="margin-top: 25px;"
            >
              <el-form-item label="书籍名称:">
                <el-input v-model="search2.bookName" clearable placeholder="请输入书籍名称"></el-input>
              </el-form-item>
              <el-form-item label="作者:">
                <el-input v-model="search2.bookAuthor" clearable placeholder="请输入书籍作者"></el-input>
              </el-form-item>
              <el-form-item label="类型:">
                <el-select
                  v-model="search2.bookType"
                  clearable
                  placeholder="全部"
                  class="selectWidth"
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
              <el-form-item label="上架:">
                <el-select v-model="search2.bookCheckStatus" clearable placeholder="全部">
                  <el-option label="全部" value></el-option>
                  <el-option label="是" value="11"></el-option>
                  <el-option label="否" value="00"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" plain @click="search2Button">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div>
            <el-table :data="yuleData" style="width: 100%">
              <el-table-column prop="bookName" label="书籍名称" show-overflow-tooltip></el-table-column>
              <el-table-column prop="bookTypeName" label="类型" width="200"></el-table-column>
              <el-table-column prop="bookAuthor" label="作者" show-overflow-tooltip width="200"></el-table-column>
              <el-table-column label="是否上架" width="200">
                <template slot-scope="scope">
                  <span>{{ scope.row.bookCheckStatus|transFromPutOnFilter}}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="primary"
                    plain
                    @click="handlePutOff2(scope.$index, scope.row)"
                    v-if="scope.row.bookCheckStatus==='11'"
                  >下架</el-button>
                  <el-button
                    size="mini"
                    type="success"
                    plain
                    @click="handlePutOn2(scope.$index, scope.row)"
                    v-if="scope.row.bookCheckStatus==='00'"
                  >上架</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete2(scope.$index, scope.row)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="page">
            <div class="block">
              <el-pagination
                @current-change="handleCurrentChange2"
                :current-page.sync="pageNo2"
                :page-size="pageSize"
                layout="total,prev, pager, next, jumper"
                :total="totalNum2"
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
  name: "Message",
  created() {
    this.getStandardTypes();
    this.getRecreationTypes();
    this.getStandBookBySearch();
    this.getRecreationBySearch();
  },
  props: {
    msg: String
  },
  components: {},
  data() {
    return {
      loadChange: "01",
      pageNo1: 1,
      pageNo2: 1,
      totalNum1: 0,
      totalNum2: 0,
      pageSize: 8,
      standardType: [],
      recreationType: [],
      meiwenData: [],
      yuleData: [],
      search1: {
        bookName: "",
        bookType: "",
        bookAuthor: "",
        bookCheckStatus: ""
      },
      search2: {
        bookName: "",
        bookType: "",
        bookAuthor: "",
        bookCheckStatus: ""
      }
    };
  },
  methods: {
    selectLoad(index, indexPath) {
      console.log(index + "--" + indexPath);
      this.loadChange = index;
    },
    search1Button() {
      this.getStandBookBySearch();
    },
    search2Button() {
      this.getRecreationBySearch();
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
    getStandBookBySearch() {
      api
        .getStandBookBySearch(this.search1, this.pageNo1, this.pageSize)
        .then(res => {
          this.meiwenData = res.data[0].list;
          this.totalNum1 = res.data[0].total;
        });
    },
    getRecreationBySearch() {
      api
        .getRecreationBySearch(this.search2, this.pageNo2, this.pageSize)
        .then(res => {
          this.yuleData = res.data[0].list;
          this.totalNum2 = res.data[0].total;
        });
    },
    handlePutOn1(index, row) {
      api
        .updateStandard({
          bookId: row.bookId,
          bookCheckStatus: "11"
        })
        .then(res => {
          if (res.status) {
            this.$message({
              message: "书籍上架成功！",
              type: "success"
            });
            let info = this.meiwenData[index];
            (info.bookCheckStatus = "11"),
              this.$set(
                this.meiwenData, //当前数组
                index, //当前数据的下标
                info
              );
          } else {
            this.$message.error("书籍上架失败！");
          }
        });
    },
    handlePutOff1(index, row) {
      let f = confirm("确定要下架该书籍吗？");
      if (!f) {
        return;
      }
      api
        .updateStandard({
          bookId: row.bookId,
          bookCheckStatus: "00"
        })
        .then(res => {
          if (res.status) {
            this.$message({
              message: "书籍下架成功！",
              type: "success"
            });
            let info = this.meiwenData[index];
            (info.bookCheckStatus = "00"),
              this.$set(
                this.meiwenData, //当前数组
                index, //当前数据的下标
                info
              );
          } else {
            this.$message.error("书籍下架失败！");
          }
        });
    },
    handleDelete1(index, row) {
      let f = confirm("确定要删除该书籍吗？");
      if (!f) {
        return;
      }
      api.deleteStandard(row.bookName).then(res => {
        if (res.status) {
          this.$message({
            message: "删除书籍成功！",
            type: "success"
          });
          this.meiwenData.splice(index, 1);
        } else {
          this.$message.error("删除书籍失败！");
        }
      });
    },
    handlePutOn2(index, row) {
      api
        .updateRecreation({
          bookId: row.bookId,
          bookCheckStatus: "11"
        })
        .then(res => {
          if (res.status) {
            this.$message({
              message: "书籍上架成功！",
              type: "success"
            });
            let info = this.yuleData[index];
            (info.bookCheckStatus = "11"),
              this.$set(
                this.yuleData, //当前数组
                index, //当前数据的下标
                info
              );
          } else {
            this.$message.error("书籍上架失败！");
          }
        });
    },
    handlePutOff2(index, row) {
      let f = confirm("确定要下架该书籍吗？");
      if (!f) {
        return;
      }
      api
        .updateRecreation({
          bookId: row.bookId,
          bookCheckStatus: "00"
        })
        .then(res => {
          if (res.status) {
            this.$message({
              message: "书籍下架成功！",
              type: "success"
            });
            let info = this.yuleData[index];
            (info.bookCheckStatus = "00"),
              this.$set(
                this.yuleData, //当前数组
                index, //当前数据的下标
                info
              );
          } else {
            this.$message.error("书籍下架失败！");
          }
        });
    },
    handleDelete2(index, row) {
      let f = confirm("确定要删除该书籍吗？");
      if (!f) {
        return;
      }
      api.deleteRecreation(row.bookName).then(res => {
        if (res.status) {
          this.$message({
            message: "删除书籍成功！",
            type: "success"
          });
          this.yuleData.splice(index, 1);
        } else {
          this.$message.error("删除书籍失败！");
        }
      });
    },
    handleCurrentChange1() {
      this.getStandBookBySearch();
    },
    handleCurrentChange2() {
      this.getRecreationBySearch();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#book-manager {
  width: 100%;
  height: 800px;
}
#book-manager .book-manager-middle {
  width: 100%;
  height: 100%;
  margin: auto;
  /* border: 1px solid red; */
}
#book-manager .book-manager-middle .left {
  width: 160px;
  height: 100%;
  float: left;
  /* border: 1px solid red; */
}
#book-manager .book-manager-middle .right {
  width: 1200px;
  height: 100%;
  float: left;
  margin-left: 30px;
  /* border: 1px solid red; */
}
#book-manager .book-manager-middle .page {
  height: 60px;
  padding-top: 25px;
  /* border: 1px solid red; */
}
#book-manager .book-manager-middle .left ul {
  margin-top: 90px;
}
.el-select {
  width: 90px;
}
</style>
