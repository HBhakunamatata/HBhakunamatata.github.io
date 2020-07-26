---
layout: post
title: "MyBatis-02 CRUD"
description: implement CRUD in Mapper.xml
date: 2020-07-22
categories: MyBatis Maven
---
implement CRUD in MyBatis

## 1. Mapper.xml

- (1) namespace : the name of interface in Dao
- (2) id : the specific method in interface
- (3) parameterType : the type of parameter (No need when it is primitive)
- (4) resultType / resultMap : the type of result for SQL statement

## 2. CRUD in Mybatis

### (1) Preparing methods in interface

You need to statement the methods in dao.EmployeesMappper.java
````java
public interface EmployeeMapper {

    List<Employee> getEmployees();

    // query employees according to id
    Employee getEmployeesById(int emp_no);

    // insert an employee
    int insertEmployee(Employee employee);

    // update an employee
    int updateEmployee(Employee employee);

    // delete an employee
    int deleteEmployee(int emp_no);

    // update with a map
    int updateWithMap (Map<String, Object> map);

}
````

### (2) select

`````xml
<select id="getEmployeesById" parameterType="int" resultType="com.HB.pojo.Employee">
    select * from employees where emp_no = #{emp_no}
</select>
`````

### (3) insert

````xml
<insert id="insertEmployee" parameterType="com.HB.pojo.Employee">
    insert into employees
    (emp_no, birth_date, first_name, last_name, gender, hire_date)
    values
    (#{emp_no}, #{birthdate}, #{firstname}, #{lastname}, #{gender}, #{hiredate})
</insert>
````

### (4) update

```xml
<update id="updateEmployee" parameterType="com.HB.pojo.Employee">
    update employees set
        birth_date = #{birthdate},
        first_name = #{firstname},
        last_name = #{lastname},
        gender = #{gender},
        hire_date = #{hiredate}
    where emp_no = #{emp_no}
</update>
```

### (5) delete

```xml
<delete id="deleteEmployee" parameterType="int">
    delete from employees where emp_no = #{emp_no}
</delete>
```

### (6) Awesome Map

When the sql statment is too long due to the massive columns,  
we can form a _customized_ Map to operate the specific columns.

```xml
  <update id="updateWithMap" parameterType="map">
    update employees set
        first_name = #{randomnameA},
        last_name = #{randomnameB}
    where emp_no = #{randomNum}
  </update>
```

```java
    @Test
    public void testMap () {
        SqlSession session = MyBatisUtils.getSession();

        HashMap<String, Object> map = new HashMap<>();
        map.put("randomnameA", "Yalong");
        map.put("randomnameB", "Sun");
        map.put("randomNum", 1);

        EmployeeMapper mapper = session.getMapper(EmployeeMapper.class);
        mapper.updateWithMap(map);-

        session.commit();
        session.close();
    }
```

## 3. Notes (important)

- (1) [operators] sqlstatements [settings] #{fields}
    - names in sqlstate <-----> sqldatabase columns
    - The #{field name} <--------> methods params or fields in jopo  
        (just the same as parameterType/resultType)  
        (This can be obvious when use a map.)
- (2) After the sql operators [insert|update|delete], you must
> sqlSession.commit();

Thanks [QinJiang](https://space.bilibili.com/95256449?spm_id_from=333.788.b_765f7570696e666f.2)
