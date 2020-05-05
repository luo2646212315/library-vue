<template>
  <div class="StandardHome">
    <Header :bookTypes = "bookTypes"></Header>
    <HomeIndex :bookTypes = "bookTypes"></HomeIndex>
  </div>
</template>

<script>
import api from '../../api/index'
import Header from '../../components/standard/Header'
import HomeIndex from '../../components/standard/HomeIndex'
export default {
  name: 'StandardHome',
  props: {
    msg: String
  },
  created(){
    this.getBookTypes("01");
  },
  components:{
      Header,
      HomeIndex
  },
  data(){
      return{
        bookTypes:[]
      }
  },
  methods:{
    getBookTypes(bigType) {
      var _this = this;
      api.getBookType(bigType).then(res => {
        console.log(res);
        _this.bookTypes = res.data[0];
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
