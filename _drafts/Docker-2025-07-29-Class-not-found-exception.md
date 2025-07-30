---
layout: post
title: "Docker run: class not found exception"
description: 
date: 2025-07-29
categories: Docker
---

# 1. Problem

occur exception when run docker Spring Boot Application image created by Dockerfile

```shell
docker run -d --name rt-01 rabbitmq-tutorial:latest
```

```shell
Exception in thread "main" java.lang.ClassNotFoundException: cloud.popples.rabbitmq-tutorial.RabbitmqTutorialApplication
        at java.net.URLClassLoader.findClass(URLClassLoader.java:382)
        at java.lang.ClassLoader.loadClass(ClassLoader.java:424)
        at org.springframework.boot.loader.LaunchedURLClassLoader.loadClass(LaunchedURLClassLoader.java:151)
        at java.lang.ClassLoader.loadClass(ClassLoader.java:357)
        at java.lang.Class.forName0(Native Method)
        at java.lang.Class.forName(Class.java:348)
        at org.springframework.boot.loader.MainMethodRunner.run(MainMethodRunner.java:46)
        at org.springframework.boot.loader.Launcher.launch(Launcher.java:108)
        at org.springframework.boot.loader.Launcher.launch(Launcher.java:58)
        at org.springframework.boot.loader.JarLauncher.main(JarLauncher.java:88)
```

# Trouble shot

spring-boot-maven-plugin cannot find main class towards <mainClass> in Configuration

and the path of main class must be ensure valid


# Solution

```xml
<plugin>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-maven-plugin</artifactId>
    <version>${spring-boot.version}</version>
    <configuration>
        <mainClass>cloud.popples.redistutorial.RedisTutorialApplication</mainClass>
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

# Enlightment

1. spring-boot-maven-plugin functions
    - (1) repackage all project jars to enable java -jar xxx
    - (2) remove provider dependencies
    - (3) naming main class path

2. maven package logic