---
title: 防抖与节流
categories:
  - JS 基础
tags:
  - JavaScript
---

## 防抖

```js
export const debounce = (fn, delay = 300) => {
  let timer = null

  return (...args) => {
    clearTimeout(timer)

    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}
```

## 节流

```js
export const throttle = (fn, delay = 300) => {
  let flag = true

  return (...args) => {
    if (!flag) {
      return
    }

    flag = false

    setTimeout(() => {
      fn.apply(this, args)
      flag = true
    }, delay)
  }
}
```
