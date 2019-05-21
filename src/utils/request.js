/** @Author: Reeyou   
 *  @Date: 2019-05-21 16:04:36  
 *  @Function: 封装axios请求方法
 **/
import axios from 'axios'
import qs from 'qs'

export default function request(method, url, params) {

  axios.defaults.timeout = 10000;
  // post请求头
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
  // 请求状态码
  const responseCode = {
    "200": "服务请求成功",
    "400": "请求参数错误",
    "401": "未进行认证,用户没有权限(Token)",
    "403": "访问被禁止",
    "404": "请求路径错误",
    "500": "服务器发生错误,请检查服务器",
    "502": "网关错误",
    "503": "服务不可用，服务器过载或维护中",
    "504": "网关超时",
  }
  // return true;

  //请求添加Token
  if(method == 'GET') {
    return Get(url, params);
  } else if(method == 'POST') {
    return Post(url, params);
  }

  //封装Get方法
  function Get(url, params) {
    return new Promise((resolve, reject) => {
      axios.get(url, params)
      .then(res => {
        resolve(res.data);
      })
      .catch(error => {
        reject(error.data);
      })
    })
  }

  //封装Post方法
  //qs.stringify()将对象 序列化成Url的形式，以&进行拼接
  //qs.parse()将Url解析成对象的形式
  function Post(url, params) {
    console.log(qs.stringify(params))
    return new Promise((resolve, reject) => {
      axios.post(url, qs.stringify(params))
      .then(res => {
        return resolve(res.data);
      })
      .catch(error => {
        return reject(error.data);
      })
    })
  }
}