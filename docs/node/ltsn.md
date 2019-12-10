---
title: LTS 查看工具
date: 2019-11-29 15:33:17
sidebar: auto
categories:
  - Node
tags:
  - Node
---

## 项目地址

[https://github.com/sijianian/ltsn](https://github.com/sijianian/ltsn)

## 项目目录

```
├── README.md
├── bin
|  └── ltsn.js
├── index.js
├── lib
|  ├── query.js
|  └── update.js
├── package-lock.json
└── package.json
```

## 实现效果

![](https://static.skynian.cn/20191129153908.png)

## 核心代码

### query.js

```js
const Table = require('cli-table')

function query(dists) {
  const keys = Object.keys(dists[0])
  // 建立表头
  const table = new Table({
    head: keys,
  })

  // 拼接出表格的每一行
  return dists
    .reduce((res, item) => {
      table.push(Object.values(item))
      return res
    }, table)
    .toString()
}

module.exports = query
```

### update.js

```js
const axios = require('axios')
const color = require('cli-color')
const terminalLink = require('terminal-link')
const compareVersions = require('compare-versions')

module.exports = async v => {
  // 拿到所有的 Node 版本
  const { data } = await axios.get('https://nodejs.org/dist/index.json')

  // 把目标版本的 LTS 都挑选出来
  return data
    .filter(node => {
      const cp = v ? compareVersions(node.version, 'v' + v + '.0.0') >= 0 : true
      return node.lts && cp
    })
    .map(it => {
      // 踢出去 file 这个字段，其他的全部返回
      const { files, ...rest } = it
      return { ...rest }
    })
}
```

### bin/ltsn.js

```js
#!/usr/bin/env node

const pkg = require('../package')
// 从顶层 index.js 里面拿到 lib 下面模块暴露的方法
const query = require('..').query
const update = require('..').update

// 输出结果到命令行窗口
function printResult(v) {
  update(v).then(dists => {
    const results = query(dists, v)
    console.log(results)
    process.exit()
  })
}

function printVersion() {
  console.log('ltsn ' + pkg.version)
  process.exit()
}

// 一些命令的帮助提示
function printHelp(code) {
  const lines = [
    '',
    '  Usage:',
    '    ltsn [8]',
    '',
    '  Options:',
    '    -v, --version             print the version of vc',
    '    -h, --help                display this message',
    '',
    '  Examples:',
    '    $ ltsn 8',
    '',
  ]

  console.log(lines.join('\n'))
  process.exit(code || 0)
}

// 包的入口函数，里面对参数做剪裁处理，拿到入参并给予
// 不同入参的处理逻辑
function main(argv) {
  if (!argv) {
    printHelp(1)
  }

  const getArg = function() {
    let args = argv.shift()

    args = args.split('=')
    if (args.length > 1) {
      argv.unshift(args.slice(1).join('='))
    }
    return args[0]
  }

  let arg

  while (argv.length) {
    arg = getArg()
    switch (arg) {
      case '-v':
      case '-V':
      case '--version':
        printVersion()

        break
      case '-h':
      case '-H':
      case '--help':
        printHelp()

        break
      default:
        printResult(arg)

        break
    }
  }
}

// 启动程序就开始执行主函数
main(process.argv.slice(2))

module.exports = main
```
