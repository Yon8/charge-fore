<script setup>

import { reactive} from "vue";
import Table from "@/components/Table.vue";
const formatAuthority = (row) => {
    switch (row.authority) {
        case 0:
            return '管理员';
        case 1:
            return '超级(跨站)管理员';
        default:
            return '未知状态';
    }
};
const data = reactive({
    column: [{
        type: 'hidden',
        label: '管理员编号',
        prop: 'id',
        required: false,
    }, {
        type: 'label',
        label: '管理员名称',
        prop: 'name',
        required: true,
    }, {
        type: 'label',
        label: '密码',
        prop: 'password',
        required: true,
    }, {
        type: 'tag',
        label: '所属站点',
        /*表格需要展示的属性名*/
        prop: 'stationName',
        /*对话框需要传值的属性名*/
        dialogProp: 'station',
        required: true,
    }, {
        type: 'label',
        label: '电话',
        prop: 'phone',
        required: true,
    }, {
        type: 'switch',
        label: '权限',
        /*表格需要展示的属性名*/
        prop: 'authorityName',
        /*对话框需要传值的属性名*/
        dialogProp: 'authority',
        required: true,
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
        foreignUrl: {station:'/chargeManage/station/getStationIdAndName'}
    },
    switchData:{
        authority: {
            '管理员':'0',
            '超级(跨站)管理员':'1',
        },
        formatAuthority,
    }
});
</script>

<template>
<div class="warden">
    <el-card>
        <Table :column="data.column" :url="data.url" :dialog-data="data.formData" :switch-data="data.switchData"></Table>
    </el-card>
</div>
</template>

<style scoped>

</style>