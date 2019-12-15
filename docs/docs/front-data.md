---
title: 前端资料
date: 2019-01-20 16:59:17
sidebar: auto
categories:
  - 前端
---

## 前端性能优化

### 图书

- [Web Performance in Action](http://www.allitebooks.in/web-performance-action/)，有 CSS、图片、字体、JavaScript 性能调优等
- [Designing for Performance](http://designingforperformance.com/) ，这本在线的电子书很不错，其中讲了很多网页优化的技术和相关的工具，可以让你对整体网页性能优化有所了解。
- [High Performance JavaScript](https://book.douban.com/subject/5362856/)，这本书在国内可以买到，能让你了解如何提升各方面的性能，包括代码的加载、运行、DOM 交互、页面生存周期等。雅虎的前端工程师尼古拉
  斯·扎卡斯（Nicholas C. Zakas）和其他五位 JavaScript 专家介绍了页面代码加载的最佳方法和编程技巧，来帮助你编写更为高效和快速的代码。你还会了解到构建和部署文件
  到生产环境的最佳实践，以及有助于定位线上问题的工具。
- [High Performance Web Sites: Essential Knowledge for Front-End Engineers](https://book.douban.com/subject/26411563/)，这本书国内也有卖，翻译版为《高性能网站建设指南：前端工程师技能精髓》。作者给出
  了 14 条具体的优化原则，每一条原则都配以范例佐证，并提供了在线支持。
  全书内容丰富，主要包括减少 HTTP 请求、Edge Computing 技术、Expires Header 技术、gzip 组件、CSS 和 JavaScript 最佳实践、主页内联、Domain 最小化、JavaScript 优
  化、避免重定向的技巧、删除重复 JavaScript 的技巧、关闭 ETags 的技巧、Ajax 缓存技术和最小化技术等
- 除了上面这几本书之外，`Google` 的 `Web Fundamentals` 里的 `Performance` 这一章节也有很多非常不错的知识和经验。

### 最佳实践

- [Browser Diet](https://browserdiet.com/zh/) ，前端权威性能指南（中文版）。这是一群为大型站点工作的专家们建立的一份前端性能的工作指南。
- [PageSpeed Insights Rules](https://developers.google.com/speed/docs/insights/rules) ，谷歌给的一份性能指南和最佳实践。
- [Best Practices for Speeding Up Your Web Site](https://developer.yahoo.com/performance/rules.html) ，雅虎公司给的一份 7 个分类共 35 个最佳实践的文档。

### 文章案例

- [A Simple Performance Comparison of HTTPS, SPDY and HTTP/2](http://blog.httpwatch.com/2015/01/16/a-simple-performance-comparison-of-https-spdy-and-http2/) ，这是一篇比较浏览器的 HTTPS、SPDY 和 HTTP/2 性能的文章，除了比较之外，还可以让你了解一些技
  术细节。
- [7 Tips for Faster HTTP/2 Performance](https://www.nginx.com/blog/7-tips-for-faster-http2-performance/) ，对于 HTTP/2 来说，Nginx 公司给出的 7 个增加其性能的小提示。
- [Reducing Slack’s memory footprint](https://slack.engineering/reducing-slacks-memory-footprint-4480fec7e8eb) ，Slack 团队减少内存使用量的实践。
- [Pinterest: Driving user growth with performance improvements](https://medium.com/pinterest-engineering/driving-user-growth-with-performance-improvements-cfc50dafadd7?) ，Pinterest 关于性能调优的一些分享，其中包括了前后端的一些性能调优实践。其实也是一些比较通用
  的玩法，这篇文章主要是想让前端的同学了解一下如何做整体的性能调优。
- [10 JavaScript Performance Boosting Tips](http://jonraasch.com/blog/10-javascript-performance-boosting-tips-from-nicholas-zakas) ，10 个提高 JavaScript 运行效率的小提示，挺有用的。
- [17 Statistics to Sell Web Performance Optimization](https://www.guypo.com/17-statistics-to-sell-web-performance-optimization/) ，这个网页上收集了好些公司的 Web 性能优化的工程分享，都是非常有价值的。
- [Getting started with the Picture Element](http://deanhume.com/getting-started-with-the-picture-element/) ，这篇文章讲述了 Responsive 布局所带来的一些负面的问题。主要是图像适配的问题，其中引出了一篇文章"[Native Responsive Images](https://dev.opera.com/articles/native-responsive-images/)"，值得一读。
- [Improve Page Load Times With DNS Prefetching](http://www.deanhume.com/Home/BlogPost/improve-page-load-times-with-dns-prefetching/80) ，这篇文章教了你一个如何降低 DNS 解析时间的小技术——DNS prefetching。
- [Jank Busting for Better Rendering Performance](https://www.html5rocks.com/en/tutorials/speed/rendering/) ，这是一篇 Google I/O 上的分享，关于前端动画渲染性能提升。
- [JavaScript Memory Profling](https://developers.google.com/web/tools/chrome-devtools/memory-problems?utm_campaign=2016q3&utm_medium=redirect&utm_source=dcc) ，这是一篇谷歌官方教你如何使用 Chrome 的开发工具来分析 JavaScript 内存问题的文章。

### 性能工具

- [PageSpeed](https://developers.google.com/speed) ，谷歌有一组 PageSpeed 工具来帮助你分析和优化网站的性能。Google 出品的，质量相当有保证。
- [YSlow](https://github.com/marcelduran/yslow) ，雅虎的一个网页分析工具。
- [GTmetrix](https://gtmetrix.com/) ，是一个将 PageSpeed 和 YSlow 合并起来的一个网页分析工具，并且加上一些 Page load 或是其它的一些分析。也是一个很不错的分析工具。
- [Awesome WPO](https://github.com/davidsonfellipe/awesome-wpo) ，在 GitHub 上的这个 Awesome 中，你可以找到更多的性能优化工具和资源。
- [https://chineseseoshifu.com/blog/china-hosted-javascript-libraries-jquery-dojo-boostrap.html](https://chineseseoshifu.com/blog/china-hosted-javascript-libraries-jquery-dojo-boostrap.html)国内 CDN 地址

## 前端框架

### React.js 框架

- [https://github.com/enaqx/awesome-react](https://github.com/enaqx/awesome-react)，这是一些 React 相关资源的列表，很大很全。
- [https://github.com/markerikson/react-redux-links](https://github.com/markerikson/react-redux-links)，这也是 React 相关的资源列表，与上面不一样的是，这个列表主要收集了大量的文章，其中讲述了很多 React 知识和技术，比上面的列表好很多。
- [https://react.rocks/](https://react.rocks/)，这个网站主要收集各种 React 的组件示例，可以让你大开眼界。

### Vue.js 框架

- [Awesome Vue](https://github.com/vuejs/awesome-vue)，Vue.js 里最为巨大最为优秀的资源列表。
