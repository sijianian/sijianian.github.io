---
title: EventEmitter
---

> 讲解: [https://juejin.im/post/5c199c0ae51d452f6028a072](https://juejin.im/post/5c199c0ae51d452f6028a072)

> 幕布：[https://mubu.com/doc/2Be2P9oKmM](https://mubu.com/doc/2Be2P9oKmM)

```js
/**
 *
 * @export
 * @class EventEmitter
 */
export default class EventEmitter {
  constructor() {
    this._events = Object.create(null)
  }

  on(type, handler) {
    this._events[type] = this._events[type] || []
    this._events[type].push(handler)
  }

  off(type, handler) {
    if (this._events[type]) {
      const index = this._events[type].indexOf(handler)
      if (~index) {
        this._events[type].splice(index, 1)
      }
    }
  }

  once(type, handler) {
    let fired = false
    function magic(...args) {
      this.off(type, magic)
      if (!fired) {
        fired = true
        handler.apply(this, args)
      }
    }
    this.on(type, magic)
  }

  emit(type, ...args) {
    const payload = args
    const array = this._events[type] || []
    array.forEach(handler => {
      handler.apply(this, payload)
    })
  }
}
```
