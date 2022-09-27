import { postJson } from "~/request"

// 登录
export const loginByPwd = (body) => postJson("/v1/user/login", body)
