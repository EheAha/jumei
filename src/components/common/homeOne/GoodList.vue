<template>
    <div class='goodsList'>
        <list-item :item="item" v-for='(item,index) in allData.item_list' :key="index"></list-item>  
        <div class='loading' v-if='bstop'>
            <img src='../../../imgs/ajax-loader.gif'>
            加载中...
        </div>
    </div>    
</template>

<script>
import ListItem from './ListItem.vue'
import {scroll} from 'utils/scroll'
export default {
    props:{
        // resource:Array,
        allData:Object
    },
    data(){
        return{
            newResource:[],
            page:'',
            bstop:false
        }
    },
    components:{
        ListItem
    },
    // methods:{
    //     scrollY(){
    //         console.log(this.bscroll)
    //          this.bscroll.on('scroll',()=>{
    //              if(this.bscroll.y<-46){
    //                 // return fn&&fn(true)
    //             }
    //         })
    //     }
    // },
    watch:{
        //监听父组件二次传来的新值
        //下一步准备更新newResource，因此必须让他重新赋值
        async allData(){
            if(this.$route.name==='today'){
                this.newResource = this.allData&&this.allData.item_list||[]
                this.page = this.allData.page_count
                this.bstop = true
                await scroll({
                    el:"#bscroll",
                    data:this.newResource,
                    url:'/index/ajaxDealactList',
                    vm:this,
                    page:this.page,
                    type:'formal',
                },(data)=>{
                    //取消loading图
                    if(data){
                        this.bstop = false
                        // this.isCeiling = true
                    }
                })
            }else if(this.$route.name==='tomorrow'){
                this.newResource = this.allData&&this.allData.item_list||[]
                this.page = this.allData.page_count
                this.page = 1
                this.bstop = true
                await scroll({
                    el:"#bscroll",
                    data:this.newResource,
                    url:'/index/ajaxDealactList',
                    vm:this,
                    page:this.page,
                    type:'pre',
                },(data)=>{
                    //取消loading图
                    if(data){
                        this.bstop = false
                    }
                })
            }
            
        }
    }
}
</script>

<style lang="stylus" scoped>
    .loading
        width 100%
        height .24rem
        line-height .19rem
        text-align center
        color #999
        img 
            width .18rem
            height .18rem
</style>

