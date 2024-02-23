<script setup>

import Table from "@/components/Table.vue";
import {reactive} from "vue";

const data = reactive({
    column: [
        {
            type: 'hidden',
            label: '用户ID',
            prop: 'id',
            required:false
        },
        {
            type: 'label',
            label: '用户名称',
            prop: 'name',
            required:true
        },
        {
            type: 'label',
            label: '用户密码',
            prop: 'password',
            required: true,
        },
        {
            type: 'label',
            label: '车牌号',
            prop: 'plate',
            required: true,
        },
        {
            type: 'label',
            label: '手机',
            prop: 'phone',
            required: true,
        },
        {
            type: 'label',
            label: '余额',
            prop: 'balance',
            required: true,
        }
    ],
    formData: {
        id: '',
        name: '',
        password: '',
        plate: '',
        phone: '',
        balance: ''
    },
    url: {
        moduleName: '用户',
        pageUrl: '/chargeManage/user/getUserList',
        importListUrl: '/chargeManage/user/importUserList',
        exportUrl: '/chargeManage/user/userExcel',
        addUrl: '/chargeManage/user/userAdd',
        editUrl: '/chargeManage/user/userEdit',
        deleteUrl: '/chargeManage/user/userDelete?id=',
        deleteMoreUrl: '/chargeManage/user/userDeleteByIds?ids=',
        foreignUrl: {}
    },
    switchData:{}

});

</script>

<template>
    <div class="user">
        <el-card>
            <Table :column="data.column" :url="data.url" :dialog-data="data.formData" :switch-data="data.switchData"></Table>
        </el-card>
    </div>

</template>

<style scoped>

</style>