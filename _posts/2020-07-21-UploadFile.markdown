---
layout: post
title: "UploadFile in Tomcat"
description: How to upload a file in Tomcat
date: 2020-07-21
categories: Servlet
---
How to upload a file in Tomcat

# UploadFile in Tomcat

## 1.Import maven dependencies

- commons-io-2.6.jar
- commons-fileupload-1.4.jar

```xml
<!-- https://mvnrepository.com/artifact/commons-fileupload/commons-fileupload -->
    <dependency>
        <groupId>commons-fileupload</groupId>
        <artifactId>commons-fileupload</artifactId>
        <version>1.4</version>
</dependency>
<!-- https://mvnrepository.com/artifact/commons-io/commons-io -->
<dependency>
        <groupId>commons-io</groupId>
    <artifactId>commons-io</artifactId>
    <version>2.6</version>
</dependency>
```

## 2.jsp files

#### (1) index.jsp : send the form to Tomcat

- form setting (Important)
    - method : _MUST_ be post because get method has size limit(1024K)
    - enctype: multipart/form-data --> to mark the upload file(RFC1867)
    - action : the servlet mapping of your UploadFileServlet

```jsp
  <form action="/TomcatTest/upload" method="post" enctype="multipart/form-data">
    用户名称: <input type="text" name="username"> <br>
    文件上传: <input type="file" name="filename">  <br>
    <input type="submit" value="上传">
  </form>
```

#### (2) message.jsp : show the message of receiving file successfully

```jsp
    <h2>${message}</h2>  
    // receive the message from request attribute
```

## 3.FileUploadServlet

- Related classes
    - [DiskFileItemFactory.java](http://commons.apache.org/proper/commons-fileupload/apidocs/org/apache/commons/fileupload/disk/DiskFileItemFactory.html)
    - [ServletFileUpload.java](http://commons.apache.org/proper/commons-fileupload/apidocs/org/apache/commons/fileupload/servlet/ServletFileUpload.html)

#### Steps

- (1) 检测请求报文是否为多媒体上传

```java
    if (!ServletFileUpload.isMultipartContent(req)){
        // 如果不是直接结束处理
        PrintWriter writer = resp.getWriter();
        writer.println("Error: 表单必须包含 enctype=multipart/form-data");
        writer.flush();
        return;
    }
```

- (2) 工厂创建fileitem来容纳上传的文件

```java
    // 工厂设置fileitem的参数，fileitem只是用来容纳的，传输交给ServletFileUpload
    DiskFileItemFactory factory = new DiskFileItemFactory();

    // 工厂设置参数
    factory.setDefaultCharset("utf-8");     //设置编码方式
    // 创建临时文件删除处理器
    FileCleaningTracker tracker = new FileCleaningTracker();
    tracker.track(getServletContext().getRealPath("/"), new Object());
    factory.setFileCleaningTracker(tracker);
    System.out.println(factory.getFileCleaningTracker() == null);
    // 设置内存临界值，超过这个值就改在硬盘临时目录储存
    factory.setSizeThreshold(MEMORY_THRESHOLD);
    // 设置临时文件存储目录, 这个地址必须是安全的(用户无法通过url访问，例如/WEB—INF/下)
    System.out.println("TempFile in: " + System.getProperty("java.io.tmpdir"));
    factory.setRepository(new File(System.getProperty("java.io.tmpdir")));
```

- (3) 使用ServletFileUpload来处理上传过程

```java
    // 使用ServletFileUpload来处理上传过程
    ServletFileUpload upload = new ServletFileUpload(factory);

    // 设置上传操作参数
    // 设置文件最大值
    upload.setFileSizeMax(MAX_FILE_SIZE);
    // 设置请求的最大值
    upload.setSizeMax(MAX_REQUEST_SIZE);
    // 设置字符集
    upload.setHeaderEncoding("UTF-8");
    // (可选) 添加上传进程监听器
    // TODO: 2020/7/21 使用进程条需要前端知识，以后补上，但这个就算实现了网速快的话很难看见效果
    upload.setProgressListener(new ProgressListener() {
        // l : 已经读入的字节数
        // l1: 文件总字节数
        @Override
        public void update(long l, long l1, int i) {
            System.out.println("We are currently reading item " + i);
            if (l == -1) {
                System.out.println("So far, " + l + " bytes have been read.");
            } else {
                System.out.println("So far, " + l + " of " + l1
                                  + " bytes have been read.");
            }
        }
    });
```

- (4) 准备好临时路径来存储上传的文件

````java
// 这个路径相对当前应用的目录
    String uploadPath = req.getServletContext().getRealPath("/") +
            File.separator + UPLOAD_DIRECTORY;  // 添加分隔符确保路径安全
    System.out.println("储存路径:" + uploadPath);

    // 如果目录不存在则创建
    File uploadDir = new File(uploadPath);
    if (!uploadDir.exists()) {
        uploadDir.mkdir();
    }

    try {
        // 用ServletFileUpload把请求数据列表放进临时目录
        List<FileItem> fileitems = upload.parseRequest(req);

        if (fileitems != null && fileitems.size() != 0) {
            for (FileItem item : fileitems) {
                // 处理不在表单中的字段
                if (!item.isFormField()) {
                    String fileName = new File(item.getName()).getName();
                    System.out.println(item.getName());
                    System.out.println(fileName);
                    String filePath = uploadPath + File.separator + fileName;
                    File storeFile = new File(filePath);
                    item.write(storeFile);
                    req.setAttribute("message", "文件上传成功!");
                }
            }
        }

    } catch (FileUploadException e) {
        e.printStackTrace();
    } catch (Exception e) {
        e.printStackTrace();
    }
    // 跳转到 message.jsp
    req.getServletContext().getRequestDispatcher("/message.jsp").forward(req, resp);
````


## web.xml

```xml
    <servlet>
        <servlet-name>uploadfile</servlet-name>
        <servlet-class>com.HB.servlet.FileUploadServlet</servlet-class>
    </servlet>
    <servlet-mapping>
        <servlet-name>uploadfile</servlet-name>
        <url-pattern>/upload</url-pattern>
    </servlet-mapping>
```

## 后记

- Use commons-fileupload to handle the transfer of files according to RFC-1867
- Use DiskFileItemFactory to store the data from fileupload and 
    package them into fileitems.
- But fileitems is also a temp repo. We need to write() to local directory

## TODO

- reading RFC-1867
- having added FileCleaningTracker but cannot see the result obviously
- implementing the Progress bar contact with uploadProgressListener in front page
