---
title: 现代 JavaScript 与 CSS 滚动实现简析
date: 2018-06-18 17:20:13
tags:
  - JavaScript
  - CSS
categories:
  - 博客
---

## 页面滚动条引发的抖动出发

为了实现简单的水平居中布局，我们没少使用 margin: 0 auto； 来实现。

然而，这种布局一直存在一个影响用户体验的隐患。我们都知道，现代浏览器滚动条默认是 overflow: auto 类型的，也就是如果尺寸不足一屏，没有滚动条；超出，出现滚动条...

那么，问题来了 -\_- !

首先是简单的信息流页面，是从上往下 push 渲染的，如果信息没有超出一屏，都很好说，但是如果超出，那么滚动条就会出现，自然
margin: 0 auto; 主体元素就会做偏移，用户就会很明显感受到屏幕的抖动

其他场景，比如，点击加载更多，或者 Tab 切换到有滚动条的区块，都会感觉到抖动。

公司的 Web 产品一直存在这个问题，我个人觉得这个很影响体验，所以找了不少资料，也找了不少方案，在这里做一次总结。

- 高度确认的，可以用 CSS 把页面尺寸布局骨架搭好，再往里面渲染数据。这样子的话，要么没有滚动条，要么数据直接出现，不会出现跳动，但是这样方式还是存在局限性
- 还有一种简单粗暴的方式，直接设置 overflow: scroll，这就意味着，即使是在高度较小的时候，也会出现一个滚动条，而且貌似也不好看，存在的意义不明。

经过查找，有一种方式，算是比较匹配我的需求

使用 CSS3 计算 calc 和 vw 单位巧妙实现

可以简单为容器设置样式：

```css
.wrap-outer {
  margin-left: calc(100vw - 100%);
}

// 或者

.wrap-outer {
  padding-left: calc(100vw - 100%);
}
```

100vw 相对于  浏览器的 window.innerWidth ，是浏览器的内部宽度，这里包括了滚动条的宽度，而我们所使用的 100% 是不包含滚动条宽度的

于是我们就可以愉快的实现不抖动的需求了

兼容性方面的话，支持 IE9+ 以及其他现代浏览器

## 消逝的滚动条

既然讲到了滚动条，后面自己也查阅的不少资料， 可以  了解一些相关历史。

![](https://static.skynian.cn/scroll-bar-2018618175358.png)

（windows 上面的滚动条变化历程）

![](https://static.skynian.cn/scroll-bar-2018618175513.png)

（Mac 上面的滚动条）

在这里大赞 Mac，从 2011 年开始，所有的滚动条均从 Mac 电脑消失，不再占据任何页面空间，只有用户触发滚动时才会重新出现，当然用户可以设置默认显示。

对于开发者和设计师来说，这真的是一个好消息，毕竟计算滚动条的宽度总是不够优雅。

可是！ 划重点！

我们平时可能要使用各种各样的操作系统和浏览器，并且对滚动条的实现方式又各不同，所以我们还是不能避免这个问题......( 手动微笑脸 )

## 滚动条宽度

![](https://static.skynian.cn/scroll-bar-201861818333.png)

（“百花齐放”的宽度）

这里，笔者也是转载  其他资料的数据，可能有些误差。

但是只要记得一点，这是一个深坑......

我们可以通过 JavaScript 来计算宽度（以下代码仅能测出原始的宽度，通过 CSS  改变后，便不准了）

```js
const outer = document.createElement('div')
const inner = document.createElement('div')

outer.style.overflow = 'scroll'
document.body.appendChild(outer)
outer.appendChild(inner)

const scrollbarWidth = outer.offsetWidth - inner.offsetWidth

document.body.removeChild(outer)
```

因为  涉及到了操作 DOM，为了性能起见，应该避免这类操作
