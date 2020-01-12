---
title: 浅谈 Web Components
date: 2018-07-19 11:26:10
sidebar: auto
tags:
  - JavaScript
categories:
  - 博客
---

> SLIDES

[https://slides.com/moke/deck#/](https://slides.com/moke/deck#/)

Web Components 是一套不同的技术，允许您创建可重用的定制元素（它们的功能封装在您的代码之外）并且在您的 web 应用中使用它们。

<!-- more -->

## 一个有趣的 UI 库

某天，逛逛论坛的时候，发现了一个很有趣手绘风格的 U 组件库。当然重点在于它是基于 Web Components 的实现。

因为在此之前，对 Web Components 没有更多了解，这次趁着这次机会简单总结了一下这方面的知识。

虽然说，目前没看到这套技术大规模使用，但随着越来越多的浏览器对 Web Components 的支持，是否会从底层改变诸如 Vue 和 React 组件化方案的实现方式呢？

[https://github.com/wiredjs/wired-elements](https://github.com/wiredjs/wired-elements)

![](https://i.loli.net/2020/01/12/S9YKMmgLPEiyzG8.png)

## What

Web Components are a new browser feature that provides a standard component model for the Web, consisting of several pieces: Shadow DOM, Custom Elements, HTML Imports and HTML Templates.

摘自 [https://github.com/w3c/webcomponents](https://github.com/w3c/webcomponents)

也就是说，Web Components 是 Web 组件模型标准，由浏览器提供原生特性支持，包括 Shadow DOM，Custom Elements，HTML Imports 和 HTML Templates

## 涉及规范

- `Custom elements（自定义元素）`：一组 JavaScript API，允许您定义 custom elements 及其行为，然后可以在您的用户界面中按照需要使用它们。
  [https://developer.mozilla.org/zh-CN/docs/Web/Web_Components/Using_custom_elements](https://developer.mozilla.org/zh-CN/docs/Web/Web_Components/Using_custom_elements)
- `Shadow DOM（影子DOM）`：一组 JavaScript API，用于将封装的“影子”DOM 树附加到元素（与主文档 DOM 分开呈现）并控制其关联的功能。通过这种方式，您可以保持元素的功能私有，这样它们就可以被脚本化和样式化，而不用担心与文档的其他部分发生冲突。
- `HTML templates（HTML模板）`：`<template>` 和 `<slot>` 元素使您可以编写不在呈现页面中显示的标记模板。然后它们可以作为自定义元素结构的基础被多次重用。
- `HTML Imports（HTML导入）`：一旦定义了自定义组件，最简单的重用它的方法就是使其定义细节保存在一个单独的文件中，然后使用导入机制将其导入到想要实际使用它的页面中。HTML 导入就是这样一种机制，尽管存在争议 — Mozilla 根本不同意这种方法，并打算在将来实现更合适的。

## 实现重点

```html
// 从 video 说起，效果类似于 //
含有该片段的HTML页面将呈现一个功能完整的视频播放器，带播放按钮，进度条，音量调节按钮等等

<video src="./video.mp4" controls></video>

<input type="text" value="test" placeholder="placeholder" />
```

- 核心是 组件封装
- video、input 相当于浏览器的内置组件，组件视图结构及默认样式藏在 Shadow DOM 里，组件逻辑被彻底藏了起来，仅暴露出 autoplay，oninput 等状态 / 行为 Hook 与外界通信

![](https://i.loli.net/2020/01/12/SwB3abV2Myr7iYC.png)

## Shadom DOM

1. 利用浏览器提供的 Shadow DOM 特性，我们可以创建自己的 Shadow Root：

```js
document.body.innerHTML = '<div class="container"></div>'

let host = document.querySelector('.container')
let root = host.createShadowRoot()

root.innerHTML = '<p>How <em>you</em> doin?</p>'
```

2. 此时的节点结构是：

```html
<div class="container">
  #shadow-root (open)
  <p>How <em>you</em> doin?</p>
</div>
```

3. 可以对 Fragment 做 DOM 操作，相当于一个独立的 HTML 解析环境，不受外界干扰

Shadow DOM 这款工具旨在构建基于组件的应用。因此，可为网络开发中的常见问题提供解决方案：

- `隔离 DOM`：组件的 DOM 是独立的（例如，document.querySelector() 不会返回组件 shadow DOM 中的节点）。
- `作用域 CSS`：shadow DOM 内部定义的 CSS 在其作用域内。样式规则不会泄漏，页面样式也不会渗入。
- `组合`：为组件设计一个声明性、基于标记的 API。
- `简化 CSS` - 作用域 DOM 意味着您可以使用简单的 CSS 选择器，更通用的 id/类名称，而无需担心命名冲突。
- `效率` - 将应用看成是多个 DOM 块，而不是一个大的（全局性）页面。

## 事件的封装

Shadow Dom 对于事件通过在冒泡阶段 target 的重定向来封装事件，然后一些可能对页面造成影响的事件，Shadow Dom 就会影藏掉这些事件，也就是在冒泡到主页面的过程中被挡住了。

![](https://i.loli.net/2020/01/12/r4V2IvTLgZ6Cnfm.png)

## 创建流程

1. 使用 `ECMAScript 2015` 类语法创建一个类，来指定 web 组件的功能使用
2. `CustomElementRegistry.define()` 方法注册您的新自定义元素 ，并向其传递要定义的元素名称、指定元素功能的类以及可选的，其所继承自的元素。
3. 使用 `Element.attachShadow()`方法将一个 shadow DOM 附加到自定义元素上。使用通常的 DOM 方法向 shadow DOM 中添加子元素、事件监听器等等。
4. 使用 `<template>` 和 `<slot>` 方法定义一个 HTML 模板。再次使用常规 DOM 方法克隆模板并将其附加到您的 shadow DOM 中。

例子：[https://github.com/mdn/web-components-examples](https://github.com/mdn/web-components-examples)

## 兼容性

![](https://i.loli.net/2020/01/12/br6yltnPuzJGBLF.png)

## 常见封装类库

- `Polymer`: Google 推出的 web 组件库，支持数据的单向和双向绑定，兼容性较好，跨浏览器性能也较好；
- `X-Tag`: 微软推出的开源库，支持 Web Components 规范，兼容 Web ComponentsAPI；
- `Slim.js`: 轻量级的 web 组件库，专注于帮助开发者更好的编写原生 web 组件，而不依赖于其他框架，但是也提供了良好的拓展性，开发者可以自由拓展。

## Polymer 3.0

Polymer 能提供的特性

- `自定义元素`。注册元素将类与自定义元素名称相关联。该元素提供回调以管理其生命周期。 Polymer 还可以让您声明属物，将元素的属物 API 与 Polymer 数据系统集成。
- `阴影 DOM`。阴影 DOM 为您的元素提供了本地封装的 DOM 树。Polymer 可以自动用 DOM 模板为您的元素创建和填充阴影树。
- `事件`。Polymer 提供了一个用于将事件监听器附加到阴影 DOM 子节点的声明性语法。它还提供了一个用于处理手势事件的可选库。
- `数据系统`。Polymer 数据系统提供与属物和属性的数据绑定; 属物观察者，和被计算的属物。

## What's new in 3.0

- 在 Google I/O 2018 大会上，Google 推出了 Polymer 3.0

- Web 组件的生态系统从 HTML Imports 转移到 ES Modules。

- 包管理系统将支持 npm，更容易将基于 Polymer 的 web 组件和各种工具、框架协同使用。

[https://www.polymer-project.org/3.0/start/quick-tour](使用例子)

## Vue 与 Web Components

- Vue 在实现上遵从了部分 Web Components 规范，比如 Shadow DOM 里的 slot：

[https://cn.vuejs.org/v2/guide/components-slots.html](https://cn.vuejs.org/v2/guide/components-slots.html)

- 因为 Web Components 规范尚不成熟，且支持性并不乐观，不用 polyfill 就无法投入生产，Vue 依靠构建工具跨过了环境兼容性问题，不依赖浏览器特性支持，但同时也就舍弃了 Shadow DOM 封装性等 Web Components 核心优势
- 另外，Web Components 是相对底层的组件规范，Vue 除了定义组件规范，还提供了组件通信，数据绑定等上层方案

## React 与 Web Components

React 和 web 组件 被用以解决不同问题。

Web 组件为可重用组件提供了强大的封装能力，而 React 则是提供了保持 DOM 和数据同步的声明式库。二者目标互补。

可以在 Web 组件里使用 React，或者在 React 里使用 Web Components。

[https://reactjs.org/docs/web-components.html](https://reactjs.org/docs/web-components.html)

## Angular 与 Web Components

Angular 默认情况下没有使用 Web Components 的任何基础设施

不过这里有一个选项问题，就是 Angular 可以设置不同的 ViewEncapsulation，如果是 Native，那会使用到 Shadow DOM 的 API；如果是默认的 Emulated，就不会用到。

[https://angular.io/api/core/ViewEncapsulation](https://angular.io/api/core/ViewEncapsulation)

## 总结

Web 「相关」规范设计中一般有一些基本的共识：

- 每一个 Web API 只做一件事
- 同一个功能不会有两个类似的 API 来做
- 保持 ECMAScript 的平台无关性

根本的问题在于，框架的职责在于提供一整套的解决方案，而平台 API 的设计要求是绝不能提供一整套的解决方案，这是无法调和的基本矛盾所在。

- Web Components 做为浏览器底层特性不应该拿出来和 React 这类应用层框架相比较。
- 未来 Web Components 会做为浏览器非常重要的特性存在
- API 偏低层操作，易用性不够，在很长时间内开发者依旧会使用 React / Vue / Angular / Polymer 这样的框架
- Web Components 可能会做为这些框架的底层来做组件间的互相引用的方法

## 参考

[Web Component MDN](https://developer.mozilla.org/zh-CN/docs/Web/Web_Components)

[https://www.webcomponents.org/](https://www.webcomponents.org/)

[https://developers.google.com/web/fundamentals/web-components/customelements?hl=zh-cn](https://developers.google.com/web/fundamentals/web-components/customelements?hl=zh-cn)
