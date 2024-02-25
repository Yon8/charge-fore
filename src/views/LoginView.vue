<template>
    <div class="login">
        <el-card class="login-card" >
            <div class="login-main">
                <div class="login-form">
                    <el-form>
                        <div class="login-form-title">汽车充电桩管理系统</div>
                        <el-form-item>
                            <el-input v-model="data.user.username" prefix-icon="Avatar" placeholder="请输入用户名称"
                                style="width:100%"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-input type="password" v-model="data.user.password" prefix-icon="Lock" show-password
                                placeholder="请输入密码" style="width:100%"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" round @click="onLogin" style="width:100%">登录</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script setup>
import axios from "axios";
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from '@/store/settings.js'
import { ElMessage } from 'element-plus'

const router = useRouter();

const data = reactive({
    user: {
        username: '',
        password: '',
        userType: ''
    },
    returnMsg: ''
});

const onLogin = () => {
    axios.post("login?username=" + data.user.username + "&password=" + data.user.password)
        .then((response) => {
            //debugger;
            var temps = response.data;
            if (temps.code == 0) {
                ElMessage.success({
                    message: "登录成功",
                    type: "success"
                });
                const userStore = useUserStore();
                //登录成功，将后台传过来的token保存到sessionStorage中
                userStore.setUser(temps.msg);
                router.push({ path: '/home' })
            } else {
                data.returnMsg = temps.msg;
            }
        }).catch((error) => console.log(error)); // 请求失败处理
}


</script>
<style lang="scss" scoped>
.login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: url('@/assets/image/car2.png') center/cover no-repeat;
}

.login-card {
    width: 500px;
    height: 100%;
    margin-left: auto;
    background-color: rgba(255, 255, 255, 0.6);
}

.login-main {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}

.login-form {
    width: 100%;
    padding: 20px;
    margin-top: 100px;
}

.login-form-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 60px;
}
</style>