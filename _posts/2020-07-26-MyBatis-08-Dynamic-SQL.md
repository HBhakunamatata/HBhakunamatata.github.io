---
layout: post
title: "MyBatis-08 Dynamic SQL"
description: 
date: 2020-07-26
categories: Maven MyBatis
---
Dynamic SQL is a sql statement in world.  
Dynamic SQL is a safe sql statement according to different conditions.

## Dynamic SQL

### if

```xml
<select id="getEmpIf" resultType="Employee" parameterType="map">
    select * from employees where 1=1
    <if test="gender != null">
        and gender = #{gender}
    </if>
    <if test="limiter != null">
        limit #{limiter}
    </if>
</select>
```

### where

```xml
<select id="getEmpWhere" resultType="Employee" parameterType="map">
    select * from employees
    <where>
        <if test="gender != null">
        and gender = #{gender}
        </if>
        <if test="limiter != null">
            limit #{limiter}
        </if>
    </where>
</select>
```
### choose

```xml
<select id="getEmpChoose" parameterType="map" resultType="Employee">
    select * from employees
    <where>
        <choose>
            <when test="emp_no != null">
                emp_no = #{empNo}
            </when>
            <when test="birthDate != null">
                and birth_date = #{birthDate}
            </when>
            <otherwise>
                and hire_date = #{hireDate}
            </otherwise>
        </choose>
    </where>
</select>
```

### An example

```java
@org.junit.Test
public void test01 () {

    SqlSession sqlSession = MyBatisUtils.getSqlSession();
    EmployeeMapper mapper = sqlSession.getMapper(EmployeeMapper.class);

    Map<String, Object> map = new HashMap<>();
    map.put("gender", "F");
    map.put("limiter", 5);

    List<Employee> list = mapper.getEmpIf(map);

    for (Employee emp : list) {
        System.out.println(emp);
    }

    sqlSession.close();
}
```

Thanks [QinJiang](https://space.bilibili.com/95256449?spm_id_from=333.788.b_765f7570696e666f.2)