---
layout: post
title:  "SpringMVC-02 Get started"
description: 
date:   2020-08-03
categories: SpringMVC
---
SpringMVC配置三大件：处理器映射器、处理器适配器、视图解析器


## First Demo

- This demo illustrates the mechanism of SpringMVC in previous post.

### 1.1 add maven dependencies

```xml
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-webmvc</artifactId>
    <version>5.2.0.RELEASE</version>
</dependency>

<dependency>
    <groupId>javax.servlet</groupId>
    <artifactId>servlet-api</artifactId>
    <version>2.5</version>
</dependency>

<dependency>
    <groupId>javax.servlet.jsp</groupId>
    <artifactId>jsp-api</artifactId>
    <version>2.1</version>
</dependency>

<dependency>
    <groupId>javax.servlet</groupId>
    <artifactId>jstl</artifactId>
    <version>1.2</version>
</dependency>
```

### 1.2 register DispatcherServlet in web.xml

```xml
<!--1.注册DispatcherServlet-->
<servlet>
   <servlet-name>springmvc</servlet-name>
   <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
   <!--关联一个springmvc的配置文件:【servlet-name】-servlet.xml-->
   <init-param>
       <param-name>contextConfigLocation</param-name>
       <param-value>classpath:springmvc-servlet.xml</param-value>
   </init-param>
   <!--启动级别-1-->
   <load-on-startup>1</load-on-startup>
</servlet>

<!--/ 匹配所有的请求；（不包括.jsp）-->
<!--/* 匹配所有的请求；（包括.jsp）-->
<servlet-mapping>
   <servlet-name>springmvc</servlet-name>
   <url-pattern>/</url-pattern>
</servlet-mapping>
```

### 1.3 Write DispatcherServlet configs in spring-servlet.xml

```xml
<!--  1.添加 处理映射器  -->
<bean class="org.springframework.web.servlet.handler.BeanNameUrlHandlerMapping"/>

<!--  2.添加 处理器适配器  -->
<bean class="org.springframework.web.servlet.mvc.SimpleControllerHandlerAdapter"/>

<!--  3.视图解析器:DispatcherServlet给他的ModelAndView-->
<bean class="org.springframework.web.servlet.view.InternalResourceViewResolver" id="ViewResolver">
   <!--前缀-->
   <property name="prefix" value="/WEB-INF/jsp/"/>
   <!--后缀-->
   <property name="suffix" value=".jsp"/>
</bean>

<!--Register a Handler and the request path-->
<bean id="/hello" class="com.HB.controller.HelloController"/>
```

### 1.4 Write the Controller

```java
public class HelloController implements Controller {

   public ModelAndView handleRequest(HttpServletRequest req, HttpServletResponse resp) throws Exception {
       //ModelAndView 模型和视图
       ModelAndView mv = new ModelAndView();

       //封装对象，放在ModelAndView中,可以在hello.jsp中取出${msg}
       mv.addObject("msg","HelloSpringMVC!");
       //封装要跳转的视图，放在ModelAndView中
       mv.setViewName("hello"); //: /WEB-INF/jsp/hello.jsp
       return mv;
  }
}

<!--Register a Handler and the request path-->
<bean id="/hello" class="com.HB.controller.HelloController"/>
```

## Note

- 1.如果遇到404错误“找不到jar资源”，那么可能是网络生成的包中没有引入maven中的依赖项  
    在artiface中添加一个lib文件夹并将maven依赖导入
- 2.web.xml的版本必须大于4.0(通常使用add framework 导入)
- 3.为了安全性，内部资源一般放在/web/WEB-INF下，而公共资源直接放在web下
- 4.notice the defference of / and /*
```xml
<!--/ 匹配所有的请求；（不包括.jsp）-->
<!--/* 匹配所有的请求；（包括.jsp）-->
<servlet-mapping>
   <servlet-name>springmvc</servlet-name>
   <url-pattern>/</url-pattern>
```