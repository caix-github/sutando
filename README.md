# sutando

## 概述
> 创建一个node api数据存储平台

运行前需要本地起mysql服务，默认端口3306

此案例运行需要在数据创建user和log两张表及相关字段，当然也可以删除自定义自己的表

## 项目结构
api -> 对应功能接口
models -> 对应功能表实体（与数据源表相对应）
utils -> 公共方法
utils-ajaxResult.js -> 接口消息公共方法封装
utils-connection.js -> 数据库连接配置
utils-ajaxResult.js -> 服务启动配置（端口，请求头设置等）
index.js -> 主文件
run.bat -> 快捷启动

## 创建接口功能主要步骤
1. 在数据表新增表或者使用sutando创建表并定义好字段信息
2. 在models文件夹补充对应实体
3. 在api文件夹新增对应接口功能（可以参考user或者log），并在index引用
4. 重启启动即可
