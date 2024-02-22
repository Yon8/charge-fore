<script setup>

import Table from "@/components/Table.vue";
import {reactive} from "vue";
const formatStatus = (row) => {
    switch (row.status) {
        case -1:
            return '异常';
        case 0:
            return '未充电';
        case 1:
            return '慢充';
        case 2:
            return '快充';
        default:
            return '未知状态';
    }
};
const data = reactive({
    column: [
        {
            type: 'hidden',
            label: '充电桩编号',
            prop: 'id',
            required:false
        },
        {
            type: 'label',
            label: '充电桩名称',
            prop: 'name',
            required:true
        },
        {
            type: 'switch',
            label: '充电状态',
            /*表格需要展示的属性名*/
            prop: 'statusName',
            /*对话框需要传值的属性名*/
            dialogProp: 'status',
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
            type: 'label',
            label: '充电桩电压',
            prop: 'voltage',
            required: false,
        },
        {
            type: 'label',
            label: '充电桩电流',
            prop: 'current',
            required: false,
        },
        {
            type: 'label',
            label: '使用用户',
            prop: 'user',
            required: false,
        },
        {
            type: 'date',
            label: '开始时间',
            prop: 'startTime',
            required: false,
        },
        {
            type: 'label',
            label: '使用电量',
            prop: 'quantity',
            required: false,
        }
    ],
    formData: {
        id: '',
        name: '',
        status: '',
        station: '',
        voltage: '',
        current: '',
        user: '',
        startTime: '',
        quantity: '',
    },
    url: {
        moduleName: '充电桩充电桩',
        pageUrl: '/chargeManage/stack/getStackList',
        importListUrl: '/chargeManage/stack/importStackList',
        exportUrl: '/chargeManage/stack/stackExcel',
        addUrl: '/chargeManage/stack/stackAdd',
        editUrl: '/chargeManage/stack/stackEdit',
        deleteUrl: '/chargeManage/stack/stackDelete?id=',
        deleteMoreUrl: '/chargeManage/stack/stackDeleteByIds?ids=',
        foreignUrl: '/chargeManage/stack/getStationIdAndName'
    },
    switchData:{
        switchMap: {
            '异常':'-1',
            '未充电':'0',
            '慢充':'1',
            '快充': '2' ,
        },
        formatter: formatStatus,
    }

});

</script>

<template>
    <div class="stack">
        <el-card>
            <Table :column="data.column" :url="data.url" :dialog-data="data.formData" :switch-data="data.switchData"></Table>
        </el-card>
    </div>

</template>

<style scoped>

</style>