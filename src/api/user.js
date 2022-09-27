import { postJson,get } from "~/request"

// 登录
export const loginByPwd = (body) => postJson("/v1/user/login", body)
// 获取用户信息
export const userInfo = () => get("/v1/user/info")

// 测试接口
export const test = () => get("/test")