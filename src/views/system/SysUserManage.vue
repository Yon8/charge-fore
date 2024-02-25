<script setup>

import Table from "@/components/Table.vue";
import {reactive} from "vue";
const formatGender = (row) => {
    switch (row.gender) {
        case 0:
            return '女';
        case 1:
            return '男';
        default:
            return '未知性别';
    }
};
const formatDelFlag = (row) => {
    switch (row.delFlag) {
        case 0:
            return '否';
        case 1:
            return '是';
        default:
            return '未知情况';
    }
};
const data = reactive({
    column: [
        {
            type: 'hidden',
            label: '管理员编号',
            prop: 'id',
            required:false
        },
        {
            type: 'label',
            label: '用户名',
            prop: 'username',
            required:true
        },
        {
            type: 'label',
            label: '密码',
            prop: 'password',
            required:true
        },
        {
            type: 'label',
            label: '姓名',
            prop: 'name',
            required:true
        },
        {
            type: 'tag',
            label: '角色',
            /*表格需要展示的属性名*/
            prop: 'role',
            /*对话框需要传值的属性名*/
            dialogProp: 'roleId',
            required: true,

        },
        {
            type: 'switch',
            label: '性别',
            /*表格需要展示的属性名*/
            prop: 'genderName',
            /*对话框需要传值的属性名*/
            dialogProp: 'gender',
            required:true
        },
        {
            type: 'date',
            label: '出生日期',
            prop: 'birthday',
            required: true,
        },
        {
            type: 'label',
            label: '地址',
            prop: 'address',
            required: true,
        },
        {
            type: 'label',
            label: '邮箱',
            prop: 'email',
            required: true,
        },
        {
            type: 'switch',
            label: '是否删除',
            /*表格需要展示的属性名*/
            prop: 'delFlagName',
            /*对话框需要传值的属性名*/
            dialogProp: 'delFlag',
            required:true
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
        username: '',
        password: '',
        nickname: '',
        roleId: '',
        gender: '',
        birthday: '',
        address: '',
        phone: '',
        email: '',
        delFlag: '',
        createTime: '',
        updateTime: '',
    },
    url: {
        moduleName: '系统管理员',
        pageUrl: '/systemManage/sysUser/getSysUserList',
        importListUrl: '/systemManage/sysUser/importSysUserList',
        exportUrl: '/systemManage/sysUser/sysUserExcel',
        addUrl: '/systemManage/sysUser/sysUserAdd',
        editUrl: '/systemManage/sysUser/sysUserEdit',
        deleteUrl: '/systemManage/sysUser/sysUserDelete?id=',
        deleteMoreUrl: '/systemManage/sysUser/sysUserDeleteByIds?ids=',
        foreignUrl: {roleId:'/systemManage/sysRole/getRoleIdAndName'}
    },
    switchData:{
        gender: {
            '女':'0',
            '男':'1',
        },
        formatGender,
        delFlag: {
            '否': 0,
            '是': 1,
        },
        formatDelFlag,
    }

});

</script>

<template>
    <div class="sysUser">
        <el-card>
            <Table :column="data.column" :url="data.url" :dialog-data="data.formData" :switch-data="data.switchData"></Table>
        </el-card>
    </div>

</template>

<style scoped>

</style>