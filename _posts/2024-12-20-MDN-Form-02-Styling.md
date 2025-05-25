---
layout: post
title: "MDN Form Styling"
description: 
date: 2024-12-20
categories: 
---



Elements that are easy to style
- form
- fieldset legend
- input
- textarea
- button
- label
- output

Elements that ara difficult to style
- input[type="radio | checkbox | search | color | range | file | datetime-local"]
- select option optgroup datalist

## 1. Font and Text

```CSS
button,
input,
select,
textarea {
  font-family: inherit;
  font-size: 100%;
}
```

## 2. Boxing border size

```CSS
input,
textarea,
select,
button {
  width: 150px;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
```

## 3. Advanced Form Styling

### 3.1 Operation appearance

```CSS
input {
  appearance: none;
}

input[type="search"] {
  appearance: none;
}

input[type="search"]:not(:focus, :active)::-webkit-search-cancel-button { display: none; }

input[type="checkbox"] {
  appearance: none;
}
```

### 3.2 Radio and checkbox styling

```CSS
input[type="checkbox"] {
  position: relative;
  width: 1em;
  height: 1em;
  border: 1px solid gray;
  /* 调整文本基线上复选框的位置 */
  vertical-align: -2px;
  /* 在此设置，以便 Windows 的高对比度模式可以覆盖 */
  color: green;
}

input[type="checkbox"]::before {
  content: "✔";
  position: absolute;
  font-size: 1.2em;
  right: -1px;
  top: -0.3em;
  visibility: hidden;
}

input[type="checkbox"]:checked::before {
  /* 使用 `visibility` 而不是 `display`，以避免重新计算布局 */
  visibility: visible;
}

input[type="checkbox"]:disabled {
  border-color: black;
  background: #ddd;
  color: gray;
}
```

### 3.3 select

```CSS
.select-wrapper {
  position: relative;
}

.select-wrapper::after {
  content: "▼";
  font-size: 1rem;
  top: 6px;
  right: 10px;
  position: absolute;
}
```

### 3.4 datetime

Cannot styling, yu must use some libs to style it.

### 3.5 Range

```CSS
input[type="range"] {
  appearance: none;
  background: red;
  height: 2px;
  padding: 0;
  outline: 1px solid transparent;
}
```

### 3.6 Color

```CSS
input[type="color"] {
  border: 0;
  padding: 0;
}
```

### 3.7 File

https://mdn.github.io/learning-area/html/forms/styling-examples/styled-file-picker.html

```CSS
input[type="file"] {
  height: 0;
  padding: 0;
  opacity: 0;
}

label[for="file"] {
  box-shadow: 1px 1px 3px #ccc;
  background: linear-gradient(to bottom, #eee, #ccc);
  border: 1px solid rgb(169, 169, 169);
  border-radius: 5px;
  text-align: center;
  line-height: 1.5;
}

label[for="file"]:hover {
  background: linear-gradient(to bottom, #fff, #ddd);
}

label[for="file"]:active {
  box-shadow: inset 1px 1px 3px #ccc;
}
```


## 4. pseudo classes Form

### 4.1 required and optional

```CSS
input:required {
  border: 1px solid black;
}

input:optional {
  border: 1px solid silver;
}
```

### 4.2 Generate Contents

```CSS
input[type="radio"]::before {
  display: block;
  content: " ";
  width: 10px;
  height: 10px;
  border-radius: 6px;
  background-color: red;
  font-size: 1.2em;
  transform: translate(3px, 3px) scale(0);
  transform-origin: center;
  transition: all 0.3s ease-in;
}

input[type="radio"]:checked::before {
  transform: translate(3px, 3px) scale(1);
  transition: all 0.3s cubic-bezier(0.25, 0.25, 0.56, 2);
}
```

### 4.3 :valid and :invalid

```HTML
<div>
  <label for="fname">First name *: </label>
  <input id="fname" name="fname" type="text" required />
  <span></span>
</div>
```

```CSS
input + span {
  position: relative;
}

input + span::before {
  position: absolute;
  right: -20px;
  top: 5px;
}

input:invalid {
  border: 2px solid red;
}

input:invalid + span::before {
  content: "✖";
  color: red;
}

input:valid + span::before {
  content: "✓";
  color: green;
}
```

### 4.4 :disabled

```CSS
input[type="text"]:disabled {
  background: #eee;
  border: 1px solid #ccc;
}

.disabled-label {
  color: #aaa;
}
```