---
layout: post
title:  "MySQL-05 Advanced-Function"
description: 
date:   2020-04-26
categories: MySQL
---
View / Procedure / Cursor / Trigger


## 5.1 视图

视图 --> 虚拟__表__(不包含数据) --> 代替用户向实际表中检索数据(代理) --> 保护基表

1. 为什么使用视图
   - 重用SQL，简化SQL
   - 由于安全权限等原因，只检索表的部分而不是整个表
   - 更改数据表示格式

```sql
## 创建
create view view_emp_without_privacy as
select Concat("No.", emp_no) as `员工编号`, gender as `性别`, hire_date as `入职日期`
from employees;

## 修改
alter view view_name as
	select emp_no, gender, hire_date
	from employees;
	
# 使用
select * from view_emp_without_privacy
limit 0, 10;

## 删除
drop view if exists view_emp_without_privacy;
```

2. 规则限制

- 视图唯一命名
- 不能更新数据、索引，无触发器和默认值
- 可以与表共同使用

## 5.2 存储过程

- 为以后的使用而保存的一条或者多条SQL语句的集合
- why use：封装SQL语句(封装) / 减少错误(安全) / 执行比单独SQL快(高效)

```sql
## 创建
delimiter //
create procedure avgSalaryOfN (
	IN numberN INT,
    OUT average decimal(8,2)
)
begin
	select avg(salary) from salaries
	limit 0, numberN
	into average;
end;
delimiter ;

## 调用
call avgSalaryOfN(10, @average1)
select @average1;

# 查看procedure
???

## 删除
drop procedure if exists averageOfN;
```

## 5.3 游标Cursor

- 在检索出来的结果集中前进(或退后)一行或多行
- MySQL中，游标只能在存储过程里使用

## 5.4 触发器 Trigger

- 某些语句在事件发生时自动触发
- 仅支持在表中使用

``` sql
## (表)唯一的触发器名称 + 响应的语句 + 关联的表 + 执行时机
create trigger afterInsertEmp after insert on employees for each row
select Concat("added an employee No.", new.emp_no);

## delete触发器
create trigger deleteorder before delete on orders for each row
begin
	insert into archive_orders(order_num,order_date,cust_id)
	values(old.order_num,old.order_date,old.cust_id);
end;

## 删除触发器
drop trigger if exists afterInsertEmp;
```

- before触发器失败，则后续的语句也不会执行
- SQL语句失败，则after触发器也不会执行

