---
title: JavaScript 内存管理浅谈
date: 2018-06-22 11:24:57
tags:
  - JavaScript
  - 优化
categories:
  - 博客
---

最近一直在回溯自己的的前端知识体系，发现，工作一段时间后，再去回顾之前的知识，体会真的不一样。

这次就简单了解一下 JavaScript 中的内存管理，涉及到了闭包，内存泄漏等前端常见问题。

<!-- more -->

## 写在前面

JavaScript 中的内存管理，给我的感觉可能一种偏科。我们平时可能不太重视，但是一旦出了问题，又会很棘手。其次，项目优化的时候也避免不了要踩坑。

可以通过多了解一些内存管理问题，写代码的时候通过一些习惯，避免内存泄漏的问题。在项目 pr 流程中，也可以根据此给同事提供一些意见。

## 内存生命周期

![内存生命周期](https://static.skynian.cn/javascript-memory-management-201862211342.jpg)

上图的流程是：

1. 分配所需的内存
2. 使用分配到的内存（读、写）
3. 不需要时候释放/归还

在 C 语言中，有专门的内存管理接口，像 malloc() 和 free()，而在 JS 中有着一个自动的垃圾回收机制。

## JavaScript 中的内存回收 (GC:Garbage Collecation)

###  引用计数垃圾收集

引用计数的含义是跟踪记录每个值被引用的次数，当声明了一个变量并将一个引用类型赋值给该变量时，则这个值的引用次数就是 1 。相反，如果包含  对这个值的变量又取得了另外一个值，则这个值的引用册数就减 1 。

当这个引用次数变成 0 时，则说明没有办法再访问这个值了，因而就可以将其所占的内存空间给收回来。这样，垃圾收集器下次再运行时，它就会释放那些引用次数为 0 的值所占的内存。

但是这个是存在问题的：

eg：

```js
function problem() {
  let objA = new Object()
  let objB = new Object()

  objA.someOtherObject = objB
  objb.anotherObject = objA
}
```

在这个例子中，objA 和 objB 通过各自的属性相互引用；也就是说这两个对象的引用次数都是 2。在采用引用计数的策略中，由于函数执行之后，这两个对象都离开了作用域，函数执行完成之后，objA 和 objB 还将会继续存在，因为他们的引用次数永远不会是 0。这样的相互引用如果说很大量的存在就会导致大量的内存泄露。

我们知道，IE 中有一部分对象并不是原生 JavaScript 对象。例如，其 BOM 和 DOM 中的对象就是使用 C++ 以 COM（Component Object
Model，组件对象）对象的形式实现的，而 COM 对象的垃圾回收器就是采用的引用计数的策略。因此，即使 IE 的 Javascript 引擎使用标记清除的策略来实现的，但 JavaScript 访问的 COM 对象依然是基于引用计数的策略的。说白了，只要 IE 中涉及 COM 对象，就会存在循环引用的问题。看看下面的这个简单的例子：

```js
let element = document.getElementById('some_element')
let myObj = new Object()

myObj.element = element
element.someObject = myObj
```

上面这个例子中，在一个 DOM 元素 (element) 与一个原生 JavaScript 对象(myObj)之间建立了循环引用。其中，变量 myObj 有一个名为 element 的属性指向 element ；而变量 element 有一个名为 someObject 的属性回指到 myObj。由于循环引用，即使将例子中的 DOM 从页面中移除，内存也永远不会回收。

不过上面的问题也不是不能解决，我们可以手动切断他们的循环引用。

```js
myObj.element = null
element.someObject = null
```

IE 6, 7 使用引用计数方式对 DOM 对象进行垃圾回收. 该方式常常造成对象被循环引用时内存发生泄漏. 现代浏览器通过使用标记-清除内存回收算法, 来解决这一问题。

### 标记-清除算法

这个算法把"对象是否不再需要"简化定义为"对象是否可以获得"。这个算法假定设置一个叫做根 root 的对象（在 Javascript 里，根是全局对象。定期的, 垃圾回收器将从根开始, 找所有从根开始引用的对象, 然后找这些对象引用的对象, 从根开始,垃圾回收器将找到所有可以获得的对象和所有不能获得的对象。

从 2012 年起, 所有现代浏览器都使用了标记-清除内存回收算法. 所有对 JavaScript 垃圾回收算法的改进都是基于标记-清除算法的改进。

到目前为止，IE、Firefox、Opera、Chrome、Safari 的 js 实现使用的都是标记清除的垃圾回收策略或类似的策略，只不过垃圾收集的时间间隔互不相同。

![标记-清除算法](https://static.skynian.cn/javascript-memory-management-20186221499.jpg)

## 自动 GC 的问题

尽管自动 GC 很方便, 但是我们不知道 GC 什么时候会进行. 这意味着如果我们在使用过程中使用了大量的内存, 而 GC 没有运行的情况下, 或者 GC 无法回收这些内存的情况下, 程序就有可能假死, 这个就需要我们在程序中手动做一些操作来触发内存回收。

## 常见的内存泄露案例

### 全局变量

```js
function foo(arg) {
  bar = 'some text'
}
```

在 JS 中处理未被声明的变量, 上述范例中的 bar 时, 会把 bar , 定义到全局对象中, 在浏览器中就是 window 上. 在页面中的全局变量, 只有当页面被关闭后才会被销毁.

所以这种写法就会造成内存泄露, 当然在这个例子中泄露的只是一个简单的字符串, 但是在实际的代码中, 往往情况会更加糟糕. 另外一种意外创建全局变量的情况。

```js
function foo() {
  this.var1 = 'potential accidental global'
}

// Foo 被调用时, this 指向全局变量(window)
foo()
```

在这种情况下调用 foo, this 被指向了全局变量 window, 意外的创建了全局变量. 我们谈到了一些意外情况下定义的全局变量, 代码中也有一些我们明确定义的全局变量.

如果使用这些全局变量用来暂存大量的数据, 记得在使用后, 对其重新赋值为 null.

### 未销毁的定时器和回调函数

在很多库中, 如果使用了观察着模式, 都会提供回调方法, 来调用一些回调函数. 要记得回收这些回调函数. 举一个 setInterval 的例子.

```js
let serverData = loadData()

setInterval(function() {
  let renderer = document.getElementById('renderer')
  if (renderer) {
    renderer.innerHTML = JSON.stringify(serverData)
  }
}, 5000) // 每 5 秒调用一次
```

如果后续 renderer 元素被移除, 整个定时器实际上没有任何作用. 但如果你没有回收定时器, 整个定时器依然有效, 不但定时器无法被内存回收, 定时器函数中的依赖也无法回收. 在这个案例中的 serverData 也无法被回收.

## 闭包

在 JS 开发中, 我们会经常用到闭包, 一个内部函数, 有权访问包含其的外部函数中的变量. 下面这种情况下, 闭包也会造成内存泄露.

```js
let theThing = null
let replaceThing = function() {
  let originalThing = theThing
  let unused = function() {
    if (originalThing)
      // 对于 'originalThing'的引用
      console.log('hi')
  }
  theThing = {
    longStr: new Array(1000000).join('*'),
    someMethod: function() {
      console.log('message')
    },
  }
}

setInterval(replaceThing, 1000)
```

这段代码, 每次调用 replaceThing 时, theThing 获得了包含一个巨大的数组和一个对于新闭包 someMethod 的对象. 同时 unused 是一个引用了 originalThing 的闭包.

这个范例的关键在于, 闭包之间是共享作用域的, 尽管 unused 可能一直没有被调用, 但是 someMethod 可能会被调用, 就会导致内存无法对其进行回收. 当这段代码被反复执行时, 内存会持续增长. 该问题的更多描述可见[Meteor 团队的这篇文章](https://blog.meteor.com/an-interesting-kind-of-javascript-memory-leak-8b47d2e7f156?gi=a92ddcd69bbf)。

### DOM 引用

很多时候, 我们对 Dom 的操作, 会把 Dom 的引用保存在一个数组或者 Map 中.

```js
let elements = {
  image: document.getElementById('image'),
}
function doStuff() {
  elements.image.src = 'http://example.com/image_name.png'
}
function removeImage() {
  document.body.removeChild(document.getElementById('image'))
  // 这个时候我们对于 #image 仍然有一个引用, Image 元素, 仍然无法被内存回收.
}
```

上述案例中, 即使我们对于 image 元素进行了移除, 但是仍然有对 image 元素的引用, 依然无法对齐进行内存回收.

另外需要注意的一个点是, 对于一个 Dom 树的叶子节点的引用. 举个例子: 如果我们引用了一个表格中的 td 元素, 一旦在 Dom 中删除了整个表格, 我们直观的觉得内存回收应该回收除了被引用的 td 外的其他元素. 但是事实上, 这个 td 元素是整个表格的一个子元素, 并保留对于其父元素的引用. 这就会导致对于整个表格, 都无法进行内存回收. 所以我们要小心处理对于 Dom 元素的引用.

### ES6

ES6 中引入 WeakSet 和 WeakMap 两个新的概念, 来解决引用造成的内存回收问题. WeakSet 和 WeakMap 对于值的引用可以忽略不计, 他们对于值的引用是弱引用,内存回收机制, 不会考虑这种引用. 当其他引用被消除后, 引用就会从内存中被释放.

## 总结

在 Javascript 中，彻底避免垃圾回收是非常困难的。垃圾回收机制与实时软件（例如：游戏）的实时性要求，从根本上就是对立的。

但是，为了减少内存垃圾，我们还是可以对 Javascript 代码进行彻底检查，有些代码中存在明显的产生过多内存垃圾的问题代码，这些正是我们需要检查并且完善的。

我认为，只要我们投入更多的精力和关注，实现实时的、低垃圾收集的 Javascript 应用还是很有可能的。毕竟，对于可交互性要求较高的游戏或应用来说，实时性和低垃圾收集，两者都是至关重要。

## 参考 😬

[Barret Lee JavaScript 垃圾回收机制](http://www.cnblogs.com/hustskyking/archive/2013/04/27/garbage-collection.html)

[阮一峰 JavaScript 内存泄漏教程](http://www.ruanyifeng.com/blog/2017/04/memory-leak.html)
