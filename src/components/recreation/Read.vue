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
      <div class="bar-item">
        <div class="bar-icon">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-shujia_huaban" />
          </svg>
        </div>
        <div>书架</div>
      </div>
      <div class="bar-item">
        <div class="bar-icon">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-fanhuishuye" />
          </svg>
        </div>
        <div>书页</div>
      </div>
    </div>
    <div id="middle-c" :style="'width:'+width[3]">
      <div class="crum"></div>
      <div class="concent" :class="chooseColor+'-color'">
        <div class="title">{{chapter.chapterNumber}}：{{chapter.chapterName}}</div>
        <div v-html="chapter.chapterContent" class="con" :style="'font-size:'+fontSize+'px'"></div>
      </div>
      <div class="buttom-page" :class="chooseColor+'-color'">
        <div>
          <div
            class="page"
            :class="(currentNum-1)<1?'no-choose':''"
            style="border-left: none;"
            @click="prv()"
          >上一章</div>
        </div>
        <div>
          <div class="page">书籍详情</div>
        </div>
        <div>
          <div class="page" :class="(currentNum+1)>totalNum?'no-choose':''" @click="next()">下一章</div>
        </div>
      </div>
    </div>
    <div id="mulu-con" v-show="visibleMenu"></div>
    <div id="shezhi-con" v-show="visibleShezhi"></div>
  </div>
</template>

<script>
import api from "../../api/index";
export default {
  name: "RecreationRead",
  created() {
    // var bookName = this.$route.query.bookName;
    this.getChapterCon("02", "lol之电竞天王.txt", this.currentNum);
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    this.concentLeft = document.querySelector("#middle-c").offsetLeft;
  },
  data() {
    return {
      concentLeft: "",
      barTop: "",
      bookName: "",
      chapter: {},
      currentNum: 1,
      totalNum: 3,
      chooseColor: "first",
      fontSize: 12,
      fontFamily: "",
      width: ["640px", "800px", "900px", "1280px"],
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
      var offsetTop = document.querySelector("#searchBar").offsetTop;
      console.log(scrollTop + "----" + offsetTop + "-----" + this.concentLeft);
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
        console.log(res);
        this.chapter = res.data[0];
      });
    },
    pre() {
      this.currentNum--;
      this.getChapterCon("02", "lol之电竞天王.txt", this.currentNum);
    },
    next() {
      this.currentNum++;
      this.getChapterCon("02", "lol之电竞天王.txt", this.currentNum);
    }
  },
  watch: {
    concentLeft: function(val) {
      console.log(val);
      document.querySelector("#searchBar").style.left = val - 70 + "px";
      document.querySelector("#mulu-con").style.left = val + "px";
      document.querySelector("#shezhi-con").style.left = val + "px";
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
