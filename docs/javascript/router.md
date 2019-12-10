---
title: 前端路由
date: 2019-4-18 23:41:17
categories:
  - JS 基础
tags:
  - JavaScript
---

## hash 路由

> [https://mubu.com/doc/1iFLzJZrdK](https://mubu.com/doc/1iFLzJZrdK)

```js
/**
 * https://mubu.com/doc/1iFLzJZrdK
 *
 * @class HashRouter
 */
export class HashRouter {
  constructor() {
    // 用于存储不同 hash 值对应的回调函数
    this.router = {}

    window.addEventListener('hashchange', this.load.bind(this), false)
  }

  // 用于注册每个视图
  register(hash, callback = () => {}) {
    this.router[hash] = callback
  }

  // 用于注册首页
  registerIndex(callback = () => {}) {
    this.router['index'] = callback
  }

  // 用于处理视图未找到的情况
  registerNotFound(callback = () => {}) {
    this.router['404'] = callback
  }

  registerError(callback = () => {}) {
    this.router['error'] = callback
  }

  load() {
    const hash = window.location.hash.slice(1)
    let handler = !hash ? this.router.index : this.router[hash]

    if (!hash) {
      handler = this.router.index
    } else if (!this.router.hasOwnProperty(hash)) {
      handler = this.router['404'] || (() => {})
    } else {
      handler = this.router[hash]
    }

    handler.call(this)
  }
}
```

## history 路由

```js
class HistoryRouter {
  constructor() {
    this.router = {}
    this.listenPopState()
    this.listenLink()
  }

  listenPopState() {
    window.addEventListener('popstate', e => {
      const state = e.state || {}
      const path = state.path || ''

      this.dealPathHandler(path)
    })
  }

  listenLink() {
    window.addEventListener('click', e => {
      const dom = e.target

      if (dom.tagName.toUpperCase() === 'A' && dom.getAttribute('href')) {
        e.preventDefault()
      }
    })
  }

  load() {
    const path = window.location.pathname
    this.dealPathHandler(path)
  }

  register(path, callback = () => {}) {
    this.router[path] = callback
  }

  registerIndex(callback = () => {}) {
    this.router['/'] = callback
  }

  registerNotFound(callback = () => {}) {
    this.router['404'] = callback
  }

  registerError(callback = () => {}) {
    this.router['error'] = callback
  }

  assign(path) {
    window.history.pushState({ path }, null, path)
    this.dealPathHandler(path)
  }

  replace(path) {
    window.history.replaceState({ path }, null, path)
    this.dealPathHandler(path)
  }

  // 通用处理 path 调用回调函数
  dealPathHandler(path) {
    let handler

    if (!this.router.hasOwnProperty(path)) {
      handler = this.router['404'] || (() => {})
    } else {
      handler = this.router[path]
    }

    try {
      handler.call(this)
    } catch (e) {
      console
        .error(e)(this.router['error'] || (() => {}))
        .call(this, e)
    }
  }
}
```
