import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/layout',
    name: 'Layout',
    meta: {title:"布局"},
    component: () => import( '../views/LayoutView.vue'),
    children: [
      {
        path: "/home",
        name: "Home",
        meta: { title: "首页" },
        component: () => import('../views/HomeView.vue')
      },{
        path: "/warden",
        name: "Warden",
        meta: { title: "管理员管理" },
        component: () => import('../views/WardenManage.vue')
      },{
        path: "/station",
        name: "Station",
        meta: { title: "充电站管理" },
        component: () => import('../views/StationManage.vue')
      }
    ],
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
