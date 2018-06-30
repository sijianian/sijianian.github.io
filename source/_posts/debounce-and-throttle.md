---
title: 函数去抖和函数节流
date: 2018-06-28 23:19:56
tags:
  - JavaScript
categories: JavaScript
---

debounce，在项目中其实使用的频率挺高的，但是一直没有彻底理解应用场景和原理，这次就做一次简单的总结。

函数防抖与节流是很相似的概念，但是他们的应用场景不太一样。

我们先从概念上深刻理解它们。

## 先说函数防抖，debounce。

其概念其实是从机械开关和继电器的“去弹跳”（debounce）衍生 出来的，基本思路就是把多个信号合并为一个信号。

单反也有相似的概念，在拍照的时候手如果拿不稳晃的时候拍照一般手机是拍不出好照片的，因此智能手机是在你按一下时连续拍许多张， 能过合成手段，生成一张。翻译成 JS 就是，事件内的N个动作会变忽略，只有事件后`由程序触发`的动作只是有效。

实现思路如下，将目标方法（动作）包装在 setTimeout 里面，然后这个方法是一个事件的回调函数，如果这个回调一直执行，那么这些动作就一直不执行。为什么不执行呢，我们搞了一个 clearTimeout，这样 setTimeout 里的方法就不会执行！ 为什么要 clearTimeout 呢，我们就需要将事件内的连续动作删掉嘛！待到用户不触发这事件了。那么 setTimeout 就自然会执行这个方法。

那么这个方法用在什么地方呢，就是用于 input 输入框架的格式验证，假如只是验证都是字母也罢了，太简单了，不怎么耗性能，如果是验证是否身份证，这性能消耗大，你可以隔 170ms 才验证一次。这时就需要这个东西。或者你这个是自动完全，需要将已有的输入数据往后端拉一个列表，频繁的交互，后端肯定耗不起，这时也需要这个，如隔 350ms。

> 简单实现

```js
function debounce(func, delay) {
    let timeout
    return function(e) {
        console.log("清除",timeout,e.target.value)
        clearTimeout(timeout)
        let context = this,
          args = arguments
        console.log("新的", timeout, e.target.value)
        timeout = setTimeout(function(){
          console.log("----")
          func.apply(context, args)
        }, delay)
    };
};

let validate = debounce(function(e) {
    console.log("change", e.target.value, new Date-0)
}, 380)

// 绑定监听
document.querySelector("input").addEventListener('input', validate)
```

这个保证了正常的用户每输入1，2个字符就能触发一次。如果用户是输入法狂魔，也可以狠制他每输入3～6个字符触发一次。

这个方法的重点是，它在用户不触发事件的时，才触发动作，并且抑制了本来在事件中要执行的动作。

其他应用场合：提交按钮的点击事件。

## 再看节流，throttle。

节流的概念可以想象一下水坝，你建了水坝在河道中，不能让水流动不了，你只能让水流慢些。换言之，你不能让用户的方法都不执行。如果这样干，就是debounce了。为了让用户的方法在某个时间段内只执行一次，我们需要保存上次执行的时间点与定时器。

```js
function throttle(fn, threshhold) {
 let timeout
 let start = new Date;
 let threshhold = threshhold || 160
 return function () {
 let context = this,
  args = arguments,
  curr = new Date() - 0

 clearTimeout(timeout)  //总是干掉事件回调
 if (curr - start >= threshhold) {
     console.log("now", curr, curr - start) //注意这里相减的结果，都差不多是160左右
     fn.apply(context, args) //只执行一部分方法，这些方法是在某个时间段内执行一次
     start = curr
 } else {
 // 让方法在脱离事件后也能执行一次
     timeout = setTimeout(function(){
        fn.apply(context, args)
     }, threshhold)
    }
  }
}
let mousemove = throttle(function(e) {
 console.log(e.pageX, e.pageY)
})

// 绑定监听
document.querySelector("#panel").addEventListener('mousemove', mousemove)
```

函数节流会用在比 input, keyup 更频繁触发的事件中，如resize, touchmove, mousemove, scroll。throttle 会强制函数以固定的速率执行。因此这个方法比较适合应用于动画相关的场景。

> 函数抖动和节流视图

![debounce-and-throttle-2018628233717](https://static.skynian.cn/debounce-and-throttle-2018628233717.png)
