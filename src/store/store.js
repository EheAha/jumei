import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)



export default new Vuex.Store({
    state:{
        isCelling:false
    },
    actions:{
        change(Store,statu){
            Store.commit('changeCell',statu)
        }
    },
    mutations:{
        changeCell(state,statu){
            this.isCelling = statu
        }
    }
})
