<script setup>

import Table from "@/components/Table.vue";
import {reactive} from "vue";
const formatStatus = (row) => {
    switch (row.status) {
        case -1:
            return '筹备中';
        case 0:
            return '停业';
        case 1:
            return '开业';
        default:
            return '未知状态';
    }
};
const data = reactive({
    column: [{
        type: 'hidden',
        label: '充电站编号',
        prop: 'id',
        required: false,
    }, {
        type: 'label',
        label: '充电站名称',
        prop: 'name',
        required: true,
    }, {
        type: 'hidden',
        label: '充电桩数量',
        prop: 'count',
        required: false,
    }, {
        type: 'label',
        label: '充电站位置',
        prop: 'location',
        required: true,
    }, {
        type: 'switch',
        label: '充电站状态',
        /*表格需要展示的属性名*/
        prop: 'statusName',
        /*对话框需要传值的属性名*/
        dialogProp: 'status',
        required: true,
    }, {
        type: 'tag',
        label: '充电站管理员',
        /*表格需要展示的属性名*/
        prop: 'wardenName',
        /*对话框需要传值的属性名*/
        dialogProp: 'warden',
        required: true,
    }],
    formData: {
        id: '',
        name: '',
        count: '',
        location: '',
        status: '',
        warden: ''
    },
    url: {
        moduleName: '充电站',
        pageUrl: '/chargeManage/station/getStationList',
        importListUrl: '/chargeManage/station/importStationList',
        exportUrl: '/chargeManage/station/stationExcel',
        addUrl: '/chargeManage/station/stationAdd',
        editUrl: '/chargeManage/station/stationEdit',
        deleteUrl: '/chargeManage/station/stationDelete?id=',
        deleteMoreUrl: '/chargeManage/station/stationDeleteByIds?ids=',
        foreignUrl: {warden:'/chargeManage/warden/getWardenIdAndName'}
    },
    switchData:{
        status: {
            '筹备中':'-1',
            '停业':'0',
            '开业':'1',
        },
        formatStatus,
    }
});

</script>

<template>
    <div class="station">
        <el-card>
            <Table :column="data.column" :url="data.url" :dialog-data="data.formData" :switch-data="data.switchData"></Table>
        </el-card>
    </div>

</template>

<style scoped>

</style>