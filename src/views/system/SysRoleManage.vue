<script setup>

import Table from "@/components/Table.vue";
import {reactive} from "vue";
const formatStatus = (row) => {
    switch (row.status) {
        case 0:
            return '禁用';
        case 1:
            return '启用';
        default:
            return '未知状态';
    }
};
const formatType = (row) => {
    switch (row.type) {
        case 0:
            return '平台角色';
        case 1:
            return '非平台角色';
        default:
            return '未知角色';
    }
};
const data = reactive({
    column: [
        {
            type: 'hidden',
            label: '角色编号',
            prop: 'id',
            required:false
        },
        {
            type: 'label',
            label: '角色名',
            prop: 'name',
            required:true
        },
        {
            type: 'switch',
            label: '角色状态',
            /*表格需要展示的属性名*/
            prop: 'statusName',
            /*对话框需要传值的属性名*/
            dialogProp: 'status',
            required:true
        },{
            type: 'switch',
            label: '角色类型',
            /*表格需要展示的属性名*/
            prop: 'typeName',
            /*对话框需要传值的属性名*/
            dialogProp: 'type',
            required:true
        },
        {
            type: 'tag',
            label: '创建者',
            /*表格需要展示的属性名*/
            prop: 'creatorName',
            /*对话框需要传值的属性名*/
            dialogProp: 'creator',
            required: true,

        },{
            type: 'datetime',
            label: '创建时间',
            prop: 'createTime',
            required: true,
        }
        ,{
            type: 'datetime',
            label: '更新时间',
            prop: 'updateTime',
            required: true,
        },
    ],
    formData: {
        id: '',
        name: '',
        status: '',
        type: '',
        creator: '',
        createTime: '',
        updateTime: '',
    },
    url: {
        moduleName: '系统管理员',
        pageUrl: '/systemManage/sysRole/getSysRoleList',
        importListUrl: '/systemManage/sysRole/importSysRoleList',
        exportUrl: '/systemManage/sysRole/sysRoleExcel',
        addUrl: '/systemManage/sysRole/sysRoleAdd',
        editUrl: '/systemManage/sysRole/sysRoleEdit',
        deleteUrl: '/systemManage/sysRole/sysRoleDelete?id=',
        deleteMoreUrl: '/systemManage/sysRole/sysRoleDeleteByIds?ids=',
        foreignUrl: {creator:'/systemManage/sysUser/getUserIdAndName'}
    },
    switchData:{
        status: {
            '禁用':'0',
            '启用':'1',
        },
        formatStatus,
        type: {
            '平台角色': 0,
            '非平台角色': 1,
        },
        formatType,
    }

});

</script>

<template>
    <div class="sysRole">
        <el-card>
            <Table :column="data.column" :url="data.url" :dialog-data="data.formData" :switch-data="data.switchData"></Table>
        </el-card>
    </div>

</template>

<style scoped>

</style>