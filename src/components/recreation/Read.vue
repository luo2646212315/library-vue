<template>
  <div id="recreation-read">
    <div class="left-bar" id="searchBar" :style="'background-color:'+chooseColor">
      <div class="bar-item" slot="reference" @click="show('Menu')">
        <div class="bar-icon">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-mulu" />
          </svg>
        </div>
        <div>目录</div>
      </div>
      <div class="bar-item" slot="reference" @click="show('Shezhi')">
        <div class="bar-icon">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-shezhi1" />
          </svg>
        </div>
        <div>设置</div>
      </div>
      <div class="bar-item" v-show="!bookCheck" @click="addToBookshelf()">
        <div class="bar-icon">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-shujia_huaban" />
          </svg>
        </div>
        <div>书架</div>
      </div>
      <div class="bar-item" v-show="bookCheck">
        <div class="inBookshelf">已在书架</div>
      </div>
      <div class="bar-item" @click="back()">
        <div class="bar-icon">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-fanhuishuye" />
          </svg>
        </div>
        <div>书页</div>
      </div>
    </div>
    <div id="middle-c" :style="'width:'+width+'px'">
      <div class="crum">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/recreationHome' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item
            :to="{ name: 'recreationSearch', query: { input: ''},params: {type: bookInfo.bookBigType}}"
          >{{bookInfo.bookTypeName}}</el-breadcrumb-item>
          <el-breadcrumb-item
            :to="{name: 'recreationBookInfo', query: { bookName: this.bookInfo.bookName }}"
          >{{bookInfo.bookName}}</el-breadcrumb-item>
          <el-breadcrumb-item>阅读</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="concent" :style="'background-color:'+chooseColor">
        <el-badge :value="commentTotal" :max="99" class="item">
          <div
            class="title"
            @dblclick="showComment()"
          >{{chapter.chapterNumber}}：{{chapter.chapterName}}</div>
        </el-badge>
        <div
          v-html="chapter.chapterContent"
          class="con"
          :style="'font-size:'+fontSize+'px;line-height:'+2*fontSize+'px;font-family:'+ziti"
        ></div>
      </div>

      <div class="buttom-page" :style="'background-color:'+chooseColor">
        <div>
          <router-link
            tag="div"
            class="page"
            :class="(currentNum-1)<1?'no-choose':''"
            style="border-left: none;"
            :to="{ name: 'recreationRead', params: {bookName:  bookInfo.bookName,chapterNo:currentNum-1}}"
          >上一章</router-link>
        </div>
        <div @click="back()">
          <div class="page">书籍详情</div>
        </div>
        <div>
          <router-link
            tag="div"
            class="page"
            :class="(currentNum+1)>totalNum?'no-choose':''"
            @click="next()"
            :to="{ name: 'recreationRead', params: {bookName: bookInfo.bookName,chapterNo:currentNum+1}}"
          >下一章</router-link>
        </div>
      </div>
    </div>
    <div id="mulu-con" v-show="visibleMenu" :style="'background-color:'+chooseColor">
      <div class="close" @click="muluClose">
        <span class="close-icon">
          <i class="el-icon-close close"></i>
        </span>
      </div>
      <ul class="chapter-tab">
        <li v-for="chapter in chapterList" :key="chapter.chapterNum">
          <div class="chapter-item">
            <a
              :style="chapter.chapterNum===currentNum?'color:red':''"
              :title="chapter.chapterNumber+'：'+chapter.chapterName"
              @click="read(chapter.chapterNum)"
            >{{chapter.chapterNumber}}：{{chapter.chapterName}}</a>
          </div>
        </li>
      </ul>
    </div>
    <div id="shezhi-con" v-show="visibleShezhi" :style="'background-color:'+chooseColor">
      <div class="close" @click="shezhiClose">
        <span class="close-icon">
          <i class="el-icon-close close"></i>
        </span>
      </div>
      <el-row>
        <div class="title">阅读主题</div>
        <div>
          <ul class="c">
            <li
              class="color"
              v-for="i in colorBox"
              :style="chooseColor===i?'color:red; border: 1px solid red;':''+'background-color:'+i"
              :key="i"
              @click="chooseColor=i"
            >
              <i class="el-icon-check" v-if="chooseColor===i"></i>
            </li>
          </ul>
        </div>
      </el-row>
      <el-row>
        <div class="title">正文字体</div>
        <ul style="float:left" class="c">
          <li
            class="ziti"
            :style="ziti==='SimSun'?'color:red; border: 1px solid red;':''"
            style="font-family:SimSun"
            @click="ziti='SimSun'"
          >宋体</li>
          <li
            class="ziti"
            :style="ziti==='Microsoft Yahei'?'color:red; border: 1px solid red;':''"
            style="font-family:Microsoft Yahei"
            @click="ziti='Microsoft Yahei'"
          >雅黑</li>
          <li
            class="ziti"
            :style="ziti==='KaiTi'?'color:red; border: 1px solid red;':''"
            style="font-family:KaiTi"
            @click="ziti='KaiTi'"
          >楷体</li>
        </ul>
      </el-row>
      <el-row class="ss">
        <div class="title">字体大小</div>
        <ul class="right">
          <li class="right-border" @click="jian">A-</li>
          <li style="color:#bcbccb" class="right-border">{{fontSize}}</li>
          <li @click="jia">A+</li>
        </ul>
      </el-row>
      <el-row class="ss">
        <div class="title">页面宽度</div>
        <ul class="right">
          <li @click="change('-')" class="right-border">A-</li>
          <li style="color:#bcbccb" class="right-border">{{width}}</li>
          <li @click="change('+')">A+</li>
        </ul>
      </el-row>
      <el-row>
        <el-button type="danger" @click="save">保存</el-button>
        <el-button style="margin-left: 100px;" plain @click="shezhiClose">取消</el-button>
      </el-row>
    </div>
    <el-drawer
      style="padding:0 20px"
      title=" "
      :visible.sync="visibleCommened"
      direction="rtl"
      size="30%"
    >
      <div class="comment-input">
        <el-input
          type="textarea"
          placeholder="请输入内容"
          v-model="textarea"
          maxlength="150"
          resize="none"
          :rows="4"
          show-word-limit
        ></el-input>
        <div style="margin-top: 13px; padding: 0 15px;">
          <el-button type="danger" plain @click="addNewBookComment()">发表</el-button>
        </div>
      </div>
      <div class="count">共{{commentTotal}}条帖子</div>
      <ul class="comment-list">
        <li class="comment-item" v-for="comment in commentList" :key="comment.commentId">
          <div class="user">{{comment.userId}}</div>
          <div class="con">{{comment.comment}}</div>
          <div class="option">5条回复</div>
        </li>
      </ul>
    </el-drawer>
  </div>
</template>

<script>
import api from "../../api/index";
export default {
  name: "RecreationRead",
  created() {
    let str = localStorage.getItem("userHobby");
    if (str !== null && str !== "null") {
      let userHobby = JSON.parse(str);
      this.chooseColor = userHobby.chooseColor;
      this.fontSize = userHobby.fontSize;
      this.ziti = userHobby.ziti;
      this.width = userHobby.width;
    } else {
      this.width = this.widthBox[1];
    }
    var bookName = this.$route.params.bookName;
    var chapterNo = this.$route.params.chapterNo;
    this.currentNum = parseInt(chapterNo);
    this.getRecreationBookByName(bookName);
    this.isInBookshelf(this.$store.state.userInfo.userId, "02", bookName);
    this.getBookCommentList(bookName, "01", this.currentNum, 0);
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    this.$router.afterEach(() => {
      window.scrollTo(0, 0);
    });
  },
  data() {
    return {
      barTop: "",
      bookInfo: {},
      bookCheck: false,
      bookshelfId: "",
      chapter: {},
      textarea: "",
      commentList: [
        {
          bookName: "星辰变",
          chapterNum: 18,
          comment: "1231",
          commentId: 1,
          commentLevel: "01",
          commentParentId: 0,
          userId: 3
        }
      ],
      commentTotal: 0,
      chapterList: [],
      currentNum: 1,
      totalNum: 10,
      colorBox: [
        "#ede7da",
        "#cddfcd",
        "#cfdde1",
        "#d0d0d0",
        "#FDE6E0",
        "#DCE2F1"
      ],
      chooseColor: "#ede7da",
      ziti: "SimSun",
      fontSize: 12,
      widthBox: [640, 800, 900, 1280],
      boxIndex: 2,
      width: "",
      visibleMenu: false,
      visibleShezhi: false,
      visibleCommened: false
    };
  },
  methods: {
    handleScroll() {
      //改变元素#searchBar的top值
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      // var offsetTop = document.querySelector("#searchBar").offsetTop;
      if (scrollTop < 120) {
        var top = 120 - scrollTop;
        document.querySelector("#searchBar").style.top = top + "px";
        document.querySelector("#mulu-con").style.top = top + "px";
        document.querySelector("#shezhi-con").style.top = top + "px";
      } else {
        document.querySelector("#searchBar").style.top = "5px";
        document.querySelector("#mulu-con").style.top = "5px";
        document.querySelector("#shezhi-con").style.top = "5px";
      }
    },
    show(val) {
      var choose = "visible" + val;
      var temp = "";
      switch (choose) {
        case "visibleMenu":
          temp = this.visibleMenu;
          break;
        case "visibleShezhi":
          temp = this.visibleShezhi;
          break;
      }
      this.visibleMenu = this.visibleShezhi = this.visibleShujia = this.visibleShuye = false;
      switch (choose) {
        case "visibleMenu":
          this.visibleMenu = !temp;
          break;
        case "visibleShezhi":
          this.visibleShezhi = !temp;
          break;
      }
    },
    async getChapterCon(type, bookUrl, chapter) {
      await api.getChapterCon(type, bookUrl, chapter).then(res => {
        this.chapter = res.data[0];
      });
      this.updateBookshelf();
    },
    async getRecreationBookByName(name) {
      await api.getRecreationBookByName(name).then(res => {
        this.bookInfo = res.data[0];
      });
      this.getRecreationBookChapterByUrl(this.bookInfo.bookDefaultUrl);
      this.getChapterCon("02", this.bookInfo.bookDefaultUrl, this.currentNum);
      //等待结果返回再异步请求
    },
    getRecreationBookChapterByUrl(bookUrl) {
      api.getRecreationBookChapterByUrl(bookUrl).then(res => {
        this.chapterList = res.data[0];
      });
    },
    isInBookshelf(userId, bigType, bookName) {
      api.isInBookshelf(userId, bigType, bookName).then(res => {
        this.bookCheck = res.data[0];
        this.bookshelfId = res.data[1].bookshelfId;
      });
    },
    addToBookshelf() {
      var bookshelf = {
        bookName: this.bookInfo.bookName,
        bookBigType: "02",
        bookAuthor: this.bookInfo.bookAuthor,
        bookType: this.bookInfo.bookBigType,
        ownerUserId: this.$store.state.userInfo.userId,
        chapterNum: this.currentNum,
        chapterInfo:
          this.chapter.chapterNumber + " " + this.chapter.chapterName,
        bookReadTime: new Date()
      };
      api.addBookToBookshelf(bookshelf).then(res => {
        if (res.data[0] === 1) {
          this.bookCheck = true;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    back() {
      this.$router.push({
        name: "recreationBookInfo",
        query: { bookName: this.bookInfo.bookName }
      });
    },
    change(val) {
      switch (val) {
        case "+":
          var s = this.boxIndex + 1;
          if (s <= this.widthBox.length - 1) {
            this.boxIndex = s;
          }
          break;
        case "-":
          var s1 = this.boxIndex - 1;
          if (s1 >= 0) {
            this.boxIndex = s1;
          }
          break;
      }
      this.width = this.widthBox[this.boxIndex];
    },
    showComment() {
      this.visibleCommened = true;
    },
    getBookCommentList(bookName, level, chapterNo, parentId) {
      api.getBookCommentList(bookName, level, chapterNo, parentId).then(res => {
        this.commentList = res.data[0];
        this.commentTotal = this.commentList.length;
        console.log(this.commentTotal);
      });
    },
    addNewBookComment() {
      var comment = {
        userId: this.$store.state.userInfo.userId,
        bookName: this.bookInfo.bookName,
        chapterNum: this.currentNum,
        comment: this.textarea,
        commentLevel: "01"
      };
      api.addNewBookComment(comment).then(res => {
        console.log(res);
      });
    },
    read(chapterNo) {
      this.visibleMenu = false;
      this.$router.push({
        name: "recreationRead",
        params: { bookName: this.bookInfo.bookName, chapterNo: chapterNo }
      });
    },
    muluClose() {
      this.visibleMenu = false;
    },
    shezhiClose() {
      this.visibleShezhi = false;
    },
    jia() {
      console.log(123);
      if (this.fontSize + 2 <= 30) {
        this.fontSize += 2;
      }
    },
    jian() {
      if (this.fontSize - 2 >= 14) {
        this.fontSize -= 2;
      }
    },
    save() {
      let userHobby = {
        chooseColor: this.chooseColor,
        ziti: this.ziti,
        fontSize: this.fontSize,
        width: this.width
      };
      localStorage.setItem("userHobby", JSON.stringify(userHobby));
      this.visibleShezhi = false;
    },
    updateBookshelf() {
      var bookshelf = {
        bookshelfId: this.bookshelfId,
        chapterNum: this.currentNum,
        chapterInfo:
          this.chapter.chapterNumber + " " + this.chapter.chapterName,
        bookReadTime: new Date()
      };
      api.updateBookshelf(bookshelf).then();
    }
  },
  watch: {
    "$route.params.chapterNo": function(val) {
      this.currentNum = val;
      this.getChapterCon("02", this.bookInfo.bookDefaultUrl, val);
    },
    width: function() {
      this.$nextTick(function() {
        var concentLeft = document.querySelector("#middle-c").offsetLeft;
        document.querySelector("#searchBar").style.left =
          concentLeft - 70 + "px";
        document.querySelector("#mulu-con").style.left = concentLeft + "px";
        document.querySelector("#shezhi-con").style.left = concentLeft + "px";
      });
    }
  },
  destroyed() {
    //离开该页面需要移除这个监听的事件
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#recreation-read {
  width: 100%;
  /* height: 700px; */
  -webkit-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  user-select: none;
}
#recreation-read .el-breadcrumb__item {
  float: left;
  margin-top: 24px;
}
#recreation-read #middle-c {
  margin: auto;
  height: 100%;
}
#recreation-read #middle-c .crum {
  height: 60px;
  width: 100%;
}
.left-bar {
  position: fixed;
  z-index: 999;
  width: 60px;
  top: 120px;
  height: 250px;
}
#recreation-read #middle-c .concent {
  min-height: 500px;
  padding: 20px;
}
#recreation-read #middle-c .buttom-page {
  height: 70px;
  width: 100%;
  margin-top: 30px;
  margin-bottom: 30px;
  font-size: 18px;
}
.left-bar .bar-item :first-child {
  border-top: none;
}
#searchBar :hover {
  cursor: pointer;
  color: red;
}
#searchBar :hover .inBookshelf {
  cursor: default;
  color: #978e8e;
}
.left-bar .bar-item {
  color: #000;
  border-top: 1px solid #beb9b9;
  height: 60px;
  width: 60px;
  font-size: 12px;
}
.left-bar .bar-item .bar-icon svg {
  font-size: 20px;
  margin-top: 11px;
  margin-bottom: 2px;
}

#mulu-con {
  position: fixed;
  z-index: 999;
  left: 1px;
  top: 120px;
  width: 700px;
  height: 500px;
  padding: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
#shezhi-con {
  position: fixed;
  z-index: 999;
  left: 1px;
  top: 120px;
  width: 500px;
  height: 400px;
  padding: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.buttom-page :hover {
  cursor: pointer;
  color: red;
  background-color: #e9e5e5;
}
.buttom-page :hover .no-choose {
  cursor: default;
}
.inBookshelf {
  height: 60px;
  line-height: 60px;
  color: #978e8e;
}
.buttom-page div {
  width: 33%;
  height: 100%;
  float: left;
}
.no-choose {
  pointer-events: none;
  color: #cac3c3;
}

.buttom-page div .page {
  height: 40px;
  width: 100%;
  line-height: 40px;
  margin-top: 15px;
  border-left: 1px solid #beb9b9;
}
#recreation-read #middle-c .title {
  margin-bottom: 10px;
  height: 40px;
  line-height: 40px;
  font-size: 25px;
  text-align: left;
}
#recreation-read #middle-c .con {
  text-align: left;
  line-height: 30px;
}
#recreation-read .comment-input {
  height: 150px;
  border: 1px solid red;
}
#recreation-read .comment-list {
  height: 500px;
  overflow: auto;
  list-style: none;
  padding: 0;
  margin: 0;
}
#recreation-read .el-drawer__header {
  padding: 10px 20px;
}
.comment-list .comment-item {
  padding: 10px 0;
  text-align: left;
}
#recreation-read .count {
  height: 50px;
  line-height: 50px;
  text-align: left;
  color: #b6b1b1;
  font-size: 12px;
}
#recreation-read .el-drawer__header {
  margin-bottom: 0;
}
.comment-item .user {
  height: 40px;
  line-height: 40px;
}
.comment-item .con {
  min-height: 20px;
  line-height: 20px;
  font-size: 14px;
}
.comment-item .option {
  height: 30px;
  line-height: 30px;
}
#recreation-read .chapter-tab {
  height: 460px;
  list-style-type: none;
  margin: 0px;
  padding: 0px;
  overflow: auto;
}
#recreation-read .chapter-tab li {
  float: left;
  width: 48%;
  border-bottom: 1px solid #d8dfd8;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  text-align: left;
  font-family: PingFangSC-Regular, -apple-system, Simsun;
}
#recreation-read .chapter-tab li .chapter-item {
  overflow: hidden;
  max-width: 80%;
  white-space: nowrap;
  text-overflow: ellipsis;
}
#recreation-read .chapter-tab li .chapter-item a:hover {
  color: red;
}
.chooseCurrent {
  color: red;
}
#recreation-read .close {
  height: 30px;
  width: 100%;
}
#recreation-read .close .close-icon {
  float: right;
}
#recreation-read .close :hover {
  cursor: pointer;
}
#recreation-read .el-row {
  height: 40px;
  line-height: 40px;
  box-sizing: border-box;
  margin-bottom: 30px;
}
#shezhi-con .title {
  float: left;
  width: 100px;
  font-size: 12px;
  font-family: PingFangSC-Regular, -apple-system, Simsun;
}
#shezhi-con .color {
  height: 35px;
  width: 35px;
  margin-left: 20px;
  border-radius: 50%;
  float: left;
  border: 1px solid #bcbccb;
}
#shezhi-con .ziti {
  height: 35px;
  line-height: 35px;
  width: 70px;
  margin-left: 20px;
  float: left;
  border: 1px solid #bcbccb;
}
#shezhi-con ul :first-child {
  margin-left: 0;
}
#shezhi-con ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
#shezhi-con ul li {
  float: left;
}
#shezhi-con .right {
  width: 256px;
  height: 100%;
  background-color: #fcf7f0;
  float: left;
}
#shezhi-con .right li {
  width: 83px;
  line-height: 25px;
  height: 25px;
  font-size: 18px;
  margin-top: 7px;
}
.right-border {
  border-right: 1px solid #bcbccb;
}
#shezhi-con .right li:hover {
  color: red;
  cursor: pointer;
}
#shezhi-con .right li:nth-child(2):hover {
  color: #bcbccb;
  cursor: default;
}
.close {
  font-size: 25px;
  font-weight: bold;
  color: #a8a6a6;
}

#shezhi-con .c li:hover {
  color: red;
  cursor: pointer;
}
</style>
