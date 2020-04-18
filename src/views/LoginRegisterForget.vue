<template>
  <div class="home">
    <el-container style="height: 700px; border: 1px solid #eee">
      <el-header style="height:100px"></el-header>
      <el-main><router-view/></el-main>
      <el-footer style="height:70px">Footer</el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "LoginRegisterForget",
  components: {
    
  },
  data() {
    return {
     
    };
  },
  methods: {}
};
</script>

<style>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}
body {
  margin: 0;
  padding: 0;
}
</style>