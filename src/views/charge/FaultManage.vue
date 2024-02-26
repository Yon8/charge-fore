<script setup>

import Table from "@/components/Table.vue";
import {reactive} from "vue";
const formatStatus = (row) => {
    switch (row.status) {
        case 0:
            return '未修复';
        case 1:
            return '已修复';
        default:
            return '未知状态';
    }
};
const formatLevel = (row) => {
    switch (row.level) {
        case 0:
            return 'warn';
        case 1:
            return 'error';
        default:
            return '未知状态';
    }
};
const data = reactive({
    column: [
        {
            type: 'hidden',
            label: '故障编号',
            prop: 'id',
            required:false
        },
        {
            type: 'tag',
            label: '所属充电桩',
            /*表格需要展示的属性名*/
            prop: 'name',
            /*对话框需要传值的属性名*/
            dialogProp: 'stack',
            required: true,

        },
        {
            type: 'datetime',
            label: '故障时间',
            prop: 'time',
            required: false,
        },
        {
            type: 'label',
            label: '故障代码',
            prop: 'code',
            required: false,
        },
        {
            type: 'label',
            label: '故障描述',
            prop: 'description',
            required: false,
        },
        {
            type: 'switch',
            label: '故障等级',
            /*表格需要展示的属性名*/
            prop: 'levelName',
            /*对话框需要传值的属性名*/
            dialogProp: 'level',
            required:true
        },
        {
            type: 'switch',
            label: '故障状态',
            /*表格需要展示的属性名*/
            prop: 'statusName',
            /*对话框需要传值的属性名*/
            dialogProp: 'status',
            required:true
        },
    ],
    formData: {
        id: '',
        stack: '',
        time: '',
        code: '',
        level: '',
        status: '',
        description: ''
    },
    url: {
        moduleName: '充电桩充电桩',
        pageUrl: '/chargeManage/fault/getFaultList',
        importListUrl: '/chargeManage/fault/importFaultList',
        exportUrl: '/chargeManage/fault/faultExcel',
        addUrl: '/chargeManage/fault/faultAdd',
        editUrl: '/chargeManage/fault/faultEdit',
        deleteUrl: '/chargeManage/fault/faultDelete?id=',
        deleteMoreUrl: '/chargeManage/fault/faultDeleteByIds?ids=',
        foreignUrl: {stack:'/chargeManage/stack/getStackIdAndName'}
    },
    switchData:{
        status: {
            '未修复':0,
            '已修复':1,
        },
        formatStatus,
        level: {
            warn: 0,
            error: 1,
        },
        formatLevel
    }

});

</script>

<template>
    <div class="fault">
        <el-card>
            <Table :column="data.column" :url="data.url" :dialog-data="data.formData" :switch-data="data.switchData"></Table>
        </el-card>
    </div>

</template>

<style scoped>

</style>