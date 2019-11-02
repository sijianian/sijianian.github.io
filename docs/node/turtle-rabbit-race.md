---
title: 命令行实现龟兔赛跑
sidebar: auto
categories:
  - Node
---

## 前言

[chalk-animation](https://github.com/bokub/chalk-animation)是一个非常有意思的 Node 命令行动画库

> e.g.

![](https://static.skynian.cn/20191102113333.png)

看起来非常的花里胡哨，但是我喜欢！_(:з」∠)_

我们可以用这个库来实现一个小小的龟兔赛跑动画

![](https://static.skynian.cn/20191102113824.png)

## 使用到的 ES6 语法特性

> [Mozilla文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/New_in_JavaScript/ECMAScript_6_support_in_Mozilla)
> [ECMAScript 6 ](http://es6.ruanyifeng.com/#docs/intro)

### 变量声明

let 具有块级域

const 通常声明不可变变量

```js
let debugId = 1000
const Compiler = require('./Compiler)
```

### 模板字符串

字符串的简洁写法

```js
let message = `* ${m.identified()}`
const ma = `${a.message}`
```

### 箭头函数

省略 function 的函数定义

```js
const exportPlugins = (obj, mappings) => {}
```

### 解构赋值

从目标数组或者对象提取特定值

```js
const { SynHook } = require('tapable')
```

### rest 参数与扩展运算符

参数到数组与数组铺开为参数，可以看做互逆

```js
// 多余参数转成一个数组 args[]
function(name, ...args) {
  // 把数组以 ... 扩展为参数
  this.hooks[name.replace(/**/)].call(...args)
}
```

### Set 对象

一种数据结构，可存任意数据类型，且保证值唯一

```js
// 可接收一个可迭代对象作为参数，构造一个新的 Set 对象
const queue = new Set(this.groupsIterable)
// 可接收空参数生成一个 Set 对象
const chunksProcessed = new Set()
```

### Map 对象

哈希结构的键值对集合

```js
// 创建一个空集合，交给 fileTimestamps
const fileTs = (compiler.fileTimestamps = new Map())
```

### Promise 对象

管理异步状态的对象，在某个时刻来回调返回异步执行结果

```js
// fs 模块读出文件内容并转成 JSON
// 把整个异步过程包装成一个 Promise 返回
return new Promise((resolve, reject) => {
  require('fs').readFile(filename, (err, content) => {
    try {
      var update = JSON.parse(content)
    } catch (e) {
      return reject(e)
    }
    resolve(update)
  })
})
```

### for ... of 循环

遍历循环所有成员

```js
// 遍历拿到所有该模块的依赖项
for (const dependency of module.dependencies) {}
```

### Proxy 代理

Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”（meta programming），即对编程语言进行编程。

### apply(target, object, args)

拦截 Proxy 实例作为函数调用的操作，比如proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)。

## 实现效果

![](https://static.skynian.cn/20191102114152.gif)

## 详细代码

```js
const chalkWorker = require('chalk-animation')

class Race extends Object {
  constructor(props = {}) {
    super(props)
    ;[
      ['rabbit', '兔子'],
      ['turtle', '乌龟'],
      ['turtleStep', 0],
      ['rabbitStep', 0],
      ['start', '|'],
      ['end', '》'],
      ['pad', '.'],
      ['speed', 1],
      ['steps', 50],
      ['stopAt', 42],
    ].forEach(elem => {
      const [key, value] = elem
      if (!(key in props)) {
        this[key] = value
      }
    })
  }

  getRaceTrack() {
    const {
      start,
      pad,
      turtle,
      turtleStep,
      rabbit,
      rabbitStep,
      steps,
      end,
    } = this

    if (!turtleStep && !rabbitStep) {
      return `${turtle}${rabbit}${start}${pad.repeat(steps)}${end}`
    }

    const [[minStr, min], [maxStr, max]] = [
      [turtle, turtleStep],
      [rabbit, rabbitStep],
    ].sort((a, b) => a[1] - b[1])

    const prefix = `${pad.repeat((min || 1) - 1)}`
    const middle = `${pad.repeat(max - min)}`
    const suffix = `${pad.repeat(steps - max)}`

    const _start = `${start}${prefix}${minStr}`
    const _end = suffix ? `${maxStr}${suffix}${end}` : `${end}${maxStr}`
    return `${_start}${middle}${_end}`
  }

  updateRaceTrack(state, racing) {
    racing.replace(state)
  }

  updateSteps() {
    if (this.turtleStep >= this.steps) return
    if (this.rabbitStep <= this.stopAt) {
      this.rabbitStep += 3 * this.speed
    }
    this.turtleStep += 1 * this.speed
  }

  race() {
    const initState = this.getRaceTrack()
    const racing = chalkWorker.rainbow(initState)
    let t = 0
    const timer = setInterval(() => {
      if (t <= 6) {
        t += 1
        return
      }
      const state = this.getRaceTrack()
      this.updateRaceTrack(state, racing)
      this.updateSteps()
    }, 150)
  }
}

const proxy = new Proxy(Race, {
  apply(target, ctx, args) {
    const race = new target(...args)
    return race.race()
  },
})

proxy()
```
