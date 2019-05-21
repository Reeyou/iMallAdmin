import formatParams from '../utils/formatParams';
import request from '../utils/request'
import qs from 'qs'

export async function getUserLogin(params) {
  // console.log(typeof(request()))
  // console.log(qs.stringify(params))
  return request("POST", "api/admin/login", params)
}