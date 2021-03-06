#  
本书主要讲解InnoDB的体系结构和工作原理
并结合源码讲解内部机制(Why)

- Think different
  - 不相信任何神话，学会自己思考
  - 大部分人都知道的可能是错的
  - 去测试，去检验
  - 敢于质疑


# 第一章

- 可移植于众多平台

## 1.1 定义数据库和实例(database and instance)

- 数据库： *.frm, *.MYD, *.MYI 等文件
- 实例： 后台线程 + 一块共享内存
- 关系：大部分情况，实例和数据库一一对应
但集群情况下一个数据库对应多个实例。

- 数据库是文件的集合，是依照某种数据模型组织并存放于二级存储器的数据集合；数据库实例是程序，是位于OS和用户之间的一层数据管理软件，用户或者程序只能通过数据库实例才能和数据库打交道。

- MySQL单进程多线程

- 实例启动时配置资源读取：(以最后读取的值为准)

## 1.2 数据库组成结构 (图)

其中，MySQL插件式存储引擎提供了一系列标准，这些标准和引擎本身无关(每个数据库都需要)，而存储引擎是底层物理结构的实现(每个数据库都不同)
__注意：存储引擎是基于表的，而不是数据库。__

## 1.3 MySQL存储引擎

- 由于是插件式存储引擎，用户可以根据需要定制存储引擎，其中InnoDB是最有名第三方存储引擎(面向在线事务处理 OLTP)

## 1.4 连接数据库

- 本质：进程通信，一个连接进程和数据库实例进行进程通信