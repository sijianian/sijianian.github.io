---
title: New
categories:
  - JS 基础
tags:
  - JavaScript
---

```js
export function myNew(...args) {
  // 创建一个空对象
  const obj = {}

  // 获取构造函数
  const Con = [].shift.call(args)

  // 设置空对象的原型
  obj.__proto__ = Con.prototype

  // 绑定 this 并执行构造函数
  const result = Con.apply(obj, args)

  // 确保返回值为对象
  return result instanceof Object ? result : obj
}
```
