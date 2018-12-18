<template>
    <div>
        <ul class="header">
            <li>
                <img src='../../imgs/left_arrow.png'>
            </li>
            <li>
                <span>注册</span>
            </li>
            <li>
                <span>登录</span>
            </li>
        </ul>
        <ul class="msgFill">
            <li>
                <div></div>
                <div>使用手机注册</div>
                <div></div>
            </li>
            <li>
                <input type='text' placeholder="请输入11位手机号">
            </li>
            <li>
                <input type='text' placeholder="请输入验证码">
                <button>验证</button>
            </li>
            <li>
                <input type='text' placeholder="6-16位登录密码">
            </li>
            <li>
                <button>注册</button>
            </li>
            <li>点击注册表示同意《聚美优品用户协议》</li>
        </ul>      
    </div>
</template>

<script>
export default {

}
</script>


<style lang='stylus' scoped>
@import '~styles/border.styl'
div 
    height 100%
    width 100%
    .header
        width 100%
        height .45rem
        background #ffffff
        display flex
        text-align center
        line-height .45rem
        font-size .16rem
        border 1px 0 0 0,#eee
        li:nth-child(1)
            flex 41
            img 
                width .08rem
                height .15rem
        li:nth-child(2)
            flex 292
            color #666
        li:nth-child(3)
            flex 41 
            color #333 
    .msgFill
        width 100%
        height 100%
        background #fff
</style>