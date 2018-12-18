import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Home from 'pages/home/Home.vue'

import HomeOne from 'pages/home/details/HomeOne.vue'
import Today from 'pages/home/details/Today.vue'
import Tomorrow from 'pages/home/details/Tomorrow.vue'

import Global from 'pages/home/details/Global.vue'
import MuandBaby from 'pages/home/details/MuandBaby.vue'
import Luxury from 'pages/home/details/Luxury.vue'
import Pop from 'pages/home/details/Pop.vue'

import TogetherTuan from 'pages/yiqituan/TogetherTuan.vue'
import Cart from 'pages/cart/Cart.vue'
import Profile from 'pages/profile/Profile.vue'
import Detail from 'pages/detailPage/Detail.vue'
import Special from 'pages/detailPage/Special.vue'
const routes = [
    {
        path : '/',
        redirect : '/home'
    },
    {
        name : 'home',
        path : '/home/',
        component : Home,
        redirect : '/home/one',
        children:[
            {
                name: 'one',
                path: 'one',
                component:HomeOne,
                redirect : '/home/one/today',
                children:[
                    {
                        name : 'today',
                        path : 'today',
                        component:Today
                     },
                     {
                         name : 'tomorrow',
                         path : 'tomorrow',
                         component:Tomorrow
                      }
                ]
            },
            {
                name : 'global',
                path : 'global',
                component:Global,
                meta:'极速免税店'
            },
            {
                name : 'muandbaby',
                path : 'muandbaby',
                component:MuandBaby,
                meta:'母婴'
            },             
            {
                name : 'luxury',
                path : 'luxury',
                component:Luxury,
                meta:'轻奢'
            },   
            {
                name : 'pop',
                path : 'pop',
                component:Pop,
                meta:'名品特卖'
            }
        ]
    },
    {
        name : 'yiqituan',
        path : '/yiqituan',
        component : TogetherTuan
    },
    {
        name : 'cart',
        path : '/cart',
        component : Cart,
        meta:'购物车'
    },
    {
        name : 'profile',
        path : '/profile',
        component : Profile,
        meta:'我的聚美'
    },
    {
        name : 'detail',
        path : '/detail',
        component:Detail
    },
    {      
        name : 'special',
        path : '/special',
        component:Special
    }
]

const router = new VueRouter({
    mode:'hash',
    routes
})

export default router