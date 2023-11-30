/*
 * @Author: caix 1058360098@qq.com
 * @Date: 2023-10-26 14:54:55
 * @LastEditors: caix 1058360098@qq.com
 * @LastEditTime: 2023-11-08 11:34:42
 * @FilePath: \Sutando\utils\connection.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { sutando } from 'sutando';

// 添加数据库连接信息
sutando.addConnection({
  client: 'mysql2',
  connection: {
    host : 'localhost',
    port : 3306,
    user : 'test',
    password : '123456',
    database : 'monitor'
  },
});
// 连接数据库
const db = sutando.connection();
// 暴露方法
export default db