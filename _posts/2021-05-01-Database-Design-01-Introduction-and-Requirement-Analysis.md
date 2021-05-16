---
layout: post
title:  "Database-Design-01 Introduction and Requirement Analysis"
description: 
date:   2021-05-01
categories: Database Design
---

## 1.1 Introduction

- Concept : Data --> Storage Model --> Tables and Relationship between tables

  --> Save time and room for search and storage

- Design steps : Requirement Analysis --> Logical Design --> Physical Design --> Maintenance and Optimization

- The design objects : both SQL-DB and no-SQL-DB

## 1.2 Requirement Analysis

- What is the stored data ?
- What fields does the data have ?
- What are the unique fields for the data ? (1 or multi)
- How long will the data maintain in the DB ? (log or information)
- What is  the relationship between the data ? (1-to-1, 1-to-multi, multi-multi)

## 1.3 An example for requirement analysis

- Parts : User \ Goods \ Order \ Shopping Cart \  Supplier

### 1.3.1 User

- User : name \ password \ ID \ telephone \ email \ address \ nickname
- unique fields : (id) \ (name + telephone)
- time : store forever (sub-table and sub-database)

### 1.3.2 Goods

- Goods : id  \ name \  description \ categories \ supplier name \ weight \ valid period \ price
- Unique fields : (id) \ (name + supplier name)
- time : 对于下线商品可以归档存储（不可删除因为可能有订单信息）

### 1.3.3  Order

- order number \ user name \ user telephone \ receipt address \ goods id  \ Quantity  \ price \ order status \ payment status \ order type
- Unique field : order number
- time : forever (sub-database and sub-tables)

### 1.3.4 Shopping cart

- Shopping cart : user name / goods id / goods name , goods price   / goods description / goods  categories / add time / goods quantity 
- Unique field : (user name + goods id + add time) (shopping cart id)
- 不需要永久存储，设置归档、清理规则

### 1.3.5 Supplier

- Supplier : Supplier id \ supplier name \ Contact person \ telephone \ License number \  address \ Law person 
- Unique field : (Supplier id) (License number)
- forever

1.3.6 entries relations

![image-relation](E:\git_pro\HBhakunamatata.github.io\_posts\images\database_design\image-relations.png)

## Note

- If DB is not designed well, it will cause data redundancy and exceptions (delete add update exception)