<template>
  <div id="recreation-read">
    <div class="left-bar" id="searchBar" :class="chooseColor+'-color'">
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
    <div id="middle-c" :style="'width:'+width">
      <div class="crum">
        <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-top: 23px;">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ bookInfo.bookTypeName}}</el-breadcrumb-item>
          <el-breadcrumb-item>{{ bookInfo.bookName}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="concent" :class="chooseColor+'-color'">
        <div class="title">{{chapter.chapterNumber}}：{{chapter.chapterName}}</div>
        <div v-html="chapter.chapterContent" class="con" :style="'font-size:'+fontSize+'px'"></div>
      </div>

      <div class="buttom-page" :class="chooseColor+'-color'">
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
    <div id="mulu-con" v-show="visibleMenu">
      <el-row>
        <el-button type="success" @click="change('-')">-</el-button>

        <el-button type="success" @click="change('+')">+</el-button>
      </el-row>
    </div>
    <div id="shezhi-con" v-show="visibleShezhi"></div>
  </div>
</template>

<script>
import api from "../../api/index";
export default {
  name: "RecreationRead",
  created() {
    this.width = this.widthBox[this.boxIndex];
    var bookName = this.$route.params.bookName;
    var chapterNo = this.$route.params.chapterNo;
    this.currentNum = chapterNo;
    this.getRecreationBookByName(bookName);
    this.isInBookshelf(this.$userInfo.userId, "02", bookName);
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
      chapter: {},
      chapterList: [],
      currentNum: 1,
      totalNum: 10,
      chooseColor: "first",
      fontSize: 12,
      fontFamily: "",
      widthBox: ["640px", "800px", "900px", "1280px"],
      boxIndex: 2,
      width: "",
      visibleMenu: false,
      visibleShezhi: false
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
    getChapterCon(type, bookUrl, chapter) {
      api.getChapterCon(type, bookUrl, chapter).then(res => {
        this.chapter = res.data[0];
      });
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
      });
    },
    addToBookshelf() {
      var bookshelf = {
        bookName: this.bookInfo.bookName,
        bookBigType: "02",
        ownerUserId: this.$userInfo.userId,
        chapterNum: this.currentNum,
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
      this.width = this.widthBox[this.boxIndex];
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
<style>
#recreation-read {
  width: 100%;
  /* height: 700px; */
  -webkit-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  user-select: none;
}
#recreation-read #middle-c {
  margin: auto;
  height: 100%;
  border: 1px solid red;
}
#recreation-read #middle-c .crum {
  height: 60px;
  width: 100%;
  border: 1px solid red;
}
.left-bar {
  position: fixed;
  z-index: 999;
  width: 60px;
  top: 120px;
  height: 250px;
  border: 1px solid red;
}
#recreation-read #middle-c .concent {
  min-height: 500px;
  padding: 20px;
  border: 1px solid gold;
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
.first-color {
  background-color: #ede7da;
}
.second-color {
  background-color: #e0ce9e;
}
.threed-color {
  background-color: #cddfcd;
}
.fourth-color {
  background-color: #cfdde1;
}
.fifth-color {
  background-color: #ebcece;
}
.sixth-color {
  background-color: #d0d0d0;
}
#mulu-con {
  position: fixed;
  z-index: 999;
  left: 1px;
  top: 120px;
  width: 700px;
  height: 500px;
  border: 2px solid green;
}
#shezhi-con {
  position: fixed;
  z-index: 999;
  left: 1px;
  top: 120px;
  width: 500px;
  height: 400px;
  border: 2px solid blue;
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
</style>
