/*
 * @Author: caix 1058360098@qq.com
 * @Date: 2023-10-27 16:49:13
 * @LastEditors: caix 1058360098@qq.com
 * @LastEditTime: 2023-11-11 20:03:02
 * @FilePath: \Sutando\utils\ajaxResult.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import dayjs from 'dayjs'
// 打印接口日志
function showApiLog({ originalUrl, method, params }) {
  console.log(`${originalUrl}接口调用, 请求方式: ${method},调用时间：${dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')}, 调用结果: ${params['message']}`)
}
// 公共成功返回
export function ajaxSuccess(data, config = {}, req) {
  let params = Object.assign({
    code: 200,
    message: '操作成功',
    data
  }, config);
  data && (params['data'] = data)
  const { originalUrl, method } = req;
  showApiLog({ originalUrl, method, params })
  return params
}
// 失败返回
export function ajaxError(msg, config = {}, req) {
  let params = Object.assign({
    code: 500,
    message: msg || '操作失败'
  }, config);
  const { originalUrl } = req;
  showApiLog({ originalUrl, method, params })
  return params
}