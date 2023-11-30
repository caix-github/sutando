/*
 * @Author: caix 1058360098@qq.com
 * @Date: 2023-10-28 16:09:48
 * @LastEditors: caix 1058360098@qq.com
 * @LastEditTime: 2023-11-08 11:42:26
 * @FilePath: \Sutando\api\user.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import app from '../utils/server.js'
import { ajaxSuccess, ajaxError } from '../utils/ajaxResult.js'
import { User } from '../models/index.js'

// 查询用户表接口
app.get('/api/user/list', async (req, res) => {
  // express提供的send方法
  // const users = await db.table('users').get();
  const users = await User.query().all()
  res.send(ajaxSuccess(users, {}, req)); // send方法会自动设置响应头；并且会自动把对象转成JSON字符串
});

// 查询指定用户接口
app.get('/api/user/query', async (req, res) => {
  // express提供的send方法
  const id = req.query.id
  // const users = await db.table('users').where('id', id).get();
  const users = await User.query().where('id', id).get();
  if (!users.count()) {
    res.send(ajaxError('查询用户失败', {}, req)); // send方法会自动设置响应头；并且会自动把对象转成JSON字符串
  } else {
    res.send(ajaxSuccess(users.get(0), {}, req)); // send方法会自动设置响应头；并且会自动把对象转成JSON字符串
  }
  
});

// 新增用户接口
app.post('/api/user/add', async (req, res) => {
  // const userInfo = Object.assign({
  //   created_at: new Date(),
  //   updated_at: new Date()
  // }, req.body) 
  // try {
  //   await db.table('users').insert(userInfo);
  //   res.send(ajaxSuccess());
  // } catch(err) {
  //   res.send(ajaxError('新增失败'));
  // }
  const {
    name,
    sex,
    age,
    phone,
    address,
    remark
  } = req.body
  const user = new User;
  user.name = name;
  user.sex = sex;
  user.age = age;
  user.phone = phone;
  user.address = address;
  user.remark = remark
  try {
    await user.save();
    res.send(ajaxSuccess('', {}, req));
  } catch(err) {
    res.send(ajaxError('新增失败', {}, req));
  }
});

// 修改用户接口
app.post('/api/user/update', async (req, res) => {
  const { id } = req.body
  if (!id) {
    res.send(ajaxError('缺少用户id', {}, req));
    return
  }
  const userInfo = Object.assign({}, req.body, {
    updated_at: new Date()
  })
  try {
    await User.where('id', id).update(userInfo)
    res.send(ajaxSuccess());
  } catch(err) {
    res.send(ajaxError('修改失败', {}, req));
  }
});

// 删除用户接口
app.delete('/api/user/delete', async (req, res) => {
  const { id } = req.query
  if (!id) {
    res.send(ajaxError('缺少用户id', {}, req));
    return
  }
  try {
    const result = await User.where('id', '=', id).delete();
    if (!result) {
      res.send(ajaxError('删除失败, 无此用户', {}, req));
      return
    }
    res.send(ajaxSuccess('', {}, req));
  } catch(err) {
    res.send(ajaxError('删除失败', {}, req));
  }
});
