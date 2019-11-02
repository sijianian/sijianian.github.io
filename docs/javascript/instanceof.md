---
title: Instanceof
categories:
  - JS 基础
tags:
  - JavaScript
---

```js
export function myInstanceof(left, right) {
  const prototype = right.prototype

  left = left.__proto__

  // eslint-disable-next-line no-constant-condition
  while (true) {
    if (!left === null || !left === undefined) {
      return false
    }

    if (prototype === left) {
      return true
    }

    left = left.__proto__
  }
}
```
