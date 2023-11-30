/*
 * @Author: caix 1058360098@qq.com
 * @Date: 2023-10-28 15:01:29
 * @LastEditors: caix 1058360098@qq.com
 * @LastEditTime: 2023-11-10 11:27:28
 * @FilePath: \Sutando\server.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 使用express 搭建web服务器
// 1) 加载 express 模块
import express from 'express';
// 引入修改编码格式的body-parser模块(序列化)
import bodyParser from 'body-parser';

// 2) 创建 express 服务器
const app = express();
// 设置express 支持post请求参数格式支持json   支持application/json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded());
// 解决跨域问题(cors)
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  next();
});

const port = 3000
// 3) 开启服务器
app.listen(port, () => console.log(`express server start, server running at:http://localhost:${port}`));
export default app