import { postJson,get } from "~/request"

// 登录
export const loginByPwd = (body) => postJson("/v1/user/login", body)
// 获取用户信息
export const userInfo = () => get("/v1/user/info")

// 退出登录
export const logout = ()=> postJson('/test')

// 修改密码
export const modPass = (body) => postJson('/v1/user/modpass', body)