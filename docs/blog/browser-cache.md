---
title: 浅析浏览器缓存
date: 2018-07-07 17:35:44
tags:
  - HTTP
  - WEB
categories:
  - 博客
---

浏览器缓存是优化性能的一种方式，下面看看常见的 HTTP 缓存头，工作流程。

当我们打开一个网站时，打开开发者工具 Network 面板，我们通常可以看到 from disk cache 缓存到硬盘，from memory cache 缓存到内存（chrome）这些字样，这个就是浏览器缓存。

这个通常是怎么设置的呢，就是我们这里要介绍的 HTTP 缓存头。

## Expires

```
Expires: Fri, 11 Jun 2021 11:33:01 GMT
```

Expires 的值是绝对时间，格林尼治时间，显示的也是服务器的时间

不推荐 Expires，主要原因是：

它设置的是绝对时间，如果系统时钟错了，或者不同时区之类的原因，缓存也会出错
优先级较低，会被覆盖，当然可用作兼容考虑

## Cache-Control

```
Cache-Control: public, max-age=6400
```

Cache-Control 是相对时间，优先级高于 Expires，没有上面 Expires 的问题。但是，文件修改后，如果我是希望不要缓存的，不要等待 Cache-Control 设定的值，这种情况下：

一方面，可以通过给资源每次修改加版本号或随机数

```
<link rel="stylesheet" href="styles.css?version=1.0">
```

另一方面可以使用 Last-Modified 和 Etag 协商缓存来解决。接下来就讲讲这两个。

## Last-Modified 和 If-Modified-Since

```
Last-Modified: Fri, 22 Jul 2016 01:47:00 GMT
```

Last-Modified 文件最后修改的时间，浏览器会缓存这个时间。

与 Last-Modified 配合的请求头是 If-Modified-Since，就是缓存的 Last-Modified 的时间，那么是如何配合的呢？

举个例子，每次当浏览器刷新的时候，当 Cache-Control 的时间已过的时候，询问下服务器 Last-Modified 是什么，然后和上次缓存到浏览器的 Last-Modified，也就是放在了请求头的 If-Modified-Since 作比较

如果相同，服务器会返回 304，即请求已被允许，而文档的内容（自上次访问以来或者根据请求的条件）并没有改变，不用更新文件，使用浏览器缓存。
如果不同，服务器会返回 200，即会重新请求更新过的资源

## Etag 和 If-None-Match

```
Etag: xxxx
```

在上面的例子中，只考虑了服务器文件修改时间，但是有时候，打开文件可能没有修改任何内容，而修改时间发生了变化，这个就造成了本应该继续缓存的文件，需要重新请求，这是不合理的，这时候就出现了 Etag。

Etag 的值是文件的 Hash 值，文件内容是否变化可以通过文件的 Hash 值准确地判断。

对应 Last-Modified 和 If-Modified-Since 的配合机制，Etag 和 If-None-Match 是同样的协商。

## 总结

最常用的浏览器缓存就是这样做的，当然还有更多内容，不同的设定的值等等，如果想了解浏览器缓存更详细的信息，可以参考文章：

[HTTP 缓存控制小结](http://www.imweb.io/topic/5795dcb6fb312541492eda8c)

[Google 开发者文档：HTTP 缓存](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching)
