---
title: webpack 简单整理
date: 2019-06-11 20:53:06
sidebar: auto
tags:
  - webpack
categories:
  - 博客
---

## webpack 的了解

本质上，webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)。
当 webpack 处理应用的时候，它会递归地构建一个依赖关系图（dependency graph），其中包含应用程序需要的每个模块，然后将这些模块打包成一个或多个 bundle。

核心点是模块化编程。

每个模块具有比完整程序更小的接触面，使得校验、调试、测试轻而易举。精心编写的`模块`提供了可靠的抽象和封装界限，使得应用程序中每个模块都具有条理清楚的设计和明确的目的。

## Gulp 和 Webpack 的区别

- gulp：用自动化构建工具增强你的工作流程
  - 任务管理工具（task runner）
- webpack：前端模块化管理和打包工具
  - 模块化打包工具（module bundler）

// 结合实际应用场景分析，待填坑

## Mini Webpack 原理

1. 转换 ES6 语法成 ES5
2. 处理模块加载依赖
3. 生成一个可以再浏览器端运行的 js 文件

## Webpack 工作原理

在了解 Webpack 原理前，需要掌握以下几个核心概念，以方便后面的理解：

- Entry：入口，Webpack 执行构建的第一步将从 Entry 开始，可抽象成输入。
- Module：模块，在 Webpack 里一切皆模块，一个模块对应着一个文件。Webpack 会从配置的 Entry 开始递归找出所有依赖的模块。
- Chunk：代码块，一个 Chunk 由多个模块组合而成，用于代码合并与分割。
- Loader：模块转换器，用于把模块原内容按照需求转换成新内容。
- Plugin：扩展插件，在 Webpack 构建流程中的特定时机会广播出对应的事件，插件可以监听这些事件的发生，在特定时机做对应的事情。

流程：

- 初始化：启动构建，读取与合并配置参数，加载 Plugin，实例化 Compiler。
- 编译：从 Entry 发出，针对每个 Module 串行调用对应的 Loader 去翻译文件内容，再找到该 Module 依赖的 Module，递归地进行编译处理。
- 输出：对编译后的 Module 组合成 Chunk，把 Chunk 转换成文件，输出到文件系统。

如果只执行一次构建，以上阶段将会按照顺序各执行一次。但在开启监听模式下，流程将变为如下：

在每个大阶段中又会发生很多事件，Webpack 会把这些事件广播出来供给 Plugin 使用，Plugin 可以监听这些事件，在合适的时机通过 Webpack 提供的 API 改变输出结果。

## Webpack 路由懒加载

1. vue 异步组件技术 vue-router 配置路由，使用 vue 的[异步组件](组件 — Vue.js)技术，可以实现按需加载。 但是，这种情况下一个组件生成一个 js 文件。 举例如下：

```js
{
   path: '/promisedemo',
   name: 'PromiseDemo',
   component: resolve => require(['../components/PromiseDemo'], resolve)
}
```

2. es 提案的 import() 推荐使用这种方式(需要 webpack > 2.4)

webpack 官方文档：webpack 中使用 import()

（代码分离）vue 官方文档：[路由懒加载(使用 import())](懒加载 · vue-router)

vue-router 配置路由，代码如下：

```js
// 下面2行代码，没有指定webpackChunkName，每个组件打包成一个js文件。
const ImportFuncDemo1 = () => import('../components/ImportFuncDemo1')
const ImportFuncDemo2 = () => import('../components/ImportFuncDemo2')

// 下面2行代码，指定了相同的webpackChunkName，会合并打包成一个js文件。
// const ImportFuncDemo = () => import(/* webpackChunkName: 'ImportFuncDemo' */ '../components/ImportFuncDemo')
// const ImportFuncDemo2 = () => import(/* webpackChunkName: 'ImportFuncDemo' */ '../components/ImportFuncDemo2')

export default new Router({
  routes: [
    {
      path: '/importfuncdemo1',
      name: 'ImportFuncDemo1',
      component: ImportFuncDemo1,
    },
    {
      path: '/importfuncdemo2',
      name: 'ImportFuncDemo2',
      component: ImportFuncDemo2,
    },
  ],
})
```

3. webpack 提供的 require.ensure() (已被上面的舍弃)

vue-router 配置路由，使用 webpack 的[require.ensure](Module API - Methods)技术，也可以实现按需加载。

这种情况下，多个路由指定相同的 chunkName，会合并打包成一个 js 文件。 举例如下：

```js
{
   path: '/promisedemo',
   name: 'PromiseDemo',
   component: r => require.ensure([], () => r(require('../components/PromiseDemo')), 'demo')
},
{
   path: '/hello',
   name: 'Hello',
   // component: Hello
   component: r => require.ensure([], () => r(require('../components/Hello')), 'demo')
}
```

## Webpack 管理多个单页应用

### 传统特点

- 功能串插混乱，一个页面要引入很多执行不到的代码
- 开发和版本迭代代码管理难度大

### 拆分 spa（single-page appli）

- 所有一个功能都做到一个网页中，会导致网页性能不佳
- 实际做法是按照功能模块划分成多个单页面，每个单页面应用生成一个 HTML 文件
- 随着业务发展会有更多的单页应用加入到项目中
-

### 怎么做

- entry 配置
  - 模板
  - 公用 css
  - 公用 js
- 分文件夹

## Webpack 优化

### 缩小文件搜索范围

1. 优化 loader 配置

使用 include 去命中哪些需要被处理

2. 优化 resolve.modules 配置

指明存放第三方模块的绝对路径，已减少寻找

3. 优化 resolve.mainFields 配置

package.json 明确入口文件 main

4. 优化 resolve.alias 配置

resolve.alias 配置项通过别名来把原导入路径映射成一个新的导入路径，通过配置 resolve.alias 可以让 Webpack 在处理 React 库时，直接使用单独完整的 react.min.js 文件，从而跳过耗时的递归解析操作。

5. 优化 resolve.extensions 配置

减少配置后缀

6. 优化 module.noParse 配置

配置项可以让 Webpack 忽略对部分没采用模块化的文件的递归解析处理，这样做的好处是能提高构建性能。 原因是一些库，例如 jQuery 、ChartJS， 它们庞大又没有采用模块化标准，让 Webpack 去解析这些文件耗时又没有意义。

### 使用 DLLPlugin

Node.js Webpack 是单线程模型的

需要同一时刻处理多个任务，发挥多核 CPU 电脑的威力，提升构建速度

核心调度器的逻辑代码在主进程中，也就是运行着 Webpack 的进程中，核心调度器会把一个个任务分配给当前空闲的子进程，子进程处理完毕后把结果发送给核心调度器，它们之间的数据交换是通过进程间通信 API 实现的。

## 使用 ParallelUglifyPlugin

## 使用自动刷新

1. 文件监听工作原理

在 Webpack 中监听一个文件发生变化的原理是定时的去获取这个文件的最后编辑时间，每次都存下最新的最后编辑时间，如果发现当前获取的和最后一次保存的最后编辑时间不一致，就认为该文件发生了变化。

2. 自动刷新的原理

往要开发的网页中注入代理客户端代码，通过代理客户端去刷新整个页面。

## 开启模块热替换

## 区分环境

## 压缩代码

## CDN 加速

1. 什么是 CDN

虽然前面通过了压缩代码的手段来减小网络传输大小，但实际上最影响用户体验的还是网页首次打开时的加载等待。 导致这个问题的根本是网络传输过程耗时大，CDN 的作用就是加速网络传输。

CDN 又叫内容分发网络，通过把资源部署到世界各地，用户在访问时按照就近原则从离用户最近的服务器获取资源，从而加速资源的获取速度。 CDN 其实是通过优化物理链路层传输过程中的网速有限、丢包等问题来提升网速的，其大致原理可以如下：

![image](http://webpack.wuhaolin.cn/4%E4%BC%98%E5%8C%96/img/4-9cdn-arch.png)

## 使用 Tree Shaking

## 提取公共代码

1. CommonsChunkPlugin

## 分割代码按需加载

## 使用 Prepack

## 开启 Scope Hoisting
