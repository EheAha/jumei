<template>
    <div>
        <ul>
            <li>
                <img src='../../imgs/left_arrow.png'>
            </li>
            <li>
                <span>登录</span>
            </li>
            <li>
                <span>注册</span>
            </li>
        </ul>      
    </div>
</template>
<style lang='stylus' scoped>
@import '~styles/border.styl'
    ul
        width 100%
        height .45rem
        background #ffffff
        display flex
        text-align center
        line-height .45rem
        font-size .16rem
        color #333
        border 1px 0 0 0,#eee
        li:nth-child(1)
            flex 41
            img 
                width .08rem
                height .15rem
        li:nth-child(2)
            flex 292
        li:nth-child(3)
            flex 41  
</style>