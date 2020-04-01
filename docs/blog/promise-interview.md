---
title: Promise Tips
date: 2020-03-31 22:50:01
sidebar: auto
tags:
  - JavaScript
categories:
  - 博客
---

## 幕布笔记

[https://mubu.com/doc/1-t7KhlwuM](https://mubu.com/doc/1-t7KhlwuM)

## 使用 Promise 实现每隔一秒输出 1、2、3

```js
const arr = [1, 2, 3]

arr.reduce((promise, item) => {
  return promise.then(() => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(item)
        console.log(item)
      }, 1000)
    })
  })
}, Promise.resolve())
```

## 使用 Promise 实现红绿灯交替重复亮

红灯 3 秒亮一次，黄灯 2 秒亮一次，绿灯 1 秒亮一次；如何让三个灯不断交替重复亮灯？（用 Promise 实现）三个亮灯函数已经存在：

```js
function red() {
  console.log('red')
}
function green() {
  console.log('green')
}
function yellow() {
  console.log('yellow')
}
const light = function (timer, cb) {
  return new Promise(resolve => {
    setTimeout(() => {
      cb()
      resolve()
    }, timer)
  })
}
const step = function () {
  Promise.resolve()
    .then(() => {
      return light(3000, red)
    })
    .then(() => {
      return light(2000, green)
    })
    .then(() => {
      return light(1000, yellow)
    })
    .then(() => {
      return step()
    })
}

step()
```

## 实现 mergePromise 函数

实现 mergePromise 函数，把传进去的数组按顺序先后执行，并且把返回的数据先后放到数组 data 中

```js
const time = timer => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, timer)
  })
}
const ajax1 = () =>
  time(2000).then(() => {
    console.log(1)
    return 1
  })
const ajax2 = () =>
  time(1000).then(() => {
    console.log(2)
    return 2
  })
const ajax3 = () =>
  time(1000).then(() => {
    console.log(3)
    return 3
  })

function mergePromise() {
  // 在这里写代码
}

mergePromise([ajax1, ajax2, ajax3]).then(data => {
  console.log('done')
  console.log(data) // data 为 [1, 2, 3]
})

// 要求分别输出
// 1
// 2
// 3
// done
// [1, 2, 3]
```

> 实现

```js
// 存放每个ajax的结果
const data = []
let promise = Promise.resolve()
ajaxArray.forEach(ajax => {
  // 第一次的then为了用来调用ajax
  // 第二次的then是为了获取ajax的结果
  promise = promise.then(ajax).then(res => {
    data.push(res)
    return data // 把每次的结果返回
  })
})
// 最后得到的promise它的值就是data
return promise
```

## 根据 Promise A+ 实现一个自己的 Promise

TODO:

## 封装一个异步加载图片的方法

```js
function loadImg(url) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = function () {
      console.log('一张图片加载完成')
      resolve(img)
    }
    img.onerror = function () {
      reject(new Error('Could not load image at' + url))
    }
    img.src = url
  })
}
```

## 限制异步操作的并发个数

有 8 个图片资源的 url，已经存储在数组 urls 中

而且还有一个 函数 `function loadImg`，输入一个 url 链接，返回一个 `Promise`，该 `Promise` 在图片下载完成后 `resolve`，下载失败则 `reject`

但有一个要求，任何时刻同时下载的链接数量不可以超过 3 个

```js
const urls = [
  'https://www.kkkk1000.com/images/getImgData/getImgDatadata.jpg',
  'https://www.kkkk1000.com/images/getImgData/gray.gif',
  'https://www.kkkk1000.com/images/getImgData/Particle.gif',
  'https://www.kkkk1000.com/images/getImgData/arithmetic.png',
  'https://www.kkkk1000.com/images/getImgData/arithmetic2.gif',
  'https://www.kkkk1000.com/images/getImgData/getImgDataError.jpg',
  'https://www.kkkk1000.com/images/getImgData/arithmetic.gif',
  'https://www.kkkk1000.com/images/wxQrCode2.png',
]

function loadImg(url) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = function () {
      console.log('一张图片加载完成')
      resolve()
    }
    img.onerror = reject
    img.src = url
  })
}

function limitLoad(urls, handler, limit) {
  // 对数组做一个拷贝
  const sequence = [].concat(urls)
  let promises = []

  //并发请求到最大数
  promises = sequence.splice(0, limit).map((url, index) => {
    // 这里返回的 index 是任务在 promises 的脚标，用于在 Promise.race 之后找到完成的任务脚标
    return handler(url).then(() => {
      return index
    })
  })

  // 利用数组的 reduce 方法来以队列的形式执行
  return sequence
    .reduce((last, url, currentIndex) => {
      return last
        .then(() => {
          // 返回最快改变状态的 Promise
          return Promise.race(promises)
        })
        .catch(err => {
          // 这里的 catch 不仅用来捕获 前面 then 方法抛出的错误
          // 更重要的是防止中断整个链式调用
          console.error(err)
        })
        .then(res => {
          // 用新的 Promise 替换掉最快改变状态的 Promise
          promises[res] = handler(sequence[currentIndex]).then(() => {
            return res
          })
        })
    }, Promise.resolve())
    .then(() => {
      return Promise.all(promises)
    })
}
limitLoad(urls, loadImg, 3)

/*
因为 limitLoad 函数也返回一个 Promise，所以当 所有图片加载完成后，可以继续链式调用

limitLoad(urls, loadImg, 3).then(() => {
    console.log('所有图片加载完成');
}).catch(err => {
    console.error(err);
})
*/
```
