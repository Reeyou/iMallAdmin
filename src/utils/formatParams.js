/** @Author: Reeyou   
 *  @Date: 2019-05-21 16:03:04  
 *  @Function: 格式化请求参数
 **/

export default function formatParams(params) {
  let parameter = ''
  for (var key in params) {
    parameter += `${key}=${params[key]}&`
  }

  parameter = parameter.substring(0, parameter.length - 1)
  return parameter
}