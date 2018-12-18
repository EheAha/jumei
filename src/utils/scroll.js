import BScroll from 'better-scroll'
import http from './http'
import { Toast } from 'mint-ui'

export const scroll = ({
    el,
    data,
    url,
    vm,
    page,
    type
},fn)=>{
    let count = 2

    vm.bscroll = new BScroll(el,{
        probeType:1,
        click:true,
        pullUpLoad:{
            threshold:30
        }
    }) 

    //监听pullingup
    vm.bscroll.on('pullingUp',async ()=>{
        //每次都需要更新当前数据的总页数???
        console.log("AA"+count,page)
        if(count <= page){
            let result = (await http({
                url,
                method:'get',
                params:{
                    card_id: 4057,
                    client_v: 1,
                    page: count,
                    platform: 'wap',
                    type,
                    page_key:'1541644800'
                }
            }))
            //重新渲染页面
            data.push(...result.item_list)
            vm.$nextTick(()=>{
                vm.bscroll.refresh()
                count++
                //告诉bscroll可以进行下次滑动了
                vm.bscroll.finishPullUp()
            })
        }
        if ( count > page ) {
            Toast({
              message: '到底了~',
              position: 'bottom',
              duration: 1000
            })
      
            // 告诉better-scroll, 可以进行下次滑动了
            vm.bscroll.finishPullUp()
            count = 2
            return fn&&fn(1)
        }
    })
}