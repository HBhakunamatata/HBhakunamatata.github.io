---
layout: post
title: "MDN Form Validation"
description: 
date: 2024-12-20
categories: 
---



## 1. Sending Files

```HTML
<form method="post" enctype="multipart/form-data">
  <div>
    <label for="file">Choose a file</label>
    <input type="file" id="file" name="myFile" />
  </div>
  <div>
    <button>Send the file</button>
  </div>
</form>
```

## 2. Security Issues

## 2.1 XSS

通过向页面或者服务器上植入攻击脚本，使得用户在加载或者点击页面元素时发送个人账号信息(cookie等)，然后使用cookie在其他机器上登录账号进行非法操作

## 2.2 CSRF

黑客引诱用户打开黑客植入的链接,黑客利用用户的登录状态发起的跨站请求。

## 2.3 SQL Insertion