<script setup>

import Table from "@/components/Table.vue";
import {reactive} from "vue";
import axios from "axios";

const data = reactive({
    column: [{
        label: '充电站编号',
        prop: 'id',
    }, {
        label: '充电站名称',
        prop: 'name',
    }, {
        label: '充电桩数量',
        prop: 'count',
    }, {
        label: '充电站位置',
        prop: 'location',
    }, {
        label: '充电站状态',
        prop: 'status',
    }, {
        label: '充电站管理员',
        prop: 'warden',
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
        deleteMoreUrl:'/chargeManage/station/stationDeleteByIds?ids='
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