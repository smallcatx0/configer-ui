import { useCookies } from '@vueuse/integrations/useCookies'

const cookie = useCookies()
const TokenKey = "bs-adm-token"
// 存token
export function setToken(token) {
    cookie.set(TokenKey, token)
}
// 取token
export function getToken() {
    return cookie.get(TokenKey)
}
// 删token
export function delToken() {
    cookie.remove(TokenKey)
}

// 用户信息 存在localStorage
const InfoKey = "userinfo"
export function SaveUserInfo(data) {
    const v = JSON.stringify(data)
    localStorage.setItem(InfoKey, v)
}

export function GetUserInfo() {
    const v = localStorage.getItem(InfoKey)
    return JSON.parse(v)
}