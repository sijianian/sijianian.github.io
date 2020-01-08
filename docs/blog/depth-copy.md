---
title: 深浅拷贝
date: 2018-12-29 14:21:04
sidebar: auto
tags:
  - JavaScript
categories:
  - 博客
---

前端日常开发中，经常会遇到的问题是：什么是浅拷贝？如何实现浅拷贝？什么事深拷贝？如何实现深拷贝？

众所周知，对象类型在赋值的过程中其实是复制了地址，从而会导致改变了一方其他也都会被改变的情况。通常在开发中我们不希望出现这样的问题。这个时候，我们就可以使用浅拷贝来解决这个情况。

<!-- more -->

```js
let a = {
  age: 1,
}
let b = a
a.age = 2

console.log(b.age) // 2
```

## 浅拷贝

首先可以通过 **Object.assign** 来解决这个问题，很多人认为这个函数是用来深拷贝的。其实并不是，**Object.assign** 只会拷贝所有的属性值到新的对象中，如果属性值是对象的话，拷贝的是地址，所以并不是深拷贝。

```js
let a = {
  age: 1,
}
let b = Object.assign({}, a)
a.age = 2
console.log(b.age) // 1
```

另外我们还可以通过展开运算符 **...** 来实现  浅拷贝

```js
let a = {
  age: 1,
}
let b = { ...a }
a.age = 2
console.log(b.age)
```

通常浅拷贝就能解决大部分的问题了，但是当我们遇到如下的情况的时候，可能需要使用到深拷贝了

```js
let a = {
  age: 1,
  jobs: {
    first: 'FE',
  },
}
let b = { ...a }
a.jobs.first = 'native'
console.log(b.jobs.first)
```

浅拷贝只解决了第一层的问题，如果接下去的值中还有对象的话，那么就又回到了最开始的话题了，两者享有相同的地址。要解决这个问题，我们就得使用深拷贝了。

## 深拷贝

这个问题通常可以通过 **JSON.parse(JSON.stringify(object))** 来解决

```js
let a = {
  age: 1,
  jobs: {
    first: 'FE',
  },
}
let b = JSON.parse(JSON.stringify(a))
a.jobs.first = 'native'
console.log(b.jobs.first)
```

但是该方法也是有局限性的：

- 会忽略 **undefined**
- 会忽略 **symbol**
- 不能序列化函数
- 不能解决循环引用的问题

```js
let obj = {
  a: 1,
  b: {
    c: 2,
    d: 3,
  },
}
obj.c = obj.b
obj.e = obj.a
obj.b.c = obj.c
obj.b.d = obj.b
obj.b.e = obj.b.c
let newObj = JSON.parse(JSON.stringify(obj))
console.log(newObj)
```

如果你有这么一个循环引用对象，你会发现并不能通过该方法实现深拷贝

![](http://q3roqx7vi.bkt.clouddn.com/19-1-2/38398019.jpg)

在遇到函数、**undefined** 或者 **symbol** 的时候，该对象也不能正常的序列化

```js
let a = {
  age: undefined,
  sex: Symbol('male'),
  jobs: function() {},
  name: 'yck',
}
let b = JSON.parse(JSON.stringify(a))
console.log(b) // {name: "yck"}
```

你会发现在上述情况中，该方法会忽略掉函数和 **undefined** 。

但是在通常情况下，复杂数据都是可以序列化的，所以这个函数可以解决大部分问题。

如果你所需拷贝的对象含有内置类型并且不包含函数，可以使用 **MessageChannel**

```js
function structuralClone(obj) {
  return new Promise(resolve => {
    const { port1, port2 } = new MessageChannel()
    port2.onmessage = ev => resolve(ev.data)
    port1.postMessage(obj)
  })
}

var obj = {
  a: 1,
  b: {
    c: 2,
  },
}

obj.b.d = obj.b

// 注意该方法是异步的
// 可以处理 undefined 和循环引用对象
const test = async () => {
  const clone = await structuralClone(obj)
  console.log(clone)
}
test()
```

当然你可能想自己来实现一个深拷贝，但是其实实现一个深拷贝是很困难的，需要我们考虑好多种边界情况，比如原型链如何处理、DOM 如何处理等等，所以这里我们实现的深拷贝只是简易版，并且我其实更推荐使用 lodash 的深拷贝函数。

[lodash 的深拷贝函数](https://link.juejin.im?target=https%3A%2F%2Flodash.com%2Fdocs%23cloneDeep)

```js
function deepClone(obj) {
  function isObject(o) {
    return (typeof o === 'object' || typeof o === 'function') && o !== null
  }

  if (!isObject(obj)) {
    throw new Error('非对象')
  }

  let isArray = Array.isArray(obj)
  let newObj = isArray ? [...obj] : { ...obj }
  Reflect.ownKeys(newObj).forEach(key => {
    newObj[key] = isObject(obj[key]) ? deepClone(obj[key]) : obj[key]
  })

  return newObj
}

let obj = {
  a: [1, 2, 3],
  b: {
    c: 2,
    d: 3,
  },
}
let newObj = deepClone(obj)
newObj.b.c = 1
console.log(obj.b.c) // 2
```
