---
layout: post
title:  "Spring-05 Annotation"
description: 
date:   2020-07-27
categories: Spring Annotation
---
Autowire is to load the _field_ in beans automatically instead of bean itself.

## Before using the annotation

```xml
// application-config.xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:context="http://www.springframework.org/schema/context" // added
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="
        http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/context             // added
        https://www.springframework.org/schema/context/spring-context.xsd">  added

    <context:annotation-config />                                 // added
<beans/>

// maven dependency
<!-- https://mvnrepository.com/artifact/org.springframework/spring-aop -->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-aop</artifactId>
    <version>5.2.0.RELEASE</version>
</dependency>

```

## 1. @Autowire

- @Autowired 默认使用byType方式装配
- @Autowired 不需要Setter
- @Autowired(required=false) 说明：false，对象可以为null；true，对象必须存对象，不能为null

```java
public class People {
    @Autowired
    private Cat cat;

    @Autowired(required = false)
    private Dog dog;

    private String name;

    ......

}
```

```xml
<bean class="com.HB.pojo.Dog" id="dog"/>
<bean class="com.HB.pojo.Cat" id="cat"/>
<bean class="com.HB.pojo.People" id="people"/>
``` 

## 2. @Qualified

- @Qualified根据byName的方式自动装配
- @Qualified不能单独使用

```xml
    <bean class="com.HB.pojo.Dog" id="dog"/>
    <bean class="com.HB.pojo.Cat" id="cat"/>

    <bean class="com.HB.pojo.Dog" id="dog111"/>
    <bean class="com.HB.pojo.Cat" id="cat111"/>

    <bean class="com.HB.pojo.People" id="people"/>
```

```java
public class People {

    ......

    @Autowired
    @Qualifier(value = "cat111")
    private Cat cat111;

    @Autowired
    @Qualifier(value = "dog111")
    private Dog dog111;

    ......
}
```

## @Resource (recommended)

- @Resource如有指定的name属性，先按该属性进行byName方式查找装配
- 如果没有就按照默认的byName方式进行装配
- 如果还是没有匹配项就按照byType方式装配
- 以上成功，报错

```xml
<bean class="com.HB.pojo.Dog" id="dog"/>
<bean class="com.HB.pojo.Cat" id="cat"/>

<bean class="com.HB.pojo.Dog" id="dog111"/>
<bean class="com.HB.pojo.Cat" id="cat111"/>

<bean class="com.HB.pojo.People02" id="people02"/>
```

```java
public class People02 {

    @Resource(name = "dog111")
    private Dog dog;

    @Resource
    private Cat cat;

    private String name;
    ......

```

## Note

- 注解都不需要Setter的


# Anotation Development

- 1.bean
- 2.field
- 3.衍生注解
- 4.自动装配
- 5.作用域
- 6.小结


```java
<!--指定注解扫描包-->
<context:component-scan base-package="com.HB.pojo"/>

@Component
@Scope("prototype")
public class User {

    @Value("孙哥")
    private String name;

    public User() { }

    public User(String name) {
        this.name = name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
```

## 衍生注解 (继承自@Component)
- @Controller：web层
- @Service：service层
- @Repository：dao层

Note:
    - autowire = (component-scan + annotation) / register in xml
    - XML与注解比较

XML可以适用任何场景 ，结构清晰，维护方便  

注解不是自己提供的类使用不了，开发简单方便  

xml与注解整合开发 ：推荐最佳实践  

xml管理Bean  

注解完成属性注入  

使用过程中， 可以不用扫描，扫描是为了类上的注解  
 
作用：  

进行注解驱动注册，从而使注解生效  

用于激活那些已经在spring容器里注册过的bean上面的注解，也就是显示的向Spring注册  

如果不扫描包，就需要手动配置bean  

如果不加注解驱动，则注入的值为null！  