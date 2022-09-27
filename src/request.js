import axios from "axios"
import { ElNotification } from 'element-plus'
import { getToken, delToken } from '~/utils/auth'

// 后台管理系统请求实例
const userApi = axios.create({
    baseURL:"/user",
})

userApi.interceptors.request.use(
    config => {
        // 添加token到header头
        const token = getToken()
        if (token) {
            config.headers['Authorization'] = token
        }
        return config
    },
    err => {
        return Promise.reject(err)
    }
)

userApi.interceptors.response.use(
    response => {
        // 简化响应数据
        return response.data
    },
    err => {
        if (!err) {
            ElNotification({
                title: "网络错误,请稍后重试",
                type: 'error',
                duration: 0,
            })
            return Promise.reject(err)
        }
        // 响应的拦截
        const httpCode = err.response.status
        switch (httpCode) {
            case 401:
                handel401()
                break;
            default:
                handelDefault(err.response)
                break;
        }
        return Promise.reject(err)
    }
)

function handel401() {
    // 删除cookie中的token
    delToken()
    // 提示
    ElNotification({
        title: "登录超时,请重新登录",
        type: 'error',
        duration: 0,
    })
    // TODO: 自动跳转到登录页面
}

function handelDefault(response) {
    let {errcode, msg, request_id} = response.data
    ElNotification({
        title: msg,
        message: `errcode=${errcode},request_id=${request_id}`,
        type: 'error',
        duration: 0,
    })
}

// 请求的二次封装
export function postJson(url,json) {
    return userApi.post(url, json, {
        headers:{
            "Content-Type": "application/json; charset=utf-8"
        }
    })
}

export function get(url, params) {
    return userApi.get(url, {
        params
    })
}

export {userApi}