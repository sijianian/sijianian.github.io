---
title: Curry
categories:
  - JS 基础
tags:
  - JavaScript
---

```js
const curry = (fn, arity = fn.length, ...args) =>
  arity <= args.length ? fn(...args) : curry.bind(null, fn, arity, ...args)

console.log(curry(Math.pow)(2)(8))
console.log(curry(Math.min, 3)(10)(50)(2))
```
