---
title: 简单的Flex布局
date: 2017-09-11 10:02:35
tags:
	- CSS
categories: CSS
---

# 图文并茂！8张GIF图学会Flexbox

Flexbox 实现了帮助我们脱离CSS苦海（例如垂直居中）的目标，但想要精通它却需要应对一些挑战。

本次，我们将深入探讨flexbox中的5个常见的属性

## 属性1：Display;Flex

以下是实例页面：

![](http://oljx0eyxv.bkt.clouddn.com/17-2-27/24597697-file_1488170425547_44c5.gif)

<!--more-->

我们可以看到，在灰色的容器中，包含了4中不同颜色与大小的div元素，每个元素都默认display:block,因此每个立方体都占据了一行的整个宽度。

为了开始使用Flexbox布局，需要把容器变成Flex容器

```css
#container{
    display:flex;
    display:-webkit-flex;
}
```

![](http://oljx0eyxv.bkt.clouddn.com/17-2-27/75422539-file_1488170893935_5b3c.gif)

## 属性2：Flex Direction

Flexbox 容器有两根轴：主轴和垂直的交叉轴，默认情况如下：

![](http://oljx0eyxv.bkt.clouddn.com/17-2-27/48577308-file_1488171040036_85a8.gif)

**项目默认是由主轴（从左到右）排列的**，这就是你使用display:flex后，四方体以水平线排列的原因

而Flex-direction决定了主轴的方向

```css
#container{
    display:flex;
    flex-direction:column;
}
```

![](http://oljx0eyxv.bkt.clouddn.com/17-2-27/1327245-file_1488171460960_d446.gif)

**这里有一个重要的区别：**flex-direction:column**所指的是四方体将沿主轴的垂直方向对齐，它使主轴自身从水平到垂直**

而flex-direction还有一些其他的值供你选择，例如：row-reverse与column-reverse

![](http://oljx0eyxv.bkt.clouddn.com/17-2-27/1821376-file_1488171656075_f4e1.gif)

## 属性3：Justify Content

justify-content 属性定义了项目在主轴上的对齐方式。

在这里，你将更多的了解主轴与交叉轴的区别。首先，让我们回到flex-direction:row值上

```css
#container{
    display:flex;
    flex-direction:row;
    justify-content:flex-start;
}
```

justify-content属性包含了5个值供你使用

> 1.Flex-start
> 2.Flex-end
> 3.Center
> 4.Space-between
> 5.Space-around

![](http://oljx0eyxv.bkt.clouddn.com/17-2-27/38361387-file_1488171953078_8d0e.gif)

Space-around 与 Space-between 是两个不容易直观理解的值。Space-between 实现了两端对齐，而四方体之间的间隔都是相等的。
Space-around 使四方体两侧的间隔相等，这意味着四方体之间的间隔比最外边四方体与边框的间隔要大一倍。（每个四方体贡献了不重叠的等量余量，从而使空间翻倍）

最后一点：请记住 justify-content 沿主轴对齐，而 flex-direction 决定了主轴的方向。它将决定你移动的方向。

作者：IT程序狮子烨
链接：https://zhuanlan.zhihu.com/p/25152672
来源：知乎
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

## 属性4：Align Items

当你理解了 justify-content 属性，理解 Align Items 属性就变得轻而易举了。

justify-content 定义了项目在主轴的对齐方式，而 align-items 属性则定义了项目在交叉轴上是如何对齐的。

![](http://oljx0eyxv.bkt.clouddn.com/17-2-27/11946720-file_1488172041627_39f8.gif)

当我们将 flex-direction 属性值重置为 row 后，我们的轴看上去就与上图一致。
那么，让我们深入的了解下 Align Items 属性有哪些值：

    flex-start
    flex-end
    center
    stretch
    baseline

前三个值与 justify-content 属性中的值完全一致，没有太多需要解释的地方。

但是，接下来两个值却有些不同。

Stretch 指的是如果项目未设置高度或设为 auto，项目将占满整个容器。而 baseline 是指项目将与段落标签的底部对齐。

![](http://oljx0eyxv.bkt.clouddn.com/17-2-27/21340335-file_1488172130593_1094f.gif)

（请注意，对于 align-items：stretch，我不得不将四方体的高度设置为 auto，否则 height 属性将覆盖该 stretch）

对于 baseline，如果你去掉段落标签，它则会对齐四方形的底部，如下图所示：

![](http://oljx0eyxv.bkt.clouddn.com/17-2-27/18578993-file_1488172163770_134e9.gif)

为了更好地演示主轴和交叉轴的表现，在基于 justify-content 属性和 align-items 属性的值为 center 的情况下，让我们看看赋予 flex-direction 属性两个不同值后，它的表现如何：

我们可以看到，****对于 row 值，四方体沿着与主轴水平方向排列，而对于 column 值，它们则沿着与主轴垂直的方向排列。****

![](http://oljx0eyxv.bkt.clouddn.com/17-2-27/71159336-file_1488172199806_14356.gif)

## 属性5：Align Self

align-self 属性允许你对特定的项目有与其他项目不一样的对齐方式，它可覆盖 align-items 属性。虽然它的默认值为 auto，但它继承了父元素 align-items 的属性。除了 auto 外，其他都与 align-items 属性完全一致。

```css
#container{
    align-items:flex-start;
}
.square#one{
    align-self:center;
}
```

我们将在四个四方体上应用align-self属性，而其余的四方体则应用align-items:center与flex-direction:row，让我们看看会发生什么

![](http://oljx0eyxv.bkt.clouddn.com/17-2-27/63727448-file_1488172379975_b9d7.gif)

## 结论

虽然我们只是仅仅了解了Flexbox的一些浅层的用法，但是已足够入门

