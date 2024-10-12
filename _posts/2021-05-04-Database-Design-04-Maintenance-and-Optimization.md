---
layout: post
title:  "Database-Design-04 Maintenance and optimization"
description: 
date:   2021-05-04
categories: Database-Design
---

1.maintain data dictionary  
2.maintain index  
3.maintain table structure  
4.Split the table vertically and horizontally when appropriate

## 4.1 Dictionary

- 第三方工具
- Comment字段

```sql
create table customer (
    cust_id  int  auto-increment  not null  Comment `自增ID`,
    cust_name varchar(10)  not null  comment `客户姓名`,
    primary key(`cust_id`)
) engine=innodb default charset= utf8;
Comment `客户表`
```

```sql
SELECT
a.table_name, b.TABLE_COMMENT, a.COLUMN_NAME, a.COLUMNTYPE, a.COLUMN_COMMENT
FROM information_schema.COLUMNS a 
JOIN information_schema.TABLES b 
ON a.table_schema=b.table_schema AND a.table_name= b.table_name 
WHERE a.table_name=’customer’
```

## 4.2 Index

- 通常选where order-by group-by后面的字段
- 索引列不要包括太长的数据类型（MD5等减少长度）

- 不是越多越好，会降低读写效率
- 定期维护索引碎片
- 不要在SQL语句中强制索引关键字

## 4.3 Table Structure

- MySQL5.5之前 pt-online-schema-change(全局锁)
- 5.6之后可以在线更改（Alter）
- 维护字典
- 控制表的宽度和大小

## 4.4 Split table vertically（几十列时）

- 经常查询的放在一起
- text、blob放至附加表中

## 4.5 Split table horizontally （数据量超过几千万条时）

- 使用主键hash

![image-20210504144957579](/assets/post-images/database_design/image-split-horizontally.png)

## Note

数据库适合的操作

1. 批量操作 > 逐跳操作
2. 禁止使用 Select *
3. 禁止用户使用自定义函数（用了函数，索引不起作用）
4. 不要使用全文索引