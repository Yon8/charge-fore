<script setup>
import {onMounted, reactive} from "vue";
import axios from "axios";
import {ElMessage, ElMessageBox} from "element-plus";

const props = defineProps({
    //分页数据
    page: {
        type: Object,
        default:{
            current: 1,
            size: 5,
            total: 0,
        }
    },
    //table表 列字段数据
    column: {
        type: Array,
        default: []
    },
    //各方法的请求链接后缀
    url: {
        type: Object,
        default: {},
    },
    //增加 修改 对话框字段数据
    dialogData: {
        type: Object,
        default: {},
    },
    //前端处理 将属性数值转换为指定字段需要用到的数据
    switchData:{
        type: Object,
        default: {},
    }
})
const emit = defineEmits([])
const data = reactive({
    loading: false,
    searchForm: {
        name: null,
    },
    tableData: [],
    formData: {},
    operate: 0, //默认添加操作
    dialogVisible: false,
    dialogTitle: '添加',
    multipleSelection: [],
    foreignData: [], //额外(外键)数据
    switchData: {},
});
onMounted(() => {

    onPage();
    data.formData = JSON.parse(JSON.stringify(props.dialogData));
    data.switchData = JSON.parse(JSON.stringify(props.switchData));
    onForeign();
    console.log(data)
});
const onPage = () => {
    data.loading = true;
    var target = {};
    var result = Object.assign(target, props.page, data.searchForm);
    console.log(result);
    axios.get(props.url.pageUrl, {params: target, name: data.searchForm.name}).then(response => {
        data.loading = false;
        data.tableData = response.data.result.list;
        onSwitch();
        props.page.current = response.data.result.pageNum;
        props.page.size = response.data.result.pageSize;
        props.page.total = response.data.result.total;

    });

}
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
    onPage();
    return extension1 || extension2;
}
const importList = (params) => {
    var file = params.file;
    console.log(file);
    var formData = new FormData();
    formData.append('file', file);
    axios.post(props.url.importListUrl, formData).then(response => {
        ElMessage.success({
            message: "上传成功", type: "success"
        })
        onPage();
    }).catch(error => {
        console.log(error)
    });// 请求失败处理
}
const onExport = () => {
    axios.get(props.url.exportUrl, { "responseType": "blob" }).then(res => {
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
const onAdd = () => {
    data.dialogTitle = '添加' + props.url.moduleName;
    data.formData = JSON.parse(JSON.stringify(props.dialogData));
    data.operate = 0;
    data.dialogVisible = true;
};
const getPlaceholder = (val) => {
    if (val.type === 'tag') {
        return '请选择' + val.label;
    }
    return '请输入' + val.label;
}
const onEdit = (val) => {
    data.dialogTitle = '修改' + props.url.moduleName + '信息';
    data.formData = { ...val };
    console.log(data.formData);
    data.operate = 1;
    data.dialogVisible = true;
};
const onSubmit = () => {
    if (data.operate === 0) {
        // 执行操作为 0 的逻辑
        axios.post(props.url.addUrl, data.formData).then((res) => {
            console.log(res);
            ElMessage.success({
                message: '添加成功！',
                type: 'success'
            });
            onPage();
            data.dialogVisible = false;
        }).catch((err) => {
            console.error(err);
        });
    } else if (data.operate === 1) {
        // 执行操作为 1 的逻辑
        axios.post(props.url.editUrl, data.formData).then((res) => {
            console.log(res);
            if (res.data.code === 200) {
                ElMessage.success({
                    message: '修改成功！',
                    type: 'success'
                });
                onPage();
                data.dialogVisible = false;
            } else {
                ElMessage.error({
                    message: res.data.message,
                    type: 'error'
                });
            }
        }).catch((err) => {
            console.error(err);
        });
    }
};
const onDelete = (val) => {
    ElMessageBox.confirm('此操作将永久删除该数据，是否继续？', 'Warning', {
        cancelButtonText: '取消', confirmButtonText: '确定',
        type: 'warning',
    }).then(() => {
        axios.delete(props.url.deleteUrl + val.id)
            .then(res => {
                ElMessage.success('删除成功!');
                onPage()
            });
    }).catch((error) => {
        console.error(error);
    })
};
const search = () => {
    onPage();
}
const clear = () => {
    data.searchForm.name = '';
    onPage();
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
        axios.get(props.url.deleteMoreUrl + ids)
            .then(res => {
                ElMessage.success('删除成功!');
                onPage()
            })
    }).catch((err) => {
        console.log(err);
    })
}
const onSizeChange = (val) => {
    props.page.size = val;
    onPage();
}
const onCurrentChange = (val) => {
    //debugger
    props.page.current = val;
    onPage();
}
/*用于获取额外的数据 如与其他组件共有的外键Map*/
const onForeign = () => {
    const foreign = props.url.foreignUrl
    for (let key in foreign){
        axios.get(foreign[key]).then((res) => {
            data.foreignData[key] = res.data.result;
            console.log(data.foreignData);
        });
    }

}
/*前端处理将值转换为字段的通用方法 */
const onSwitch = () => {
    console.log("switch运行了")
    //判断父组件是否需要用到此方法
    if (Object.keys(props.switchData).length !== 0) {
        data.tableData.forEach(row => {
            props.column.forEach((col) => {
                //找到父组件是否有需要用到此方法的字段
                if (col.type === 'switch') {
                    //将原字段经过处理后 增加Name变成新属性
                    row[col.dialogProp+ "Name"] = props.switchData['format' + col.dialogProp.charAt(0).toUpperCase() + col.dialogProp.slice(1)](row);
                }
            })
        });

        console.log(data.tableData);
    }
}
</script>

<template>
    <div class="table-container">
        <div class="search-wrap">
            <slot name="search"></slot>
            <div><el-upload :auto-upload="true" :before-upload="beforeUpload" :http-request="importList">
                <template #trigger><el-button type="primary">导入{{ url.moduleName }}信息</el-button></template>
            </el-upload></div>
            <div><el-button type="primary" @click="onExport">导出{{ url.moduleName }}信息</el-button></div>
            <div><el-button type="primary" @click="onAdd">添加{{ url.moduleName }}信息</el-button></div>
            <div><el-button type="primary" @click="onDeleteMore">批量删除</el-button></div>

            <div><el-input v-model="data.searchForm.name" placeholder="请输入查询内容"></el-input></div>
            <div><el-button icon="RefreshRight" circle @click="clear"></el-button></div>
            <div><el-button type="primary" icon="Search" @click="search">查询</el-button></div>
        </div>
        <div class="table-wrap">
            <el-table :data="data.tableData" border stripe size="default" row-key="id" style="width: 100%;"
                      @selection-change="onSelectionChange" :loading="data.loading" >
                <el-table-column type="selection" >
                </el-table-column>
                <el-table-column v-for="item in column" :label="item.label" :prop="item.prop" >
                </el-table-column>
                <el-table-column #default="scope" fixed="right" label="操作" align="center" width="220">
                    <el-button size="small" @click="onEdit(scope.row)">编辑</el-button>
                    <el-button size="small" type="danger" @click="onDelete(scope.row)">删除</el-button>
                </el-table-column>
            </el-table>
            <div class="pagination-wrap" v-if="page">
                <el-pagination @size-change="onSizeChange" @current-change="onCurrentChange"
                               layout="total, sizes, prev, pager, next, jumper"
                               :current-page="page.current"
                               :page-sizes="[5, 8, 10, 15]"
                               :page-size="page.size"
                               :total="page.total"/>
            </div>
        </div>
        <div class="dialog-wrap">
            <el-dialog :title="data.dialogTitle" v-model="data.dialogVisible" :show-close="false">
                <el-form :model="data.formData"  v-for="item in column" status-icon >
                    <el-form-item   v-if="item.type ==='label'" :prop="item.prop" :label="item.label"
                                  :rules="[{ required: item.required, message: '请输入' + item.label, trigger: 'blur' }]">
                        <el-input  v-model="data.formData[item.prop]" :placeholder=getPlaceholder(item)></el-input>
                    </el-form-item>
                    <el-form-item v-if="item.type === 'tag'" :prop="item.prop" :label="item.label" :rules="[{ required: item.required, message: '请输入类型', trigger: 'blur' }]">
                        <el-select v-model="data.formData[item.dialogProp]" :placeholder=getPlaceholder(item) style="width: 100%">
                            <el-option v-for="foreign in data.foreignData[item.dialogProp]"
                                       :label="foreign.name"
                                       :value="foreign.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item v-if="item.type === 'switch'" :prop="item.prop" :label="item.label" :rules="[{ required: item.required, message: '请输入类型', trigger: 'blur' }]">
                        <el-select v-model="data.formData[item.dialogProp]" :placeholder=getPlaceholder(item) style="width: 100%">
                            <!-- parseInt(value) 修复类型不匹配导致对话框值显示不正常             -->
                            <el-option v-for="(value,key) in data.switchData[item.dialogProp]"
                                       :label="key"
                                       :value="parseInt(value)"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item v-if="item.type === 'datetime'" :prop="item.prop" :label="item.label" :rules="[{ required: item.required, message: '请输入类型', trigger: 'blur' }]">
                        <el-date-picker
                            v-model="data.formData[item.prop]"
                            type="datetime"
                            placeholder="Pick a day"
                            format="YYYY-MM-DD HH:mm:ss"
                            value-format="YYYY-MM-DD HH:mm:ss"
                        />
                    </el-form-item>
                    <el-form-item v-if="item.type === 'date'" :prop="item.prop" :label="item.label" :rules="[{ required: item.required, message: '请输入类型', trigger: 'blur' }]">
                        <el-date-picker
                            v-model="data.formData[item.prop]"
                            type="date"
                            placeholder="Pick a day"
                            format="YYYY-MM-DD"
                            value-format="YYYY-MM-DD"
                        />
                    </el-form-item>
                </el-form>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="data.dialogVisible = false">取消</el-button>
                        <el-button type="primary" @click="onSubmit">提交</el-button>
                    </span>
                </template>
            </el-dialog>
        </div>
    </div>
</template>

<style scoped>

</style>