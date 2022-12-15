import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import { ElNotification } from 'element-plus'
import { Local } from "@/utils/storage";
import { ACCOUNT_INFO } from '@/stores/constant/cacheKey'

let config: AxiosRequestConfig = {
  baseURL: process.env.VITE_AXIOS_BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json;charset=UTF-8"
  }
}
let service: AxiosInstance = axios.create(config)

// 请求拦截器
service.interceptors.request.use(config => {
  let user = Local.get(ACCOUNT_INFO);
  if (user) {
    (config.headers as any)['X-Access-Token'] = user.token
  }
  return config
}, error => {
  Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(
  response => {
    let data = response.data
    // 未完善 缺少权限判断 登录过期等等
    if (data.status == 200) {
      return data;
    } else {
      ElNotification.error(data.msg)
      return Promise.reject(data);
    }
  },
  error => {
    ElNotification.error('网络错误，请稍后再试')
    return Promise.reject(error);
  }
);
export default service