---
layout: post
title:  "Maven Note"
date:   2020-01-10
description:
categories: Java Maven
---
Describtion test

# Maven Note

## 1.What is mvn

- POM + Lifecycle + Dependency management system + Plugin + Logic
- Issue
  - (1)Jar
  - (2)Ant build
  - (3)JUnit
  - (4)Package

## 2.Two Freatures

- (1) Dependency Management System
  - There is only the reference of the Jar instead of whole Jar
- (2) Deploy easily

## 3.Initialization

- MAVEN_HOME
- %MAVEN_HOME%
- mvn -v

## 4.Repository

- Project ----> local repo ------> central repo
- Project ---> local repo ----> remote repo ---> central repo

## 5.Directory

- src/main/java  : core
- src/main/resource : config
- src/test/java : test
- src/test/resource : test config
- src/main/webapp : (js/css/html/img)

## 6.Command

- mvn clean
- mvn compile
- mvn test
- mvn package
- mvn install
- mvn deploy

## 7.Lifecycle(3)

- Compiler ---> Test ---> Package ---> Install ---> Deploy

## 8.Conception Model
