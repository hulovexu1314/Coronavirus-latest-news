// import Vue from 'vue'
import VueRouter from 'vue-router'
// Vue.use(VueRouter)

const Home = () => import('@/view/Mains.vue')
const Detail = () => import('@/view/Detail.vue')
const DetailUN = () => import('@/view/DetailUN.vue')


const routes = [
    {path:'/',name:'home',component:Home},
    {path:'/detail',name:'detail',component:Detail},
    {path:'/detailUN',name:'detailUN',component:DetailUN},
]

const router = new VueRouter({
    mode:'history',
    routes,
    scrollBehavior () {
        return { x: 0, y: 0 }
    }
})


export default router