<template>
  <div id="main">
    <div id="main-main">
      <div id="main-left">
        <div class="type">
          <div class="ul-ul">
            <div
              @click="kk(bookType.typeUrl)"
              class="ul-item"
              :class="index%4==0||index%4==1 ? 'choose' : ''"
              v-for="(bookType,index) in bookTypes"
              :key="bookType.id"
            >
              <div class="li-image">
                <div>
                  <svg class="icon" aria-hidden="true">
                    <use :xlink:href="bookType.typeIcon" />
                  </svg>
                </div>
              </div>
              <div class="li-concent">
                <div class="type">
                  <em>{{bookType.typeName}}</em>
                </div>
                <div class="num">
                  <i>{{bookType.bookNum}}</i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="main-left-foot">
          <div class="foot-title">
            <span>名著强推</span>
          </div>
          <div class="foot-concent">
            <ul class="con-ul">
              <li>
                <div class="book-type">
                  <span>「</span>
                  <span class="book-type-zi">玄幻</span>
                  <span>」</span>
                </div>
                <div class="book-name">逆天成神</div>
                <div class="book-auother">耳根</div>
              </li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
              <li>5</li>
              <li>6</li>
              <li>7</li>
            </ul>
          </div>
        </div>
      </div>
      <div id="main-middle">
        <div id="main-middle-top">
          <div class="top-carousel">
            <div class="block">
              <el-carousel ref="topcar" :interval="3000" height="100%">
                <el-carousel-item>
                  <!-- <img src="http://localhost:9010/api/library-core/getImage/111.jpg"> -->
                  <el-image style="width: 100%; height: 100%" src="images/11.jpg" :fit="fit"></el-image>
                </el-carousel-item>
                <el-carousel-item>
                  <!-- <img src="http://localhost:9010/api/library-core/getImage/222.png"> -->
                </el-carousel-item>
                <el-carousel-item>
                  <h3 class="small">3</h3>
                </el-carousel-item>
                <el-carousel-item>
                  <h3 class="small">4</h3>
                </el-carousel-item>
              </el-carousel>
            </div>
          </div>
          <div class="foot-message">
            <div>
              <div class="message-concent">
                <div class="book-name">
                  <span>绝世唐门</span>
                </div>
                <div class="book-zhui">
                  <span style="font-size: 18px;font-weight: bold;font-style: italic;">5000</span>
                  <span style="font-size: 12px;">人在追</span>
                </div>
                <div class="book-desc">
                  <span>重生在周董的演唱会上，许阳对着话筒说：我不想点歌，可以把话筒给我吗？</span>
                </div>
              </div>
            </div>
            <div>
              <div class="message-concent">
                <div class="book-name">
                  <span>绝世唐门</span>
                </div>
                <div class="book-zhui">
                  <span>5000</span>
                  <span>人在追</span>
                </div>
                <div class="book-desc">
                  <span>重生在周董的演唱会上，许阳对着话筒说：我不想点歌，可以把话筒给我吗？</span>
                </div>
              </div>
            </div>
            <div>
              <div class="message-concent">
                <div class="book-name">
                  <span>绝世唐门</span>
                </div>
                <div class="book-zhui">
                  <span>5000</span>
                  <span>人在追</span>
                </div>
                <div class="book-desc">
                  <span>重生在周董的演唱会上，许阳对着话筒说：我不想点歌，可以把话筒给我吗？</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="main-middle-foot">
          <div class="foot-title">
            <span>系统推荐</span>
          </div>
          <div class="top-show">
            <div class="left-carousel">
              <el-carousel
                @change="footCarouselChange()"
                ref="footcar"
                trigger="click"
                :interval="4000"
                type="card"
                height="125px"
              >
                <el-carousel-item v-for="item in 6" :key="item">
                  <el-image style="width: 100%; height: 100%" src="images/11.jpg" :fit="fit"></el-image>
                </el-carousel-item>
              </el-carousel>
            </div>
            <div class="right-concent">
              <div
                class="card"
                :key="index"
                :style="footCarIndex==index ? 'display:block':'display:none'"
                v-for="(item,index) in myMiddleFootCarousel"
              >
                <div class="book-name">{{item.bookName}}</div>
                <div class="book-desc">
                  <span>{{item.bookDesc}}---{{footCarIndex}}</span>
                </div>
                <div>
                  <el-button type="danger" size="small" round>书籍详情</el-button>
                </div>
              </div>
            </div>
          </div>
          <div class="middle-foot-foot">
            <div class="foot-concent">
              <div class="concent">
                <div class="book-name left-name">斗破苍穹</div>
                <div class="book-desc">四处找寻那些即将化龙的小幼灵，将它们驯养成当世无双的龙王！</div>
              </div>
              <div class="book-cover">
                <el-image style="width: 100%; height: 100%" src="images/11.jpg" :fit="fit"></el-image>
              </div>
            </div>
            <div class="foot-concent right-concent">
              <div class="concent">
                <div class="book-name right-name">斗破苍穹</div>
                <div class="book-desc">四处找寻那些即将化龙的小幼灵，将它们驯养成当世无双的龙王！</div>
              </div>
              <div class="book-cover">123</div>
            </div>
          </div>
        </div>
      </div>
      <div id="main-right">
        <div class="main-left-foot">
          <div class="foot-title" style="margin-top:0">
            <span>新闻公告</span>
          </div>
          <div class="foot-concent">
            <ul class="con-ul">
              <li>
                <div class="book-type">
                  <span>「</span>
                  <span class="book-type-zi">玄幻</span>
                  <span>」</span>
                </div>
                <div class="book-name">逆天成神</div>
                <div class="book-auother">耳根</div>
              </li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
              <li>5</li>
              <li>6</li>
              <li>7</li>
              <li>7</li>
            </ul>
          </div>
        </div>
        <div class="main-left-foot">
          <div class="foot-title">
            <span>娱乐强推</span>
          </div>
          <div class="foot-concent">
            <ul class="con-ul">
              <li>
                <div class="book-type">
                  <span>「</span>
                  <span class="book-type-zi">玄幻</span>
                  <span>」</span>
                </div>
                <div class="book-name">逆天成神</div>
                <div class="book-auother">耳根</div>
              </li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
              <li>5</li>
              <li>6</li>
              <li>7</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../api/index";
export default {
  name: "HomeIndex",
  components: {},
  created() {
    this.getBookType("02");
  },
  data() {
    return {
      // activeIndex: "1",
      fit: "fill",
      activeIndex2: "1",
      footCarIndex: "0",
      bookTypes: [
        {
          typeFlag: "21",
          icotypeIconn: "#icon-xuanhuan",
          typeId: "4",
          typeLevel: "",
          typeName: "玄幻",
          typeParentFlag: "",
          typeUrl: "",
          bookNum: 1212
        },
        {
          typeFlag: "22",
          icotypeIconn: "#icon-qihuan",
          typeId: "5",
          typeLevel: "",
          typeName: "奇幻",
          typeParentFlag: "",
          typeUrl: "",
          bookNum: 12454
        }
      ],
      myMiddleTopCarousel: [
        {
          bookName: "",
          bookImage: "",
          bookDesc: "",
          author: ""
        }
      ],
      myMiddleFootCarousel: [
        {
          bookName: "第一本",
          bookImage: "",
          bookDesc: "第一",
          author: "1"
        },
        {
          bookName: "第2本",
          bookImage: "",
          bookDesc: "第2",
          author: "2"
        },
        {
          bookName: "第3本",
          bookImage: "",
          bookDesc: "第3",
          author: "3"
        },
        {
          bookName: "第4本",
          bookImage: "",
          bookDesc: "第4",
          author: "4"
        },
        {
          bookName: "第5本",
          bookImage: "",
          bookDesc: "第5",
          author: "5"
        },
        {
          bookName: "第6本",
          bookImage: "",
          bookDesc: "第6",
          author: "6"
        }
      ]
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    qqLogin() {
      console.log("123");
      // api.qqLogin().then(res => {
      //   console.log(res);
      // });
    },
    footCarouselChange() {
      this.footCarIndex = this.$refs.footcar.activeIndex;
    },
    kk() {
      this.$message.error("qeqeqeqe");
    },
    getBookType(bigType) {
      var _this = this;
      api.getBookType(bigType).then(res => {
        console.log(res);
        _this.bookTypes = res.data[0]; 
      });
    }
  },
  watch: {}
};
</script>

<style>
#header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  height: 180px;
  padding: 0;
}

#footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  height: 100px;
  padding: 0;
}

#main {
  height: 720px;
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  /* border: 1px solid green; */
  padding: 0;
}

body > .el-container {
  margin-bottom: 40px;
}
body {
  margin: 0;
  padding: 0;
}
#main-main {
  margin: auto;
  width: 80%;
  height: 100%;
  background-color: #fff;
}
#main-left {
  width: 20%;
  height: 100%;
  float: left;
  margin: 0;
  /* border: 1px solid red; */
}
#main-middle {
  width: 60%;
  height: 100%;
  float: left;
  /* border: 1px solid red; */
}
#main-right {
  width: 19%;
  height: 100%;
  float: left;
  /* border: 1px solid red; */
}
.ul-ul {
  padding: 0;
  margin: 0px;
}
.ul-ul .ul-item {
  width: 50%;
  height: 50px;
  float: left;
}
.choose {
  /* background-color: rgb(218, 214, 214); */
  background-color: #f7f6f2;
}
/* .ul-ul li:nth-child(even) {
  background-color: rgb(243, 237, 237);
} */

.ul-ul :hover {
  color: red;
  cursor: pointer;
}
/* 图片移动 */
/* .ul-ul :hover svg {
  transform: translateX(-5px);
}
svg {
  transition: margin ease-out 0.5s;
} */
.ul-ul .ul-item .li-image {
  /* margin-top: 10px; */
  width: 45%;
  height: 100%;
  float: left;
  /* border: 1px solid red; */
  line-height: 50px;
  text-align: center;
}
.ul-ul .ul-item .li-image div {
  height: 100%;
}
.ul-ul .ul-item .li-image .icon {
  font-size: 25px;
}


.ul-ul .ul-item .li-concent {
  float: left;
  width: 49%;
  height: 100%;
  text-align: left;
  /* border: 1px solid red; */
}
.ul-ul .ul-item .li-concent .type {
  height: 20px;
  margin-top: 5px;
}
.ul-ul .ul-item .li-concent .num {
  height: 16px;
  line-height: 16px;
}
.ul-ul .ul-item .li-concent em {
  font-size: 14px;
}
.ul-ul .ul-item .li-concent i {
  font-size: 12px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

#main-middle-top {
  width: 100%;
  height: 50%;
}
#main-middle-top .top-carousel {
  height: 60%;
  width: 100%;
  /* border: 1px solid red; */
}
#main-middle-top .top-carousel .block {
  height: 100%;
}
#main-middle-top .top-carousel .block .el-carousel {
  height: 100%;
}
.main-left-foot {
  height: 50%;
  /* border: 1px solid red; */
}
.foot-title {
  text-align: left;
  margin-top: 40px;
  padding-bottom: 5px;
  border-bottom: black 1px solid;
}
#main-middle-foot {
  height: 50%;
  padding: 0 30px;
  /* border: 1px solid red; */
}
.foot-title span {
  font-weight: 500;
  font-size: 20px;
}
.foot-concent ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.foot-concent .con-ul li {
  height: 40px;
  border-bottom: 1px solid rgb(228, 224, 224);
}
.foot-concent .con-ul .book-type {
  height: 100%;
  width: 60px;
  float: left;
  line-height: 40px;
  font-size: 15px;
  color: grey;
}

.foot-concent .con-ul .book-name {
  height: 100%;
  float: left;
  line-height: 40px;
  font-size: 15px;
}
.foot-concent .con-ul .book-auother {
  height: 100%;
  float: right;
  line-height: 40px;
  font-size: 12px;
  /* color: rgb(199, 196, 196); */
  color: #b3b3b3;
}
.foot-concent .con-ul li :hover {
  color: red;
  cursor: pointer;
}
#main-middle-foot .top-show {
  height: 160px;
  width: 100%;
}
#main-middle-foot .top-show .left-carousel {
  float: left;
  width: 40%;
  height: 100%;
}
#main-middle-foot .top-show .left-carousel .el-carousel {
  height: 100%;
}
#main-middle-foot .top-show .right-concent {
  float: left;
  width: 60%;
  height: 100%;
}
#main-middle-foot .top-show .right-concent .card {
  height: 100%;
}
#main-middle-foot .top-show .right-concent .book-name {
  font-size: 18px;
  font-weight: bold;
  height: 40px;
  line-height: 40px;
}
#main-middle-foot .top-show .right-concent .book-desc {
  font-size: 13px;
  height: 60px;
  font-family: PingFangSC-Regular, -apple-system, Simsun;
}
#main-middle-foot .middle-foot-foot {
  height: 126px;
  width: 100%;
  /* border: 1px solid red; */
}
.foot-message {
  height: 40%;
  padding: 0 30px;
}
.foot-message .message-concent {
  width: 33%;
  height: 100%;
  float: left;
  text-align: left;
  margin-top: 22px;
}
.foot-message .message-concent .book-name {
  height: 25px;
  font-size: 18px;
}
.foot-message .message-concent .book-zhui {
  height: 25px;
  color: #bf2c24;
}
.foot-message .message-concent .book-desc {
  height: 50px;
  font-size: 12px;
}
.middle-foot-foot .foot-concent {
  width: 45%;
  float: left;
  height: 80%;
  /* border: 1px solid red; */
  padding: 10px;
  background: #f7f6f2;
}
#main-middle-foot .middle-foot-foot .foot-concent:hover {
  box-shadow: 0 5px 16px #d9d4c7;
}
.middle-foot-foot .right-concent {
  margin-left: 20px;
}
.middle-foot-foot .foot-concent .concent {
  /* border: 1px solid red; */
  height: 100%;
  width: 60%;
  float: left;
  text-align: left;
}
.middle-foot-foot .foot-concent .book-cover {
  /* border: 1px solid red; */
  height: 100%;
  width: 28%;
  float: right;
}
.middle-foot-foot .foot-concent .concent .book-name {
  font-size: 18px;
  height: 30%;
}
.middle-foot-foot .foot-concent .concent .book-desc {
  font-size: 12px;
  height: 70%;
}
.right-name {
  color: #fc6c28;
}
.left-name {
  color: #0060bf;
}
#main-left .type {
  height: 50%;
}
</style>
