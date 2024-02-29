<script setup>

import Table from "@/components/Table.vue";
import {reactive} from "vue";
const data = reactive({
    column: [
        {
            type: 'hidden',
            label: '编号',
            prop: 'id',
            required:false
        },
        {
            type: 'tag',
            label: '登录用户',
            /*表格需要展示的属性名*/
            prop: 'name',
            /*对话框需要传值的属性名*/
            dialogProp: 'sysUser',
            required: true,

        },{
            type: 'datetime',
            label: '登录时间',
            prop: 'time',
            required: true,
        },{
            type: 'label',
            label: 'IP',
            prop: 'ip'
        }
    ],
    formData: {
        id: '',
        sysUser: '',
        time: '',
        ip: '',
    },
    url: {
        moduleName: '登录日志',
        pageUrl: '/systemManage/loginRecord/getLoginRecordList',
        importListUrl: '/systemManage/loginRecord/importLoginRecordList',
        exportUrl: '/systemManage/loginRecord/loginRecordExcel',
        addUrl: '/systemManage/loginRecord/loginRecordAdd',
        editUrl: '/systemManage/loginRecord/loginRecordEdit',
        deleteUrl: '/systemManage/loginRecord/loginRecordDelete?id=',
        deleteMoreUrl: '/systemManage/loginRecord/loginRecordDeleteByIds?ids=',
        foreignUrl: {sysUser:'/systemManage/sysUser/getUserIdAndName'}
    },
    switchData:{}

});

</script>

<template>
    <div class="loginRecord">
        <el-card>
            <Table :column="data.column" :url="data.url" :dialog-data="data.formData" :switch-data="data.switchData"></Table>
        </el-card>
    </div>

</template>

<style scoped>

</style>