<template>
  <div class="StandardHome">
    <Header></Header>
    <HomeIndex></HomeIndex>
  </div>
</template>

<script>
import Header from '../../components/standard/Header'
import HomeIndex from '../../components/standard/HomeIndex'
export default {
  name: 'StandardHome',
  props: {
    msg: String
  },
  components:{
      Header,
      HomeIndex
  },
  data(){
      return{

      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
