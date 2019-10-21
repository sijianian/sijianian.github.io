---
title: 手动实现 call、apply、bind
---

## call

```js
export function myCall(context, ...args) {
  if (typeof this !== 'function') {
    throw new Error('error')
  }

  context = context || window

  const mySymbol = Symbol()

  context[mySymbol] = this

  const result = context[mySymbol](...args)

  delete context[mySymbol]

  return result
}
```

## apply

```js
export function myApply(context, ...args) {
  if (typeof this !== 'function') {
    throw new Error('error')
  }

  context = context || window

  const mySymbol = Symbol()

  context[mySymbol] = this

  let result

  if (args[0]) {
    result = context[mySymbol](...args[0])
  } else {
    result = context[mySymbol]()
  }

  delete context[mySymbol]

  return result
}
```

## bind

```js
export function myBind(context, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError('error')
  }

  context = context || window

  const _this = this

  return function F(...args2) {
    if (this instanceof F) {
      return new _this(...args, ...args2)
    }

    return _this.apply(context, [...args, ...args2])
  }
}
```
