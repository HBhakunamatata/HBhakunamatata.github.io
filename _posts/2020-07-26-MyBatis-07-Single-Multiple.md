---
layout: post
title: "MyBatis-07 Single--Multiple"
description: 
date: 2020-07-26
categories: Maven MyBatis
---
The solotion the single-multiple issue

# Single --- Multiple

- Issue : We need query a object in a table that contains a clollection of another object in another table.
- Example : query a department infos with all dept-managers and their infos.

### pojo
- (1) Department.java

```java
@Data
public class Department {
    private String deptNo;
    private String deptName;
    private List <DeptManager> managers;
}
```
- (2) DeptManager.java

```java
@Data
public class DeptManager {
    private int empNo;
    private String deptNo;
    private Date fromDate;
    private Date toDate;
}
```

### First Method

- (1) define the method in dao.Department.java

```java
public interface DepartmentMapper {
    Department getDepartment(String deptName);
}
```

- (2) DepartmentMapper.xml

```xml
<mapper namespace="com.HB.dao.DepartmentMapper">
    <select id="getDepartment" resultMap="resultMapDept" parameterType="string">
        select * from departments where dept_no = #{id}
    </select>

    <resultMap id="resultMapDept" type="Department">
        <result property="deptNo" column="dept_no"/>
        <collection property="managers" ofType="DeptManager" select="getMgr" column="dept_no"/>
    </resultMap>

    <select id="getMgr" resultType="DeptManager" >
        select * from dept_manager where dept_no = #{dept_no}
    </select>
</mapper>
```

- (3) test the result

```java
@org.junit.Test
public void test01() {
    SqlSession sqlSession = MyBatisUtils.getSqlSession();
    DepartmentMapper mapper = sqlSession.getMapper(DepartmentMapper.class);
    Department d002 = mapper.getDepartment("d002");
    System.out.println(d002);

    sqlSession.close();
}
```

### The Second Method

- (1) define the method in dao.Department.java

```java
public interface SalaryMapper {
    List<Salary> getDepartment02();
}
```

- (2) DepartmentMapper.xml

```xml
<mapper namespace="com.HB.dao.SalaryMapper">
    <select id="getDepartment02" resultMap="resultMap02">
        select  dept.dept_no dept_no, dept.dept_name dept_name,
               man.emp_no emp_no, man.from_date from_date, man.to_date to_date
        from departments dept, dept_manager man
        where dept.dept_no = man.dept_no and man.dept_no = #{deptName}
    </select>
    
    <resultMap id="resultMap02" type="Department">
        <result property="deptNo" column="dept_no"/>
        <result property="deptName" column="dept_name"/>
        <collection property="managers" ofType="DeptManager">
            <result property="empNo" column="emp_no"/>
            <result property="deptNo" column="dept_no"/>
            <result property="fromDate" column="from_date"/>
            <result property="toDate" column="to_date"/>
        </collection>
    </resultMap>
</mapper>
```

- (3) test the result

```java
@org.junit.Test
public void test02() {
    SqlSession sqlSession = MyBatisUtils.getSqlSession();
    DepartmentMapper mapper = sqlSession.getMapper(DepartmentMapper.class);
    Department d003 = mapper.getDepartment02("d003");
    System.out.println(d003);

    sqlSession.close();
}
```

Thanks [QinJiang](https://space.bilibili.com/95256449?spm_id_from=333.788.b_765f7570696e666f.2)

