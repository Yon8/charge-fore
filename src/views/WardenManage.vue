<script setup>

import { reactive} from "vue";
import Table from "@/components/Table.vue";

const data = reactive({
    column: [{
        label: '管理员编号',
        prop: 'id',
    }, {
        label: '管理员名称',
        prop: 'name',
    }, {
        label: '密码',
        prop: 'password',
    }, {
        label: '所属站点',
        prop: 'stationName',
    }, {
        label: '电话',
        prop: 'phone',
    }, {
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
        deleteMoreUrl:'/chargeManage/warden/wardenDeleteByIds?ids='
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