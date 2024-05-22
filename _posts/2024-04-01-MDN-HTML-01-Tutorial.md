---
layout: post
title: "MDN HTML Part1 - Introduction"
description: 
date: 2024-01-01
categories: Python
---

## 1.1 What is HTML

$$HTML=\{e|elements\ that\ describes\ the\ organization\ of\ web\ documents\}$$

The _behavior_ of each element is controlled by _attrbutes_ stated in element.

## 1.2 Head

```html
1.title  <title></title>

2.meta
    charset  <meta charset="utf-8"/>
    name-content <meta name="author" content="fjs">
3.favion  <link rel="icon" href="">
4.css     <link rel="stylesheet" href="">
5.javascript <script src="" defer>

<html lang="en">
```

## 1.3 Structure and Semantic (important)

```
标题: h1 h2 h3
段落: p
列表: ol->li ul->li
强调(是否有语义的需要): em strong <---> span

```

Why we need structure? 

- Spend less time to gain more infomation
- Optimize seo search in browser
- Facilite disables
- Using css styling the content


## 1.4 Hyperlink

Hyperlink connets network resource.

- href : 相对 绝对 文档id
- target : _blank
- title


```html
<p>
  要提供意见和建议，请将信件邮寄至<a href="contacts.html#Mailing_address">我们的地址</a>。
</p>
```

### 1.4.1 Hyperlink Best Practice

1. Use clear link wording


```html
<!-- good one -->
<p><a href="https://www.mozilla.org/firefox/">Download Firefox</a></p>

<!-- bad one -->
<p>
  <a href="https://www.mozilla.org/firefox/">Click here</a> to download Firefox
</p>
```

2. Linking to non-HTML resources — leave clear signposts


```html
<p>
  <a href="https://www.example.com/video-stream/" target="_blank">
    Watch the video (stream opens in separate tab, HD quality)
  </a>
</p>
```

3. Use the download attribute and leave the size info when linking to a download


```html
<a
  href="https://download.mozilla.org/?product=firefox-latest-ssl&os=win64&lang=en-US"
  download="firefox-latest-64bit-installer.exe">
  Download Latest Firefox for Windows (64-bit) (English, US)
</a>
```

## 1.5 Advanced Text formatting

### 1.5.1 Describtion List

```html
<dl>
  <dt>内心独白</dt>
  <dd>
    戏剧中，某个角色对自己的内心活动或感受进行念白表演，这些台词只面向观众，而其他角色不会听到。
  </dd>
  <dt>语言独白</dt>
  <dd>
    戏剧中，某个角色把自己的想法直接进行念白表演，观众和其他角色都可以听到。
  </dd>
  <dt>旁白</dt>
  <dd>
    戏剧中，为渲染幽默或戏剧性效果而进行的场景之外的补充注释念白，只面向观众，内容一般都是角色的感受、想法、以及一些背景信息等。
  </dd>
</dl>
```

### 1.5.2 Citation

- block citation
    - 缩进2格
    - cite属性

```html
<p>Here is a blockquote:</p>
<blockquote
  cite="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/blockquote">
  <p>
    The <strong>HTML <code>&lt;blockquote&gt;</code> Element</strong> (or
    <em>HTML Block Quotation Element</em>) indicates that the enclosed text is
    an extended quotation.
  </p>
</blockquote>
```


- inline citation

```html
<p>
  The quote element — <code>&lt;q&gt;</code> — is
  <q cite="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/q">intended for short quotations that don't require paragraph breaks.</q>
</p>
```

- cite
    Most browser donot support _cite_ attribute.


```html
<p>
  According to the
  <a href="/zh-CN/docs/Web/HTML/Element/blockquote">
    <cite>MDN blockquote page</cite></a
  >:
</p>

<blockquote
  cite="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/blockquote">
  <p>
    The <strong>HTML <code>&lt;blockquote&gt;</code> Element</strong> (or
    <em>HTML Block Quotation Element</em>) indicates that the enclosed text is
    an extended quotation.
  </p>
</blockquote>

<p>
  The quote element — <code>&lt;q&gt;</code> — is
  <q cite="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/q"
    >intended for short quotations that don't require paragraph breaks.</q
  >
  — <a href="/zh-CN/docs/Web/HTML/Element/q"> <cite>MDN q page</cite></a
  >.
</p>
```


### 1.5.3 Other elements

```html
<!-- 1.缩略语 -->
<p>
  我们使用
  <abbr title="超文本标记语言（Hyper text Markup Language）">HTML</abbr>
  来组织网页文档。
</p>

<!-- 2.上标下标 -->
<p>如果 x<sup>2</sup> 的值为 9，那么 x 的值必为 3 或 -3。</p>

<!-- 3.地址 -->
<address>
  <p>
    Chris Mills<br />
    Manchester<br />
    The Grim North<br />
    UK
  </p>

  <ul>
    <li>Tel: 01234 567 890</li>
    <li>Email: me@grim-north.co.uk</li>
  </ul>
</address>

<!-- 4.时间 -->
<time datetime="2016-01-20">2016 年 1 月 20 日</time>
```

## 1.6 Document_and_website_structure

- \<main> 存放每个页面独有的内容。每个页面上只能用一次\<main>，且直接位于 \<body> 中。最好不要把它嵌套进其他元素。
- \<article> 包围的内容即一篇文章，与页面其他部分无关（比如一篇博文）。
- \<section> 与 \<article> 类似，但 \<section> 更适用于组织页面使其按功能（比如迷你地图、一组文章标题和摘要）分块。一般的最佳用法是：以 标题 作为开头；也可以把一篇 \<article> 分成若干部分并分别置于不同的 \<section> 中，也可以把一个区段 \<section> 分成若干部分并分别置于不同的 \<article> 中，取决于上下文。
- \<aside> 包含一些间接信息（术语条目、作者简介、相关链接，等等）。
- \<header> 是简介形式的内容。如果它是 \<body> 的子元素，那么就是网站的全局页眉。如果它是 \<article> 或\<section> 的子元素，那么它是这些部分特有的页眉（此 \<header> 非彼 标题）。
- \<nav> 包含页面主导航功能。其中不应包含二级链接等内容。
- \<footer> 包含了页面的页脚部分。


```html
header
  nav
main
  article
    section
  aside
footer
```