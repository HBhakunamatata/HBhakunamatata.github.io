---
layout: post
title: "MDN Form Validation"
description: 
date: 2024-12-20
categories: 
---

HTML5 Validation
Javascript Validation
Server Validation

## 1. HTML5 Validation

当一个元素校验通过时:
- 该元素将可以通过 CSS 伪类 :valid 进行特殊的样式化；
- 如果用户尝试提交表单，如果没有其他的控制来阻止该操作（比如 JavaScript 即可阻止提交），那么该表单的数据会被提交。

如果一个元素未校验通过:
- 该元素将可以通过 CSS 伪类 :invalid 进行特殊的样式化；
- 如果用户尝试提交表单，浏览器会展示出错误消息，并停止表单的提交。

### 1.1 required

```CSS
input:invalid {
  border: 2px dashed red;
}

input:valid {
  border: 2px solid black;
}
```

### 1.2 regex

```HTML
<form>
  <label for="choose">Would you prefer a banana or a cherry?</label>
  <input id="choose" name="i_like" required pattern="banana|cherry" />
  <button>Submit</button>
</form>
```

### 1.3 narrow the length and range

```HTML
<form>
  <div>
    <label for="choose">Would you prefer a banana or a cherry?</label>
    <input id="choose" name="i_like" required minlength="6" maxlength="6" />
  </div>
  <div>
    <label for="number">How many would you like?</label>
    <input type="number" id="number" name="amount" value="1" min="1" max="10" />
  </div>
  <div>
    <button>Submit</button>
  </div>
</form>
```


## 2. Javascript Validation

```HTML
<form>
  <p>
    <label for="mail">
      <span>Please enter an email address:</span>
      <input type="text" class="mail" id="mail" name="mail" />
      <span class="error" aria-live="polite"></span>
    </label>
  </p>

  <p>
    <!-- Some legacy browsers need to have the `type` attribute
       explicitly set to `submit` on the `button`element -->
    <button type="submit">Submit</button>
  </p>
</form>
```

```javascript
// 使用旧版浏览器选择 DOM 节点的方法较少
var form = document.getElementsByTagName("form")[0];
var email = document.getElementById("mail");

// 以下是在 DOM 中访问下一个兄弟元素的技巧
// 这比较危险，很容易引起无限循环
// 在现代浏览器中，应该使用 element.nextElementSibling
var error = email;
while ((error = error.nextSibling).nodeType != 1);

// 按照 HTML5 规范
var emailRegExp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

// 许多旧版浏览器不支持 addEventListener 方法
// 这只是其中一种简单的处理方法
function addEvent(element, event, callback) {
  var previousEventCallBack = element["on" + event];
  element["on" + event] = function (e) {
    var output = callback(e);

    // 返回 `false` 来停止回调链，并中断事件的执行
    if (output === false) return false;

    if (typeof previousEventCallBack === "function") {
      output = previousEventCallBack(e);
      if (output === false) return false;
    }
  };
}

// 现在我们可以重构字段的约束校验了
// 由于不使用 CSS 伪类，我们必须明确地设置 valid 或 invalid 类到 email 字段上
addEvent(window, "load", function () {
  // 在这里验证字段是否为空（请记住，该字段不是必需的）
  // 如果非空，检查它的内容格式是不是合格的 e-mail 地址
  var test = email.value.length === 0 || emailRegExp.test(email.value);

  email.className = test ? "valid" : "invalid";
});

// 处理用户输入事件
addEvent(email, "input", function () {
  var test = email.value.length === 0 || emailRegExp.test(email.value);
  if (test) {
    email.className = "valid";
    error.innerHTML = "";
    error.className = "error";
  } else {
    email.className = "invalid";
  }
});

// 处理表单提交事件
addEvent(form, "submit", function () {
  var test = email.value.length === 0 || emailRegExp.test(email.value);

  if (!test) {
    email.className = "invalid";
    error.innerHTML = "I expect an e-mail, darling!";
    error.className = "error active";

    // 某些旧版浏览器不支持 event.preventDefault() 方法
    return false;
  } else {
    email.className = "valid";
    error.innerHTML = "";
    error.className = "error";
  }
});
```