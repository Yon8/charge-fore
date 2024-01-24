
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import './styles/index.scss'
import axios from  'axios'
// 统一导入element图标
import * as Icons from '@element-plus/icons-vue'

const app = createApp(App).use(router)
//注册全局element-icons组件
Object.keys(Icons).forEach((key)=>{
    app.component(key,Icons[key])
})
app.use(ElementPlus)
app.mount('#app')
app.config.globalProperties.$imageUrl ="http://localhost:8089/charge"
//设置axios默认Url地址前缀
axios.defaults.baseURL = "http://localhost:8089/charge"