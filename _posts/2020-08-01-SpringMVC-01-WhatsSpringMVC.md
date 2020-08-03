---
layout: post
title:  "SpringMVC-01 What's SpringMVC"
description: 
date:   2020-08-03
categories: SpringMVC
---
Spring MVC框架以请求为驱动 , 围绕一个中心DispatcherServlet将请求分发到不同的处理器

## 1. MVC Structure

### 1.1 MVC

- Model:模型提供了数据模型和针对数据的功能，包括数据和业务。
- View: 负责进行模型的展示，一般就是我们见到的用户界面。 
- Controller: 接收用户请求，委托给模型进行处理（状态改变），处理完毕后把返回的模型数据返回给视图。
                也就是说控制器做了个调度员的工作。
- MVC的一个经典的实践：JSP + Servlet + JavaBean

### 1.2 Model 1 (View + Model)

![model01](/images/springmvc/model01.png)

- JSP的职能不唯一，负责前端页面展示和控制器(控制逻辑和表现逻辑)两种功能，不便于维护。

### 1.3 Model 2

![model02](/images/springmvc/model02.webp)

- 控制逻辑和表现逻辑分离，Model2消除了Model1的缺点。

## 2 What is Spring MVC?

- Spring MVC是Spring Framework的一部分，是基于Java实现MVC的轻量级Web框架。
- [官方文档](https://docs.spring.io/spring/docs/5.2.0.RELEASE/spring-framework-reference/web.html#spring-web)
- Spring MVC框架以请求为驱动 , 围绕一个中心DispatcherServlet将请求分发到不同的处理器.
- SpringMVC执行原理(important)

![springmachenism](/images/springmvc/springmachenism.png)