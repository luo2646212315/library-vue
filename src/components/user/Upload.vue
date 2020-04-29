<template>
  <div id="bookShelf">
    <div class="left">
      上传
    </div>
    <div class="right">

    </div>
  </div>
</template>

<script>

export default {
  name: "Bookshelf",
  created(){
    
  },
  props: {
    msg: String
  },
  components: {
  
  },
  data() {
    return {};
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#bookShelf{
  width: 1000px;
  height: 500px;
  margin: auto;
  border: 1px solid red;
}
#bookShelf .left{
  width: 20%;
  height: 500px;
  float: left;
  border: 1px solid red;
}
#bookShelf .right{
  width: 79%;
  height: 500px;
  float: left;
  border: 1px solid red;
}
</style>
