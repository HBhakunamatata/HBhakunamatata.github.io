---
layout: post
title: "MyBatis-06 Multiple--Single"
description: 
date: 2020-07-25
categories: Maven MyBatis
---
The solotion to multiple-single issue

## Multiple --- Single

- Issue : We need query a object in a table that contains another object in another table.
- Example : query an employee's salary infos with other infos about the employee.

### pojo
- (1) Salary.java

```java
@Data
public class Salary {
    private Employee emp;
    private int salary;
    private Date fromDate;
    private Date toDate;
}
```
- (2) Employee.java

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

### First Method

- (1) define the method in dao.SalaryMapper.java

```java
public interface SalaryMapper {
    List<Salary> getEmpWithSalary01 ();
}
```

- (2) SalaryMapper.xml

```xml
<mapper namespace="com.HB.dao.SalaryMapper">
    <select id="getEmpWithSalary01" resultMap="EmpWithSal">
        select * form salaries
    </select>

    <resultMap id="EmpWithSal" type="Salary">
        <result column="from_date" property="fromDate"/>
        <result column="to_date" property="toDate"/>
        <result column="salary" property="salary"/>
        <association property="emp" javaType="Employee" select="getEmp" column="emp_no"/>
    </resultMap>

    <select id="getEmp" resultType="Employee">
        select * form employees where emp_no = #{emp_no}
    </select>
</mapper>
```

- (3) test the result

```java
@org.junit.Test
public void test01() {
    SqlSession sqlSession = MyBatisUtils.getSqlSession();
    SalaryMapper mapper = sqlSession.getMapper(SalaryMapper.class);
    List<Salary> empSalary = mapper.getEmpWithSalary01();
    for (Salary salary : empSalary) {
        logger.info(empSalary);
    }
}
```

### The Second Method

- (1) define the method in dao.SalaryMapper.java

```java
public interface SalaryMapper {
    List<Salary> getEmpWithSalary02 ();
}
```

- (2) SalaryMapper.xml

```xml
<mapper namespace="com.HB.dao.SalaryMapper">
    <select id="getEmpWithSalary02" returnType="EmpWithSal02">
        select emps.emp_no emp_no, sals.salary salary, sals.from_date from_date, sals.to_date to_date,
        emps.birth_date birth_date, emps.gender gender, emps.first_name first_name, emps.last_name last_name, emps.hire_date hire_date
        from employees emps, salaries sals
        where emps.emp_no = sals.emp_no
    </select>

    <resultMap id="EmpWithSal02" resultType="Salary">
        <result column="emp_no", property="emp">
        <result column="salary", property="salary">
        <result column="from_date" property="fromDate">
        <result column="to_date" property="toDate">
        <association property="emp" javaType="Employee">
            <!--  在这里每一项都要写，漏了就是null  -->
            <result property="emp_no" column="emp_no"/>
            <result column="birth_date" property="birth_date"/>
            <result column="gender" property="gender"/>
            <result column="first_name" property="first_name"/>
            <result column="last_name" property="last_name"/>
            <result column="hire_date" property="hire_date"/>
        <association/>
    </resultMap>
</mapper>
```

- (3) test the result

```java
@org.junit.Test
public void test02() {
    SqlSession sqlSession = MyBatisUtils.getSqlSession();
    SalaryMapper mapper = sqlSession.getMapper(SalaryMapper.class);
    List<Salary> empSalary = mapper.getEmpWithSalary02();
    for (Salary salary : empSalary) {
        logger.info(empSalary);
    }
}
```

Thanks [QinJiang](https://space.bilibili.com/95256449?spm_id_from=333.788.b_765f7570696e666f.2)