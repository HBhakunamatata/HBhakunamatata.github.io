---
layout: post
title: "MDN Form Structure and Elements"
description: 
date: 2024-12-20
categories: 
---


HTML structure
styling form controls
validating form data
submitting data to the server

## 1.1 structure

```HTML
<form>
  <section>
    <h2>联系人信息</h2>
    <fieldset>
        <legend>称号</legend>
        <ul>
        <li>
            <label for="title_1">
            <input type="radio" id="title_1" name="title" value="A" />
            Ace
            </label>
        </li>
        <li>
            <label for="title_2">
            <input type="radio" id="title_2" name="title" value="K" />
            King
            </label>
        </li>
        <li>
            <label for="title_3">
            <input type="radio" id="title_3" name="title" value="Q" />
            Queen
            </label>
        </li>
        </ul>
    </fieldset>
    <p>
        <label for="name">
        <span>名字：</span>
        <strong><span aria-label="必须">*</span></strong>
        </label>
        <input type="text" id="name" name="username" required />
    </p>
    <p>
        <label for="mail">
        <span>邮箱：</span>
        <strong><span aria-label="必须">*</span></strong>
        </label>
        <input type="email" id="mail" name="usermail" required />
    </p>
    <p>
        <label for="pwd">
        <span>密码：</span>
        <strong><span aria-label="必须">*</span></strong>
        </label>
        <input type="password" id="pwd" name="password" required />
    </p>
  </section>

  <section>
    <p>
      <button type="submit">验证付款请求</button>
    </p>
  </section>
</form>
```


## 1.2 basic elements

form fieldset legend textarea label input button
input type : text checkbox radio file hidden image password submit

```HTML
<input type="text" id="comment" name="comment" value="I'm a text field" />
<input type="password" id="pwd" name="pwd" />

<input type="hidden" id="timestamp" name="timestamp" value="1286705410" />
<input type="file" name="file" id="file" accept="image/*" multiple />

<input type="checkbox" id="questionOne" name="subscribe" value="yes" checked />
<input type="radio" id="soup" name="meal" checked />

<input type="submit" value="This is a submit button" />
```

## 1.3 HTML5 elements

```HTML
<input type="email" id="email" name="email" />
<input type="search" id="search" name="search" />
<input type="tel" id="tel" name="tel" />
<input type="url" id="url" name="url" />
<input type="number" name="age" id="age" min="1" max="10" step="2" />
<input type="datetime-local" name="datetime" id="datetime" />
```

```HTML
<label for="price">Choose a maximum house price: </label>
<input
  type="range"
  name="price"
  id="price"
  min="50000"
  max="500000"
  step="100"
  value="250000" />
<output class="price-output" for="price"></output>

<script>
const price = document.querySelector("#price");
const output = document.querySelector(".price-output");

output.textContent = price.value;

price.addEventListener("input", () => {
  output.textContent = price.value;
});
</script>
```

## 1.4 Other elements

```HTML
<textarea cols="30" rows="8"></textarea>
<progress max="100" value="75">75/100</progress>
```

```HTML
<!-- method 1 -->
<select id="groups" name="groups">
  <optgroup label="fruits">
    <option>Banana</option>
    <option selected>Cherry</option>
    <option>Lemon</option>
  </optgroup>
  <optgroup label="vegetables">
    <option>Carrot</option>
    <option>Eggplant</option>
    <option>Potato</option>
  </optgroup>
</select>

<!-- method 2 -->
<select id="simple" name="simple">
  <option value="banana">Big, beautiful yellow banana</option>
  <option value="cherry" selected>Succulent, juicy cherry</option>
  <option value="lemon">Sharp, powerful lemon</option>
</select>

<!-- method 3 -->
<label for="myFruit">What is your favorite fruit? (With fallback)</label>
<input type="text" id="myFruit" name="fruit" list="fruitList" />

<datalist id="fruitList">
  <label for="suggestion">or pick a fruit</label>
  <select id="suggestion" name="altFruit">
    <option>Apple</option>
    <option>Banana</option>
    <option>Blackberry</option>
    <option>Blueberry</option>
    <option>Lemon</option>
    <option>Lychee</option>
    <option>Peach</option>
    <option>Pear</option>
  </select>
</datalist>
```

## 2.1 Styling web forms

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

