<script setup>

import Table from "@/components/Table.vue";
import {reactive} from "vue";
const formatType = (row) => {
    switch (row.type) {
        case 0:
            return '异常';
        case 1:
            return '慢充';
        case 2:
            return '快充';
        default:
            return '未知状态';
    }
};
const formatStatus = (row) => {
    switch (row.status) {
        case 0:
            return '未支付';
        case 1:
            return '微信支付';
        case 2:
            return '支付宝支付';
        case 3:
            return '银联支付';
        case 4:
            return '余额支付';
        default:
            return '未知状态';
    }
};
const data = reactive({
    column: [
        {
            type: 'hidden',
            label: '账单编号',
            prop: 'id',
            required:false
        },
        {
            type: 'tag',
            label: '用户',
            /*表格需要展示的属性名*/
            prop: 'name',
            /*对话框需要传值的属性名*/
            dialogProp: 'user',
            required: true,

        },
        {
            type: 'switch',
            label: '账单状态',
            /*表格需要展示的属性名*/
            prop: 'statusName',
            /*对话框需要传值的属性名*/
            dialogProp: 'status',
            required:true
        },
        {
            type: 'datetime',
            label: '开始时间',
            prop: 'startTime',
            required: true,
        },
        {
            type: 'datetime',
            label: '结束时间',
            prop: 'endTime',
            required: true,
        },
        {
            type: 'switch',
            label: '充电类型',
            /*表格需要展示的属性名*/
            prop: 'typeName',
            /*对话框需要传值的属性名*/
            dialogProp: 'type',
            required:true
        },
        {
            type: 'tag',
            label: '所属站点',
            /*表格需要展示的属性名*/
            prop: 'stationName',
            /*对话框需要传值的属性名*/
            dialogProp: 'station',
            required: true,

        },
        {
            type: 'tag',
            label: '所属充电桩',
            /*表格需要展示的属性名*/
            prop: 'stackName',
            /*对话框需要传值的属性名*/
            dialogProp: 'stack',
            required: true,

        },
        {
            type: 'label',
            label: '使用电量',
            prop: 'quantity',
            required: true,
        },{
            type: 'label',
            label: '金额',
            prop: 'amount',
            required: true,
        }
    ],
    formData: {
        id: '',
        user: '',
        status: '',
        startTime: '',
        endTime: '',
        type: '',
        station: '',
        stack: '',
        quantity: '',
        amount: ''
    },
    url: {
        moduleName: '账单',
        pageUrl: '/chargeManage/bill/getBillList',
        importListUrl: '/chargeManage/bill/importBillList',
        exportUrl: '/chargeManage/bill/billExcel',
        addUrl: '/chargeManage/bill/billAdd',
        editUrl: '/chargeManage/bill/billEdit',
        deleteUrl: '/chargeManage/bill/billDelete?id=',
        deleteMoreUrl: '/chargeManage/bill/billDeleteByIds?ids=',
        foreignUrl: {
            station:'/chargeManage/station/getStationIdAndName',
            user: '/chargeManage/user/getUserIdAndName',
            stack:'/chargeManage/stack/getStackIdAndName'
        },
    },
    switchData:{
        type: {
            '异常': 0,
            '慢充': 1,
            '快充': 2,
        },
        formatType,
        status: {
            '未支付': 0,
            '微信支付': 1,
            '支付宝支付': 2,
            '银联支付': 3,
            '余额支付': 4
        },
        formatStatus,

    }

});

</script>

<template>
    <div class="bill">
        <el-card>
            <Table :column="data.column" :url="data.url" :dialog-data="data.formData" :switch-data="data.switchData"></Table>
        </el-card>
    </div>

</template>

<style scoped>

</style>