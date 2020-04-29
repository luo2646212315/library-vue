<template>
  <div id="bookShelf">
    <div class="left">
      <el-menu
        @select="menuSelect"
        default-active="01"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="01">
          <i class="el-icon-menu"></i>
          <span slot="title">美文名著</span>
        </el-menu-item>
        <el-menu-item index="02">
          <i class="el-icon-document"></i>
          <span slot="title">休闲娱乐</span>
        </el-menu-item>
        <el-menu-item index="11">
          <i class="el-icon-setting"></i>
          <span slot="title">自动订阅</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="right">

    </div>
  </div>
</template>

<script>
export default {
  name: "Bookshelf",
  created() {},
  props: {
    msg: String
  },
  components: {},
  data() {
    return {
      type: "01"
    };
  },
  methods: {
    menuSelect(index, indexPath) {
      console.log(index + "--" + indexPath);
      this.type =index;
    }
  },
  watch: {
    'type': function() {
      console.log("sada");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#bookShelf {
  width: 1000px;
  height: 500px;
  margin: auto;
  border: 1px solid red;
}
#bookShelf .left {
  width: 20%;
  height: 500px;
  float: left;
  border: 1px solid red;
}
#bookShelf .right {
  width: 79%;
  height: 500px;
  float: left;
  border: 1px solid red;
}
</style>
