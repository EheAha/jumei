<template>
    <ul v-if='isShow' class='ulOne'>
        <router-link tag='li' to="/home" active-class='active'>
            <i class='home'></i>
            <span>首页</span>
        </router-link>
        <router-link tag='li' to="/yiqituan" active-class='active' >
            <i class='yiqigou'></i>
            <span>团购</span>
        </router-link>
        <router-link tag='li' to="/cart" active-class='active' >
            <i class='cart'></i>
            <span>购物车</span>
        </router-link>
        <router-link tag='li' to="/profile" active-class='active' >
            <i class='mine'></i>
            <span>我的</span>
        </router-link>
    </ul> 
</template>

<script>
export default {
     data () {
         return {
             isShow:true
         }
     },
     watch:{
         $route(){
             if(this.$route.name === 'detail'){
                 this.isShow = false
             }else{
                 this.isShow = true
             }
         }
     }  
}
</script>


<style lang='stylus' scoped>
    @import '~styles/variable.styl'
    .ulOne 
        width 100%
        height .49rem
        display flex
        position fixed
        left 0
        bottom 0
        z-index 199
        background #fff
        li
            flex 1
            text-align center
            color #999
            display flex
            flex-direction column
            align-items center
            justify-content center
            font-size .12rem 
            padding-top .02rem
            span
                transform scale(0.9)
            i
                width .22rem
                height .22rem               
            .home
                background url(../../imgs/1w.png) no-repeat
                background-size .22rem .20rem
            .yiqigou
                background url(../../imgs/2w.png) no-repeat
                background-size .22rem .20rem
            .cart
                background url(../../imgs/3w.png) no-repeat
                background-size .22rem .20rem
            .mine
                background url(../../imgs/4w.png) no-repeat
                background-size .22rem .20rem
            &.active
                color $base-color
            &.active .home
                background url(../../imgs/1r.png) no-repeat
                background-size .22rem .20rem
            &.active .yiqigou
                background url(../../imgs/2r.png) no-repeat
                background-size .22rem .20rem
            &.active .cart
                background url(../../imgs/3r.png) no-repeat
                background-size .22rem .20rem
            &.active .mine
                background url(../../imgs/4r.png) no-repeat
                background-size .22rem .20rem        
</style>

