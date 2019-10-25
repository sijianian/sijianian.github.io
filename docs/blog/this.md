---
title: 深入理解 this
sidebar: auto
date: 2018-06-11 20:53:06
tags:
  - JavaScript
categories: JavaScript
---

![](https://static.skynian.cn/深入理解this-201861122106.jpg)

JavaScript 中 this 的指向一直是困扰我很久的问题，在使用中出错的机率也非常大。在面向对象语言中，它代表了当前对象的一个引用，而在 JS 中却经常让我觉得混乱，它不是固定不变的，而是随着它的执行环境的改变而改变。

<!--more-->

如果没有  彻底理解  和掌握这个特性，可能真的会一次又一次  踩坑，不要问我是怎么知道的 o(╯□╰)o

可能 this 不是 JS 中最复杂的内容，但是它的细节也是蔚为大观。涉及到了函数、函数调用、eval、call/apply/bind、基本包装类型、构造函数实例化、严格模式等等。

 与此同时 ES6 引入的箭头函数和 class 更是把 this 复杂化了。

其实网上关于 this 的介绍和总结很多，但是不乏会有很多错漏的地方，笔者  写这篇博客也是为了做一次总结，同时巩固，更重要的是希望能出坑......

 一个最基本的认知是，this 的值会发生变化，但是有一个总的原则，那就是 this 指向的是调用函数的那个对象。

## 情况一：纯粹的函数调用

这是函数的最通常用法，属于全局性调用，因此 this 就代表着全局对象 Global

```js
function func1() {
  console.log(this === window) // true
}
func1()

const func2 = function() {
  console.log(this === window) // true
}
func2()

function func3() {
  'use strict'
  console.log(this) // undefined
}
```

从上述代码中，我们可以看出，如果不是处于严格模式下，函数的上下文是 window 对象，严格模式下，函数上下文为 undefined。

## 情况二：作为对象方法的调用

函数还可以作为某个对象方法调用，这时 this 就指这个上级对象

```js
function test() {
  alert(this.x)
}

le o = {}
o.x = 1
o.m = test
o.m() // 1
```

其实，我们这时返回看情况一，实际上可以看出”func1()“，可以理解为“window.func1()”，所以例子中的函数上下文便是 this。

## 情况三： 作为构造函数调用

所谓构造函数， 也就是通过这个函数生成一个新对象（object）。这个时候，this 就是指这个新对象。

```js
function test() {
  this.x = 1
}

let o = new test()
laert(o.x) // 1
```

运行结果为 1，为了表明这时 this 对象不是全局对象，我对代码做一点改变：

```js
let x = 2

function test() {
  this.x = 1
}

let o = new test()

alert(x) // 2
```

## 情况四： 使用 apply()和 call()方法进行调用

apply()和 call()是函数对象中的方法，它的作用是改变函数的调用对象，可以利用任何一个函数都可以显式指定任何一个对象作为其函数上下文。

通过 apply() 方法来调用函数，我们要给 apply() 传入两个参数：一个作为函数上下文对象，另一个作为函数参数所组成的数组。call() 方法的使用方式类似，唯一不同的是给函数传入的参数是一个参数列表，而不是单个数组。

```js
function func() {
  let result = 0
  for (let i = 0; i < arguments.length; i++) {
    result += arguments[i]
  }
  this.result = result
}
const obj1 = {}
const obj2 = {}
func.apply(obj1, [1, 2, 3])
func.call(obj2, 4, 5, 6)

console.log(obj1.result === 6) // true
console.log(obj2.result === 15) // true
```

在上面的代码中，`func.apply(obj1, [1, 2, 3]);` 将函数的上下文定义为 obj1，并且传入 1、2、3 三个参数，`func.call(obj2, 4, 5, 6);` 将函数的上下文定义为 obj2，并且传入 4、5、6 三个参数。

那 apply 和 call 基本相同，那么我们该用哪一个呢？其实 apply 和 call 的区别仅仅在于调用时传入的参数不同，其他完全一样。所以，在选择时，主要看传入的参数。如果已知参数已经在数组里了则用 apply 即可，或者参数是动态生成的，可以把参数 push 进一个数组，然后再用 apply 调用。当参数数量已知，或者在参数里有很多无关的值则用 call 方法调用。

## ES6 与 this

ES6 中引入了一个很棒的特性：箭头函数。说其棒，主要源于其书写简单，更重要的是其使得 this 更易于理解。

ES6 中，箭头函数中始终会捕捉其所在上下文的 this 值，作为自己的 this。这一点非常重要，省去了我们很多的麻烦。但对于那些习惯了每个 function 中都有自己 this 的人来说，可能还有些不习惯。举个例子吧，就拿调用方式 2 中的例子。

```js
const obj = {
  func: () => {
    console.log(this === window) // true，非箭头函数时指向 obj
  },
}
obj.func()
```

在上面的例子中，func 所在上下文的 this 值指向 window，而 func 是一个箭头函数，所以其里面的 this 会捕捉其所在上下文的 this 作为自己的 this， 所以 func 内的 this 也指向 window 对象。

## 其他补充

> 利用 bind() 改变函数上下文

```js
const obj1 = {
  a: 1,
}
const obj2 = {
  a: 2,
  func: function() {
    console.log(this.a)
  }.bind(obj1),
}
obj2.func() // 1
```

ECMAScript 5 引入了 `Function.prototype.bind`，其会创建一个绑定函数，当调用这个绑定函数时，函数上下文将会是 bind() 方法的第一个参数。上面的例子中，将 obj1 设置为函数上下文，所以利用 func 来调用函数时，函数的上下文为 obj1，而不是它的调用者 obj2。

利用 Array 的 5 个方法改变函数上下文

5 个方法分别是：

`Array.prototype.every(callbackfn [, thisArg ])`
`Array.prototype.some(callbackfn [, thisArg ])`
`Array.prototype.forEach(callbackfn [, thisArg ])`
`Array.prototype.map(callbackfn [, thisArg ])`
`Array.prototype.filter(callbackfn [, thisArg ])`

当调用以上 5 个方法时，传入的参数除了回调函数以外，还可以传入另外一个可选地参数，即函数上下文，代表回调函数中的函数上下文。如果省略该参数，则 callback 被调用时的 this 值，在非严格模式下为全局对象，在严格模式下传入 undefined。看下面的例子：

```js
const arr = ['segmentfault']
const obj = {}
arr.forEach(function(ele, ind) {
  console.log(this === window) // true
})
arr.forEach(function(ele, ind) {
  console.log(this === obj) // true
}, obj)
```

## 测试

```js
if (true) {
  // this
}
```

```js
const obj = {
  someData: 'a string',
}
function myFun() {
  // this
}
obj.staticFunction = myFun
obj.staticFunction()
```

```js
const obj = {
  myMethod: function() {
    // this
  },
}
const myFun = obj.myMethod
myFun()
```

```js
function myFun() {
  // this
}
const obj = {
  someData: 'a string',
}
myFun.call(obj)
```

```bash
答案：
window
obj
window
obj
```
