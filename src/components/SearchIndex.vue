<template>
  <div id="searchIndex">
    <div class="top-input">
      <el-input placeholder="请输入作者、小说名" v-model="input" class="input-with-select">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <div class="middle">
        <div class="left">

        </div>
        <div class="right">

        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchIndex",
  data() {
    return {
      input: ""
    };
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#searchIndex {
  height: 1000px;
  width: 80%;
  margin: auto;
  border: 1px solid red;
}
#searchIndex .top-input {
  width: 60%;
  height: 100px;
  line-height: 100px;
  margin: auto;
}
#searchIndex .middle {
    
}
#searchIndex .middle .left{

}
#searchIndex .middle .right{
    
}
</style>
