
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import './styles/index.scss'
import axios from  'axios'
// 统一导入element图标
import * as Icons from '@element-plus/icons-vue'
import {useTokenStore} from "@/store/settings";
import store from "@/store";

const app = createApp(App).use(router)
//注册全局element-icons组件
Object.keys(Icons).forEach((key)=>{
    app.component(key,Icons[key])
})
app.use(ElementPlus).use(store)
app.mount('#app')
app.config.globalProperties.$imageUrl ="http://localhost:8089/charge"
//设置axios默认Url地址前缀
axios.defaults.baseURL = "http://localhost:8089/charge"
// http request 请求拦截器
//在给后台发送请求时，将token带过去
axios.interceptors.request.use(config => {
    //登录成功后将后台返回的token在本地存下来,每次请求从sessionStorage中拿到存储的token值
    const tokenStore = useTokenStore();
    let token = tokenStore.getToken;
    if (token) {
        //如果请求时token存在,就为每次请求的headers中设置好token,后台根据headers中的token判断是否放行
        config.headers.token = token
    }
    return config;
}, error => {
    // 对响应错误做点什么
    return Promise.reject(error);
});
// http response 响应拦截器
//接收到后台的响应后，先判断一下响应代码是什么，然后再做相应的操作。
axios.interceptors.response.use(response => {
    console.log(response)
    // 在接收响应做些什么，例如跳转到登录页
    if (response.data.code == 401) {
        console.log(401)
        router.push({
            path: '/loginPage'
        })
    } else if (response.data.code == 403) {
        alert(response.data.message);
    }
    let token = response.headers.token;
    if (token) {
        const tokenStore = useTokenStore();
        tokenStore.setToken(token);
    }
    return response;
}, error => {
    // 对响应错误做点什么
    return Promise.reject(error);
});