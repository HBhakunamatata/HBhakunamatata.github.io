---
layout: post
title: "Configurations in MyBatis"
description: 
date: 2020-07-23
categories: MyBatis Maven
---
Configuraitons in mybatis-config.xml  
[https://mybatis.org/mybatis-3/zh/configuration.html](https://mybatis.org/mybatis-3/zh/configuration.html)

## The order of the tags

- The content of element type "configuration" must match  
"(properties?,settings?,typeAliases?,typeHandlers?,objectFactory?,objectWrapperFactory?,reflectorFactory?,plugins?,environments?,databaseIdProvider?,mappers?)"


## <environments>

- MyBatis can be configured with multiple environments,  
 which helps apply your SQL Maps to __multiple databases__.
- Reasons : 
    - different environments need different databases : Test, Development and Production
    - multiple databases share the same SQL Map

- Important things to remember:
    - __While you can configure multiple environments, you can only choose ONE per SqlSessionFactory instance.__
    - __One SqlSessionFactory instance for per database.__
    - We can load environments and set default environment using 'id'.

- __<DataSource>__ type : [pooled | unpooled | JNDI]  
- __<transactionManager>__ : [JDBC | MANAGED]
    - JDBC : This configuration simply makes use of the JDBC commit and rollback facilities directly.
    - MANAGED : This configuration simply does almost nothing. It never commits, or rolls back a connection.

```xml
<environments default="development">
    <environment id="development">
      <transactionManager type="JDBC"/>
      <dataSource type="POOLED">
        <property name="driver" value="${driver}"/>
        <property name="url" value="${url}"/>
        <property name="username" value="${username}"/>
        <property name="password" value="${password}"/>
      </dataSource>
    </environment>
</environments>
```

## <properties>

- It can read in the content in .properties files.
- Note: the setting in the resource is priority of local setting

```properties
driver=com.mysql.cj.jdbc.Driver
url=jdbc:mysql://localhost:3306/employees?useSSL=false&useUnicode=true&serverTimezone=UTC&characterEncoding=UTF-8
username=root
password=********
```

```xml
<properties resource = "db.properties"/>

<!--import .properties file-->
<properties resource="db.properties">
    <!--this setting won't work!-->
    <property name="password" value="111111"/>
</properties>
```

## <TypeAliases>

- Why typeAliases? : A type alias is simply a shorter name for a Java type.  
It's only used in the XML configuration to reduce redundant typing of fully classnames.

- Three ways to use
    - (1) xml
    ```xml
    <typeAliases>
        <typeAlias type="com.HB.pojo.Employee" alias="Employee" />
    </typeAliases>
    ```
    - (2) @Alias annotation

    - (3) Default Aliases

```xml
  <select id="getEmployeesById" parameterType="int" resultType="Employee">
    select * from employees where emp_no = #{emp_no}
  </select>
```

## Mappers

```xml
<mappers> (Recommended)
    <mapper resource="com/HB/dao/employeeMapper.xml" />
</mappers>
or
<mappers>
    <mapper class="com.HB.dao.EmployeeMapper" />
</mappers>
```
- __Note: In case of MapperRegisterFactory's Exception (cannot find mapper)__
    - (1) The name of Mapper.xml must be the same as that of interface.
    - (2) Mapper.xml and interface must be in the same package
    - or mybatis cannot find mapper.xml 

## settings

```xml
<settings>
    <setting name="cacheEnabled" value="true"/>
    <setting name="lazyLoadingEnabled" value="true"/>
    <setting name="logImpl" value="LOG4J"/>
</settings>
```

## Others ...

Thanks [QinJiang](https://space.bilibili.com/95256449?spm_id_from=333.788.b_765f7570696e666f.2)