<template>
  <div id="homeIndex">
    <div class="middle">
      <div class="left">
        <div class="title">中图分类</div>
        <div class="ul-div">
          <ul class="style-ul">
            <li>
              <div class="left-icon">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-F-jingji" />
                </svg>
              </div>
              <div class="right-a">
                <a>马克思主义、列宁主义</a>
              </div>
            </li>
            <li>
              <div class="left-icon">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-F-jingji" />
                </svg>
              </div>
              <div class="right-a">
                <a href="#">马克思主义</a>
              </div>
            </li>
            <li>
              <div class="left-icon">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-F-jingji" />
                </svg>
              </div>
              <div class="right-a">
                <a>马克思主义</a>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="right">
        <div class="top-book">
          <div class="book-info" v-for="i in 9" :key="i">
            <div class="book-cover">
              <el-image style="width: 100%; height: 100%" src="../images/11.jpg" :fit="fit"></el-image>
            </div>
            <div class="book-name">{{name | maxTextFilter(9)}}</div>
            <div class="book-author">作者: 袁琳、唐敦双</div>
            <div class="book-publish">关键词：新华出版社</div>
          </div>
        </div>
        <div class="buttom-page">
          <div class="block" style=" margin-top: 40px;">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-size="9"
              layout="total,prev, pager, next, jumper"
              :total="100"
            ></el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "homeIndex",
  props: {
    msg: String
  },
  data() {
    return {
      currentPage: 1,
      name: "马克思恩格斯社会建设理论及其",
      fit: "fill"
    };
  },

  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
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
<style>
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
.left .style-ul li .right-a :hover {
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
  font-weight: bold;
}
.book-info .book-author {
  height: 40px;
}
.book-info .book-publish {
  height: 30px;
}
.right .buttom-page {
  height: 50px;
  width: 100%;
  /* border: 1px solid green; */
}
</style>
