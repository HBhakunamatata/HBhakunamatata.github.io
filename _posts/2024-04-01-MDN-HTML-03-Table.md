---
layout: post
title: "MDN HTML Part3 - Table"
description: 
date: 2024-01-01
categories: Python
---

## 1.1 Table

1. 标题 th
2. 跨越多行多列 colspan rowspan

```html
<table>
    <caption>How I chose to spend my money</caption>
    <thead>
      <tr>
        <th>Purchase</th>
        <th>Location</th>
        <th>Date</th>
        <th>Evaluation</th>
        <th>Cost (€)</th>
      </tr>
    </thead>
    <tfoot>
      <tr>
        <td colspan="4">SUM</td>
        <td>118</td>
      </tr>
    </tfoot>
    <tbody>
      <tr>
        <td>Haircut</td>
        <td>Hairdresser</td>
        <td>12/09</td>
        <td>Great idea</td>
        <td>30</td>
      </tr>
      <tr>
        <td>Lasagna</td>
        <td>Restaurant</td>
        <td>12/09</td>
        <td>Regrets</td>
        <td>18</td>
      </tr>
      <tr>
        <td>Shoes</td>
        <td>Shoeshop</td>
        <td>13/09</td>
        <td>Big regrets</td>
        <td>65</td>
      </tr>
      <tr>
        <td>Toothpaste</td>
        <td>Supermarket</td>
        <td>13/09</td>
        <td>Good</td>
        <td>5</td>
      </tr>
    </tbody>
</table>
```

3. 为表格中的列提供共同的样式

```html
<table>

  <colgroup>
    <col />
    <col style="background-color: yellow" />
  </colgroup>
  <!-- 或者使用span指定列数 -->
  <colgroup>
    <col style="background-color: yellow" span="2" />
  </colgroup>

  <tr>
    <th>Data 1</th>
    <th>Data 2</th>
  </tr>
  <tr>
    <td>Calcutta</td>
    <td>Orange</td>
  </tr>
  <tr>
    <td>Robots</td>
    <td>Jazz</td>
  </tr>
</table>
```

### 1.1.2 对于视力受损的用户的表格

- scope 属性


```html
<thead>
  <tr>
    <th scope="col">Purchase</th>
    <th scope="col">Location</th>
    <th scope="col">Date</th>
    <th scope="col">Evaluation</th>
    <th scope="col">Cost (€)</th>
  </tr>
</thead>
```