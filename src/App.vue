<template>
  <div id="app">
    <Index></Index>
  </div>
</template>

<script>
import Index from './pages/Index.vue'
export default {
    components:{
      Index
    }
  }
</script>

<style lang="stylus">
  @import '~styles/reset.styl'  
  #app
    width 100%
    height 100%
    overflow-y scroll
    
</style>
