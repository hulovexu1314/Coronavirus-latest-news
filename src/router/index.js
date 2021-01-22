import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const Home = () => import('@/view/Mains.vue')
const Detail = () => import('@/view/Detail.vue')
const DetailUN = () => import('@/view/DetailUN.vue')
const Sftravel = () => import('@/view/Sftravel.vue')
const Yimiao = () => import('@/view/Yimiao.vue')

const routes = [
    {path:'/',name:'home',component:Home},
    {path:'/detail',name:'detail',component:Detail},
    {path:'/detailUN',name:'detailUN',component:DetailUN},
    {path:'/sftravel',name:'sftravel',component:Sftravel},
    {path:'/yimiao',name:'yimiao',component:Yimiao},
]

const router = new VueRouter({
    mode:'history',
    routes,
    scrollBehavior () {
        return { x: 0, y: 0 }
    }
})


export default router