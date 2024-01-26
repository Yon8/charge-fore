<script setup>

import Table from "@/components/Table.vue";
import {reactive} from "vue";

const data = reactive({
    column: [{
        type: 'hidden',
        label: '充电站编号',
        prop: 'id',
    }, {
        type: 'label',
        label: '充电站名称',
        prop: 'name',
    }, {
        type: 'label',
        label: '充电桩数量',
        prop: 'count',
    }, {
        type: 'label',
        label: '充电站位置',
        prop: 'location',
    }, {
        type: 'label',
        label: '充电站状态',
        prop: 'status',
    }, {
        type: 'tag',
        label: '充电站管理员',
        /*表格需要展示的属性名*/
        prop: 'wardenName',
        /*对话框需要传值的属性名*/
        dialogProp: 'warden'
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
        foreignUrl: '/chargeManage/station/getWardenIdAndName'
    },

});
</script>

<template>
    <div class="station">
        <el-card>
            <Table :column="data.column" :url="data.url" :dialog-data="data.formData"></Table>
        </el-card>
    </div>

</template>

<style scoped>

</style>