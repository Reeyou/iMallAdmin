import request from '../utils/request'

export async function getUserLogin(params) {
  return request("POST", "api/admin/login", params)
}