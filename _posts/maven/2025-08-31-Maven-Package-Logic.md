---
layout: post
title: "Maven package logic"
description: 
date: 2025-08-31
categories: Tips
tags: Maven
---

## 1. Issue

We use Spring Boot plugin to package our Java code and deploy them using command line. However it is struggle to deploy many times when only modify one or two jars. Is there a way to split our codes and dependencies?  

## 2. Overview  

- Mechanism of Java and jar packaging
- Mechanism of Maven packaging
- Mechanism of Spring packaging
- How to change packaging way of our Spring application

## 3. Mechanism of Java and jar packaging

Firstly, we need to explore the mechanism of Java and jar packaging.

There are two main concepts _classpath_ and _manifest_.

### 3.1 classpath

#### 3.1.1 compile classpath

```shell
javac -classpath=/jar-home Helloworld.java
```

#### 3.1.2 runtime classpath

Jvm only can find jars either in the classpath or the local directory.

```shell
java -classpath .;/jar-home Helloworld
```

### 3.2 Manifest file

Manifest is config file of jar. The main config items is classpath and MainClass.
But jars that have been packaged into our generated jar cannot be specified into 

```
Main-Class: com.sun.jna.Native

Class-Path: path1 path2 path3
```

### 3.3 Manual jar Example

Manual jar inner directory

```
demo文件夹
|--Demo.class
|--META-INF
|   |--MANIFEST.MF
```

Manual manifest

```
Main-Class: Demo
Class-Path: lib/hutool-all-5.7.16.jar
```

Manual jar runtime directory

```
manual-demo
|--lib
|   |--hutool-all-5.7.16.jar
|--demo.jar
```


## 4. Mechanism of Maven packaging

Package is implemented and customized by plugins in Maven.

When a jar is needed, we tend to use _maven-jar-plugin_ in the pom.

```xml
<build>
    <plugins>
        <!-- 插件jar相关配置 -->
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-jar-plugin</artifactId>
            <version>3.2.0</version>
            <configuration>
                <archive>
                    <!-- 配置MANIFEST.MF文件 -->
                    <manifest>
                        <!-- 将依赖的jar包添加到classpath -->
                        <addClasspath>true</addClasspath>
                        <!-- 配置每个classpath的前缀，例如依赖为 hutool-all-5.7.16.jar，前缀为 lib/，最后classpath为 lib/hutool-all-5.7.16.jar-->
                        <classpathPrefix>lib/</classpathPrefix>
                        <!-- 配置入口类 -->
                        <mainClass>org.example.demo.Demo</mainClass>
                    </manifest>
                </archive>
            </configuration>
        </plugin>
    </plugins>
</build>
```

## 5. Mechanism of Spring packaging

It is implemented by _spring-boot-maven-plugin_ to package Spring applications.

```xml
<plugin>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-maven-plugin</artifactId>
    <version>${spring-boot.version}</version>
    <configuration>
        <mainClass>com.example.exam.ExamApplication</mainClass>
        <skip>false</skip>
    </configuration>
    <executions>
        <execution>
            <id>repackage</id>
            <goals>
                <goal>repackage</goal>
            </goals>
        </execution>
    </executions>
</plugin>
```

## 6. Customize our application package

```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-compiler-plugin</artifactId>
            <version>3.8.1</version>
            <configuration>
                <source>1.8</source>
                <target>1.8</target>
                <encoding>UTF-8</encoding>
            </configuration>
        </plugin>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
            <version>${spring-boot.version}</version>
            <configuration>
                <mainClass>com.example.exam.ExamApplication</mainClass>
                <skip>false</skip>
                <includes>
                    <include>
                        <groupId>nothing</groupId>
                        <artifactId>nothing</artifactId>
                    </include>
                </includes>
            </configuration>
            <executions>
                <execution>
                    <id>repackage</id>
                    <goals>
                        <goal>repackage</goal>
                    </goals>
                </execution>
            </executions>
        </plugin>

        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-jar-plugin</artifactId>
            <configuration>
                <archive>
                    <manifest>
                        <addClasspath>true</addClasspath>
                        <classpathPrefix>lib/</classpathPrefix>
                    </manifest>
                </archive>
            </configuration>
        </plugin>

        <!--设置将 lib 拷贝到应用 Jar 外面-->
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-dependency-plugin</artifactId>
            <executions>
                <execution>
                    <id>copy-dependencies</id>
                    <phase>prepare-package</phase>
                    <goals>
                        <goal>copy-dependencies</goal>
                    </goals>
                    <configuration>
                        <outputDirectory>${project.build.directory}/lib</outputDirectory>
                    </configuration>
                </execution>
            </executions>
        </plugin>
    </plugins>

    <resources>
        <resource>
            <directory>src/main/java</directory>
            <includes>
                <include>**/*.properties</include>
                <include>**/*.xml</include>
                <include>**/*.yml</include>
            </includes>
            <filtering>false</filtering>
        </resource>
        <resource>
            <directory>src/main/resources</directory>
            <includes>
                <include>**/*.properties</include>
                <include>**/*.xml</include>
                <include>**/*.yml</include>
            </includes>
            <filtering>false</filtering>
        </resource>
    </resources>
</build>
```