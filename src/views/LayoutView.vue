<script setup>
import {onBeforeMount, onMounted, reactive} from "vue";
  import TabsMenu from "@/components/TabsMenu.vue";
import {timeFormate} from "@/utils/utils";
import {ArrowDown} from "@element-plus/icons-vue";

  const data =reactive({
      nowTimes: "",
      isCollapse: false,
      asideWidth: '200px',
      defaultHeight: null,
      userName: "admin",
      sysName: "电动汽车充电桩管理系统",
  })
  const onCollapse = () =>{
      if (data.isCollapse) {
          data.asideWidth = '200px';
          data.isCollapse = false;
      } else {

          data.isCollapse = true;
          data.asideWidth = '64px';
      }
  }
  const onLogout = () => {

  };
const onNowTimes = () => {
    setInterval(() => {
        data.nowTimes = timeFormate(new Date());
    }, 1000);
};
const onDefaultHeight = () => {
    data.defaultHeight = window.innerHeight;
}
onBeforeMount(() =>{
    data.defaultHeight = (document.body.clientHeight || document.documentElement.clientHeight);
})
onMounted(()=>{
    onNowTimes();
    window.addEventListener('resize', onDefaultHeight);
})
</script>

<template>
  <!--侧边栏布局容器-->
    <el-container class="layout-container">
        <el-aside :style="{ height: data.defaultHeight + 'px' }" style="{padding-bottom:4rem;}" :width="data.asideWidth">

            <el-menu router :collapse="data.isCollapse" :default-active="$route.path" text-color="#242e42"
                     active-text-color="#409EFF" background-color="var(--bg1)">
              <el-menu-item index="/">
                  <el-icon>
                      <House />
                  </el-icon>
                  <span>首页</span>
              </el-menu-item>
              <el-sub-menu index="/Office">
                  <template #title>
                      <el-icon><DataLine /></el-icon>
                      <span>个人办公</span>
                  </template>
                  <el-menu-item index="/">
                      <el-icon><Checked /></el-icon>
                      <span>流程审批</span>
                  </el-menu-item>
                  <el-menu-item index="/">
                      <el-icon><Setting /></el-icon>
                      <span>流程设置</span>
                  </el-menu-item>
                  <el-menu-item index="/">
                      <el-icon><Message /></el-icon>
                      <span>电子邮件</span></el-menu-item>
                  <el-menu-item index="/">
                      <el-icon><List /></el-icon>
                      <span>我的计划</span></el-menu-item>
              </el-sub-menu>
              <el-menu-item index="/station">
                  <el-icon><Flag /></el-icon>
                  <span>充电站管理</span>
              </el-menu-item>
              <el-menu-item index="/warden">
                  <el-icon><Avatar /></el-icon>
                  <span>充电站管理员管理</span>
              </el-menu-item>
              <el-menu-item index="/stack">
                  <el-icon><SetUp /></el-icon>
                  <span>充电桩状态管理</span>
              </el-menu-item>
              <el-menu-item index="/bill">
                  <el-icon><CreditCard /></el-icon>
                  <span>充电账单管理</span>
              </el-menu-item>
              <el-menu-item index="/fault">
                  <el-icon><WarnTriangleFilled /></el-icon>
                  <span>故障管理</span>
              </el-menu-item>
              <el-menu-item index="/user">
                  <el-icon><User /></el-icon>
                  <span>用户管理</span>
              </el-menu-item>
              <el-sub-menu index="/SysManage">
                  <template #title>
                      <el-icon><Tools /></el-icon>
                      <span>系统管理</span>
                  </template>
                  <el-menu-item index="/sysUser">
                      <el-icon><UserFilled /></el-icon>
                      <span>系统管理员</span></el-menu-item>
                  <el-menu-item index="/sysRole">
                      <el-icon><Avatar /></el-icon>
                      <span>角色管理</span></el-menu-item>
                  <el-menu-item index="/">
                      <el-icon><Platform /></el-icon>
                      <span>登录日志</span></el-menu-item>
              </el-sub-menu>
          </el-menu>
        </el-aside>
        <el-container>
            <el-header  style="height:100px">
                <div class="header">
                    <div style="padding-left: 0.4rem;">
                        <el-icon @click="onCollapse" :size="20" style="vertical-align: middle; cursor: pointer;">
                            <component :is="data.isCollapse?'Expand':'Fold'"></component>
                        </el-icon>
                        <el-icon :size="30" color="#409EFF" style="vertical-align: middle;padding-left:2rem;">
                            <Van />
                        </el-icon>
                        <span style="padding-left: 20px;vertical-align: middle; font-weight: bold; font-size: 1.5em;">{{data.sysName}}</span>
                    </div>
                    <div style="padding-right:0.4rem;">
                        <el-dropdown style="line-height: 60px;">
                    <span class="el-dropdown-link" style="color:var(--theme);">
                        <span style="cursor:pointer;vertical-align: middle;">Welcome: {{data.userName}} </span>
                        <el-icon style="vertical-align: middle;"><arrow-down /></el-icon>
                    </span>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item @click="onLogout" icon="SwitchButton">退出</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </div>
                </div>
                <TabsMenu></TabsMenu>
            </el-header>
            <el-main :style="{height: data.defaultHeight+'px'}">
                <router-view />
            </el-main>
        </el-container>
    </el-container>
</template>

<style lang="scss">
.layout-container {
    .el-header {
        padding: 0;
        background: var(--bg1);

        .header {
            display: flex;
            justify-content: space-between;
            line-height: 50px;
            color: var(--theme);
            padding-right: 0.4rem;

            .el-dialog__header {
                background: var(--theme);
                padding: 0 10px;

                .el-dialog__title {
                    color: var(--theme);
                }
            }
        }
    }

    .el-aside {
        height: 100%;
        transition: all .5s;
        background: white;
        overflow-y: auto;
        overflow-x: hidden;

        .el-menu {
            border: none;

            .el-menu-item,
            .el-sub-menu__title {
                padding-left: 30px;

                height: 60px;
                line-height: 40px;
            }

            .el-sub-menu__title:hover {
                background: var(--bg1) !important;
            }

            .el-menu-item:hover {
                background: var(--bg1) !important;
            }
        }

        .el-card {
            margin: 0.4rem 0.6rem;
            background-color: #409EFF;
            color: white;

            .el-card__body {
                padding: 1rem 2rem;
            }
        }
    }

    .el-aside::-webkit-scrollbar {
        width: 0px;
    }

    .el-main {
        padding: 0;
        overflow-x: hidden;
        overflow-y: auto;
        background: var(--bg1);

        .el-dialog__header {
            background: var(--theme);
            padding: 10px;

            .el-dialog__title {
                color: #fff;
            }
        }
    }

    .el-main::-webkit-scrollbar {
        width: 0px;
    }
}</style>