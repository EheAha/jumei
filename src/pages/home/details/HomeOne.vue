<template>
    <div>
        <nav class='topBanner'>
            <div>
                <img src='../../../imgs/homebanner.jpeg'>
            </div>   
        </nav>
        <main class='container'>
            <ul class='cutOver'>
                <router-link tag='li' active-class='active' to='/home/one/today'>今日十点上新</router-link>
                <router-link tag='li' active-class='active' to='/home/one/tomorrow'>明日十点预告</router-link>
            </ul>
        </main> 
        <router-view></router-view>   
    </div>  
</template>

<style lang='stylus' scoped>
@import '~styles/variable.styl'
div
    height 100%
    .topBanner
        width 100%
        height 1.54rem
        div
            width 100%
            height 100%
            img 
                width 100%
    .container
        width 100%
        height .44rem
        ul
            background #fff
            width 100%
            height 100%
            display flex
            text-align center
            line-height .44rem
            li 
                flex 1
                color #666
                &.active
                    color $base-color
</style>