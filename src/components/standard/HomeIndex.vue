<template>
  <div id="homeIndex">
    <div class="middle">
      <div class="left">
        <div class="title">中图分类</div>
        <div>
          <ul class="style-ul">
            <li><a>经济</a></li>
            <li><a>政治</a></li>
          </ul>
        </div>
      </div>

      <div class="right"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "homeIndex",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#homeIndex {
  height: 1000px;
  width: 100%;
  border: solid red 1px;
}
#homeIndex .middle {
  width: 80%;
  height: 100%;
  margin: auto;
  border: solid red 1px;
}
#homeIndex .middle .left {
  height: 100%;
  width: 280px;
  border: solid red 1px;
  float: left;
}
#homeIndex .middle .right {
  height: 100%;
  width: 800px;
  border: solid red 1px;
  float: left;
}
.left .title {
  font-size: 28px;
  color: snow;
  width: 100%;
  height: 50px;
  background-color: grey;
}
.left .style-ul {
  list-style: none;
  margin: 0;
  padding: 0;
  text-align: left;
}
.left .style-ul li {
  border: red 1px solid;
  height: 50px;
  line-height: 50px;
}
</style>
