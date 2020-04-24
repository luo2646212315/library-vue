<template>
  <div id="searchIndex">
    <div class="middle">
      <div class="left">
        <div>
          <div class="book-item">
            <div class="left-cover">
              <el-image style="width: 100%; height: 100%" src="images/11.jpg" :fit="fit"></el-image>
            </div>
            <div class="middle-concent">
              <div class="book-name">
                <span>宋末大丈夫</span>
              </div>
              <div class="book-types">
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
              <div class="book-desc">新书请到这里。大家先收藏，新书发布时间待定。</div>
              <div class="book-update">
                <a href="#">
                  <span>最新更新</span>
                  <span>【新书说明】</span>
                </a>
                <span>·2020-04-01</span>
              </div>
            </div>
            <div class="right-button">
              <div class="top-dex">
                <div class="zi-num">
                  <span class="num">120万</span>总字数
                </div>
                <div class="zi-num">
                  <span class="num">5.5万</span>总推荐
                </div>
              </div>
              <div class="buttom-button">
                <el-button style="float:left" size="medium" type="danger">危险按钮</el-button>
                <el-button style="float:right" size="medium" type="primary" plain>主要按钮</el-button>
              </div>
            </div>
          </div>
          <div class="book-item"></div>
          <div class="book-item"></div>
          <div class="book-item"></div>
          <div class="book-item"></div>
          <div class="page">
            <div class="block">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size="5"
                layout="total,prev, pager, next, jumper"
                :total="20"
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
            <li>
              <div class="left-cover"></div>
              <div class="right-concent">
                <div class="book-name h">
                  <span>斗破苍穹</span>
                </div>
                <div class="book-author h">
                  <span>
                    <i class="el-icon-s-custom"></i>天蚕土豆
                  </span>
                </div>
                <div class="book-desc">人生本来没有什么太多的追求，一块羊油饼、</div>
              </div>
            </li>
            <li>2</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchIndex",
  data() {
    return {
      fit: "fill",
      currentPage: 1,
      input: ""
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#searchIndex {
  height: 1050px;
  width: 80%;
  margin: auto;
  border: 1px solid red;
}
#searchIndex .top-input {
  width: 40%;
  height: 100px;
  line-height: 100px;
  margin: auto;
}
#searchIndex .middle {
  height: 1050px;
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
  border: 1px solid red;
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
  height: 50px;
  margin-bottom: 10px;
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
  border: 1px solid red;
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
  height: 800px;
  border: 1px solid red;
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
  border: 1px solid red;
}
.concent-ul .right-concent {
  float: left;
  width: 60%;
  height: 100%;
  border: 1px solid red;
  text-align: left;
}
.concent-ul .right-concent .book-name {
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
}
</style>
