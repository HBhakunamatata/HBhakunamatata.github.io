---
layout: post
title: "MyBatis-01 Get Started"
description: The first experience of MyBatis
date: 2020-07-21
categories: MyBatis Maven
---
How to learn a new technology:
build environment --> write java code --> test the result

## 1.What & why is MyBatis

- [Website(important)](https://mybatis.org/mybatis-3/zh/index.html)
- [Github](https://github.com/mybatis/mybatis-3)
- MyBatis can simplify and automize the code of JDBC.
- MyBatis is a persistence framework
  - RAM <----> ROM
  - ways : IO / JDBC

## 2.Get Strated

### (1) New project with maven template

- add maven dependency

```xml
<!-- https://mvnrepository.com/artifact/org.mybatis/mybatis -->
<dependency>
    <groupId>org.mybatis</groupId>
    <artifactId>mybatis</artifactId>
    <version>3.5.4</version>
</dependency>
<!-- add mysql driver -->
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.20</version>
</dependency>
```

### (2) Building SqlSessionFactory from XML and getting the SqlSession

- MyBatis application <-- SqlSessionFactory <-- SqlSessionFactoryBuilder <-- mybatis-config.xml(important dependencies)

```xml
<!--Mybatis config file-->
<configuration>
<!--1.you can make several environment but need to set the default-->
  <environments default="development">
    <environment id="development">
        <!--2.determining how transactions should be scoped and controlled(TransactionManager)-->
      <transactionManager type="JDBC"/>
        <!--3.DataSource for acquiring database Connection instances(DataSource)-->
      <dataSource type="POOLED">
        <property name="driver" value="com.mysql.cj.jdbc.Driver"/>
        <property name="url" value="jdbc:mysql://localhost:3306/employees?serverTimezone=UTC&amp;useUnicode=true&amp;characterEncoding=UTF-8&amp;useSSL=false"/>
        <property name="username" value="root"/>
        <property name="password" value=""/>
      </dataSource>
    </environment>
  </environments>

<!--(important)register Mapper-->
  <mappers>
    <!--write the Mapper path according to target -->
    <mapper resource="com/HB/dao/employeeMapper.xml"></mapper>
  </mappers>

</configuration>
```

- Write a MyBatisUtil.java (the same as DAO.util.java)

```java
// 1.Building a SqlSessionFactory instance
String resource = "mybatis-config.xml";
InputStream inputStream = Resources.getResourceAsStream(resource);
sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
```

### (3) Acquiring a SqlSession from SqlSessionFactory

- The SqlSession contains absolutely every method needed
 to execute SQL commands against the database.
- The SqlSession is the same as PreparedStatement.

```java
public static SqlSession getSession() {
    return sqlSessionFactory.openSession();
}
```

### (4) Coding after above

- a. creating pojo
- b. creating Dao interface
- c. transfer the implementation into a xxxxxDao.xml file

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
  PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
  "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<!--This file can be called 'EmployeeDao.xml'-->
<mapper namespace="com.HB.dao.EmployeeDao">  // 必须全名
  <select id="getEmployees" resultType="com.HB.pojo.Employee">
    select * from employees limit 0, 5
  </select>
</mapper>
```

### 

  - We have written the .xml file containing a sql statement to perform the implementation of namespace.
  - Maybe mapper can take part of the subtype and revoke() the override method execute() the sql statement. By the way, do not forget to register the mapper.

```java
SqlSession sqlSession = MyBatisUtils.getSession();

EmployeeDao mapper = sqlSession.getMapper(EmployeeDao.class);
List<Employee> employees = mapper.getEmployees();
```

## Some mistakes (important)

- 1.The access to the your subtype.xml __must__ add <build> setting in pom file.  
  //org.apache.ibatis.binding.BindingException: Type interface com.HB.dao.EmployeeDao is not known to the MapperRegistry.
- 2.Do not forget register mapper of your subtype.xml
> <mapper resource="com/HB/dao/employeeMapper.xml"></mapper>
and you must use '/' in resource
while 
> <mapper namespace="com.HB.dao.EmployeeMapper">
must use '.'
- 3.All .xml files use utf-8 codes
> <?xml version="1.0" encoding="UTF-8" ?>

- 4.Take care of the url of mysql 8.0 and the param after ?  

## 作用域（Scope） and Life Cycle

- https://mybatis.org/mybatis-3/zh/getting-started.html



Thanks [QinJiang](https://space.bilibili.com/95256449?spm_id_from=333.788.b_765f7570696e666f.2)