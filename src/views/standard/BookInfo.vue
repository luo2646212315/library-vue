<template>
  <div class="StandardHome">
    <Header></Header>
    <BookDesc></BookDesc>
  </div>
</template>

<script>
import Header from '../../components/standard/Header'
import BookDesc from '../../components/standard/BookDesc'
export default {
  name: 'StandardHome',
  props: {
    msg: String
  },
  components:{
      Header,
      BookDesc
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
