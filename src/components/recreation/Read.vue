<template>
  <div id="recreation-read">
    <div class="left-bar" id="searchBar"></div>
    <div id="middle-c">
      <div class="crum"></div>
      <div class="concent"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecreationRead",
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    this.concentLeft = document.querySelector("#middle-c").offsetLeft;
  },
  data() {
    return {
      concentLeft: "",
      barTop: ""
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
      } else {
        document.querySelector("#searchBar").style.top = "5px";
      }
    }
  },
  watch: {
    concentLeft: function(val) {
      console.log(val);
      document.querySelector("#searchBar").style.left = val - 70 + "px";
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
  height: 700px;
}
#recreation-read #middle-c {
  width: 900px;
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
</style>
