import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    {
        path: "/",
        name: "Home",
        component: () => import('~/pages/index.vue')
    },
    {
        path: "/login",
        name: "login",
        component: () => import('~/pages/login.vue')
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

export default router