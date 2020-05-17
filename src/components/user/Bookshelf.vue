<template>
  <div id="bookShelf">
    <div class="middle">
      <div class="left">
        <el-menu
          @select="menuSelect"
          default-active="01"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item-group>
            <template slot="title">名著专区</template>
            <el-menu-item index="01">美文名著</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">娱乐专区</template>
            <el-menu-item index="02">休闲娱乐</el-menu-item>
            <el-menu-item index="12">自动订阅</el-menu-item>
          </el-menu-item-group>
        </el-menu>
      </div>
      <div class="right">
        <div v-show="type=='01'">
          <div class="search">
            <div class="search-div">
              <el-input placeholder="请输入内容" v-model="searchInput" class="input-with-select">
                <el-button slot="append" icon="el-icon-search">搜专区书架</el-button>
              </el-input>
            </div>
          </div>
          <div class="concent">
            <div class="title">
              <span style="font-size:18px; font-weight:blod">美文名著</span>
              <span style="color: #7f7f7f;margin-left: 15px;font-size: 14px;">
                共
                <span style="color:black">3</span>本书籍
              </span>
            </div>
            <el-table
              ref="multipleTable1"
              :data="meiwenData.list"
              tooltip-effect="dark"
              style="width: 100%"
            >
              <el-table-column label="置顶" width="55"></el-table-column>
              <el-table-column label="书籍" width="150" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span class="type-zi">「{{ scope.row.type }}」</span>
                  <span class="name-zi">{{ scope.row.bookName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="作者" width="120" show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.bookCountry }}-{{ scope.row.bookAuthoor }}</template>
              </el-table-column>
              <el-table-column label="阅读进度" width="150" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{ scope.row.schedule }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="lastReadTime" label="最近阅读时间" show-overflow-tooltip></el-table-column>
              <el-table-column prop="lastReadTime" label="借阅开始时间" show-overflow-tooltip></el-table-column>
              <el-table-column prop="lastReadTime" label="借阅结束时间" show-overflow-tooltip></el-table-column>
            </el-table>
            <div class="page">
              <div class="block">
                <el-pagination
                  @current-change="handleCurrentChange1"
                  :current-page.sync="meiwenCurrentPage"
                  :page-size="5"
                  layout="total,prev, pager, next, jumper"
                  :total="20"
                ></el-pagination>
              </div>
            </div>
          </div>
        </div>
        <div v-show="type=='02'">
          <div class="search">
            <div class="search-div">
              <el-input placeholder="请输入内容" v-model="searchInput" class="input-with-select">
                <el-button slot="append" icon="el-icon-search">搜专区书架</el-button>
              </el-input>
            </div>
          </div>
          <div class="concent">
            <div class="title">
              <span style="font-size:18px; font-weight:blod">休闲娱乐</span>
              <span style="color: #7f7f7f;margin-left: 15px;font-size: 14px;">
                共
                <span style="color:black">3</span>本书籍
              </span>
            </div>
            <el-table
              ref="multipleTable2"
              :data="yuleData.list"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              >
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column label="书籍" width="150" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span class="type-zi">「{{ scope.row.bookTypeName }}」</span>
                  <span class="name-zi">{{ scope.row.bookName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="作者" width="120" show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.bookAuthor }}</template>
              </el-table-column>
              <el-table-column label="阅读进度" width="150" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{ scope.row.chapterInfo }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="bookReadTime" label="最近阅读时间" show-overflow-tooltip></el-table-column>
              <el-table-column label="操作" show-overflow-tooltip>
                <template>
                  <span></span>
                </template>
              </el-table-column>
            </el-table>
            <div class="select-option">
              <span style="margin-left:12px">
                <el-checkbox v-model="checked" @change="selectAll">全选</el-checkbox>
              </span>
              <span class="item">置顶</span>
              <span class="item">移出书架</span>
            </div>
            <div class="page">
              <div class="block">
                <el-pagination
                  @current-change="handleCurrentChange2"
                  :current-page.sync="yuleCurrentPage"
                  :page-size="5"
                  layout="total,prev, pager, next, jumper"
                  :total="20"
                ></el-pagination>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../api";
export default {
  name: "Bookshelf",
  created() {
    this.getUserStandardBookShelf(
      this.$store.state.userInfo.userId,
      this.meiwenCurrentPage,
      10
    );
    this.getUserRecreationBookshelf(
this.$store.state.userInfo.userId,
      this.yuleCurrentPage,
      10
    );
  },
  props: {
    msg: String
  },
  components: {},
  data() {
    return {
      type: "01",
      searchInput: "",
      leftBar: "01",
      yuleCurrentPage: 1,
      meiwenCurrentPage: 1,
      currentPage3: 1,
      currentPage4: 1,
      checked: "",
      meiwenChecked: "",
      meiwenData: {},
      yuleData: {},
      autoData: [],
      multipleSelection: []
    };
  },
  methods: {
    menuSelect(index, indexPath) {
      console.log(index + "--" + indexPath);
      this.type = index;
    },
    handleCurrentChange1(val) {
      console.log(`当前页: ${val}`);
    },
    handleCurrentChange2(val) {
      console.log(`当前页: ${val}`);
    },
    handleCurrentChange3(val) {
      console.log(`当前页: ${val}`);
    },
    handleCurrentChange4(val) {
      console.log(`当前页: ${val}`);
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val);
    },
    selectAll() {
      if (this.checked == true) {
        this.$refs.multipleTable2.clearSelection();
        this.$refs.multipleTable2.toggleAllSelection();
      } else {
        this.$refs.multipleTable2.toggleAllSelection();
      }
    },
    getUserRecreationBookshelf(userId, pageNo, pageSize) {
      api.getUserRecreationBookshelf(userId, pageNo, pageSize).then(res => {
        this.yuleData = res.data[0];
        // console.log(res);
      });
    },
    getUserStandardBookShelf(userId, pageNo, pageSize) {
      api.getUserStandardBookShelf(userId, pageNo, pageSize).then(res => {
        this.meiwenData = res.data[0];
        // console.log(res);
      });
    }
  },
  watch: {
    type: function() {
      console.log("sada");
    },
    multipleSelection: function(val) {
      if (this.yuleData.length == val.length) {
        this.checked = true;
      } else {
        this.checked = false;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#bookShelf {
  width: 100%;
  height: 800px;
  margin: auto;
  background: #f7f6f2;
  border: 1px solid red;
}
#bookShelf .middle {
  width: 1000px;
  height: 100%;
  margin: auto;
}
#bookShelf .left {
  width: 16%;
  height: 100%;
  float: left;
}
#bookShelf .left ul {
  margin-top: 20px;
}
#bookShelf .left ul .el-submenu .el-menu-item {
  min-width: 100%;
}
#bookShelf .right {
  width: 80%;
  height: 100%;
  float: right;
}
.right .search {
  height: 90px;
  width: 100%;
  border: 1px solid red;
}
.right .search .search-div {
  width: 50%;
  margin-top: 20px;
}

.concent .title {
  text-align: left;
  height: 60px;
  line-height: 60px;
}

.concent .cell {
  font-size: 12px;
}
.concent .type-zi {
  font-size: 14px;
  font-weight: bold;
  color: #a6a6a6;
}
.concent .name-zi {
  font-size: 14px;
  font-weight: bold;
}
.concent tbody span:hover {
  color: red;
  cursor: pointer;
}
.concent .option {
  width: 100%;
  height: 60px;
  border: 1px solid red;
}
.concent .page {
  height: 60px;
  padding-top: 25px;
  border: 1px solid red;
}
.select-option {
  height: 60px;
  line-height: 60px;
  text-align: left;
  font-size: 14px;
}
.select-option .item {
  margin-left: 20px;
}
.select-option span:hover {
  cursor: pointer;
}
</style>
