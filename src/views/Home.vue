<template>
  <div class="home">
    <el-container style="height: 1000px; border: 1px solid red;">
      <el-header style="height:180px; padding: 0">
        <div>
          <el-menu
            :default-active="activeIndex2"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-menu-item index="1">处理中心</el-menu-item>
            <el-submenu index="2">
              <template slot="title">我的工作台</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
              <el-menu-item index="2-3">选项3</el-menu-item>
              <el-submenu index="2-4">
                <template slot="title">选项4</template>
                <el-menu-item index="2-4-1">选项1</el-menu-item>
                <el-menu-item index="2-4-2">选项2</el-menu-item>
                <el-menu-item index="2-4-3">选项3</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-menu-item index="3" disabled>消息中心</el-menu-item>
            <el-menu-item index="4">
              <a href="https://www.ele.me" target="_blank" @click.prevent>订单管理</a>
            </el-menu-item>
            <el-menu-item index="5">
              <router-link to="/loginRegisterForget">登录</router-link>
            </el-menu-item>
            <el-menu-item index="5">
              <a href="#" @click="qqLogin()">qq登录</a>
            </el-menu-item>
          </el-menu>
        </div>
      </el-header>
      <el-main style="padding: 0">
        <div id="main-main">
          <div id="main-left">
            <el-tabs type="border-card" style="height:50%;padding: 0">
              <el-tab-pane label="美文名著">
                <div>
                  <ul class="ul-ul">
                    <li v-for="item in bookTypes" :key="item.id">
                      <div
                        v-for="(i,index) in item.bookType"
                        :key="i.type"
                        @click="kk()"
                        :class="(index%2)==0?'ul-left':'ul-right'"
                      >
                        <div class="li-image">
                          <div>
                            <svg class="icon" aria-hidden="true">
                              <use :xlink:href="i.icon" />
                            </svg>
                          </div>
                        </div>
                        <div class="li-concent">
                          <div class="type">
                            <em>{{i.type}}</em>
                          </div>
                          <div class="num">
                            <i>{{i.num}}</i>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </el-tab-pane>
              <el-tab-pane label="休闲娱乐"></el-tab-pane>
            </el-tabs>
            <div class="main-left-foot">
              <div class="foot-title">
                <span>美文强推</span>
              </div>
              <div class="foot-content">
                <ul>
                  <li>1</li>
                  <li>2</li>
                  <li>3</li>
                  <li>4</li>
                  <li>5</li>
                </ul>
              </div>
            </div>
          </div>
          <div id="main-middle">
            <div id="main-middle-top">
              <div class="top-carousel">
                <div class="block">
                  <el-carousel height="100%">
                    <el-carousel-item>
                      <!-- <img src="http://localhost:9010/api/library-core/getImage/111.jpg"> -->
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
              <div class="foot-picture"></div>
            </div>
            <div id="main-middle-foot"></div>
          </div>
          <div id="main-right">right</div>
        </div>
      </el-main>
      <el-footer style="height:100px; padding: 0">Footer</el-footer>
    </el-container>
  </div>
</template>

<script>
import api from "../api";
export default {
  name: "Home",
  components: {},
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
      bookTypes: [
        {
          id: "1",
          bookType: [
            {
              type: "玄幻",
              icon: "#icon-xuanhuan",
              num: "13226",
              path: ""
            },
            {
              type: "奇幻",
              icon: "#icon-qihuan",
              num: "53241",
              path: ""
            }
          ]
        },
        {
          id: "2",
          bookType: [
            {
              type: "武侠",
              icon: '#icon-wuxia',
              num: "13226",
              path: ""
            },
            {
              type: "仙侠",
              icon: "#icon-xianxia",
              num: "53211",
              path: ""
            }
          ]
        }
      ]
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    qqLogin() {
      api.qqLogin().then(res => {
        console.log(res);
      });
    },
    kk() {
      this.$message.error("qeqeqeqe");
    }
  }
};
</script>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  height: 180px;
}

.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  height: 100px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  border: 1px solid green;
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
}
#main-left {
  width: 20%;
  height: 100%;
  float: left;
  margin: 0;
  border: 1px solid red;
}
#main-middle {
  width: 60%;
  height: 100%;
  float: left;
  border: 1px solid red;
}
#main-right {
  width: 19%;
  height: 100%;
  float: left;
  border: 1px solid red;
}
.ul-ul {
  padding: 0;
  margin: 0px;
}
.ul-ul li {
  list-style: none;
  width: 100%;
  height: 50px;
}
.ul-ul li:nth-child(odd) {
  background-color: rgb(218, 214, 214);
}
.ul-ul li:nth-child(even) {
  background-color: rgb(243, 237, 237);
}
.ul-left {
  width: 50%;
  height: 100%;
  /* border: 1px solid red; */
  float: left;
}
.ul-right {
  width: 50%;
  height: 100%;
  /* border: 1px solid red; */
  float: left;
}
/* .ul-left :hover {
  color: red;
}
.ul-right :hover {
  color: red;
} */
.ul-ul li :hover {
  color: red;
  cursor: pointer;
}
.ul-ul li .li-image {
  /* margin-top: 10px; */
  width: 45%;
  height: 100%;
  float: left;
  /* border: 1px solid red; */
  line-height: 50px;
  text-align: center;
}
.ul-ul li .li-image div {
  height: 100%;
}
.ul-ul li .li-image .icon {
  font-size: 25px;
}
.ul-ul li .li-concent {
  float: left;
  width: 49%;
  height: 100%;
  text-align: left;
  /* border: 1px solid red; */
}
.ul-ul li .li-concent .type {
  height: 50%;
}
.ul-ul li .li-concent .num {
  height: 50%;
  line-height: 25px;
}
.ul-ul li .li-concent em {
  font-size: 14px;
}
.ul-ul li .li-concent i {
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
  border: 1px solid red;
}
#main-middle-top .top-carousel .block {
  height: 100%;
}
#main-middle-top .top-carousel .block .el-carousel {
  height: 100%;
}
#main-left .main-left-foot {
  height: 50%;
  border: 1px solid red;
}
#main-middle-foot {
  height: 50%;
  border: 1px solid red;
}
</style>