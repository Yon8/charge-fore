<script setup>
import {ElMessage, ElMessageBox} from "element-plus";
import axios from "axios";
import {getCurrentInstance, onMounted, reactive} from "vue";
onMounted(()=>{
    onWardenPage();
})
const data = reactive({
    tableData: [],
    typeData: [],
    loading: false,
    searchForm: {
        name: null,
    },
    imageUrlPrefix: getCurrentInstance()?.appContext.config.globalProperties.$imageUrl,
    operate: 0, //默认添加操作
    dialogVisible: false,
    dialogTitle: '添加充电站管理员',
    multipleSelection: [],
    wardenForm: {
        id: '',
        name: '',
        password: '',
        department: '',
        phone: '',
        authority: '',
    },
    page:{
        type: Object,
        default:{
            current: 1,
            size: 5,
            total: 0
        }
    }
});
const onWardenPage = () => {
    data.loading = true;
    var target = {};
    var result = Object.assign(target, data.page.default, data.searchForm);
    console.log(result);
    axios.get('/chargeManage/warden/getWardenList',{params: target, name: data.searchForm.name}).then(response => {
        data.loading = false;
        data.tableData = response.data.result.list;
        data.page.current = response.data.result.pageNum;
        data.page.size = response.data.result.pageSize;
        data.page.total = response.data.result.total;
        console.log(response.data.result);
    })
};
const beforeUpload = (file) => {
    const extension1 = file.name.split(".")[1] === "xls";
    const extension2 = file.name.split(".")[1] === "xlsx";
    if (!extension2 && !extension1) {
        ElMessage({
            message: '上传模式错误,只能是xlsx或xls',
            type: 'error'
        })
        return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 10;
    if (!isLt2M) {
        ElMessage({
            message: '上传文件大小要小于10MB',
            type: 'error'
        })
        return false;
    }
    onWardenPage();
    return extension1 || extension2;
}
const importWardenList = (params) => {
    var file = params.file;
    console.log(file);
    var formData = new FormData();
    formData.append('file', file);
    axios.post('/chargeManage/warden/importWardenList', formData).then(response => {
        ElMessage.success({
            message: "上传成功", type: "success"
        })
        onWardenPage();
        }).catch(error => {
        console.log(error)
    });// 请求失败处理
}
const onExportWarden = () => {
    axios.get("/chargeManage/warden/wardenExcel", { "responseType": "blob" }).then(res => {
        if (!res) {
            return;
        }
        console.log(res);
        let contentDisposition = res.headers["content-disposition"];
        console.log(res.headers);
        let filename = decodeURI(
            contentDisposition.split("fileName=")[1] ||
            contentDisposition.split("filename=")[1]);
        let blob = new Blob([res.data], { type: res.headers["content-type"] });
        let url = window.URL.createObjectURL(blob);
        let link = document.createElement('a');
        link.style.display = 'none';
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(url);//释放内存
        document.body.removeChild(link)
    }).catch(err => {
        console.log(err);
    })
};
const onAddWarden = () => {
    data.dialogTitle = '添加充电站管理员';
    data.wardenForm ={
        id: '',
        name: '',
        password: '',
        department: '',
        phone: '',
        authority: '',
    }
    data.operate = 0;
    data.dialogVisible = true;
};
const onSelectionChange = (val) => {
    data.multipleSelection = val;
};
const onDeleteMore = () => {
    var ids = [];
    data.multipleSelection.forEach(row => {
        ids.push(row.id);
    });
    ElMessageBox.confirm('此操作将永久删除该数据，是否继续？', 'Warning', {
        cancelButtonText: '取消', confirmButtonText: '确定',
        type: 'warning',
    }).then(() => {

        console.log(ids)
        axios.get('/chargeManage/warden/wardenDeleteByIds?ids=' + ids)
            .then(res => {
                ElMessage.success('删除成功!');
                onWardenPage()
            })
    }).catch((err) => {
        console.log(err);
    })
}
const onSizeChange = (val) => {
    data.page.default.size = val;
    onWardenPage();
}
const onCurrentChange = (val) => {
    //debugger
    data.page.default.current = val;
    onWardenPage();
}
const search = () => {
    onWardenPage();
}
const clear = () => {
    data.searchForm.name = '';
    onWardenPage();
};
const onDelete = (val) => {
    ElMessageBox.confirm('此操作将永久删除该数据，是否继续？', 'Warning', {
        cancelButtonText: '取消', confirmButtonText: '确定',
        type: 'warning',
    }).then(() => {
        axios.delete('/chargeManage/warden/wardenDelete?id=' + val.id)
            .then(res => {
                ElMessage.success('删除成功!');
                onWardenPage()
            })
    }).catch((error) => {
        console.error(error);
    })
};

const onEdit = (val) => {

    data.dialogTitle = '修改管理员信息';
    data.wardenForm = {
        id: val.id,
        name: val.name,
        password: val.password,
        department: val.department,
        phone: val.phone,
        authority: val.authority,
    }
    data.operate = 1;
    data.dialogVisible = true;
};
const onSubmit = () => {
    console.log(data.wardenForm);
    if (data.operate == 0) {
        axios.post('/chargeManage/warden/wardenAdd', data.wardenForm).then((res) => {
            console.log(res);
            ElMessage.success({
                message: '添加成功！',
                type: 'success'
            });
            onWardenPage();
            data.dialogVisible = false;
        }).catch((err) => {
            console.error(err);
        })
    }else (data.operate == 1)
    {
        axios.post('/chargeManage/warden/wardenEdit', data.wardenForm).then((res) => {
            console.log(res);
            ElMessage.success({
                message: '修改成功！',
                type: 'success'
            });
            onWardenPage();
            data.dialogVisible = false;
        }).catch((err) => {
            console.error(err);
        })
    }
};
</script>

<template>
<div class="warden">
    <el-card>
        <div class="table-container">
            <div class="search-wrap">
                <div><el-upload :auto-upload="true" :before-upload="beforeUpload" :http-request="importWardenList">
                    <template #trigger><el-button type="primary">导入充电站管理员信息</el-button></template>
                </el-upload></div>
                <div><el-button type="primary" @click="onExportWarden">导出充电站管理员信息</el-button></div>
                <div><el-button type="primary" @click="onAddWarden">添加充电站管理员信息</el-button></div>
                <div><el-button type="primary" @click="onDeleteMore">批量删除</el-button></div>
                <div><el-input v-model="data.searchForm.name" placeholder="请输入管理员名称"></el-input></div>
                <div><el-button icon="RefreshRight" circle @click="clear"></el-button></div>
                <div><el-button type="primary" icon="Search" @click="search">查询</el-button></div>
            </div>
            <div class="table-wrap">
                <el-table :data="data.tableData" border stripe size="default" row-key="id" style="width: 100%;"
                @selection-change="onSelectionChange" :loading="data.loading">
                    <el-table-column type="selection" >
                    </el-table-column>
                    <el-table-column label="管理员编号" >
                        <template #default="scope">{{ scope.row.id }}</template>
                    </el-table-column>
                    <el-table-column label="管理员名称" >
                        <template #default="scope">{{ scope.row.name }}</template>
                    </el-table-column>
                    <el-table-column label="密码">
                        <template #default="scope">{{ scope.row.password }}</template>
                    </el-table-column>
                    <el-table-column label="部门">
                        <template #default="scope">{{ scope.row.department }}</template>
                    </el-table-column>
                    <el-table-column label="电话">
                        <template #default="scope">{{ scope.row.phone }}</template>
                    </el-table-column>
                    <el-table-column label="权限">
                        <template #default="scope">{{ scope.row.authority }}</template>
                    </el-table-column>
                    <el-table-column #default="scope" fixed="right" label="操作" align="center" width="220">
                        <el-button size="small" @click="onEdit(scope.row)">编辑</el-button>
                        <el-button size="small" type="danger" @click="onDelete(scope.row)">删除</el-button>
                    </el-table-column>
                </el-table>
                <div class="pagination-wrap">
                    <el-pagination v-if="data.page.total" @size-change="onSizeChange" @current-change="onCurrentChange"
                                   layout="total, sizes, prev, pager, next, jumper" v-model:current-page="data.page.current"
                                   :page-sizes="[5, 10, 20, 50]" v-model:page-size="data.page.size" :total="data.page.total" background />
                </div>
            </div>
        </div>
        <el-dialog :title="data.dialogTitle" v-model="data.dialogVisible" :show-close="false">
            <el-form :model="data.wardenForm" status-icon label-width="100px">
                <el-form-item prop="name" label="管理员名称"
                              :rules="[{ required: true, message: '请输入管理员名称', trigger: 'blur' }]">
                    <el-input v-model="data.wardenForm.name" placeholder="请输入管理员名称"></el-input>
                </el-form-item>
                <el-form-item prop="password" label="密码" :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]">
                    <el-input v-model="data.wardenForm.password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item prop="department" label="部门" :rules="[{ required: true, message: '请输入部门', trigger: 'blur' }]">
                    <el-input v-model="data.wardenForm.department" placeholder="请输入部门"></el-input>
                </el-form-item>
                <el-form-item prop="phone" label="电话" :rules="[{ required: true, message: '请输入电话', trigger: 'blur' }]">
                    <el-input v-model="data.wardenForm.phone" placeholder="请输入电话"></el-input>
                </el-form-item>
                <el-form-item prop="authority" label="权限" :rules="[{ required: true, message: '请输入权限', trigger: 'blur' }]">
                    <el-input v-model="data.wardenForm.authority" placeholder="请输入权限"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="data.dialogVisible = false">取消</el-button>
                        <el-button type="primary" @click="onSubmit">提交</el-button>
                    </span>
            </template>
        </el-dialog>
    </el-card>
</div>
</template>

<style scoped>

</style>