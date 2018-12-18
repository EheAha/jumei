<template>
    <div class='list-item' ref="list" @click="msg">
        <div class='listImg'>
            <img :src='item.image_url_set.main[320]'  v-if='item.label'>
            <img :src='item.image_url_set.single.url[320]'  v-else-if='item.type==="jumei_deal"&&item.with_new_image==="0"' class="width:130px;height:130px">
            <img :src='item.image_url_set.dx_image.url[320]'  v-else>
        </div>
        <div class='listDetail' v-if='item.type&&!item.label' >
            <p class='title'>{{item.name}}</p>
            <div class='bottom'>
                <span>￥<span class='nowPrice'>{{item.jumei_price}}</span></span>
                <span class='oldPrice'>￥{{item.market_price}}</span>
                <p class='comment'>{{item.product_desc}}</p>
            </div>
        </div>  
    </div>   
</template>

<script>
    export default{
        props:{
            item:Object
        },
        methods:{
            msg(){
                if(this.$refs.list.children.length==1){
                    this.$router.push({
                        path:'/special',
                        query:{
                            url:this.item.url
                        }
                    })
                }else{
                    this.$router.push({
                        path:'/detail',
                        query:{
                            item_id:this.item.item_id,
                            type:this.item.type
                        }
                    })
                }
            }
        }
    }
</script>

<style lang='stylus' scoped>
@import '~styles/variable.styl'
@import '~styles/ellipsis.styl'
    .list-item
        width 100%
        height 1.3rem
        background #fff
        margin-bottom .08rem
        position relative
        .listImg
            width 100%
            height 100%
            position relative
            img 
                // width 100%
                height 100%
                border none
        .listDetail
            width 2.04rem 
            height 100%
            position absolute            
            right .12rem
            top 0
            .title
                width 100%
                font-size .13rem
                line-height .17rem
                color #333
                height .34rem
                padding .12rem 0 .05rem 0
            .bottom
                clear both
                margin-top .4rem
                span:nth-child(1) 
                    color $base-color
                    .nowPrice
                        font-size .2rem
                        padding 0 .02rem
                .oldPrice
                    font-size .12ren
                    color #999
                    text-decoration line-through
                .comment
                    font-size .12rem
                    transform scale(.98)
                    color #999 
</style>