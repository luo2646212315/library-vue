<template>
  <div id="homeIndex">
    <div class="middle">
      <div class="left">
        <div class="title">图书分类</div>
        <div class="ul-div">
          <ul class="style-ul">
            <li
              v-for="bookType in bookTypes"
              :key="bookType.typeId"
              :class="bookType.typeFlag==currentType?'currentSelect':''"
            >
              <span @click="handleSelect(bookType.typeFlag)">
                <div class="left-icon">
                  <svg class="icon" aria-hidden="true">
                    <use :xlink:href="bookType.typeIcon" />
                  </svg>
                </div>
                <div class="right-a">
                  <span>{{bookType.typeName}}</span>
                </div>
                <span>({{bookType.bookNum}})</span>
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div class="right">
        <div class="top-book">
          <div
            class="book-info"
            v-for="book in bookInfo.list"
            :key="book.bookId"
            @click="jumpBookInfo(book.bookName)"
          >
            <div class="book-cover" v-if="book.bookCover!==undefined">
              <el-image style="width: 100%; height: 100%" :src="$imagePath+'01/'+book.bookCover" :fit="fit"></el-image>
            </div>
            <div class="book-name">{{book.bookName}}</div>
            <div class="book-author">作者: {{book.authorCountry}}·{{book.bookAuthor}}</div>
            <div class="book-publish">关键词：{{book.bookKeyWords}}</div>
          </div>
        </div>
        <div class="buttom-page">
          <div class="block" style=" margin-top: 40px;">
            <el-pagination
              @size-change="handleSizeChange"
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
  </div>
</template>

<script>
import api from "../../api/index";
export default {
  name: "homeIndex",
  created() {
    this.getBookTypes("01");
    this.currentType = this.$route.params.bookType;
    this.getStandardBookByType("201", this.currentPage, 9);
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 9,
      total: 0,
      currentType: "201",
      fit: "fill",
      bookTypes: [],
      bookInfo: {}
    };
  },
  methods: {
    handleSelect(val) {
      console.log(val);
      this.currentType = val;
      var oldUrl = this.$route.path;
      var newUrl = "/standardHome/" + val;
      if (oldUrl === newUrl) {
        location.reload();
        return;
      }
      this.$router.push({
        path: newUrl
      });
    },
    jumpBookInfo(val) {
      this.$router.push({
        path: "/standard/bookInfo",
        query: { bookName: val }
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.getStandardBookByType(this.currentType, val, 9);
    },
    getBookTypes(bigType) {
      var _this = this;
      api.getBookType(bigType).then(res => {
        _this.bookTypes = res.data[0];
      });
    },
    getStandardBookByType(type, pageNo, pageSize) {
      api.getStandardBookByType(type, pageNo, pageSize).then(res => {
        this.bookInfo = res.data[0];
        this.total = this.bookInfo.total;
      });
    }
  },
  watch: {
    $route: {
      handler() {
        this.currentType = this.$route.params.bookType;
        //深度监听，同时也可监听到param参数变化
      },
      deep: true
    },
    currentType: function(val) {
      this.currentPage = 1;
      this.getStandardBookByType(val, 1, 9);
    }
  },
  filters: {
    maxFilter(val, num) {
      return val.substring(0, num) + "...";
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#homeIndex {
  height: 1300px;
  width: 100%;
  background: #f7f6f2;
  /* border: solid red 1px; */
}
#homeIndex .middle {
  width: 1200px;
  height: 100%;
  margin: auto;
  /* border: solid red 1px; */
}
#homeIndex .middle .left {
  height: 100%;
  width: 280px;
  /* border: solid red 1px; */
  float: left;
  background-color: white;
}
#homeIndex .middle .right {
  height: 100%;
  width: 860px;
  margin-left: 50px;
  /* border: solid red 1px; */
  float: left;
}
.left .title {
  font-size: 28px;
  color: snow;
  width: 100%;
  height: 50px;
  margin-bottom: 10px;
  background-color: grey;
}

.left .style-ul {
  list-style: none;
  margin: 0;
  padding: 0;
  text-align: left;
  height: 200px;
  /* border: 1px solid grey; */
}
.left .style-ul li {
  height: 40px;
  line-height: 40px;
}
.left .style-ul li .left-icon {
  font-size: 30px;
  float: left;
  padding: 0 10px;
}
.left .style-ul li .right-a {
  float: left;
}
a {
  text-decoration: none;
  color: gray;
}
.left .style-ul li :hover {
  cursor: pointer;
  color: red;
}
.right .top-book {
  height: 1180px;
  width: 100%;
  /* border: 1px solid red; */
}
.right .top-book :hover {
  cursor: pointer;
  color: orangered;
}
.right .top-book .book-info {
  padding: 20px 10px;
  height: 320px;
  width: 220px;
  margin-right: 30px;
  margin-bottom: 30px;
  float: left;
  background-color: white;
  /* border: 1px solid red; */
}
.book-info .book-cover {
  height: 200px;
  width: 150px;
  margin: auto;
  /* border: 1px solid red; */
}
.book-info .book-name {
  height: 50px;
  line-height: 50px;
  font-size: 18px;
  max-width: 100%;
  font-weight: bold;
  overflow: hidden;
  white-space: nowrap;
  margin: auto;
  text-overflow: ellipsis;
}
.book-info .book-author {
  height: 40px;
  max-width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin: auto;
}
.book-info .book-publish {
  height: 30px;
  max-width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin: auto;
}
.right .buttom-page {
  height: 50px;
  width: 100%;
  /* border: 1px solid green; */
}
.currentSelect {
  color: orange;
}
</style>
