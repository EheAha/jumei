<template>
    <ul>
        <li>
            <img src='../../imgs/footer_bg.jpg'>
        </li>
        <li>
            <div>触屏版</div>
            <div>电脑版</div>
        </li>
        <li>
            ©2016 聚美优品 Jumei.com
        </li>
    </ul>
</template>
<style lang='stylus' scoped>
@import '~styles/border.styl'
@import '~styles/variable.styl'
    ul 
        width 100%
        height 2.42rem
        padding 0 .11rem .58rem
        background #ffffff
        margin-bottom .08rem
        li:nth-child(1) 
            padding-top .13rem
            img 
                width 3.52rem
                height .70rem
        li:nth-child(2)
            display flex
            width 100%
            height .33rem
            margin-top .1rem
            justify-content center
            div
                width .84rem
                height .33rem 
                border 2px,#e3e3e3,solid,15px
                color $base-color
                text-align center
                line-height .33rem
                margin-right .42rem
            div:nth-child(2) 
                margin-right 0
                color #666
        li:nth-child(3)
            font-size .14rem
            color #999999
            margin-top .25rem
            text-align center
            
</style>
