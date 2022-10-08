import { createRouter, createWebHashHistory } from "vue-router";
import { getToken } from '~/utils/auth'


const routes = [
    {
        path: "/",
        name: "home",
        component: () => import('~/pages/index.vue')
    },
    {
        path: "/about",
        name: "about",
        component: () => import('~/pages/about.vue')
    },
    {
        path: "/login",
        name: "login",
        component: () => import('~/pages/login.vue')
    },
    {
        path: "/admin",
        name:"admin",
        component: () => import('~/layout/admin.vue'),
        children: [
            {
                path: "/admin",
                component: () => import('~/pages/admin/home.vue')
            }
        ]
    }
]

// 404 路由加载到最后
routes.push({
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('~/pages/404.vue')
})

const router = createRouter({
    history:createWebHashHistory(),
    routes
})

const LoginPath = '/login'
const WhiteList = {
    '/': true,
    '/about': true,
    // '/admin': true,
}

// 路由守卫
router.beforeEach((to, form, next)=>{
    // 白名单 直接过
    if (to.path in WhiteList) {
        return next()
    }
    // 没有token则跳转登录
    const token = getToken()
    if (!token && to.path != LoginPath) {
        return next({path:LoginPath})
    }
    // 有token防止重复登录
    if (token && to.path == LoginPath) {
        return next({path:form.path? form.path: "/"})
    }
    return next()
})

export default router