<template>
    <div>
        <ul>
            <li @click='handleGo'>
                <img src='../../imgs/left_arrow.png' >
            </li>
            <li>
                <span>{{$route.meta}}</span>
            </li>
            <li @click="goTo">
                <img src='../../imgs/home.png'>
            </li>
        </ul>      
        <div class="msg" v-if='arr1.length!==0'>
            商品数量有限，请尽快结算
        </div>
        <div class='goods' v-if='arr1.length!==0'>
            <div>
                <span class="span" @click='allSelect' :class='{select:isAll}'></span>
                <div>聚美优品发货</div>
            </div>
            <div class='details' v-for='(item,index) of arr1' :key='index'>
                <span class="span" @click='singleSelect(item)' ref='list' :class='{select:item.checked}'></span>
                <div class='img'>
                    <img :src='item.img'>
                </div>
                <div class='rigth'>
                    <p class="name"><span class="label">[极速免费]</span>{{item.name}}</p>
                    <div class='del' v-show='index!==isEdit'>
                        <span>{{item.value}}</span>
                        <span class='count'>x{{item.num}}</span>
                    </div>
                    <div class='bottom' v-show='index!==isEdit'>
                        <span class="price">￥{{item.price}}</span>
                        <span class="bianji" @click='edit(index)'>编辑</span>
                    </div>
                    <div class='compute' v-show='index===isEdit'>
                        <span class='reduce' @click='reduce(item,index)'>-</span>
                        <span class='num'>{{item.num}}</span>
                        <span class='add' @click='add(item,index)'>+</span>
                    </div>
                    <div class="doSomething" v-show='index===isEdit'>
                        <span class="price">￥{{item.price}}</span>
                        <span><i @click='delet(index)'>删除</i> | <i @click.stop='carry'>完成</i></span>
                    </div>
                </div>
            </div>
            <div class='shipping' v-if='total>39'>
                <span class="main">免</span>
                <span>可享新用户满39元包邮</span>
            </div>
        </div>
        <div class="promiWrap" v-if='isDelet'>
            <div class="promi">
                <div>确定要删除此商品？</div>
                <div>
                    <span :class="{active:isDelet}" @click='cancel'>取消</span>
                    <span @click='sure'>确定</span>
                </div>
            </div>
        </div>
        <div class='goodsFooter' v-if='arr1.length!==0'>
            <span @click='allSelect' :class='{select:isAll}' :all='isAll'></span>
            <span>全选</span>
            <span>合计</span>
            <span>￥{{total}}</span>
            <span>去结算(2)</span>
        </div>
        <div class="noGoods" v-if='arr1.length===0'>
            <div><img src='../../imgs/no-card-oops.png'></div>
            <div>您的购物车中没有商品，请先去挑选心爱的商品吧！</div>
            <div @click='goTo'>去逛逛</div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            arr1:[],
            isEdit:'',
            isDelet:'',
            total:0,
            isAll:true
        }
    },
    mounted(){
        if(localStorage.getItem("info")){
            this.arr1 = JSON.parse(localStorage.getItem("info"));
        }else{
            this.arr1 = []
        }
        this.isAlls()
    },
    methods:{
        edit(eq){
            this.isEdit = eq
        },
        delet(index){
            this.isDelet = true 
            for(let i=0;i<this.arr1.length;i++){
                if(i===index){
                    this.arr1.splice(index,1)
                }           
            }
            localStorage.setItem('info',JSON.stringify(this.arr1))
            this.total = 0
            for(let i in this.arr1){
                this.total += this.arr1[i].price*this.arr1[i].num
            }
        },
        cancel(){
            this.isDelet = false
        },
        sure(){
            this.delet()
            this.isDelet = false
        },
        carry(){
            this.isEdit = ''
        },
        reduce(item,index){
            if(item.num<=0){
                item.num = 0
            }else{
                item.num--
            }
            for(let i in this.arr1){
                if(i==index){
                    this.arr1[i].num = item.num
                }
            }
            localStorage.setItem('info',JSON.stringify(this.arr1))
            this.total = 0
            for(let i in this.arr1){
                this.total += this.arr1[i].price*this.arr1[i].num
            }
        },
        add(item,index){
            item.num++
            for(let i in this.arr1){
                if(i==index){
                    this.arr1[i].num = item.num
                }
            }
            localStorage.setItem('info',JSON.stringify(this.arr1))
            this.total = 0
            for(let i in this.arr1){
                this.total += this.arr1[i].price*this.arr1[i].num
            }
        },
        singleSelect(item){
            //反选
            item.checked = !item.checked
            if(item.checked){
                this.total += item.num*item.price
            }else{
                this.total-=item.num*item.price
            }
            let flag = true
            for(let i=0;i<this.arr1.length;i++){
                if(!this.arr1[i].checked){
                    flag = false
                    break
                }
            }
            if(!flag){
                this.isAll = false
            }else{
                this.isAll = true
            }
        },
        allSelect(){
            //全选
            this.isAll = !this.isAll
            for(let i=0;i<this.arr1.length;i++){
                this.arr1[i].checked = this.isAll
            }
            if(!this.isAll){
                this.total = 0
            }else{
                this.isAlls()
            }
        },
        isAlls(){
            this.total = 0
            if(this.isAll){
                for(let i in this.arr1){
                    this.total += this.arr1[i].price*this.arr1[i].num
                }
            }
        },
        goTo(){
            this.$router.push('home')
        },
        handleGo(){
            this.$router.go(-1)
        }
    }
}
</script>

<style lang="stylus" scoped>
@import '~styles/border.styl'
@import '~styles/ellipsis.styl'
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
    .msg
        width 100%
        height .3rem
        line-height .3rem
        padding 0 .08rem
        color #999
        background #fff
    .goods
        width 100%
        background #ffffff
        margin-top .1rem
        div:nth-child(1)
            width 100%
            height .41rem
            border 0 0 1px 0,#eee
            display flex
            padding 0 0 0 .08rem
            line-height .41rem
        div>.span
            width .2rem
            height .2rem
            background url('../../imgs/noclick.png') no-repeat
            background-size .2rem .2rem
            margin .1rem .08rem 0 0
            &.select
                background url('../../imgs/click.png') no-repeat
                background-size .2rem .2rem
        .details
            width 100%
            // height 1.04rem
            border 0 0 1px 0,#eee
            display flex
            padding 0 .08rem
            .span
                margin-top .4rem
            .img
                width .84rem
                height .84rem
                padding .1rem 0
                img 
                    width .84rem
                    height .84rem
            .rigth
                flex 1
                height 100%
                padding .1rem 0
                .name
                    width 100%
                    height .4rem
                    color #333
                    line-height .2rem
                    font-size .12rem
                    .label
                        color #fe4070
                .del
                    width 100%
                    height .16rem
                    margin-top .03rem
                    font-size .12rem
                    transform scale(.98)
                    display flex
                    span
                        color #999
                    span:nth-child(1)
                        ellipsis(200px,1)
                    span:nth-child(2)
                        flex 1
                        text-align right
                .bottom
                    width 100%
                    height .22rem
                    margin-top .03rem
                    .price
                        color #fe4070
                    .bianji
                        float right
                        color #666
                .compute
                    width 100%
                    height .31rem
                    padding-top .08rem
                    display flex
                    .reduce
                    .add
                        width .22rem
                        height .22rem
                        line-height .22rem
                        text-align center
                        font-size .2rem
                        color #999
                        border(1px,#999,solid,50%)
                    .num
                        width .4rem
                        height .22rem
                        line-height .22rem
                        text-align center
                .doSomething
                    width 100%
                    height .22rem
                    line-height .22rem
                    margin-top .05rem
                    .price
                        color #fe4070
                    span:nth-child(2)
                        float right
                        color #666

        .shipping
            width 100%
            height .37rem
            padding-left .08rem
            line-height .37rem
            color #fe4070
            display flex
            .main
                width .18rem
                height .18rem
                margin-top .09rem
                margin-right .06rem
                text-align center
                font-size .14rem
                line-height .18rem
                border(1px,#fe4070,solid,50%)
    .promiWrap
        position fixed
        top 0
        left 0
        z-index 1002
        width 100%
        height 100%
        background rgba(0,0,0,.8)
        .promi
            position fixed
            top 40%
            left 0
            z-index 1003
            width 76%
            height 1.5rem
            border-radius .06rem
            background #ffffff
            margin 0 12%
            div:nth-child(1)
                width 100%
                height 50%
                padding-top .23rem
                color #333333
                font-size .16rem
                text-align center
            div:nth-child(2)
                width 100%
                height 50%
                display flex
                padding .12rem .16rem
                justify-content space-between
                span 
                    width 1.17rem
                    height .38rem
                    line-height .38rem
                    text-align center
                    color #999
                    border(1px,#e3e3e3,solid,20px)
                    &.active
                        background #fe4070
                        color #fff
    .goodsFooter
        position fixed
        left 0
        bottom .49rem
        width 100%
        height .49rem
        background #ffffff
        line-height .49rem
        display flex
        padding 0 .08rem
        border-bottom 1px solid #eee
        span:nth-child(1)
            width .2rem
            height .2rem
            background url('../../imgs/noclick.png') no-repeat
            background-size .2rem .2rem
            margin .14rem .08rem 0 0
            &.select
                background url('../../imgs/click.png') no-repeat
                background-size .2rem .2rem
        span:nth-child(2)
            font-size .14rem
            margin-right .1rem
        span:nth-child(3)
            font-size .12rem
            color #666
            margin-right .08rem
        span:nth-child(4)
            flex 1
            color #fe4070
            font-size .16rem
         span:nth-child(5)
            margin-top .06rem
            width 1.25rem
            height .36rem
            background #fe4070
            text-align center
            line-height .36rem
            color #ffffff
            border(1px,#fe4070,solid,20px)
    .noGoods
        position fixed
        top .45rem
        left 0 
        width 100%
        height 85%
        background #ffffff
        padding 50% 0 0 0
        div:nth-child(1)
            width 100%
            height .82rem
            img
                width .86rem
                height .82rem
                margin-left 40%
        div:nth-child(2)
            margin-top .12rem
            height .15rem
            font-size .13rem
            text-align center
            padding 0 .12rem
        div:nth-child(3)
            width 1.25rem
            height .36rem
            line-height .36rem
            color #ffffff
            text-align center
            background #fe4070
            margin-top .23rem
            border-radius 20px
            margin-left 35%
        

</style>


