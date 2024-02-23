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
        meta: {title: "首页"},
        component: () => import('../views/HomeView.vue')
      }, {
        path: "/warden",
        name: "Warden",
        meta: {title: "管理员管理"},
        component: () => import('../views/charge/WardenManage.vue')
      }, {
        path: "/station",
        name: "Station",
        meta: {title: "充电站管理"},
        component: () => import('../views/charge/StationManage.vue')
      }, {
        path: "/stack",
        name: "Stack",
        meta: {title: "充电桩管理"},
        component: () => import('../views/charge/StackManage.vue')
      }, {
        path: "/bill",
        name: "Bill",
        meta: {title: "账单管理"},
        component: () => import('../views/charge/BillManage.vue')
      }, {
        path: "/user",
        name: "User",
        meta: { title: "用户管理" },
        component: () => import('../views/charge/UserManage.vue')
      }, {
        path: "/fault",
        name: "Fault",
        meta: { title: "故障管理" },
        component: () => import('../views/charge/FaultManage.vue')
      }
    ],

  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
