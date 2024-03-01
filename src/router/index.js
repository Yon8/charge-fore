import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/loginPage',
    name: 'loginPage',
    meta: { title: "布局" },
    component: () => import('../views/LoginView.vue')
  },
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
        meta: {title: "首页",icon:'House'},
        component: () => import('../views/HomeView.vue')
      }, {
        path: "/warden",
        name: "Warden",
        meta: {title: "管理员管理",icon: 'Avatar'},
        component: () => import('../views/charge/WardenManage.vue')
      }, {
        path: "/station",
        name: "Station",
        meta: {title: "充电站管理",icon:'Flag'},
        component: () => import('../views/charge/StationManage.vue')
      }, {
        path: "/stack",
        name: "Stack",
        meta: {title: "充电桩管理",icon: 'SetUp'},
        component: () => import('../views/charge/StackManage.vue')
      }, {
        path: "/bill",
        name: "Bill",
        meta: {title: "账单管理",icon: 'CreditCard'},
        component: () => import('../views/charge/BillManage.vue')
      }, {
        path: "/user",
        name: "User",
        meta: { title: "用户管理",icon: 'User' },
        component: () => import('../views/charge/UserManage.vue')
      }, {
        path: "/fault",
        name: "Fault",
        meta: { title: "故障管理",icon: 'WarnTriangleFilled' },
        component: () => import('../views/charge/FaultManage.vue')
      }, {
        path: "/sysUser",
        name: "SysUser",
        meta: { title: "系统管理员管理",icon: 'UserFilled' },
        component: () => import('../views/system/SysUserManage.vue')
      }, {
        path: "/sysRole",
        name: "SysRole",
        meta: { title: "系统角色管理",icon: 'Avatar' },
        component: () => import('../views/system/SysRoleManage.vue')
      }, {
        path: "/loginRecord",
        name: "LoginRecord",
        meta: { title: "登录日志",icon: 'Platform' },
        component: () => import('../views/system/LoginRecordManage.vue')
      }
    ],

  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
