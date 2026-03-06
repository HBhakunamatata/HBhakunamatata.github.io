---
layout: post
title: "Maven Build Lifecycle"
description: 
date: 2025-08-30
categories: Maven
---

## 1.1 Lifecycle

A lifecycle is made up of several phases.

- default
- site
- clean

## 1.2 Phase

A phase is made up of plugin goals

validate compile test package verify install deploy

## 1.3 Plugin and its Goals

![maven-plugins](/assets/post-images/maven/mavenplugins.webp)

Each plugin has one or more goals, each goal can bind to one or more phase. If a goal is bound to no phase, the goal can only be triggered by command-line.

## 1.4 How to customize phase

### change packaging way

### add plugin configuration

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0">

  <build>
    <plugins>
      <plugin>
        <artifactId>maven-myquery-plugin</artifactId>
        <version>1.0</version>
        <executions>
          <execution>
            <id>execution1</id>
            <phase>install</phase>
            <configuration>
              <url>http://www.bar.com/query</url>
              <timeout>15</timeout>
              <options>
                <option>four</option>
                <option>five</option>
                <option>six</option>
              </options>
            </configuration>
            <goals>
              <goal>query</goal>
            </goals>
          </execution>
        </executions>
      </plugin>
    </plugins>
  </build>
</project>
```