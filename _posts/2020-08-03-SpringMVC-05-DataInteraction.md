---
layout: post
title:  "SpringMVC-05 DataInteraction and Diapatch&Redirect"
description: 
date:   2020-08-03
categories: SpringMVC
---
DataInteraction, Diapatch&Redirect, CharSetIssue

## 结果跳转

- 跳转目标：{视图解析器前缀} + viewName +{视图解析器后缀}
- 跳转方式

    - Dispatcher
    - Redirect

- 二者的区别：https://www.cnblogs.com/Qian123/p/5345527.html

### 1. 配置视图解析器
```xml
<bean class="org.springframework.web.servlet.view.InternalResourceViewResolver"
      id="internalResourceViewResolver">
    <property name="prefix" value="/WEB-INF/jsp/"/>
    <property name="suffix" value=".jsp"/>
</bean>
```

### 2. 编写对应的Controller

```java
@Controller
public class Controller01 {

    @RequestMapping("/redirect")
    public String redirectTest(Model model) {
        model.addAttribute("msg", "this is a test for redirect");
        return "redirect:/redirectTest.jsp";
    }

    @RequestMapping("/dispatcher")
    public String dispatcherTest(Model model) {
        model.addAttribute("msg", "this is a test for dispatcher");
        return "result";
    }
    
}
```

### 3.Note

- redirect的路径一定不能在WEB-INF路径下，因为redirect是相当于用户直接访问了路径  
  而用户不能访问WEB-INF目录下的文件，只有Dispatcher才能转发到WEB-INF下的JSP。

## DataExchange

### From front to back : 处理提交数据

- (1) 提交的域名称和处理方法的参数名一致

> requesturl : http://localhost:8080/getname01?name=HB

```java
@RequestMapping("/getname01")
public String getData01(String name, Model model) {
    System.out.println("getData01");
    model.addAttribute("msg", name);
    return "result";
}
```

- (2) 提交的域名称和处理方法的参数名不一致

> requesturl : http://localhost:8080/getname02?username=HB

```java
@RequestMapping("/getname02")
public String getData02(@RequestParam("username") String name, Model model) {
    System.out.println("getData02");
    model.addAttribute("msg", name);
    return "result";
}
```

- (3) 接受前端传递的对象

> requesturl : http://localhost:8080/getuser?name=HB&age=28&sex=man

```java
@RequestMapping("getuser")
public String getData03(User user, Model model) {
    System.out.println(user);
    model.addAttribute("msg", user.toString());
    return "result";
}
```

### From back to front : 向前段交付数据

> http://localhost:8080/mn?name=HB

- (1) ModelMap

```java
@RequestMapping("/m1")
public String testModelMap(@RequestParam("name") String name, ModelMap map) {
    map.addAttribute("msg", name);
    return "result";
}
```

- (2) ModelAndView

```java
public class ControllerTest1 implements Controller {

   public ModelAndView handleRequest(HttpServletRequest req, HttpServletResponse resp) throws Exception {
       //返回一个模型视图对象
       ModelAndView mv = new ModelAndView();
       mv.addObject("msg","ControllerTest1");
       mv.setViewName("test");
       return mv;
  }
}
```

- (3) Model

```java
@RequestMapping("/m2")
public String testModel(@RequestParam("name") String name, Model model) {
    model.addAttribute("msg", name);
    return "result";
}
```

- (4) 区别
    
    - Model 只有寥寥几个方法只适合用于储存数据，简化了新手对于Model对象的操作和理解；
    - ModelMap 继承了 LinkedMap ，除了实现了自身的一些方法，同样的继承 LinkedMap 的方法和特性；
    - ModelAndView 可以在储存数据的同时，可以进行设置返回的逻辑视图，进行控制展示层的跳转。

## 乱码问题

- 在web.xml中添加Filter

```xml
<filter>
   <filter-name>encoding</filter-name>
   <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
   <init-param>
       <param-name>encoding</param-name>
       <param-value>utf-8</param-value>
   </init-param>
</filter>
<filter-mapping>
   <filter-name>encoding</filter-name>
   <url-pattern>/*</url-pattern>
</filter-mapping>
```

## Note

- 不能将一个path map 给多个方法，会导致Ambiguous mapping error
- 如果乱码问题不能有效解决就用解码再编码的自定义过滤器