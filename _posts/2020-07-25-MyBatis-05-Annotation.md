---
layout: post
title: "MyBatis-05 Annotation"
description: 
date: 2020-07-25
categories: Maven MyBatis
---
implementing CRUD using annotation (Reflection)

## CRUD using annotation

- (1) write your SQL in Mapper.interface

```java
public interface EmployeeMapper {

    @Select("select * from employees where emp_no = #{emp_id}")
    Employee getEmpById (@Param("emp_id") int emp_no);

    @Select("select * from employees limit #{startIndex}, #{pageSize}")
    List<Employee> limitEmp (@Param("startIndex") int startIndex,
                             @Param("pageSize") int pageSize);

    @Insert("insert into employees (emp_no, birth_date, first_name, last_name, gender, hire_date) " +
    "values (#{emp_no}, #{birth_date}, #{first_name}, #{last_name}, #{gender}, #{hire_date})")
    int insertEmp (Employee emp) ;

    @Delete("delete from employees where emp_no = #{emp_no}")
    int deleteEmp (@Param("emp_no") int emp_no);

    @Update("update employees set " +
        "first_name = #{first_name}, " +
        "last_name = #{last_name} " +
    "where emp_no = #{emp_no}")
    int updateEmp (Map<String, Object> map);
    // 但是如果要动态更新属性（即动态生成SQL语句）这种方式就有局限性了
    // 而且使用sql拼接时，多余或者缺少[' '|AND|OR]会增加很多麻烦
    // 所以需要动态SQL
}
```


- (2) test your code

```java
public class Test {

    @org.junit.Test
    public void getEmpById() {
        SqlSession sqlSession = MyBatisUtils.getSqlSession();

        EmployeeMapper mapper = sqlSession.getMapper(EmployeeMapper.class);
        Employee emp = mapper.getEmpById(10054);
        System.out.println(emp);

        sqlSession.close();
    }

    @org.junit.Test
    public void test () {
        SqlSession sqlSession = MyBatisUtils.getSqlSession();
        EmployeeMapper mapper = sqlSession.getMapper(EmployeeMapper.class);

        Employee emp = new Employee(
            2,
            new Date(System.currentTimeMillis()),
            "HH",
            "DD",
            "F",
            new Date(System.currentTimeMillis())
        );

        int i = mapper.insertEmp(emp);
        System.out.println(i + "item inserted");

        Map<String, Object> map = new HashMap<>();
        map.put("emp_no", 2);
        map.put("first_name", "SS");
        map.put("last_name", "LL");
        int i1 = mapper.updateEmp(map);

        System.out.println(i1 + "item changed");

        int i2 = mapper.deleteEmp(2);
        System.out.println(i2 + "item deleted");

    }
}
```

- (3) __Note :__
    
    - 基本类型的参数或者String类型，需要加上@Param, 引用类型不需要加
    - 我们在SQL中引用的就是我们这里的@Param()中设定的属性名
    - 使用annotation，不需要提交事务

    - 但是如果要动态更新属性（即动态生成SQL语句）这种方式就有局限性了
    - 而且使用sql拼接时，多余或者缺少[' '|AND|OR]会增加很多麻烦
    - 所以需要动态SQL