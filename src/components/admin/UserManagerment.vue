<template>
  <div id="user-manager">
    <div class="user-manager-middle">
      <div class="search">
        <div class="search-div">
          <el-form
            :inline="true"
            :model="search"
            class="demo-form-inline"
            style="margin-top: 25px;"
          >
            <el-form-item label="昵称:">
              <el-input v-model="search.nickName" clearable placeholder="请输入用户昵称"></el-input>
            </el-form-item>
            <el-form-item label="是否冻结:">
              <el-select v-model="search.isEnabled" clearable placeholder="全部">
                <el-option label="全部" value></el-option>
                <el-option label="已冻结" value="00"></el-option>
                <el-option label="未冻结" value="11"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" plain @click="searchButton">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <el-table
        :header-cell-style="{background:'#b3c0d1'}"
        :data="tableData"
        stripe
        style="width: 100%"
      >
        <el-table-column label="昵称" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.userNickName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="userCreditScore" label="信誉分" width="180"></el-table-column>
        <el-table-column prop="userConsumeLevel" label="消费级别"></el-table-column>
        <el-table-column label="是否冻结">
          <template slot-scope="scope">
            <span>{{ scope.row.userIsEnabled|transFromEnableFilter}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              plain
              @click="handleLock(scope.$index, scope.row)"
              v-if="scope.row.userIsEnabled==='11'"
            >冻结</el-button>
            <el-button
              size="mini"
              type="success"
              plain
              @click="handleEnabled(scope.$index, scope.row)"
              v-if="scope.row.userIsEnabled==='00'"
            >启用</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page">
        <div class="block">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="pageSize"
            layout="total,prev, pager, next, jumper"
            :total="totalNum"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../api";
export default {
  name: "Message",
  created() {
    this.getUserInfoList();
  },
  props: {
    msg: String
  },
  components: {},
  data() {
    return {
      searchInput1: "",
      currentPage: 1,
      pageSize: 10,
      totalNum: 0,
      search: {
        nickName: "",
        isEnabled: ""
      },
      tableData: [
        {
          userNickName: "雪月风殇",
          userConsumeLevel: 0,
          userCreditScore: 60,
          userIsEnabled: "11"
        }
      ]
    };
  },
  methods: {
    handleLock(index, row) {
      let f = confirm("确定要冻结该用户吗？");
      if (!f) {
        return;
      }
      api.updateUser({ userId: row.userId, userIsEnabled: "00" }).then(res => {
        if (res.status) {
          this.$message({
            message: "冻结用户成功！",
            type: "success"
          });
          let info = this.tableData[index];
          (info.userIsEnabled = "00"),
            this.$set(
              this.tableData, //当前数组
              index, //当前数据的下标
              info
            );
        } else {
          this.$message.error("冻结用户失败！");
        }
      });
    },
    handleEnabled(index, row) {
      api.updateUser({ userId: row.userId, userIsEnabled: "11" }).then(res => {
        if (res.status) {
          this.$message({
            message: "启用用户成功！",
            type: "success"
          });
          let info = this.tableData[index];
          (info.userIsEnabled = "11"),
            this.$set(
              this.tableData, //当前数组
              index, //当前数据的下标
              info
            );
        } else {
          this.$message.error("启用用户失败！");
        }
      });
    },
    handleDelete(index, row) {
      let f = confirm("确定要删除该用户吗？");
      if (!f) {
        return;
      }
      api.deleteUser(row.userId).then(res => {
        if (res.status) {
          this.$message({
            message: "删除用户成功！",
            type: "success"
          });
          this.tableData.splice(index, 1);
        } else {
          this.$message.error("删除用户失败！");
        }
      });
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.getUserInfoList();
    },
    searchButton() {
      this.getUserInfoList();
    },
    getUserInfoList() {
      api
        .getUserInfoList(
          this.search.nickName,
          this.search.isEnabled,
          this.currentPage,
          this.pageSize
        )
        .then(res => {
          console.log(res);
          this.tableData = res.data[0].list;
          this.totalNum = res.data[0].total;
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#user-manager {
  width: 100%;
  height: 800px;
}
#user-manager .user-manager-middle {
  width: 1200px;
  margin: auto;
  height: 100%;
  margin: auto;
  border: 1px solid red;
}

#user-manager .user-manager-middle .search {
  height: 90px;
  width: 100%;
  border: 1px solid red;
}
#user-manager .search .search-div {
  width: 50%;
  margin: auto;
  margin-top: 20px;
}
#user-manager .user-manager-middle .page {
  height: 60px;
  padding-top: 25px;
  /* border: 1px solid red; */
}
.el-select .el-input {
  width: 95px;
}
.el-form--inline .el-form-item {
  margin-right: 20px;
}
</style>
