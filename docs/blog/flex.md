---
title: 浅谈 flex 布局
date: 2017-11-20 15:24:44
sidebar: auto
tags:
  - CSS
categories:
  - 博客
---

布局的传统解决方案，基于盒状模型，依赖 display 属性 + position 属性 + float 属性。它对于那些特殊布局非常不方便，比如，垂直居中就不容易实现。

2009 年，W3C 提出了一种新的方案

Flex 布局，可以简便、完整、响应式地实现各种页面布局。目前，它已经得到了所有浏览器的支持，这意味着，现在就能很安全地使用这项功能。

<!-- more -->

这次笔者简单谈谈 flexbox 中的 5 个常见的属性

## 属性 1：Display:Flex

以下是实例页面：

![flex-2018531202637.gif](https://i.loli.net/2020/01/12/GdVT2yZcYCEa7wh.gif)

我们可以看到，在灰色的容器中，包含了 4 种不同颜色与大小的 div 元素，每个元素都默认 display:block ，因此每个立方体都占据了一行的整个宽度。

为了开始使用 Flexbox 布局，需要把容器变成 Flex 容器

```css
#container {
  display: flex;
  display: -webkit-flex; // 兼容性写法
}
```

![flex-2018531204333.gif](https://i.loli.net/2020/01/12/hGHwtovUefVYgxP.gif)

## 属性 2：Flex Direction

Flexbox 容器有两根轴：主轴和垂直的交叉轴，默认情况如下：

![flex-2018531204418.gif](https://i.loli.net/2020/01/12/tiCId2BZSO9cUXs.png)

**项目默认是由主轴（从左到右）排列的**，这就是你使用 display:flex 后，四方体以水平线排列的原因

而 Flex-direction 决定了主轴的方向

```css
#container {
  display: flex;
  flex-direction: column;
}
```

![flex-2018531204454.gif](https://i.loli.net/2020/01/12/Nx5KQhTmeXS1HCB.gif)

**这里有一个重要的区别：** flex-direction:column

**所指的是四方体将沿主轴的垂直方向对齐，它使主轴自身从水平到垂直**

而 flex-direction 还有一些其他的值供你选择，例如：row-reverse 与 column-reverse

![flex-2018531204544.gif](https://i.loli.net/2020/01/12/ruQsTePAvoOBhZY.gif)

## 属性 3：Justify Content

justify-content 属性定义了项目在主轴上的对齐方式。

在这里，你将更多的了解主轴与交叉轴的区别。首先，让我们回到 flex-direction:row 值上

```css
#container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
```

justify-content 属性包含了 5 个值供你使用

```
Flex-start

Flex-end

Center

Space-between

Space-around
```

![flex-2018531204619.gif](https://i.loli.net/2020/01/12/8vNuFhKcM5otilx.gif)

Space-around 与 Space-between 是两个不容易直观理解的值。Space-between 实现了两端对齐，而四方体之间的间隔都是相等的。
Space-around 使四方体两侧的间隔相等，这意味着四方体之间的间隔比最外边四方体与边框的间隔要大一倍。（每个四方体贡献了不重叠的等量余量，从而使空间翻倍）

最后一点：请记住 justify-content 沿主轴对齐，而 flex-direction 决定了主轴的方向。它将决定你移动的方向。

## 属性 4：Align Items

当你理解了 justify-content 属性，理解 Align Items 属性就变得轻而易举了。

justify-content 定义了项目在主轴的对齐方式，而 align-items 属性则定义了项目在交叉轴上是如何对齐的。

![](https://i.loli.net/2020/01/12/7S1AOL6Erb4z5PG.png)

当我们将 flex-direction 属性值重置为 row 后，我们的轴看上去就与上图一致。那么，让我们深入的了解下 Align Items 属性有哪些值：

```
flex-start

flex-end

center

stretch

baseline
```

前三个值与 justify-content 属性中的值完全一致，没有太多需要解释的地方。

但是，接下来两个值却有些不同。

Stretch 指的是如果项目未设置高度或设为 auto，项目将占满整个容器。而 baseline 是指项目将与段落标签的底部对齐。

![flex-2018531204725.gif](https://i.loli.net/2020/01/12/ZpchzrqnakwBXFQ.gif)

（请注意，对于 align-items：stretch，我不得不将四方体的高度设置为 auto，否则 height 属性将覆盖该 stretch）

对于 baseline，如果你去掉段落标签，它则会对齐四方形的底部，如下图所示：

![flex-2018531204754.gif](https://i.loli.net/2020/01/12/CV9pw1FvPI3ueYa.png)

为了更好地演示主轴和交叉轴的表现，在基于 justify-content 属性和 align-items 属性的值为 center 的情况下，让我们看看赋予 flex-direction 属性两个不同值后，它的表现如何：

我们可以看到，对于 row 值，四方体沿着与主轴水平方向排列，而对于 column 值，它们则沿着与主轴垂直的方向排列。

![flex-2018531204835.gif](https://i.loli.net/2020/01/12/SglQNTmiMpLdnkP.gif)

## 属性 5：Align Self

align-self 属性允许你对特定的项目有与其他项目不一样的对齐方式，它可覆盖 align-items 属性。虽然它的默认值为 auto，但它继承了父元素 align-items 的属性。除了 auto 外，其他都与 align-items 属性完全一致。

```css
#container {
  align-items: flex-start;
}
.square#one {
  align-self: center;
}
```

我们将在四个四方体上应用 align-self 属性，而其余的四方体则应用 align-items:center 与 flex-direction:row，让我们看看会发生什么

![](https://i.loli.net/2020/01/12/DflZ2opug6yMTO4.png)

## 结论

虽然我们只是仅仅了解了 Flexbox 的一些浅层的用法，但是已足够入门
