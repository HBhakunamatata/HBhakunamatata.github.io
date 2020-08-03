---
layout: post
title:  "SpringMVC-04 Controller and Restful"
description: 
date:   2020-08-03
categories: SpringMVC Restful
---
This post is about @Controller and @RequestMapper.  
When you get a Controller, you must give it a RequestMapper.

## Three methods of implementing Controller

### 1. Implementing interface named _Controller_

```java
public class Controller01 implements Controller {

    @Override
    public ModelAndView handleRequest(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) throws Exception {

        ModelAndView mv = new ModelAndView();
        mv.addObject("msg", "Method01 : implement Controller interface");
        mv.setViewName("hello");
        return mv;
    }
}
```

- In this way, you must register this Controller and its RequestMapper in sringmvc-servlet.xml
```xml
<bean class="com.HB.controller.Controller01" id="/c1"/>
```

### 2. Using _@Controller_ and _@RequestMapper_ (Recommended)

```java
@Controller
@RequestMapping("/c2")
public class Controller02 {
    @RequestMapping("/f2")
    public String func(Model model) {
        model.addAttribute("msg", "Spring MVC using @Controller");
        return "hello";
    }
}
```




## Restful Style

- Restful就是一个_资源定位及资源操作的风格_。不是标准也不是协议，只是一种风格。
- 好处 : 更简洁，更安全，更易于实现缓存等机制。

### 1.举例

- 传统方式操作资源
    - http://127.0.0.1/item/queryItem.action?id=1  查询,GET
    - http://127.0.0.1/item/saveItem.action        新增,POST
    - http://127.0.0.1/item/updateItem.action      更新,POST
    - http://127.0.0.1/item/deleteItem.action?id=1 删除,GET或POST
- Restful风格操作资源
    - http://127.0.0.1/item/1   查询,GET
    - http://127.0.0.1/item     新增,POST
    - http://127.0.0.1/item     更新,PUT
    - http://127.0.0.1/item/1   删除,DELETE

### 2.Test

```java
@Controller
public class Controller03Restful {

    @RequestMapping(path = "/add/{a}/{b}", method = RequestMethod.GET)
    public String testRestful01 (Model model, @PathVariable int a, @PathVariable int b) {
        model.addAttribute("msg", a + b);
        return "hello";
    }

    @RequestMapping(path = "/add/{a}/{b}", method = RequestMethod.DELETE)
    public String testRestful02 (Model model, @PathVariable int a, @PathVariable int b) {
        model.addAttribute("msg", "" + a + b);
        return "hello";
    }
}
```

- Form: localhost:8080/add?a=1&b=2
-  To : localhost:8080/add/1/2


### 3.Restful Note

- 1. 先在@RequestMapper中配置好path的格式，需要的参数用{name}
- 2. 在@RequestMapper中还需要指定http使用的方法名method = RequestMethod.XXX
- 3. 最后在业务函数中用@PathVariable 把path给的参数 绑定到形参上使用