<template>
  <div id="bookDesc">
    <div class="top-image">
      <div class="crumbs">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>玄幻</el-breadcrumb-item>
          <el-breadcrumb-item>斗罗大陆</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="middle">
      <div class="top-book">
        <div class="book-cover">
          <el-image src="images/11.jpg" :fit="fit"></el-image>
        </div>
        <div class="book-info">
          <div class="book-name">{{bookInfo.bookName}}</div>
          <div class="book-other">
            <span class="h">
              <span>
                <i class="el-icon-s-custom"></i>
                {{bookInfo.bookAuthor}}
              </span>
            </span>
            <span class="c">|</span>
            <span class="h">
              <span>{{bookInfo.bookTypeName}}</span>
            </span>
            <span class="c">|</span>
            <span>{{bookInfo.bookStatus|transFromBookStateFilter}}</span>
          </div>
          <div class="book-simple-desc">
            <span class="zi">{{bookInfo.bookFullDescribe|maxTextFillFilter(100)}}</span>
          </div>
          <div class="book-num">
            <span class="arg">{{50025|transFromNumStateFilter}}</span>字
            <span class="c">|</span>
            <span class="arg">{{500|transFromNumStateFilter}}</span>看过
            <span class="c">|</span>
            <span class="arg">{{50|transFromNumStateFilter}}</span>总推荐
          </div>
          <div class="book-button">
            <el-row>
              <el-button size="medium" type="danger">免费试读</el-button>
              <el-button size="medium" type="primary" plain>加入书架</el-button>
              <el-button size="medium" type="info" plain>投票互动</el-button>
            </el-row>
          </div>
        </div>
        <div class="book-score">
          <div class="top">
            <el-rate
              v-model="value"
              disabled
              show-score
              :colors="scoreColors"
              text-color="#ff9900"
              score-template="{value}"
            ></el-rate>
          </div>
        </div>
      </div>
      <div class="buttom-concent">
        <el-tabs value="first">
          <el-tab-pane label="作品信息" name="first">
            <div class="first"></div>
          </el-tab-pane>
          <el-tab-pane label="目录(1202章)" name="second">
            <ul class="chapter-tab">
              <li v-for="chapter in chapterList" :key="chapter.chapterNum">
                <div class="chapter-item">
                  <router-link
                    tag="a"
                    :title="chapter.chapterNumber+'：'+chapter.chapterName"
                    :to="{ name: 'recreationRead', params: {bookName: bookInfo.bookName,chapterNo:chapter.chapterNum}}"
                  >{{chapter.chapterNumber}}：{{chapter.chapterName}}</router-link>
                </div>
              </li>
            </ul>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../api";
export default {
  name: "BookDesc",
  props: {
    msg: String
  },
  created() {
    var bookName = this.$route.query.bookName;
    this.getRecreationBookByName(bookName);
  },
  data() {
    return {
      fit: "fill",
      value: 2,
      scoreColors: ["#99A9BF", "#F7BA2A", "#FF9900"],
      bookInfo: {
        bookId: 177,
        bookName: "至尊归元",
        bookBigType: "101",
        bookTypeName: "玄幻",
        bookTag: null,
        bookAuthor: "恋风",
        bookCover: "至尊归元",
        bookScore: 0.0,
        bookSimpleDescribe: null,
        bookFullDescribe:
          "至尊魔武，九天归元!身负轩辕与蚩尤之功，修无上神魔双典，楚轩誓要破灭苍穹，道魔凌天！修真十二境：筑基、开光、融合、心动、金丹、元婴、出窍、分神、合体、洞虚、渡劫、大乘！",
        bookStatus: "00",
        bookFreeChapterNum: 0,
        bookChapterPrice: null,
        bookCheckStatus: null
      },
      chapterList: [
        {
          chapterNum: 1,
          chapterNumber: "第一章",
          chapterName: "叙",
          chapterContent: null
        }
      ]
    };
  },
  methods: {
    async getRecreationBookByName(name) {
      await api.getRecreationBookByName(name).then(res => {
        this.bookInfo = res.data[0];
      });
      //等待结果返回再异步请求
      this.getRecreationBookChapterByUrl(this.bookInfo.bookDefaultUrl);
    },
    getRecreationBookChapterByUrl(bookUrl) {
      api.getRecreationBookChapterByUrl(bookUrl).then(res => {
        this.chapterList = res.data[0];
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#bookDesc {
  height: 1000px;
  width: 100%;
  border: 1px solid red;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
#bookDesc .middle {
  border: red 1px solid;
  height: 1000px;
  width: 1000px;
  margin: auto;
  position: relative;
  bottom: 110px;
  z-index: 2;
  margin-bottom: 30px;
  padding-bottom: 20px;
  background: #fff;
}
#bookDesc .top-image {
  height: 220px;
  width: 100%;
  border: gold 1px solid;
}
#bookDesc .top-image .crumbs {
  height: 33px;
  padding-top: 20px;
  margin-top: 21px;
  width: 1000px;
  margin: auto;
  border: 1px solid red;
}
.el-breadcrumb {
  height: 20px;
  line-height: 20px;
}

#bookDesc .middle .top-book {
  width: 960px;
  height: 200px;
  padding: 20px;
  border: gold 1px solid;
}
.top-book .book-cover {
  height: 100%;
  width: 150px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.35), 0 0 5px #f9f2e9 inset;
  margin-right: 20px;
  /* border: red 1px solid; */
  float: left;
}
.top-book .book-info {
  height: 100%;
  width: 500px;
  /* border: red 1px solid; */
  float: left;
  text-align: left;
}
.top-book .book-score {
  height: 100%;
  width: 200px;
  border: red 1px solid;
  float: right;
}
.el-rate__icon {
  font-size: 25px;
}
.el-rate__text {
  font-size: 32px;
}
.top-book .book-score .top {
  height: 40px;
}
.book-info .book-name {
  /* border: red 1px solid; */
  height: 40px;
  font-size: 28px;
  font-family: PingFangSC-Regular, HelveticaNeue-Light, "Helvetica Neue Light",
    "Microsoft YaHei", sans-serif;
  width: 100%;
}
.book-info .book-other {
  color: #a6a6a6;
  /* border: red 1px solid; */
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  font-family: PingFangSC-Regular, -apple-system, Simsun;
  width: 100%;
}
.book-info .book-simple-desc {
  /* border: red 1px solid; */
  height: 55px;
  width: 100%;
  /* border: 1px solid red; */
}
.book-info .book-simple-desc .zi {
  font-family: PingFangSC-Regular, -apple-system, Simsun;
  font-size: 14px;
}
.book-info .book-num {
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  color: #a6a6a6;
}
.book-info .book-num .arg {
  font-size: 20px;
  color: black;
}
.book-info .book-button {
  /* border: red 1px solid; */
  height: 40px;
  width: 100%;
}
.el-button + .el-button {
  margin-left: 60px;
}
.h :hover {
  cursor: pointer;
  color: red;
}
.c {
  margin: 1px 12px 0;
}
.el-image {
  width: 100%;
  height: 100%;
}
img {
  transition: transform 0.5s;
}
img:hover {
  transform: scale(1.2);
}
#bookDesc .buttom-concent {
  height: 500px;
  width: 100%;
  margin-top: 20px;
  border: 1px solid red;
}
.el-tabs__item {
  font-size: 18px;
  color: #a6a6a6;
}
.el-tabs__header {
  margin: 0 0 40px;
}
.first {
  width: 100%;
  height: 100%;
  border: 1px solid olivedrab;
}
#bookDesc .buttom-concent .chapter-tab {
  min-height: 500px;
  border: 1px solid olivedrab;
  list-style-type: none;
  margin: 0px;
  padding: 0px;
}
#bookDesc .buttom-concent .chapter-tab li {
  float: left;
  width: 33.3%;
  border-bottom: 1px solid #d8dfd8;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  text-align: left;
  font-family: PingFangSC-Regular, -apple-system, Simsun;
}
#bookDesc .buttom-concent .chapter-tab li .chapter-item {
  overflow: hidden;
  max-width: 80%;
  white-space: nowrap;
  text-overflow: ellipsis;
}
#bookDesc .buttom-concent .chapter-tab li .chapter-item a:hover{
  color: red;
}
</style>
