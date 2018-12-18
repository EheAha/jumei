<template>
    <div id="topNav">
        <ul>
            <router-link to='/home/one' tag='li' active-class="active">
                <span>首页</span>
            </router-link>
            <router-link to='/home/global' tag='li' active-class="active">
                <span>极速免税店</span>
            </router-link>
            <router-link to='/home/muandbaby' tag='li' active-class="active">
                <span>母婴</span>
            </router-link> 
            <router-link to='/home/luxury' tag='li' active-class="active">
                <span>轻奢</span>
            </router-link>
            <router-link to='/home/pop' tag='li' active-class="active">
                <span>名品特卖</span>
            </router-link>
        </ul>    
    </div>
</template>


<style lang='stylus' scoped>
@import '~styles/variable.styl'
@import '~styles/border.styl'
#topNav 
    background #fff
    height .44rem
    width 100%
    overflow-x scroll 
    border 0 0 1px 0,#eee
    ul
        height .44rem
        width 110%
        display flex
        justify-content space-between 
        li
            flex 1
            line-height .44rem
            color #666
            font-size .14rem 
            display flex
            justify-content center
            span  
                height 100%
        .active
            color $base-color
            span 
                border-bottom 2px solid $base-color
</style>
