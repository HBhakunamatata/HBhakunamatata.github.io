- web基本概念
  - 静态
  - 动态
- web应用程序与web服务器
  - 应用程序开发技术
  - web服务器
- Tomcat服务器安装与配置
- Maven安装与配置
- http协议





- practical：不使用maven框架创建一个网络应用

  - xml版本问题--> 直接使用tomcat的（本机默认3.1）

  ```xml
  <?xml version="1.0" encoding="utf-8"?>
  <web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee
                        http://xmlns.jcp.org/xml/ns/javaee/web-app_3_1.xsd"
    version="3.1"
    metadata-complete="true">
  
  
  </web-app>
  ```

  - maven 仓库

  ```xml
  <dependencies>
      <!-- https://mvnrepository.com/artifact/javax.servlet/javax.servlet-api -->
      <dependency>
          <groupId>javax.servlet</groupId>
          <artifactId>javax.servlet-api</artifactId>
          <version>3.1.0</version>
      </dependency>
      <!-- https://mvnrepository.com/artifact/javax.servlet.jsp/javax.servlet.jsp-api -->
      <dependency>
          <groupId>javax.servlet.jsp</groupId>
          <artifactId>javax.servlet.jsp-api</artifactId>
          <version>2.3.3</version>
      </dependency>
  ```

  - 中文乱码问题

  ```java
  response.setCharacterEncoding("utf-8");
  ```

  - mapping问题
    - 一个Servlet可以对应多个映射路径（多个mapping胡总和使用通配符  "/*" 代表处理所有请求）
    - 优先级：固有的 > 统配符（应用：定义错误处理页面，接住所有异常请求）
    - 可以自定义后缀（*.do），但 * 前不能有任何路径

  - POM文件中的modelVersion
    - modelVersion 描述这个POM文件是遵从哪个版本的项目描述符
    - modelVersion：指定了当前POM模型的版本，对于Maven2及Maven 3来说，它只能是4.0.0；
  - maven项目中module的clean
    -  在开始新的多个模块的项目时，其中的parent项目要先install一回，之后其他子项目才可以运行mvn 的其他命令，否则就会报如标题所述错误。

  

