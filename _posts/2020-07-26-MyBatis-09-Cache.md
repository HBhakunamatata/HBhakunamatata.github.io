---
layout: post
title: "MyBatis-09 Cache"
description: 
date: 2020-07-26
categories: Maven MyBatis
---
Use cache mechanism in MyBatis

# Cache

### 1. Why use cache?

- Because the connection towards MySQL costs a lot of resources.
- Saving the data in the SRAM can reduce the quantity of connection  
and improve the behavior.

### 2. What kind of data need storing in cache?

- The data that be queried much but modified little.

### 3. Caches Mechanism (important)

- get : First query the second level cache, then local cache in sqlsession,  
        neither found, execute the sql statement in db.
- put : After querying, put the result in loacl cache.  
        When the sqlsession closes, put the local cache into the second level cache.

### 4. When Local Cache fails
    
    - a. query something that never be queried
    - b. insert, update and delete statements will flush the cache
    - c. use sqlSession.clearcache();

### 5. How to use the two kinds of cache

- By default, just local session caching is enabled that is used to cache data for one session.

- (1) To enable a global second level of caching

```xml
In mybatis-config.xml
<setting name="cacheEnabled" value="true"/>

Put into <mapper> in mapper.xml
<cache />
OR
<cache
  eviction="FIFO"
  flushInterval="60000"  // ms
  size="512"
  readOnly="true"/>
```

- (2) Test and the result

```java
@org.junit.Test
public void test01 () {
    SqlSession sqlSession1 = MyBatisUtils.getSqlSession();
    SqlSession sqlSession2 = MyBatisUtils.getSqlSession();

    EmployeeMapper employeeMapper1 = sqlSession1.getMapper(EmployeeMapper.class);
    //DepartmentMapper departmentMapper = sqlSession.getMapper(DepartmentMapper.class);

    // Local Cache
    Employee emp1 = employeeMapper1.getEmp(1);
    System.out.println(emp1);
    Employee emp2 = employeeMapper1.getEmp(1);
    System.out.println(emp2);

    // Second Cache
    sqlSession1.close();

    EmployeeMapper employeeMapper2 = sqlSession2.getMapper(EmployeeMapper.class);
    Employee emp3 = employeeMapper2.getEmp(1);
    System.out.println(emp3);

    sqlSession2.close();
}
```

result : logger
```
Logging initialized using 'class org.apache.ibatis.logging.stdout.StdOutImpl' adapter.
PooledDataSource forcefully closed/removed all connections.
PooledDataSource forcefully closed/removed all connections.
PooledDataSource forcefully closed/removed all connections.
PooledDataSource forcefully closed/removed all connections.
Cache Hit Ratio [com.HB.dao.EmployeeMapper]: 0.0
Opening JDBC Connection
Created connection 1157726741.
Setting autocommit to false on JDBC Connection [com.mysql.cj.jdbc.ConnectionImpl@45018215]
==>  Preparing: select * from employees where emp_no = ? 
==> Parameters: 1(Integer)
<==    Columns: emp_no, birth_date, first_name, last_name, gender, hire_date
<==        Row: 1, 2020-07-23, Yalong, Sun, M, 2020-07-23
<==      Total: 1
Employee(empNo=1, birthDate=2020-07-23, firstName=Yalong, lastName=Sun, gender=M, hireDate=2020-07-23)
Cache Hit Ratio [com.HB.dao.EmployeeMapper]: 0.0
Employee(empNo=1, birthDate=2020-07-23, firstName=Yalong, lastName=Sun, gender=M, hireDate=2020-07-23)
Resetting autocommit to true on JDBC Connection [com.mysql.cj.jdbc.ConnectionImpl@45018215]
Closing JDBC Connection [com.mysql.cj.jdbc.ConnectionImpl@45018215]
Returned connection 1157726741 to pool.
Cache Hit Ratio [com.HB.dao.EmployeeMapper]: 0.3333333333333333
Employee(empNo=1, birthDate=2020-07-23, firstName=Yalong, lastName=Sun, gender=M, hireDate=2020-07-23)

Process finished with exit code 0
```


### 6. Ehcache

- [Ehcache](http://mybatis.org/ehcache-cache/) is a widely used java distributed cache  
    for general purpose caching, Java EE and light-weight containers.
- add maven dependency
```xml
<dependency>
    <groupId>org.mybatis.caches</groupId>
    <artifactId>mybatis-ehcache</artifactId>
    <version>1.2.1</version>
</dependency>
```

- configure wtih ehcache.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ehcache xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:noNamespaceSchemaLocation="http://ehcache.org/ehcache.xsd"
         updateCheck="false">
    <!--
       diskStore：为缓存路径，ehcache分为内存和磁盘两级，此属性定义磁盘的缓存位置。参数解释如下：
       user.home – 用户主目录
       user.dir  – 用户当前工作目录
       java.io.tmpdir – 默认临时文件路径
     -->
    <diskStore path="java.io.tmpdir/Tmp_EhCache"/>
    <!--
       defaultCache：默认缓存策略，当ehcache找不到定义的缓存时，则使用这个缓存策略。只能定义一个。
     -->
    <!--
      name:缓存名称。
      maxElementsInMemory:缓存最大数目
      maxElementsOnDisk：硬盘最大缓存个数。
      eternal:对象是否永久有效，一但设置了，timeout将不起作用。
      overflowToDisk:是否保存到磁盘，当系统当机时
      timeToIdleSeconds:设置对象在失效前的允许闲置时间（单位：秒）。仅当eternal=false对象不是永久有效时使用，可选属性，默认值是0，也就是可闲置时间无穷大。
      timeToLiveSeconds:设置对象在失效前允许存活时间（单位：秒）。最大时间介于创建时间和失效时间之间。仅当eternal=false对象不是永久有效时使用，默认是0.，也就是对象存活时间无穷大。
      diskPersistent：是否缓存虚拟机重启期数据 Whether the disk store persists between restarts of the Virtual Machine. The default value is false.
      diskSpoolBufferSizeMB：这个参数设置DiskStore（磁盘缓存）的缓存区大小。默认是30MB。每个Cache都应该有自己的一个缓冲区。
      diskExpiryThreadIntervalSeconds：磁盘失效线程运行时间间隔，默认是120秒。
      memoryStoreEvictionPolicy：当达到maxElementsInMemory限制时，Ehcache将会根据指定的策略去清理内存。默认策略是LRU（最近最少使用）。你可以设置为FIFO（先进先出）或是LFU（较少使用）。
      clearOnFlush：内存数量最大时是否清除。
      memoryStoreEvictionPolicy:可选策略有：LRU（最近最少使用，默认策略）、FIFO（先进先出）、LFU（最少访问次数）。
      FIFO，first in first out，这个是大家最熟的，先进先出。
      LFU， Less Frequently Used，就是上面例子中使用的策略，直白一点就是讲一直以来最少被使用的。如上面所讲，缓存的元素有一个hit属性，hit值最小的将会被清出缓存。
      LRU，Least Recently Used，最近最少使用的，缓存的元素有一个时间戳，当缓存容量满了，而又需要腾出地方来缓存新的元素的时候，那么现有缓存元素中时间戳离当前时间最远的元素将被清出缓存。
   -->
    <defaultCache
            eternal="false"
            maxElementsInMemory="10000"
            overflowToDisk="false"
            diskPersistent="false"
            timeToIdleSeconds="1800"
            timeToLiveSeconds="259200"
            memoryStoreEvictionPolicy="LRU"/>

    <cache
            name="cloud_user"
            eternal="false"
            maxElementsInMemory="5000"
            overflowToDisk="false"
            diskPersistent="false"
            timeToIdleSeconds="1800"
            timeToLiveSeconds="1800"
            memoryStoreEvictionPolicy="LRU"/>

</ehcache>
```