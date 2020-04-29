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
          <div class="book-name">斗罗大陆</div>
          <div class="book-other">
            <span class="h">
              <span>
                <i class="el-icon-s-custom"></i>迪巴拉爵士
              </span>
            </span>
            <span class="c">|</span>
            <span class="h">
              <span>历史</span>
            </span>
            <span class="c">|</span>
            <span>连载</span>
          </div>
          <div class="book-simple-desc">心潮澎湃，无限幻想，迎风挥击千层浪，少年不败热血！</div>
          <div class="book-num"></div>
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
            <div></div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BookDesc",
  props: {
    msg: String
  },
  data() {
    return {
      fit: "fill",
      value: 2,
      scoreColors: ["#99A9BF", "#F7BA2A", "#FF9900"]
    };
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
  height: 45px;
  font-size: 28px;
  font-family: PingFangSC-Regular, HelveticaNeue-Light, "Helvetica Neue Light",
    "Microsoft YaHei", sans-serif;
  width: 100%;
}
.book-info .book-other {
  color: #a6a6a6;
  /* border: red 1px solid; */
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  font-family: PingFangSC-Regular, -apple-system, Simsun;
  width: 100%;
}
.book-info .book-simple-desc {
  /* border: red 1px solid; */
  font-family: PingFangSC-Regular, -apple-system, Simsun;
  font-size: 14px;
  height: 65px;
  width: 100%;
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
  margin: 1px 8px 0;
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
</style>
