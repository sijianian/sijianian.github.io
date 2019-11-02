---
title: 为什么 Vue 组件中的 data 必须是函数
date: 2018-06-20 20:52:58
tags:
  - Vue
categories:
  - 博客
---

Vue 组件化使用，能够提高开发效率，方便重复使用。

组件写法还是有一点区别的，最明显的是

```
// 直接实例化
data: {
  count: 0,
},

// 组价形式
data: function() {
  return {
    count: 0,
  }
},
```

也就是，**一个组件的 data 选项必须是一个函数**

vue 官方解释：

通过函数返回，因此每一个实例可以维护一份被返回对象的独立的拷贝，如果 Vue 没有这条规则，点击一个按钮就可能会影响到其他实例

## 从原型链分析

首先，Object 是引用类型，如果不用 Function 返回，每个组件的 data 都是内存的同一个地址，因此彼此之间改变会有影响

eg：

```js
const MyComponent = function() {}

MyComponent.prototype.data = {
  a: 1,
  b: 2,
}

const component1 = new MyComponent()
const component2 = new MyComponent()

component1.data.a === component2.data.a // true

component1.data.b = 5
component2.data.b // 5
```

因此两个实例都应该拥有一个自己的域

```js
const MyComponent = function() {
  this.data = this.data()
}

MyComponent.prototype.data = function() {
  return {
    a: 1,
    b: 2,
  }
}
```

 我们从以上代码，可以很清晰度明白其中的原因。

其实，data()，可以命名为 setData() ，这样子  更容易让  人理解。

## 参考

- [为什么在 vue 的组件中，data 要用 function 返回对象呢？](https://blog.csdn.net/shaleilei/article/details/78084171)
- [vue 官网-data 必须是函数](https://cn.vuejs.org/v2/guide/components.html#data-%E5%BF%85%E9%A1%BB%E6%98%AF%E4%B8%80%E4%B8%AA%E5%87%BD%E6%95%B0)
