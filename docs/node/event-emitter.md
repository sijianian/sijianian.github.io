---
title: Node 的事件机制 - EventEmitter
date: 2019-12-19 15:41:17
categories:
  - Node
tags:
  - Node
---

## EventEmitter 的基本用法

在 Node 里面，events 模块提供了 EventEmitter 的 Class 类，可以直接创建一个事件实例

```js
// events 是 Node 的 built-in 模块，它提供了 EventEmitter 类
const EventEmitter = require('events')

// 创建 EventEmitter 的事件实例
const ee = new EventEmitter()

// 为实例增加 open 事件的监听以及注册回调函数，事件名甚至可以是中文
ee.on('open', (error, result) => {
  console.log('事件发生了，第一个监听回调函数执行')
})

// 为实例再增加一个 增加 open 事件的监听器
ee.on('open', (error, result) => {
  console.log('事件发生了，第二个监听回调函数执行')
})

// 通过 emit 来发出事件，所有该事件队列里的回调函数都会顺序执行
ee.emit('open')

console.log('触发后，隔一秒再触发一次')
setTimeout(() => {
  ee.emit('open')
}, 1000)

// 事件发生了，第一个监听回调函数执行
// 事件发生了，第二个监听回调函数执行
// 触发后，隔一秒再触发一次
// 事件发生了，第一个监听回调函数执行
// 事件发生了，第二个监听回调函数执行
```

一个事件实例上有如下的属性和方法：

- `addListener(event, listener)`: 向事件队列后面再增加一个监听器
- `emit(event, [arg1], [arg2], […])`: 向事件队列触发一个事件，同时可以对该事件传过去更多的数据
- `listeners(event)`: 返回事件队列中特定的事件监听对象
- `on(event, listener)`: 针对一个特定的事件注册监听器，该监听器就是一个回调函数
- `once(event, listener)`: 与 on 一样，只不过它只会执行一次，只生效一次
- `removeAllListeners([event])`: 移除所有指定事件的监听器，不指定的话，移除所有监听器，也就是清空事件队列
- `removeListener(event, listener)`: 只移除特定事件监听器
- `setMaxListeners(n)`: 设置监听器数组的最大数量，默认是 10，超过 10 个会收到 Node 的警告

通过 `Node` 内建的 `events`，我们可以通过继承它来实现更灵活的类控制，给予类实例更多的控制颗粒度，即便是游戏规则变更，从代码的耦合度和维护性上看，后面这一种实现都会更轻量更灵活。

## 音乐播放器项目地址

TODO

## 音乐播放器项目目录

TODO
