---
title: 深浅拷贝
date: 2019-4-10 23:41:17
categories:
  - JS 基础
tags:
  - JavaScript
---

## 浅拷贝

```js
export const shallowClone = obj => {
  const result = {}

  for (const i in obj) {
    result[i] = obj[i]
  }
  return result
}
```

## 深拷贝

```js
export const getType = obj =>
  Object.prototype
    .toString(obj)
    .replace(/^\[object\s(w+)\]$/, '$1')
    .toLowerCase()

export const deepClone = (parent, hash = new WeakMap()) => {
  if (parent === null) {
    return null
  }

  if (typeof parent !== 'object') {
    return parent
  }

  let child
  const type = getType(parent)
  const ConFn = parent.constructor

  switch (type) {
    case 'array':
      child = []
      break
    case 'regexp':
      child = new ConFn(parent)
      break
    case 'date':
      child = new Date(parent.getTime())
      break
    default:
      if (hash.has(parent)) {
        return hash.get(parent)
      }
      child = new ConFn(parent)
      hash.set(parent, child)
      break
  }

  for (const key in parent) {
    child[key] = deepClone(parent[key], hash)
  }

  return child
}
```
