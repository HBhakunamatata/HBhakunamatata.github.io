---
layout: post
title:  "MySQL-06 Index and Transaction"
description: 
date:   2020-04-28
categories: MySQL
---
Index and Transaction in MySQL

## 4.1 Index

- 1. 主键索引 (Primary Key) : 确保数据记录的唯一性

```sql
CREATE TABLE `Grade`(
  `GradeID` INT(11) AUTO_INCREMENT PRIMARYKEY,

   或 PRIMARYKEY `GradeID` (`GradeID`)
)
```

- 2. 唯一索引 (Unique) : 避免同一个表中某数据列中的值重复

```sql
CREATE TABLE `Grade`(
  `GradeName` VARCHAR(32) NOT NULL UNIQUE

   或 UNIQUE KEY `GradeID` (`GradeID`)
)
```

- 主键索引只能有一个,唯一索引可能有多个


- 3. 常规索引 (Index) : 快速定位特定数据

```sql
CREATE TABLE `result`(
   -- 省略一些代码
  INDEX/KEY `ind` (`studentNo`,`subjectNo`) -- 创建表时添加
)

-- 创建后添加
ALTER TABLE `result` ADD INDEX `ind`(`studentNo`,`subjectNo`);
```

- 4. 全文索引 (FullText)

## 4.2 Transaction

- 可以回退：insert / update / delete
- 无法回退：select / create / drop

```sql
start transaction;
	sql1;
	sql2;
rollback;

start transaction;
	sql1;
	sql2;
commit;

savepoint delete1;
	sql1;
	sql2;
rollback to delete1;
```

- 使用commit / rollback 事务自动提交