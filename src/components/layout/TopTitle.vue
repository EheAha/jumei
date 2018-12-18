<template>
    <ul v-if='$route.name=="global"
            ||$route.name=="muandbaby"
            ||$route.name=="luxury"
            ||$route.name=="pop"
            ||$route.name=="profile"
            '>
        <li>
            <img src='../../imgs/left_arrow.png' >
        </li>
        <li>
            <span>{{$route.meta}}</span>
        </li>
        <li >
            <img src='../../imgs/home.png'>
        </li>
    </ul>      
</template>

<script>
export default {
    methods:{
        
    }    
}
</script>


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
        border 0 0 1px 0,#eee
        li:nth-child(1)
            flex 41
            img 
                width .08rem
                height .15rem
        li:nth-child(2)
            flex 292
        li:nth-child(3)
            flex 41
            img 
                width .2rem
                height .2rem    
</style>