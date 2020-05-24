<template>
  <div id="searchIndex">
    <div class="middle">
      <div class="left">
        <div>
          <div class="book-item" v-for="item in searchData" :key="item.bookId">
            <div class="left-cover">
              <el-image
                v-if="item.bookCover!==undefined"
                style="width: 100%; height: 100%"
                :src="$imagePath+'02/'+item.bookCover"
                :fit="fit"
              ></el-image>
            </div>
            <div class="middle-concent">
              <div class="book-name">
                <router-link
                  tag="a"
                  :title="item.bookName"
                  :to="{ name: 'recreationBookInfo', query: {bookName: item.bookName}}"
                >{{item.bookName}}</router-link>
              </div>
              <div class="book-types">
                <span class="h">
                  <span>
                    <i class="el-icon-s-custom"></i>
                    {{item.bookAuthor}}
                  </span>
                </span>
                <span class="c">|</span>
                <span class="h">
                  <span>{{item.bookTypeName}}</span>
                </span>
                <span class="c">|</span>
                <span>{{item.bookStatus|transFromBookStateFilter}}</span>
              </div>
              <div class="book-desc">{{item.bookFullDescribe}}</div>
            </div>
            <div class="right-button">
              <!-- <div class="top-dex">
                <div class="zi-num">
                  <span class="num">120万</span>总字数
                </div>
                <div class="zi-num">
                  <span class="num">5.5万</span>总推荐
                </div>
              </div>-->
              <div class="buttom-button">
                <el-button
                  style="float:left"
                  size="medium"
                  type="danger"
                  @click="read(item.bookName)"
                >立即阅读</el-button>
                <el-button
                  style="float:right"
                  size="medium"
                  type="primary"
                  plain
                  @click="show(item.bookName)"
                >书籍详情</el-button>
              </div>
            </div>
          </div>
          <div class="page">
            <div class="block">
              <el-pagination
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size="pageSize"
                layout="total,prev, pager, next, jumper"
                :total="total"
              ></el-pagination>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="title">
          <span>本周强推</span>
        </div>
        <div class="concent">
          <ul class="concent-ul">
            <li v-for="item in rightData" :key="item.bookId">
              <div class="left-cover" v-if="item.bookCover!==undefined">
                <el-image :src="$imagePath+'02/'+item.bookCover" :fit="fit"></el-image>
              </div>
              <div class="right-concent">
                <div class="book-name h">
                  <router-link
                    tag="a"
                    :title="item.bookName"
                    :to="{ name: 'recreationBookInfo', query: {bookName: item.bookName}}"
                  >{{item.bookName}}</router-link>
                </div>
                <div class="book-author h">
                  <span>
                    <i class="el-icon-s-custom"></i>
                    {{item.bookAuthor}}
                  </span>
                </div>
                <div class="book-desc">{{item.bookFullDescribe}}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../api/index";
export default {
  name: "SearchIndex",
  created() {
    var bookType = this.$route.params.type;
    var input = this.$route.query.input;
    this.type = bookType;
    this.input = input;
    this.getRecreationBook();
    this.getSomeRecreationBook(5);
  },
  data() {
    return {
      fit: "fill",
      currentPage: 1,
      input: "",
      type: "",
      total: 0,
      pageSize: 5,
      chapterNo: 1,
      searchData: [],
      rightData: []
    };
  },
  methods: {
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.getRecreationBook();
    },
    getRecreationBook() {
      if (this.type === "0000") {
        if (this.input === "") {
          this.input = "一念永恒";
        }
        api
          .getBookByNameOrAuthor(this.input, this.currentPage, this.pageSize)
          .then(res => {
            if (res.status) {
              this.searchData = res.data[0].list;
              this.total = res.data[0].total;
            }
          });
      } else {
        api
          .getRecreationBookByType(this.type, this.currentPage, this.pageSize)
          .then(res => {
            console.log(res);
            if (res.status) {
              this.searchData = res.data[0].list;
              this.total = res.data[0].total;
            }
          });
      }
    },
    getSomeRecreationBook(num) {
      api.getSomeRecreationBook(num).then(res => {
        console.log(res);
        if (res.status) {
          this.rightData = res.data[0];
        }
      });
    },
    show(val) {
      this.$router.push({
        name: "recreationBookInfo",
        query: { bookName: val }
      });
    },
    async read(val) {
      await this.$isInBookshelf(
        this.$store.state.userInfo.userId,
        "02",
        val
      ).then(res => {
        console.log(res);
        this.bookCheck = res.data[0];
        if (this.bookCheck) {
          this.chapterNo = res.data[1].chapterNum;
        }
      });
      this.$router.push({
        name: "recreationRead",
        params: { bookName: val, chapterNo: this.chapterNo }
      });
    }
  },
  watch: {
    $route: {
      handler() {
        var bookType = this.$route.params.type;
        var input = this.$route.query.input;
        this.type = bookType;
        this.input = input;
        this.currentPage = 1;
        this.getRecreationBook();
        //深度监听，同时也可监听到param参数变化
      },
      deep: true
    }
  }
};
</script >

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#searchIndex {
  min-height: 750px;
  width: 80%;
  margin: auto;
  /* border: 1px solid red; */
}
#searchIndex .top-input {
  width: 40%;
  height: 100px;
  line-height: 100px;
  margin: auto;
}
#searchIndex .middle {
  height: 100%;
  width: 100%;
}
#searchIndex .middle .left {
  height: 100%;
  width: 75%;
  float: left;
  /* border: 1px solid red; */
}
#searchIndex .middle .right {
  height: 100%;
  width: 20%;
  float: right;
  /* border: 1px solid red; */
}
#searchIndex .middle .left .book-item {
  padding-top: 25px;
  width: 100%;
  height: 160px;
  border-bottom: 1px solid #e6e6e6;
  /* border: 1px solid red; */
}
#searchIndex .middle .left .book-item .left-cover {
  height: 135px;
  width: 100px;
  margin-right: 15px;
  /* border: 1px solid red; */
  float: left;
}
#searchIndex .middle .left .book-item .middle-concent {
  text-align: left;
  height: 135px;
  width: 450px;
  /* border: 1px solid red; */
  float: left;
}
#searchIndex .middle .left .book-item .right-button {
  height: 135px;
  width: 220px;
  /* border: 1px solid red; */
  float: right;
}
.book-item .middle-concent .book-name {
  height: 30px;
  font-size: 18px;
  margin-top: 5px;
}
.book-item .middle-concent .book-name :hover {
  cursor: pointer;
  color: red;
}
.book-item .middle-concent .book-types {
  color: #a6a6a6;
  height: 20px;
  font-size: 12px;
}

.book-item .middle-concent .book-desc {
  font-size: 14px;
  height: 75px;
  margin-bottom: 10px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
}
.book-item .middle-concent .book-update {
  font-size: 12px;
  height: 20px;
}
.book-item .right-button .top-dex {
  /* border: 1px solid red; */
  height: 50px;
  font-size: 12px;
  text-align: right;
}
.book-item .right-button .buttom-button {
  /* border: 1px solid red; */
  height: 40px;
  margin-top: 40px;
  width: 100%;
}
.h :hover {
  cursor: pointer;
  color: red;
}
.c {
  margin: 1px 8px 0;
}
.top-dex .zi-num {
  margin-bottom: 6px;
}
.top-dex .zi-num .num {
  margin-right: 5px;
}
.page {
  height: 60px;
  padding-top: 25px;
  /* border: 1px solid red; */
}
.right .title {
  height: 25px;
  font-size: 18px;
  padding-bottom: 7px;
  border-bottom: 1px solid black;
  text-align: left;
  margin-top: 20px;
}
.right .concent {
}
.right .concent .concent-ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.right .concent .concent-ul li {
  padding: 15px 0;
  border-bottom: 1px solid #e6e6e6;
  height: 100px;
  width: 100%;
}
.concent-ul .left-cover {
  float: left;
  width: 75px;
  height: 100%;
  margin-right: 12px;
  /* border: 1px solid red; */
}
.concent-ul .right-concent {
  float: left;
  width: 60%;
  height: 100%;
  /* border: 1px solid red; */
  text-align: left;
}
.concent-ul .right-concent .book-name {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 100%;
  font-size: 18px;
  height: 30px;
}
.concent-ul .right-concent .book-author {
  font-size: 12px;
  color: #a6a6a6;
  height: 20px;
}
.concent-ul .right-concent .book-desc {
  font-size: 12px;
  height: 50px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}
</style>
