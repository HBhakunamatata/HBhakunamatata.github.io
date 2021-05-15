---
layout: post
title:  "MySQL-07 3C and Security"
description: 
date:   2020-04-30
categories: MySQL
---
Charset and Security


## 6.1 charset \ collection \ case

- case insensitive by default in MySQL
- case sensitively only once

```sql
## case sensitive only once
select ... from employees
where last_name = binary "sun";

select ... from employees
order by last_name, first_name
collate utf8mb4_bin;
```

|                    | charset | char length | case sensitive   |
| ------------------ | ------- | ----------- | ---------------- |
| utf8_general_cs    | utf8    | 3           | case insensitive |
| utf8mb4_general_cs | utf8mb4 | 4           | case insensitive |
| utf8_bin           | utf8    | 3           | case sensitive   |
| utf8mb4_bin        | utf8mb4 | 4           | case sensitive   |

## 6.2 Security Management

- security management : access control + user management

- gain _access control_ using _user management_ 

```sql
## user management
use mysql;	select user from user;
create user user_name identified by "password";
rename user old_name to new_name;
drop user if exists user_name;

## change password
set password for user_name = password("xxxxxxx");

## access control
show grants for user_name;
grant 权限 on db_name.tb_name to user_name;
revoke 权限 on db_name.tb_name to user_name;
```

