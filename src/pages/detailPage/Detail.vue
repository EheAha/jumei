<template>
    <div>
        <ul class='header' @click='name'>
            <li>
                <img src='../../imgs/left_arrow.png'>
            </li>
            <li>
                <span>{{imgDate.short_name}}</span>
            </li>
            <li @click='home1'>
                <img src='../../imgs/home.png'>
            </li>
        </ul> 
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for='(item,index) of imgDate.image_url_set.single_many' :key="index">
                    <img :src='item[320]'>
                </div>
            </div>
        </div>
        <ul class='prod'>
            <li>
                <span>￥{{priceDate.sku_min_price}}</span>
                <span>￥{{priceDate.market_price}}</span>
                <span>{{priceDate.buyer_number_text}}</span>
            </li>
            <li>{{priceDate.wuliu_text||'满500包邮'}}</li>
            <li>{{imgDate.name}}</li>    
        </ul> 
        <ul class="msg">
            <li>
                <span>地址</span>
                <span>至北京东城区</span>
                <span></span>
            </li>
            <li>
                <span>运费</span>
                <span>本商品单件包邮</span>
                <span></span>
            </li>
            <li>
                <span>说明</span>
                <span>七天无条件退货  非自营  支持分期</span>
                <span></span>
            </li>
        </ul>
        <div class='select'>
            <span>请选择</span>
            <span>分类  型号</span>
        </div>
        <ul class='det'>
            <li>
                <span class='active'>图文详情</span> 
            </li>
            <li>
                <span>商品参数</span>
            </li>
            <li>
                <span>评价</span>
            </li>    
        </ul> 
        <div class='img-det' v-html='imgDate.description_info.description'></div>
        <div class='p' v-html="imgDate.description_info.description_usage"></div>
        <div class='img-det2' v-html="imgDate.description_info.description_images"></div>  
        <ul class='footer'>
            <li @click='jumpCart'>
                <span class='bg'>
                    <img src='../../imgs/car.png'>
                </span>
                <span>购物车</span>
            </li>
            <li @click='addCart'>加入购物车</li>
            <li>立即购买</li>
        </ul>
    </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
import http from 'utils/http'

export default {
    data(){
        return{
            imgDate:{},
            priceDate:{}
        }
    },
    async beforeCreate(){
        let id = this.$route.query.item_id
        let type = this.$route.query.type
       //图片、标题信息
        let result1 = (await http({
             method:'get',
             url:'/product/ajaxStaticDetail',
             params:{
                item_id:id,
                type
             }
        })).data
            this.imgDate = result1
        //价格等
        let result2 = (await http({
             method:'get',
             url:'/product/ajaxDynamicDetail',
             params:{
                item_id:id,
                type
             }
        })).data.result
        this.priceDate = result2
    },
    updated(){
        let mySwiper = new Swiper('.swiper-container', {})
    },
    methods:{
        name(){
            this.$router.go(-1)
        },
        home1(){
            this.$router.push({path:'/home'})
        },
        addCart(){ 
            let arr;
            let goods = {};
            let num = 1
            if(localStorage.getItem('info')){
                arr = JSON.parse(localStorage.getItem('info'))
            }else{
                arr = []
            }
            if(arr.length>0){
                var flag = false;
                for(var i=0;i<arr.length;i++){
                    if(this.$route.query.item_id == arr[i].id && this.$route.query.type==arr[i].type){
                        arr[i].num++;
                        flag = true;
                        break;
                    }
                }
                if(!flag){
                    goods.id = this.$route.query.item_id;
                    goods.type = this.$route.query.type
                    goods.img = this.priceDate.img
                    goods.price = this.priceDate.jumei_price
                    goods.value = this.priceDate.size[0].size
                    goods.name = this.imgDate.name
                    goods.num = 1;
                    goods.checked=true
                    arr.push(goods);
                }
            }else{
                goods.id = this.$route.query.item_id;
                goods.type = this.$route.query.type
                goods.img = this.priceDate.img
                goods.price = this.priceDate.jumei_price
                goods.value = this.priceDate.size[0].size
                goods.name = this.imgDate.name
                goods.num = 1;
                goods.checked = true
                arr.push(goods);
            }
            localStorage.setItem("info",JSON.stringify(arr));
        },
        jumpCart(){
            this.$router.push('/cart')
        }
    }

};
</script>

<style lang="stylus" scoped>
@import '~styles/reset.styl'
@import '~styles/border.styl'
div
    width 100%
    height 100%
    .header
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
            img 
                width .2rem
                height .2rem 
    .swiper-container
        height 3.75rem
        background #ffffff
        img 
            width 3.75rem
            height 3.75rem
    .prod
        width 100%
        padding .15rem .12rem
        background #ffffff
        li:nth-child(1) 
            width 100%
            line-height .3rem
            span:nth-child(1)
                font-size .28rem
                color #f33873
            span:nth-child(2)
                font-size .13rem
                color #666
                text-decoration line-through
            span:nth-child(3)
                float right
                font-size .13rem
                color #666
        li:nth-child(2)
            font-size .13rem
            color #666
        li:nth-child(3)
            font-size .15rem
            color #333
    .msg
        width 100%
        padding 0 .12rem .12rem
        background #ffffff
        li
            height .39rem
            line-height .39rem
            display flex
            border-bottom 1px solid #eee
            span:nth-child(1)
                flex 1
                color #999
            span:nth-child(2)
                flex 3
                color #333
            span:nth-child(3)
                flex 1 
        li:nth-child(3)
            border-bottom 0    
    .select
        width 100%
        height .42rem
        line-height .42rem
        background #ffffff
        margin .08rem 0
        display flex
        padding 0 .12rem
        span:nth-child(1)
            flex 1 
            color #999
        span:nth-child(2)
            flex 4 
            color #333
    .det
        width 100%
        height .44rem
        background #ffffff
        display flex
        text-align center
        line-height .44rem
        color #666
        li
            flex 1
            span 
                display inline-block
                height 100%
            .active
                border-bottom 2px solid #fe4070
    .img-det
        width 100%
        >>>img 
                width 100%
        >>>p
            width 100%
        >>>p img
            width 100%
            
    .p
        background #ffffff
        line-height .2rem
    .img-det2
        width 100%
        >>>img
            width 100%

    .footer
        width 100%
        height .49rem
        background #fff
        display flex
        position fixed
        bottom 0
        left 0
        z-index 200
        line-height .49rem
        text-align center
        li
            flex 1
        li:nth-child(1) 
            display flex 
            flex-direction column
            align-items center
            justify-content center
            color #979797
            font-size .12rem
            transform scale(.97)
            .bg
                width .2rem
                height .2rem
                img 
                   width .22rem
                   height .22rem
        li:nth-child(2)  
            color #fe4070
            background #ffcfdf
        li:nth-child(3)  
            color #fff
            background #fe4070
</style>
