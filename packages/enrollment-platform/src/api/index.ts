import axios from "axios"
import { setInterceptors } from './interceptors' // 拦截器

// Axios 配置
const config={
    baseURL: "http://43.139.117.216:8100",
    timeout:1000*60*60, // 超时
    headers: {
        "Content-Type": "application/json",
        // "X-Auth-Token":"token"
    }
}

const BaseAxios=axios.create(config)

setInterceptors(BaseAxios)

// 导出 axios 实例
export default BaseAxios;