---
title: 实现半像素边框
date: 2018-12-17 16:43:04
sidebar: auto
tags:
  - CSS
categories:
  - 博客
---

## 思路

普通的 1px 黑色实线边框

```css
.border {
  border: 1px solid #000;
}
```

半像素边框当然不是简单地把 1px 改为 0.5px（没测试过，可能会被解析成 1 或者 0），border-width 的值只能是自然数

类似的，outline, box-shadow 等等也没有办法画出 0.5px 的细线

常规思路是不可行的，我们可以用伪元素 + 缩放巧妙地实现，具体步骤如下：

- 设置目标元素作为定位参照

```css
.thinner-border {
  position: relative;
}
```

- 给目标元素添加一个伪元素 before 或者 after，并设置绝对定位

```css
.thinner-border:before {
  content: '';
  position: absolute;
}
```

- 给伪元素添上 1px 的边框

```css
.thinner-border:before {
  border: 1px solid red;
}
```

- 设置伪元素的宽高为目标元素的 2 倍

```css
.thinner-border:before {
  width: 200%;
  height: 200%;
}
```

- 缩小 0.5 倍（变回目标元素的大小）

```css
.thinner-border:before {
  transform-origin: 0 0;
  transform: scale(0.5, 0.5);
}
```

- 把 border 包进来

```css
.thinner-border:before {
  box-sizing: border-box;
}
```

简言之就是先放大再缩回来，border-box 是关键，否则边框不会一起缩放
