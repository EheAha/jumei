<template>
    <div class='tomorrowUpdata'>
        <GoodList :allData='allData'></GoodList>   
    </div>    
</template>

<script>
import GoodList from 'components/common/homeOne/GoodList.vue'
import http from 'utils/http'
import BScroll from 'better-scroll'
    export default{
        data(){
            return {
               allData:{}
            }
        },
        components:{
            GoodList
        },
        async beforeCreate(){
            let result = await http({
                method:'get',
                url:'/index/ajaxDealactList',
                params:{
                    card_id: 4057,
                    client_v: 1,
                    page: 1,
                    platform: 'wap',
                    type: "pre",
                    page_key:'' 
                }
            })
            // this.todayResource = result.item_list
            this.allData = result
        }
    }
</script>
