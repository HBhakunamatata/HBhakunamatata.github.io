---
layout: post
title: "MDN HTML Part2 - Media and Embedding"
description: 
date: 2024-01-01
categories: Python
---

## 1.1 Images

### 1.1.1 img

- src / alt (must)
- width / height (opt) optimize the speed of webpage response
- title (opt) use figure better


```html
<img
  src="images/dinosaur.jpg"
  alt="The head and torso of a dinosaur skeleton;
          it has a large head with long sharp teeth"
  width="400"
  height="341"
  title="A T-Rex on display in the Manchester University Museum"
/>
```

### 1.1.2 figure

```html
<figure>
  <img
    src="images/dinosaur.jpg"
    alt="The head and torso of a dinosaur skeleton;
            it has a large head with long sharp teeth"
    width="400"
    height="341" />

  <figcaption>
    A T-Rex on display in the Manchester University Museum.
  </figcaption>
</figure>
```


## 1.2 Video and Audio

```html
<video
  controls
  width="400"
  height="400"
  autoplay
  loop
  muted
  preload="auto"
  poster="poster.png">
  <source src="rabbit320.mp4" type="video/mp4" />
  <source src="rabbit320.webm" type="video/webm" />
  <p>你的浏览器不支持此视频。可点击<a href="rabbit320.mp4">此链接</a>观看</p>

  <track kind="subtitles" src="subtitles_es.vtt" srclang="es" label="Spanish" />
</video>
```


## 1.3 frame

```html
<iframe
  src="https://developer.mozilla.org/zh-CN/docs/Glossary"
  width="100%"
  height="500"
  allowfullscreen
  sandbox>
  <p>
    <a href="/zh-CN/docs/Glossary">
      为不支持 iframe 的浏览器预留的后备链接
    </a>
  </p>
</iframe>
```

## 1.4 object

```html
<object data="mypdf.pdf" type="application/pdf" width="800" height="1200">
  <p>
    You don't have a PDF plugin, but you can
    <a href="mypdf.pdf">download the PDF file. </a>
  </p>
</object>
```

## 1.5 Responsive Images

### 1.5.1 根据分辨率切换不同的图片尺寸

```html
<img
  srcset="elva-fairy-480w.jpg 480w, elva-fairy-800w.jpg 800w"
  sizes="(max-width: 600px) 480px,
         800px"
  src="elva-fairy-800w.jpg"
  alt="Elva dressed as a fairy"
/>
```

### 1.5.2 相同的尺寸，不同的分辨率(多分辨率显示)

```html
<img
  srcset="elva-fairy-320w.jpg, elva-fairy-480w.jpg 1.5x, elva-fairy-640w.jpg 2x"
  src="elva-fairy-640w.jpg"
  alt="Elva dressed as a fairy"
/>
```


### 1.5.3 美术设计问题

美术设计问题涉及到更改显示的图片以适应不同的图片显示尺寸。例如，当在桌面浏览器上查看网页时，可能会显示一个有人物在中间的大型横向镜头。但当在移动浏览器上查看同样的图片时，它会被缩小，使得图片中的人物变得非常小，难以辨认。在移动设备上，我们可能更希望显示一个较小的、竖向的图片，这样可以放大人物。借助 <picture> 元素我们可以实现这种解决方案。

```html
<picture>
  <source media="(max-width: 799px)" srcset="elva-480w-close-portrait.jpg" />
  <source media="(min-width: 800px)" srcset="elva-800w.jpg" />
  <img src="elva-800w.jpg" alt="Chris standing up holding his daughter Elva" />
</picture>
```