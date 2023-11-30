/*
 * @Author: caix 1058360098@qq.com
 * @Date: 2023-10-28 16:09:48
 * @LastEditors: caix 1058360098@qq.com
 * @LastEditTime: 2023-11-21 14:19:26
 * @FilePath: \Sutando\api\user.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import app from '../utils/server.js'
import { ajaxSuccess, ajaxError } from '../utils/ajaxResult.js'
import { Log } from '../models/index.js'

const baseUrl = '/api/log'

// 查询日志表接口
app.get(`${baseUrl}/list`, async (req, res) => {
  const { name, isNow } = req.query
  const log = await Log.query().name(name).isNow(isNow).orderBy('created_at', 'desc').get()
  res.send(ajaxSuccess(log, {}, req)); // send方法会自动设置响应头；并且会自动把对象转成JSON字符串
});

// 分页查询日志表接口
app.post(`${baseUrl}/listPage`, async (req, res) => {
  const { 
    name,
    isNow,
    offset,
    limit
  } = req.body
  const log = await Log.query().name(name).isNow(isNow).orderBy('created_at', 'desc').paginate(offset ?? 1, limit ?? 10)
  const {
    _items,
    _currentPage: currentPage,
    _lastPage: lastPage,
    _perPage: perPage,
    _total: total
  } = log
  res.send(ajaxSuccess(_items, {
    currentPage,
    lastPage,
    perPage,
    total
  }, req)); // send方法会自动设置响应头；并且会自动把对象转成JSON字符串
});

// 查询指定日志接口
app.get(`${baseUrl}/query`, async (req, res) => {
  // express提供的send方法
  const id = req.query.id
  const log = await Log.query().where('id', id).get();
  if (!log.count()) {
    res.send(ajaxError('查询失败', {}, req)); // send方法会自动设置响应头；并且会自动把对象转成JSON字符串
  } else {
    res.send(ajaxSuccess(log.get(0), {}, req)); // send方法会自动设置响应头；并且会自动把对象转成JSON字符串
  }
});

// 新增日志接口
app.post(`${baseUrl}/add`, async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    res.send(ajaxError('缺少参数', {}, req));
    return
  }
  try {
    const {
      name,
      msg,
      type,
      remark,
      hostname,
      port,
      pathname,
      protocol
    } = JSON.parse(Object.keys(req.body)[0])
    const log = new Log;
    log.name = name;
    log.msg = msg;
    log.type = type;
    log.remark = remark;
    log.hostname = hostname,
    log.port = port,
    log.pathname = pathname,
    log.protocol = protocol
    await log.save();
    res.send(ajaxSuccess('', {}, req));
  } catch(err) {
    res.send(ajaxError(err || '新增失败', {}, req));
  }
});

// 修改日志接口
app.post(`${baseUrl}/update`, async (req, res) => {
  const { id } = req.body
  if (!id) {
    res.send(ajaxError('缺少id', {}, req));
    return
  }
  const logInfo = Object.assign({}, req.body, {
    updated_at: new Date()
  })
  try {
    await Log.where('id', id).update(logInfo)
    res.send(ajaxSuccess());
  } catch(err) {
    res.send(ajaxError('修改失败', {}, req));
  }
});

// 删除日志接口
app.delete(`${baseUrl}/delete`, async (req, res) => {
  const { id } = req.query
  if (!id) {
    res.send(ajaxError('缺少id', {}, req));
    return
  }
  try {
    const result = await Log.where('id', '=', id).delete();
    if (!result) {
      res.send(ajaxError('删除失败', {}, req));
      return
    }
    res.send(ajaxSuccess());
  } catch(err) {
    res.send(ajaxError('删除失败', {}, req));
  }
});
