---
layout: post
title:  "Swagger Uses"
description: 
date:   2022-05-12
categories: Swagger
---
Swagger

## Why use Swagger

- restful interface doc generater online
- ... function test
- 

## Introduction to Swagger

## Get Started with Swagger

Implement Swagger in Spring-Boot

1. add maven repository

```xml
<dependency>
    <groupId>io.springfox</groupId>
    <artifactId>springfox-swagger2</artifactId>
    <version>2.9.2</version>
</dependency>

<dependency>
    <groupId>com.github.xiaoymin</groupId>
    <artifactId>swagger-bootstrap-ui</artifactId>
    <version>1.9.6</version>
</dependency>
```

2. config Swagger in project

```java
@Configuration
@EnableSwagger2
@EnableSwaggerBootstrapUI
public class SwaggerConfig extends WebMvcConfigurationSupport {

    @Bean
    public Docket api() {
        return new Docket(DocumentationType.SWAGGER_2)
                // bind display information in swagger-ui
            .apiInfo(apiInfo())
            .select()
                // scan the controllers under the path
            .apis(Predicates.not(RequestHandlerSelectors.basePackage("cloud.popples.swagger")))
            .build();
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("swagger-ui.html")
                .addResourceLocations("classpath:/META-INF/resources/");
        registry.addResourceHandler("/webjars/**")
                .addResourceLocations("classpath:/META-INF/resources/webjars/");
    }

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title("Demo project for swagger")
                .description("Description for this project")
                .version("1.0.0")
                .build();
    }

}
```

3. 使用swagger注解集那个接口定义至swagger-ui

```java

```

4. swagger-ui测试


## Extensive Function about Swagger