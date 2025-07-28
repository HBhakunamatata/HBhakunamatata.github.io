# MongoDB import and export

mongodump 和mongorestore 主要用于数据库级别的导出和导入，尽管也可以用于集合的操作。
mongoexport 和mongoimport则主要用于集合的导出和导入。

```shell
mongodump --port 27017 \
    -u root \
    -p 123456 \
    -d sdcq_kty \
    --authenticationDatabase admin \
    -o D:\test\mongobackup
```

```shell
mongorestore --port 27018 \
    --authenticationDatabase admin -u dba -p 123456 \
    --dir ./export_data_2023_1210/
```

```shell
mongoexport -d amias_db \
    -c user_1 -o user_1.json \
    -u dba --port=27018 \
    --authenticationDatabase admin
```

```shell

```