<script setup>

import { reactive} from "vue";
import Table from "@/components/Table.vue";

const data = reactive({
    column: [{
        type: 'hidden',
        label: '管理员编号',
        prop: 'id',
    }, {
        type: 'label',
        label: '管理员名称',
        prop: 'name',
    }, {
        type: 'label',
        label: '密码',
        prop: 'password',
    }, {
        type: 'tag',
        label: '所属站点',
        /*表格需要展示的属性名*/
        prop: 'stationName',
        /*对话框需要传值的属性名*/
        dialogProp: 'station'
    }, {
        type: 'label',
        label: '电话',
        prop: 'phone',
    }, {
        type: 'label',
        label: '权限',
        prop: 'authority',
    }],
    formData: {
        id: '',
        name: '',
        password: '',
        station: '',
        phone: '',
        authority: '',
    },
    url: {
        moduleName: '充电站管理员',
        pageUrl: '/chargeManage/warden/getWardenList',
        importListUrl: '/chargeManage/warden/importWardenList',
        exportUrl: '/chargeManage/warden/wardenExcel',
        addUrl: '/chargeManage/warden/wardenAdd',
        editUrl: '/chargeManage/warden/wardenEdit',
        deleteUrl: '/chargeManage/warden/wardenDelete?id=',
        deleteMoreUrl: '/chargeManage/warden/wardenDeleteByIds?ids=',
        foreignUrl: '/chargeManage/warden/getStationIdAndName'
    }
});
</script>

<template>
<div class="warden">
    <el-card>
        <Table :column="data.column" :url="data.url" :dialog-data="data.formData"></Table>
    </el-card>
</div>
</template>

<style scoped>

</style>