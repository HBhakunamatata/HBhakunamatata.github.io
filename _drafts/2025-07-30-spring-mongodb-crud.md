---
layout: post
title: "Spring MongoDB CRUD"
description: 
date: 2025-07-30
categories: MongoDB Spring
---

## 1. check fields exist

```shell
# query y = null or not exists
db.c.find({y: null})

# only query y = null
db.c.find({y: {$type : 10}})
db.c.find({y: {$in: [null], $exists: true}})

# 
```

## 2. or & and

```shell
select * from user where address="Shanghai" and age >10 and (name="Bob" or nickName like 'Bob');
```

```json
{
    "address": "Shanghai",
    "$and": [{
        "$or": [{
            "name": "Bob"
        }, {
            "nickName": "Bob"
        }]
    }],
    "name": 2
}
```

```java
@Override
public List<User> userList(ArticleAppQuery articleAppQuery) {
    Criteria criteria = new Criteria();
    criteria.and("age").gt(10);
    Criteria tmp= new Criteria();
    Criteria criteria1 = Criteria.where("name").is("Bob");
    Criteria criteria2 = Criteria.where("nickName").is("Bob");
    criteria.andOperator(tmp.orOperator(criteria1,criteria2));
    criteria.and("address").is("Shanghai"); 
    Query query = new Query(criteria);
    query.with(Sort.by(Sort.Order.desc("createTime")));
    return mongoTemplate.find(query, User.class);
}
```
