---
title: Node 的文件操作能力
date: 2019-12-01 12:05:00
sidebar: auto
categories:
  - Node
tags:
  - Node
---

首先，引入 `fs`

```js
const fs = require('fs)
```

## Node 的搬砖专业户

无论是 `Windows` 还是 `Linux` 系统，它里面的`视频、语音、图片、JSON 文件、二进制的程序压缩包...`，都是文件，文件散布在各个我们称之为文件夹的地方，而文件夹在本质上也是一种文件，所以一切皆文件，而文件本质上是带特殊属性的数据，所以我们往往提到跟操作系统交互，跟系统底层交互，这里面有相当一部分其实是在跟文件交互，跟数据交互，本质上是在操作系统里面，对于数据的阅读能力、输入输出能力，跟数据库的增删改查行为差不了太多。我们人作为一种物种，不也是如此么，被创建，被销毁，每天都在更新，还能被打上身份标签拎出来识别，只不过多了所谓灵魂、思想和情感这些很难量化的数据而已。

在 Node 里面有很多核心的能力，但最原始最基础最通用的能力，其实就是文件系统交互能力 - `fs`，以及网络请求的处理能力 - `http`，正是这两块能力彻底打破了前后端的边界，从前用 JS 是没办法操纵磁盘文件的，通过 JS 也没办法处理网络请求与返回，现在有了 Node 这个混搭各种底层的运行框架，搬砖就变得可能了

那我们就进入这个能力里面一窥究竟吧，首先看看它的 [File System API](https://nodejs.org/dist/latest-v11.x/docs/api/fs.html)，扳扳指头算，密密麻麻百来个方法挂在 fs 上面，大部分都分为同步的和异步两个版本，比如创建文件夹有这样的写法：

```js
fs.mkdir(path[, options], callback)
fs.mkdirSync(path[, options])
```

其实不光 mkdir，其他大部分的文件方法，都有 Sync 的版本，所以这百十个方法除去一半，其实也就剩下了几十个而已，无非一个是 callback 回调函数来异步获取结果，一个则是同步执行，阻滞它后面的代码执行，大家不用怕他们太多记不住，用的时候来查 API 就行，那到底同步和异步在底层执行上有什么区别呢，我们先挑选几个常用的 API，熟悉下它们的用法后，自然就有答案了。

## 读文件能力

通过 Async function 改写读文件能力

```js
const readFile = filePath => new Promise((resolve, reject) => {
  fs.readFile(filePath, (err, data) => resolve(data))
}

// 放到 async function 里面逐个调用
async function readCfg () {
  const data1 = await readFile('./cfg1.json)
  const data2 = await readFile(data1.cfgPath)
  const data3 = await readFile(data2.cfgPath)
  const data4 = await readFile(data3.cfgPath)
  console.log(data4)
}
```

readFile 方法参数

```js
fs.readFile(path[, options], callback)

fs.readFile('./a.txt', {
  flag: 'r+',
  encoding: 'utf8'
}, function(err, data) {})
```

标记位描述

- `r` 打开文本文件进行读取，数据流位置在文件起始处
- `r+` 打开文本文件进行读写，数据流位置在文件起始处
- `w` 如果文件存在，将其清零，不存在创建写入文件。数据流位置在文件起始处
- `w+` 打开文件进行读写，如果文件存在，将其清零，不存在创建写入文件。数据流位置在文件起始处
- `a` 打开文件写入数据，如果文件存在，将其清零，不存在创建写入文件。数据流位置在文件结尾处，此后的写操作都将数据追加到文件后面
- `a+`打开文件进行文件读写，如果文件存在，将其清零，不存在创建写入文件。数据流位置在文件结尾处，此后的写操作都将数据追加到文件后面

## JSON 合并工具

```js
const fs = require('fs')
const path = require('path')

// 判断目标路径的文件存在与否
const exists = filePath => fs.existsSync(filePath)
const jsonPath = process.argv[2]

if (!jsonPath) {
  console.log('没有传 JSON 目录参数哦！')
  process.exit(1)
}

const rootPath = path.join(process.cwd(), jsonPath)
// 遍历所有文件
const walk = path =>
  fs.readdirSync(path).reduce((files, file) => {
    const filePath = path + '/' + file
    const stat = fs.statSync(filePath)

    if (stat.isFile()) {
      if (/(.*)\.(json)/.test(file)) {
        return files.concat(filePath)
      }
    }
    return files
  }, [])

// 合并文件内容
const mergeFileData = () => {
  const files = walk(rootPath)

  if (!files.length) process.exit(2)

  const data = files.filter(exists).reduce((total, file) => {
    const fileData = fs.readFileSync(file)
    const basename = path.basename(file, '.json')
    let fileJson

    try {
      fileJson = JSON.parse(fileData)
    } catch (err) {
      console.log('读出出错', file)
      console.log(err)
    }

    total[basename] = fileJson
    return total
  }, {})

  fs.writeFileSync('./data.json', JSON.stringify(data, null, 2))
}

mergeFileData()
```

## 总结

我们对读写总结一下，无论读写，都有两种方式，一种粗矿的，一种精细化的，精细化的控制，需要先 `open` 一个文件，然后操作读写，但需要手工调用 `close` 方法关闭文件，这种方式适合于多次写入或读取。粗狂的读写是一次性服务的，直接调用 `writeFile/appendFile/readFile` 方法，只会写入或读取一次，在它的内部自动调用了 `close` 方法

另外呢，对于 `write` 方法，因为多次对同一文件进行 `write` 并不安全，必须等到 `callback` 调用才可以，官方推荐是使用 `stream` 方式替代，也就是 `createWriteStream`
