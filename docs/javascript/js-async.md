---
title: 浅谈JavaScript异步
date: 2018-06-13 23:38:17
tags:
  - JavaScript
categories: JavaScript
---

## JavaScript 是单线程？

- JS 引擎中负责解释和执行 JS 代码的线程只有一个（主）
- AJAX 、处理 DOM 、定时器、读写......（工作线程）
- 对于耗时或者时间不确定的操作，使用异步
- HTML5 Web Worker 多线程

<!--more-->

## 异步执行机制

1. 所有同步任务都在主线程执行，形成执行栈
2. “任务队列”，异步任务的结果存放
3. 同步任务执行完毕，读取“任务队列”
4. 主线程不断重复第三步
5. 主线程阻塞，任务队列依旧能够被推入任务

## Event Loop

主线程从“任务队列”中读取事件，不断循环

![](https://static.skynian.cn/js-async-201861401039.jpg)

## Macrotask 和 Microtask

**macro-tasks：** script (整体代码)，setTimeout，setInterval，setImmediate，I/O，UI

**micro-tasks：** process.nextTick，Promises，Object.observe，MutationObserver（HTML5 新特性）

在一个事件循环里，

这两个队列会分两步执行，

第一步会固定地执行一个（且仅一个）Macrotask 任务，

第二步会执行整个 Microtask 队列中的所有任务。

![](https://static.skynian.cn/js-async-2018614020.png)

> 接下来，我们用代码来感受

```js
setTimeout(function() {
  console.log('timeout1')
})

new Promise(resolve => {
  console.log('promise1')

  for (let i = 0; i < 1000; i++) {
    i === 99 && resolve()
  }

  console.log('promise2')
}).then(() => {
  console.log('then1')
})

console.log('glogal1')
```

答案:

```cmd
promise1
promise2
global1
then1
timeout1
```

## 在线演示

[地址](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)

![](https://static.skynian.cn/js-async-20186140952.png)

## 作用

**Macrotasks:** 代表一些离散的独立的工作，task 结束后，浏览器继续其他工作如页面重渲染和垃圾回收等

**Microtasks:** 更新完成应用程序状态的较小任务，在 UI 重渲染之前执行某些任务，避免不必要的 UI 渲染

## Vue 中 MutationObserver

[https://github.com/vuejs/vue/blob/9cfd63a7d08c1eba029c8bd7463b3047c3347826/src/core/util/env.js#L86-L95](https://github.com/vuejs/vue/blob/9cfd63a7d08c1eba029c8bd7463b3047c3347826/src/core/util/env.js#L86-L95)

```js
let counter = 1
let observer = new MutationObserver(nextTickHandler)
let textNode = document.createTextNode(String(counter))
observer.observe(textNode, {
  characterData: true,
})
timerFunc = () => {
  counter = (counter + 1) % 2
  textNode.data = String(counter)
}
```

## JS 异步发展

- Callback
- Promise
- Generator
- Async function
- rxjs ??
- ......

## Callback

- 给匿名函数命名
- 模块化
- ...

```js
getData(function(a){
    getMoreData(a, function(b){
        getMoreData(b, function(c){
            getMoreData(c, function(d){
                getMoreData(d, function(e){
                    ...
                })
            })
        })
    })
})
```

## Promise

- 解决了异步回调函数层层嵌套
- 错误处理以及链式回调

```js
// 没有 promise
a(getResultFromA, (aResult, err) => {
  if (!err) {
    b(getResultFromB, (bResult, err) => {
      if (!err) {
        c(getResultFromC, (cResult, err) => {
          if (!err) {
            // do something
          } else {
            throw err
          }
        })
      } else {
        throw err
      }
    })
  } else {
    throw err
  }
})

// 用了 promise 后
new promise((resolve, reject) => {
  a(getResultFromA, (aResult, err) => {
    if (!err) resolve(aResult) else reject(err)
  })
})
.then(data => {
  return new Promise((resolve, reject) => {
    b(getResultFromB, (bResult, err) => {
      if (!err) resolve(bResult) else reject(err)
    })
  }
})
.then(data => {
  return new Promise((resolve, reject) => {
    c(getResultFromC, (cResult, err) => {
      if (!err) resolve(cResult) else reject(err)
    })
  }
})
.then(data => {
  // do something
})
.catch(err => {
  throw err
})
```

## Generator

- "协程"（coroutine），意思是多个线程互相协作，完成异步任务
- 流程管理却不方便

```js
// 定义
var fetch = require('node-fetch')

function* gen() {
  var url = 'https://api.github.com/users/github'
  var result = yield fetch(url)
  console.log(result.bio)
}

// 使用
var g = gen()
var result = g.next()

result.value
  .then(function(data) {
    return data.json()
  })
  .then(function(data) {
    g.next(data)
  })
```

## Async

- 内置执行器
- 更好的语义
- 更广的适用性
- 返回值是 Promise

## Rxjs(流 Stream)

Reactive Extensions for JavaScript

观察者 + 迭代器模式

Observables 与 Observer

**订阅：** Observer 通过 Observable 提供的 subscribe() 方法订阅 Observable
**发布：** Observable 通过回调 next 方法向 Observer 发布事件

[构建流式应用—RxJS 详解(AlloyTeam)](http://www.alloyteam.com/2016/12/learn-rxjs/)
