import axios from "axios"

// 后台管理系统请求实例
const userApi = axios.create({
    baseURL:"/user",
})

export function postJson(url,json) {
    return userApi.post(url, json, {
        headers:{
            "Content-Type": "application/json; charset=utf-8"
        }
    })
}

export {userApi}