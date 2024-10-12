---
layout: post
title:  "Database-Design-03 Physical Design"
description: 
date:   2021-05-03
categories: Database-Design
---

DBMS --> database,table,column naming --> fields choose --> De-normalization

## 3.1 DBMS Choose

- 成本Cost
- 功能Function(支持并发)
- 操作系统、语言 OP , language
- 场景
  - enterprise : financial \ telecommunication
  - E-commerce \ Small site

- Oracle / SQL Server 

- MySQL / PGSQL

## 3.2 Database,Table,column Naming

- Readable
- Not abbreviated (不缩写)

## 3.3 Fields Choose

### 3.3.1 Choose Principle

- 数字型 --> 日期 / 二进制 --> 字符型
- 相同级别的按存储空间从小到大

![image-20210504131120665](/assets/post-images/database_design/image-field-size.png)

### 3.3.2 Reason

- 数字型处理比文字快
- 数据处理以页为单位，列的长度越小，单页储存的数据量越高，提高数据库性能

> MySQL innoDB  16KB/页 ， 列长度越小，单页数据量 越高

### 3.3.3 char vs. varchar

- 储存长度差不多（电话 、邮箱等） char(int n)
- 列长度小于50 bytes --> char(50)， 若非常少用，可以使用varchar

> Note : 每个utf8字符占用3个字节，50Bytes约合15个字符

- 不宜定义长度大于50的char

### 3.3.4 decimal vs. float

- _decimal_ : it describes number accurately.
- _float_ : it describes number inaccurately.

### 3.3.5 how to describe the time (int / date / time / datetime)

- 空间大小：int < datetime
- 转换：int ----> datetime
- 使用频率
  - 经常使用：datetime（支付时间、下单时间）
  - 不常使用：int（偶尔展示时间）
- 时间粒度。。。（date / time / datetime）

> Note: 从1970年1月1号00:00开始，int类型的日期最多表示到2037年底或者2038年1月

## 3.4 Other Question

### 3.4.1 how to choose primary key

- Distinguish between business primary key and database primary key

  - bpk : mark the business
  - dpk : optimize storage structure

  > innoDB generates a 6Kb primary key by default.

- 按照DB类型考虑 primary key 是否需要自增

- primary key 的字段类型占用空间要尽可能小

### 3.4.2 Avoid using foreign key

- 每次导入都需要检测外键约束，导致数据导入的效率降低
- 增加维护成本
- 不建议使用外键，但一定要在列上建立索引

### 3.4.3 Avoid using trigger (similar to foreign key)

- 每次SQL都可能触发六类触发器，降低数据处理效率
- 使业务逻辑变复杂
- 产生无法预料的异常（每个innoDB表中只能有一个触发器，可能与其他工具冲突）

### 3.4.4 Avoid 预留字段（mustn't）

- 无法预先准确知道字段类型
- 无法知道其中储存的内容
- 花费 等同于 新增加一个字段