<template>
<div>
    <header>
       <ul ref='list'>
           <li id=0 @click='https(0,"coutuan_home")'><span :class='{active:active===0}'>推荐</span></li>
           <li id=1 @click='https(1,"coutuan_baby")'><span :class='{active:active===1}'>母婴健康</span></li>
           <li id=2 @click='https(2,"coutuan_makeup")'><span :class='{active:active===2}'>美妆</span></li>
           <li id=3 @click='https(3,"coutuan_shose")'><span :class='{active:active===3}'>鞋类</span></li>
           <li id=4 @click='https(4,"coutuan_furniture")'><span :class='{active:active===4}'>家具</span></li>
       </ul>
   </header>
   <main class='mainwrap' id='main'>
    <ul class="main">
        <li v-for='(item,index) of resouce' :key='index'>
            <div>
                <img :src='item.image'>
            </div>
            <div>
                <span>{{item.group_name_tag}}</span>
                <p>{{item.medium_name}}</p>
            </div>
            <div>
                <span>
                    <i>{{item.jumei_price}}<i class="line">{{item.market_price}}</i></i>
                    <i>{{item.single_price}}</i>
                </span>
                <span>去开团</span>
            </div>
            <div v-if='item.buyer_number_text'>
                {{item.buyer_number_text}}
            </div>
        </li>
    </ul>
   </main>
   <div class='backTop' @click='backTop' v-show='show'></div>
</div>
   
</template>
<script>
import http from 'utils/http'
import BScroll from 'better-scroll'
import { Toast } from 'mint-ui'
export default {
    data(){
        return{
            resouce:[],
            active:0,
            hasMore:'1',
            tab:'coutuan_home',
            show:false
        }
    },
    async mounted(){
        //第一次加载团购推荐
        this.resouce = (await http({
                method:'get',
                url:'/yiqituan/tab_list',
                params:{
                    tab: 'coutuan_home',
                    page: 1,
                    per_page: 20
                }
        })).data
        this.bscrollT = new BScroll('#main',{
                probeType:1,
                click:true,
                pullUpLoad:{
                    threshold:30
                }
            }) 
        this.scroll()
    },
    methods:{
        async https(index,tab){
            this.tab = tab
            //每次切换页面让bscroll回到顶端
            this.bscrollT.scrollTo(0,0)
            this.show = false
            let result = await http({
                method:'get',
                url:'/yiqituan/tab_list',
                params:{
                    tab: tab,
                    page: 1,
                    per_page: 20
                }
            })
            this.active = index
            this.resouce = result.data
            this.hasMore = result.has_more
        },
        scroll(){
            let count = 2
            this.bscrollT.on('pullingUp',async ()=>{
                if(this.hasMore==='1'){
                    let result = await http({
                        method:'get',
                        url:'/yiqituan/tab_list',
                        params:{
                            tab: this.tab,
                            page: count,
                            per_page: 20
                        }
                    })
                    this.resouce.push(...result.data)
                    this.$nextTick(()=>{
                        this.bscrollT.refresh()
                        count++
                        this.hasMore = result.has_more
                        this.bscrollT.finishPullUp()
                    })
                } 
                if(this.hasMore==='0'){
                    Toast({
                        message: ' 对不起，已经到底了~',
                        position: 'bottom',
                        duration: 1000
                    })
                    // 告诉better-scroll, 可以进行下次滑动了
                    this.bscrollT.finishPullUp()
                }             
            })
            this.bscrollT.on('scrollEnd',()=>{
                if(this.bscrollT.y<-1000){
                    this.show = true
                }else{
                    this.show = false
                }
            })
        },
        backTop(){
            this.bscrollT.scrollTo(0,0)
        }
    }
}
</script>

<style lang="stylus" scoped>
@import '~styles/border.styl'
@import '~styles/ellipsis.styl'
div 
    width 100%
    height 100%
    overflow hidden
    header
        width 100%
        height .44rem
        background #fff
        border(0 0 1px 0,#eee)
        position fixed
        left 0
        top 0
        z-index 1999
        ul
            width 100%
            height 100%
            display flex
            justify-content space-around
            text-align center
            line-height .44rem
            padding-left .21rem
            li 
                display flex
                span 
                    font-size .14rem
                    color #333
                &>.active
                    border-bottom 2px solid #fe4070
                    color #fe4070
    .mainwrap
        width 100%
        height 100%
        .main
            flex 1
            margin-top .44rem
            li
                width 100%
                height 2.43rem
                margin-bottom .1rem
                background #ffffff
                div:nth-child(1)
                    width 100%
                    height 1.55rem
                    display flex
                    justify-content center
                    align-items center
                    img 
                        width 1.5rem
                        height 1.5rem
                div:nth-child(2)
                    width 100%
                    height .28rem
                    padding .1rem .12rem 0
                    line-height .18rem
                    font-size .14rem
                    color #333
                    display flex
                    flex-direction row
                    span 
                        color #fe4070
                        margin-left .02rem
                    p
                        flex 1
                        color #333
                        font-size .14rem
                        ellipsis(null,1)
                div:nth-child(3)
                    width 100%
                    height .6rem
                    padding .12rem
                    display flex
                    flex-direction row
                    justify-content space-between
                    span:nth-child(1)
                        display flex 
                        flex-direction column
                        i:nth-child(1)
                            color #fe4070
                            font-size .18rem
                            line-height .2rem
                            .line
                                padding-left .04rem
                                font-size .12rem
                                color #999
                                text-decoration line-through
                        i:nth-child(2)
                            color #999
                            fnt-size .12rem
                            transform scale(.9)
                    span:nth-child(2)
                        width .88rem
                        height .26rem
                        background #fe4070
                        color #fff
                        text-align center
                        line-height .26rem
                        border-radius 20px
                        margin-top .05rem
                div:nth-child(4)
                    display inline
                    height .3rem
                    position relative
                    padding 0.04rem .08rem .04rem .16rem
                    position relative
                    left -.14rem
                    top -1.4rem
                    border(1px,#e3e3e3,solid,20px)
                    color #666
                    background rgba(251,251,251,.8)
    .backTop
        width .4rem
        height .4rem
        background #fff url('../../imgs/backTop.gif') center center no-repeat 
        background-size .16rem .1rem
        border(2px,#666,solid,50%)
        position fixed
        bottom .56rem
        right .16rem
        z-index 2000
</style>
