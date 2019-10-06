import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router)



const router = new Router({
    mode: 'history',
    base: '/h5/waimai/',
    routes: [
        {
            path: '/',
            redirect: '/index',
        },
        {
            path: '/index',
            name: "index",
            component: () => import('@/views/index/index')
        },
        {
            path: '/olist',
            name: 'olist',
            comonent: () => import('@/views/olist/index')
        },
        {
            path: '/mine',
            name: 'mine',
            component: () => import('@/views/mine/index')
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/login')
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('@/views/register')
        },
        {
            path: '/circle/create',
            name: 'create',
            component: () => import('@/views/circle/create.vue')
        },
        {
            path: '/circle/detail/:id',
            name: 'detail',
            component: () => import('@/views/circle/detail.vue')
        }
    ]
})

// router.beforeEach(function(to, from, next) {
//     if(!Cookies.get('token')) {
//         to.name != 'login' && router.push('login')
//     } 
//     // next()
//     console.log('from-to-next', to, from,next)
//     next()
// })
export default router;
