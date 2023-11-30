/*
 * @Author: caix 1058360098@qq.com
 * @Date: 2023-11-07 14:51:05
 * @LastEditors: caix 1058360098@qq.com
 * @LastEditTime: 2023-11-21 14:10:08
 * @FilePath: \Sutando\models\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Model } from "sutando";
import dayjs from 'dayjs'
// 用户表模型
class User extends Model {
  // 时间格式转换
  serializeDate(date) {
    return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
  }
}
// 日志表模型
class Log extends Model {
    // 时间格式转换
  serializeDate(date) {
    return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
  }

  // 系统名称name模糊搜索
  scopeName(query, name) {
    return name ? query.where('name', 'like', `%${name}%`) : query
  }

  // 是否只查询当天（0 否 1是）
  scopeIsNow(query, isNow) {
    const nowDate = dayjs(new Date()).format('YYYY-MM-DD')
    return Number(isNow) === 1 ? query.where('created_at', 'like', `${nowDate}%`) : query
  }
}

export {
  User,
  Log
}