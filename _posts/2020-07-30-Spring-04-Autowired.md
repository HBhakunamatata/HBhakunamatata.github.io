---
layout: post
title:  "Spring-04 Autowire"
description: 
date:   2020-07-27
categories: Spring Autowire
---
Autowiring is a kind of DI to simplify the register of beans.


由于在手动配置xml过程中，常常发生字母缺漏和大小写等错误，而无法对其进行检查，使得开发效率降低。  
采用自动装配将避免这些错误，并且使配置简单化。

## 1. Autowire with .xml file

- Write the People.class

```java
public class People {
    private Cat cat;
    private Dog dog;

    public Cat getCat() {
        return cat;
    }

    public void setCat(Cat cat) {
        this.cat = cat;
    }

    public Dog getDog() {
        return dog;
    }

    public void setDog(Dog dog) {
        this.dog = dog;
    }
}
```

- (1) autowire byName

```xml
<bean class="com.HB.pojo.Cat" id="cat"/>
<bean class="com.HB.pojo.Dog" id="dog"/>
<!-- <bean class="com.HB.pojo.Dog" id="dog1"/> -->

<bean class="com.HB.pojo.People" id="people" autowire="byName"/>
```

- __Note:__

    - 当一个bean节点带有 autowire byName的属性时。将查找bean类中所有的set方法名  
        例如setCat，获得将set去掉并且首字母小写的字符串，即cat。
    - 然后在spring容器中继续寻找是否有此字符串名称id的对象。
    - 如果有，就取出注入；如果没有，就报空指针异常。
    - 练习：将DogBean的id改为dog1，就会有NullPoniterException

- (2) autowire byType
    
```xml
<bean class="com.HB.pojo.Cat" id="cat"/>
<bean class="com.HB.pojo.Dog" id="dog"/>
<!-- <bean class="com.HB.pojo.Dog" /> -->

<bean class="com.HB.pojo.People" id="people" autowire="byType"/>
```

- __Note :__
    
    - 使用autowire byType需要保证：同一类型的对象，在spring容器中唯一。
    - 如果不唯一，会有NoUniqueBeanDefinitionException
    - 如果是唯一的，就自动按照类型装配，这时id是没用的，甚至可以删掉
    - 练习：添加一个Dog类型的Bean，就会有NoUniqueBeanDefinitionException
