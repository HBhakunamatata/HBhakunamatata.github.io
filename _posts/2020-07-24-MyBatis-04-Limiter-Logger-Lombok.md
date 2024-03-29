---
layout: post
title: "MyBatis-04 Logger and Limiter"
description: 
date: 2020-07-24
categories: MyBatis Maven Log4J
---
Use Log4J to record the state and Lombok to simplify the pojo.  
There are several methods to implement the limiter in MyBatis.

## 1. Limiter

- Why limiter?
    - To reduce the data that required to be dealed with.

- (1) Registe method

```java
List<Employee> getEmpByLimit01(Map<String, Integer> map);

<select id="getEmpByLimit01" parameterType="map" resultMap="empResultMap">
    select * from employees limit #{startIndex}, #{pageSize}
</select>

```

(2) test the result

```java
@org.junit.Test
public void getEmpByLimit() {
    SqlSession sqlSession = MyBatisUtils.getSqlSession();
    EmployeeMapper mapper = sqlSession.getMapper(EmployeeMapper.class);

    Map<String, Integer> map = new HashMap<>();
    map.put("startIndex", 0);
    map.put("pageSize", 5);
    List<Employee> employeeList = mapper.getEmpByLimit01(map);
    for (Employee emp : employeeList) {
        logger.info(emp);
    }
    sqlSession.close();
}
```

### Another method : PageHelper 

- [How to use pagehelper](https://pagehelper.github.io/docs/howtouse/)
- There is no need to modify the sql statement, just add one line before get pojos in .java

- (1) add maven dependency

```xml
<!-- https://mvnrepository.com/artifact/com.github.pagehelper/pagehelper -->
<dependency>
    <groupId>com.github.pagehelper</groupId>
    <artifactId>pagehelper</artifactId>
    <version>5.1.10</version>
</dependency>
```

(2) add plugin in mybatis-config.xml

```xml
<plugins>
    <plugin interceptor="com.github.pagehelper.PageInterceptor">
    </plugin>
</plugins>
```

(3) Test two common ways to use PageHelper

```java
@org.junit.Test
public void testPageHelper () {
    SqlSession sqlSession = MyBatisUtils.getSqlSession();
    EmployeeMapper mapper = sqlSession.getMapper(EmployeeMapper.class);
    PageHelper.startPage(2, 5);
    List<Employee> employees = mapper.getEmployees();
    for (Employee emp : employees) {
        logger.info(emp);
    }

    logger.info("==============================================");

    PageHelper.offsetPage(2, 5);
    employees = mapper.getEmployees();
    for (Employee emp : employees) {
        logger.info(emp);
    }

    sqlSession.close();
}
```


## 2. Lombok

- Lombok can reduce the quality of code.

```xml
<!-- https://mvnrepository.com/artifact/org.projectlombok/lombok -->
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <version>1.18.12</version>
</dependency>
```

```java
@Data
public class Employee {
    private int emp_no;
    private Date birth_date;
    private String first_name;
    private String last_name;
    private String gender;
    private Date hire_date;
}
```

## 2. Log4J

- Logger can help us to find the SQL error easily.

### (1) add maven dependency

```xml
<dependency>
    <groupId>log4j</groupId>
    <artifactId>log4j</artifactId>
    <version>1.2.17</version>
</dependency>
``` 

### (2) add log4j.properties

```properties
# 将等级为DEBUG的日志信息输出到console和file这两个目的地，console和file的定义在下面的代码
log4j.rootLogger=DEBUG,console,file

# 控制台输出的相关设置
log4j.appender.console = org.apache.log4j.ConsoleAppender
log4j.appender.console.Target = System.out
log4j.appender.console.Threshold=DEBUG
log4j.appender.console.layout = org.apache.log4j.PatternLayout
log4j.appender.console.layout.ConversionPattern=[%c]-%m%n
# 文件输出的相关设置
log4j.appender.file = org.apache.log4j.RollingFileAppender
log4j.appender.file.File=./log/rzp.log
log4j.appender.file.MaxFileSize=10mb
log4j.appender.file.Threshold=DEBUG
log4j.appender.file.layout=org.apache.log4j.PatternLayout
log4j.appender.file.layout.ConversionPattern=[%p][%d{yy-MM-dd}][%c]%m%n
# 日志输出级别
log4j.logger.org.mybatis=DEBUG
log4j.logger.java.sql=DEBUG
log4j.logger.java.sql.Statement=DEBUG
log4j.logger.java.sql.ResultSet=DEBUG
log4j.logger.java.sq1.PreparedStatement=DEBUG
```

### (3) Use the Logger

```java
static Logger logger = Logger.getLogger(Test.class);
logger.info("employee No." + employee.getEmp_no() + " has been found.");
```


Thanks [QinJiang](https://space.bilibili.com/95256449?spm_id_from=333.788.b_765f7570696e666f.2)