<template>
    <div>
        <div id='bscroll'>
            <div>
                <TopTitle></TopTitle>
                <Search @send='showPop'></Search>
                <Header></Header>
                <router-view></router-view>
                <Footer></Footer>
            </div>
        </div>
        <div class='pop' v-if='show'>
            <div class='popOne'></div>
            <div class='popTwo' v-if='!inputState'>
                <ul class="search">
                    <li class='search-input' @click='changeInput'>
                        <span class='small'>
                            <img src='../../imgs/search_btn.png'>
                        </span>
                        <input type='text' class='search-text' placeholder='搜索商品名称、分类、功效'>
                    </li>
                    <li class='back' @click='back'>
                        返回
                    </li>
                </ul>
                <ul class='classification'>
                    <li v-for='(item,index) of type' :key='index' @click="accordion(index)">
                        <div :class='{active:index===isShow}'>
                            <span>{{item.name}}</span>
                            <span class='bottom'></span>
                        </div>
                        <ul v-show='index===isShow'>
                            <li v-for='(value,index) of item.sub_categories' :key='index'>{{value.name}}</li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div class='searchPop' v-else>
                <ul class="search2">
                    <li @click='goto'></li>
                    <li>
                        <span>
                            <img src='../../imgs/search_btn.png'>
                        </span>
                        <input @input='get(keyword)' v-model='keyword' type='text' placeholder='搜索商品名称、分类、功效'>
                    </li>
                    <li class='go'>
                        搜索
                    </li>
                </ul>
                <ul class='msg'>
                    <li v-for='(item,index) of keywordArray' :key="index">
                        <span></span>
                        <span>{{item}}</span>
                        <span></span>
                    </li>
                    <li class='clear' v-if="keywordArray.length!==0">清空历史记录</li>
                </ul>                
            </div>
        </div>     
    </div>   
</template>

<script>
import TopTitle from "components/layout/TopTitle.vue";
import Search from "components/common/search.vue";
import Header from "components/layout/Header.vue";
import HomeOne from "pages/home/details/HomeOne.vue";
import Footer from "components/layout/Footer.vue";
import http from 'utils/http'
export default {
  data() {
    return {
      isCelling: true,
      type:[],
      show:false,
      inputState:false,
      keyword:'',
      keywordArray:[],
      isShow:''
    }
  },
  components: {
    TopTitle,
    Search,
    Header,
    HomeOne,
    Footer
  },
  methods:{
      showPop(boolean){
          this.show = boolean
      },
      back(){
          this.show = false
      },
      changeInput(){
          this.inputState=true
      },
      get(keyword){
        //   clearInterval(this.timer)
        //   let timer = setTimeout(function(){
            this.keyword = keyword
        //       console.log(this.keyword)
        //   },3000)
      },
      goto(){
          this.inputState = false
          this.show = true
      },
      accordion(index){
          if(this.isShow === index){
            this.isShow=''
          }else{
              this.isShow = index
          }
      }
  },
  async beforeCreate(){
      let result = (await http({
          method:'get',
          url:'/index/requestDelegate',
          params:{
              url:'http://mobile.jumei.com/msapi/mall/allcategories.json'
          }
      })).data
      this.type = result
  },
  watch:{
      async keyword(){
        //搜索接口
        let result2 = (await http({
            method:'get',
            url:'/index/requestDelegate',
            params:{
                url: 'http://mobile.jumei.com/msapi/search/suggestion.json?keyword='+this.keyword+'&url=http://mobile.jumei.com/msapi/search/suggestion.json'
            }
        })).data
        this.keywordArray=result2
      }
  }
}
</script>

<style lang='stylus' scoped>
// @import '~styles/border.styl'
div
    width 100%
    #bscroll 
        height 6.67rem
    .Celling 
        position fixed
        left 0
        top 0
    .pop
        width 100%
        height 100%
        .popOne
            position fixed
            top 0
            left 0
            width 100%
            height 6.67rem
            background rgba(0,0,0,.5)
            z-index 1000
        .popTwo
            position fixed
            top 0 
            right 0
            width 85%
            height 100%
            background #fff
            z-index 1001
            overflow-y auto
            .search
                background #fff
                position fixed
                top 0 
                right 0
                width 85%
                height .45rem
                display flex
                line-height .45rem
                padding .06rem .12rem
                border-bottom 1px solid #eee
                .search-input
                    flex 6
                    border 1px solid #f5f5f5
                    background #f5f5f5
                    display flex
                    height .3rem
                    line-height .3rem
                    border-radius 20px
                    padding 0 .2rem
                    margin-right .1rem
                    .small
                        width .17rem
                        height .17rem
                        margin -.03rem 0.03rem 0 0
                        img 
                            width .17rem
                            height .17rem
                    .search-text
                        flex 1
                        border none
                        background #f5f5f5
                        
                .back
                    flex 1
                    color #999
                    line-height .30rem
            .classification
                padding-top .45rem
                width 100%
                height 100%
                li
                    width 100%
                    font-size .14rem
                    div
                        padding-left .15rem                    
                        width 100%
                        height .44rem
                        line-height .44rem
                        border-bottom 1px solid #eee
                        color #666
                        background #ffffff
                        span:nth-child(2)
                            float right
                            width .09rem
                            height .07rem
                            background url('../../imgs/down.png') no-repeat
                            background-size .09rem .07rem
                            margin-top .2rem
                            padding-right .2rem
                        &.active
                            color #fe4070
                        &.active span:nth-child(2)
                            background url('../../imgs/up.png') no-repeat
                            background-size .09rem .07rem
                    ul
                        width 100%
                        li
                            width 100%
                            height .44rem
                            line-height .44rem
                            padding-left .15rem      
                            border-bottom 1px solid #fff
                            background #f5f5f5
                            color #666
                            margin-bottom .01rem 
        .searchPop 
            position fixed
            top 0 
            right 0
            width 100%
            height 100% 
            z-index 1001 
            background #fff 
            .search2
                width 100%
                height .46rem
                padding .08rem .12rem
                border-bottom 1px solid #eee
                display flex
                li:nth-child(1)
                    width .2rem
                    height .3rem
                    line-height  .3rem
                    background url('../../imgs/left_arrow.png') center center no-repeat
                    background-size .08rem .15rem
                    margin-right .1rem
                li:nth-child(2)
                    flex 1
                    border 1px solid #f5f5f5
                    background #f5f5f5
                    display flex
                    height .3rem
                    line-height .3rem
                    border-radius 20px
                    padding 0 .2rem
                    margin-right .1rem
                    span 
                        width .17rem
                        height .17rem
                        margin -.03rem 0.03rem 0 0
                        img 
                            width .17rem
                            height .17rem
                    input
                        flex 1
                        border none
                        background #f5f5f5
                li:nth-child(3)
                    width .4rem
                    height 100%
                    color #999
                    line-height .30rem
                    text-align center
            .msg
                width 100%
                height 100%
                background #ffffff
                li
                    width 100%
                    height .44rem
                    border-bottom 1px solid #eeeeee
                    display flex
                    span:nth-child(1)
                        width .3rem
                        height 100%
                        line-height .44rem
                        background url('../../imgs/search_btn.png') center center no-repeat
                        background-size .14rem .14rem
                    span:nth-child(2)
                        flex 1
                        height 100%
                        line-height .44rem
                    span:nth-child(3)
                        width .3rem
                        height 100%
                        line-height .44rem
                        background url('../../imgs/right_arrow.png') center center no-repeat
                        background-size .05rem .09rem
                .clear
                    margin 0 auto
                    width 30%
                    height .44rem
                    color #666
                    font-size .14rem
                    border none
                    line-height .44rem

</style>
