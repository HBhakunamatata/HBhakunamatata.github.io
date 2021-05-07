---

layout: post
title:  "Database-Design-02 Logical Design"
description: 
date:   2020-05-02
categories: MySQL

---

Requirement --> Logical Model --> ER picture (It is _Independent_ of DBMS)

![image-20210503142107645](E:\git_pro\HBhakunamatata.github.io\_drafts\image-logical-design.png)

## 2.1 Exception and Data Redundancy

### 2.1.1 Insert Exception

>  An entry's existence is dependent in another entry.
>
> In other words, when inserting an entry, we need another entry at first.

### 2.1.2 Update Exception

> Updating one line in table modifies other lines in the table.

### 2.1.3 Delete Exception

> Deleting an entry  causes another entry's loss.

### 2.1.4 Data Redundancy

> The same data is stored in different place.
>
> A field can be calculated by other fields in the table.

### 2.1.5 An example for above problem

```git
Unique index : (A,B) -> C
Insert Exception : 
	When A --> C, we cannot insert C without A
Delete Exception :
	When A --> C, when delete all A, C doesn't exist
Update Exception :
	When A --> C, when update C beacause of A, every SQL needs to write B.(a lot of)
```

- DDP --> avoid exception and date redundancy --> data consistency

## 2.3 Database Design Paradigm

### 2.2.1 No.1 Paradigm

- Fields are primitive type and cannot be divided.
- In other words, tables are two-dimensional tables.

![image-20210503151302350](E:\git_pro\HBhakunamatata.github.io\_drafts\image-paradigm01.png)

### 2.2.2 No.2 paradigm

- 表中任意_非关键字段_ 对_组合关键字段_ 不存在_部分函数依赖_。
- 换句话说，单个关键字段符合第二范式

![image-20210503185239793](E:\git_pro\HBhakunamatata.github.io\_drafts\image-paradigm-02.png)

unique index --> (goods name + supplier name)

(goods name) --> (price, description, weight, valid period)

(supplier name) --> (supplier telephone) 

- insert exception
- delete exception
- update  exception
- data redundancy

![image-20210503200731854](E:\git_pro\HBhakunamatata.github.io\_drafts\image-paradigm-02-solve.png)

### 2.2.3 No.3 Paradigm

- 表中非关键字段对任意组合关键字段不存在传递函数依赖。

![image-20210503201325470](E:\git_pro\HBhakunamatata.github.io\_drafts\image-paradigm-03.png)

(goods name) --> (category) --> (category description)

- insert exception
- delete exception
- update exception
- data redundancy

![image-20210503202118222](E:\git_pro\HBhakunamatata.github.io\_drafts\image-paradigm-03-solve.png)

### 2.2.4 BC Paradigm

- 任意字段（关键、非关键）不存在对组合关键字段的传递依赖。

![image-20210504095247801](E:\git_pro\HBhakunamatata.github.io\_drafts\image-paradigm-bc.png)

(supplier name + goods id) --> (supplier contact, quantity)

(supplier contact + goods id) --> (supplier name , quantity)

$\Rightarrow$ (supplier name) <--> (supplier contact)

![image-20210504100012552](E:\git_pro\HBhakunamatata.github.io\_drafts\image-paradigm-bc-solve.png)

## Note

- 组合关键字段 === 唯一索引
- 产生异常的原因：组合关键字中的依赖关系（A+B）--> C
  - 插入：没有A或B的记录，无法插入C的信息（没有被依赖项没法插入依赖项）
  - 删除：删除所有A或B的记录，C的信息也跟着丢失（删除被依赖项会导致依赖项的丢失）
  - 更新：（更新被依赖项会产生其他被依赖项信息被更改）
    - (1) 如果能批量更新，更新A或者B的记录，则会影响B或者A的信息
    - (2) 如果不能批量更新，每次更新A的记录，都需要带上B的id才能执行SQL语句
  - 数据冗余
- 范式意在去除字段中的所有依赖关系，以此保证数据的一致性