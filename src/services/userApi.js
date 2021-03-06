import request from '../utils/request'

// 登录
export async function getUserLogin(params) {
  return request("POST", "api/admin/login", params)
}

// 获取信息
export async function getUserInfo(params) {
  return request("GET", "api/admin/getUserInfo", params)
}

// 重置密码
export async function resetPwd(params) {
  return request("POST", "api/admin/resetPwd", params)
}