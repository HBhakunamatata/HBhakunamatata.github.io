---
layout: post
title:  "SpringMVC-03 Annotation"
description: 
date:   2020-08-03
categories: SpringMVC Annotation
---
New three parts：context:component-scan / mvc:default-servlet-handler / mvc:annotation-driven


## SpringMVC in Annotation

- Now we only write the _ViewResolver_ and a _method with @Controller and @RequestMapper_.

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
<!--配置DispatcherServlet-->
<servlet>
    <servlet-name>springMVC</servlet-name>
    <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
    <init-param>
        <param-name>contextConfigLocation</param-name>
        <param-value>classpath:springmvc-servlet.xml</param-value>
    </init-param>
    <load-on-startup>1</load-on-startup>
</servlet>
<servlet-mapping>
    <servlet-name>springMVC</servlet-name>
    <url-pattern>/</url-pattern>
</servlet-mapping>
```

### 1.3 Write DispatcherServlet configs in spring-servlet.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:mvc="http://www.springframework.org/schema/mvc"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd
       http://www.springframework.org/schema/context
       https://www.springframework.org/schema/context/spring-context.xsd
       http://www.springframework.org/schema/mvc
       https://www.springframework.org/schema/mvc/spring-mvc.xsd">

    <!--  1.扫描包  -->
    <context:component-scan base-package="com.HB.controller"/>

    <!--  2.让spring mvc 不处理静态资源  (.html .js .css .mp3 ...) -->
    <mvc:default-servlet-handler/>

    <!--  3.支持注解驱动 自动开启Mapper和Adapter -->
    <mvc:annotation-driven/>

    <!--  4.视图处理器  -->
    <bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
        <property name="prefix" value="/WEB-INF/jsp/"/>
        <property name="suffix" value=".jsp"/>
    </bean>
</beans>
```

### 1.4 Write the Controller

```java
@Controller
@RequestMapping("/hello")
public class controller01 {

    // 实现ServletMapper
    @RequestMapping("/h2")
    public String hello(Model model) {
        // 添加数据
        model.addAttribute("msg", "spring mvc annotation");
        // 跳转页面
        return "hello";
    }
}
```

## Note

- 1. 如果遇到404错误“找不到jar资源”，那么可能是网络生成的包中没有引入maven中的依赖项  
    在artiface中添加一个lib文件夹并将maven依赖导入
- 2. web.xml的版本必须大于4.0(通常使用add framework 导入)
- 3. 为了安全性，内部资源一般放在/web/WEB-INF下，而公共资源直接放在web下
- 4. Notice the defference of / and /*
```xml
<!--/ 匹配所有的请求；（不包括.jsp）-->
<!--/* 匹配所有的请求；（包括.jsp）-->
<servlet-mapping>
   <servlet-name>springmvc</servlet-name>
   <url-pattern>/</url-pattern>
```