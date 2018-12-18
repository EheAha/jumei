<template>
<div>
    <ul>
        <li class='search-input'>
            <span class='small'>
                <img src='../../imgs/search_btn.png'>
            </span>
            <span class='search-text'>搜索商品 分类 功效</span>
            <!-- <input type='text' placeholder='搜索商品 分类 功效'> -->
        </li>
        <li class="search-click" @click='clickhandle'>
            <div><img src='../../imgs/search_list2.png'></div>
        </li>
    </ul>
</div>
</template>
<script>
export default {
    data(){
        return{
            show:''
        }
    },
    methods:{
        clickhandle(){
            this.show = true
            this.$emit('send',this.show)
        }
    }
}
</script>

<style lang='stylus' scoped>
    ul
        width 100%
        height .46rem
        display flex
        background #fff
        padding .08rem  .2rem
        .search-input
            flex 12
            width 3rem
            height .3rem
            border-radius .2rem
            color #999999
            background #f5f5f5
            border 0
            text-align center
            line-height .3rem
            .small
                width .17rem
                height .17rem
                img 
                    width .17rem
                    height .17rem                
        .search-click
            flex 1   
            div
                width .24rem
                height .18rem
                padding .04rem 0 0 .08rem
                img 
                    width .24rem
                    height .18rem         
    
</style>

