---
title: 实现视频数量与时长统计小工具
date: 2019-11-25 16:00:17
sidebar: auto
categories:
  - Node
tags:
  - Node
---


```js
// 这里会有 1.mp4 2.mp4 等几十上百个视频
// 可以用 promise 并发计算时长，最后汇总叠加
// 叠加总时长如果不超过 1 个小时，比如 55 分钟，那就打印 55 分钟
// 如果超过 1 个小时，比如 65 分钟，打印 1 小时 5 分钟
const fs = require('fs')
const path = require('path')
const moment = require('moment')
const util = require('util')
const open = util.promisify(fs.open)
const read = util.promisify(fs.read)

function getTime(buffer) {
  const start = buffer.indexOf(Buffer.from('mvhd')) + 17
  const timeScale = buffer.readUInt32BE(start)
  const duration = buffer.readUInt32BE(start + 4)
  const movieLength = Math.floor(duration / timeScale)
  return movieLength
}

function getLocaleTime(seconds) {
  return moment
    .duration(seconds, 'seconds')
    .toJSON()
    .replace(/[PTHMS]/g, str => {
      switch (str) {
        case 'H':
          return '小时'
        case 'M':
          return '分钟'
        case 'S':
          return '秒'
        default:
          return ''
      }
    })
}

;(async function() {
  const dir = path.resolve(__dirname + '/video')
  const files = fs.readdirSync(dir).map(file => path.resolve(dir, file))
  const videos = await Promise.all(
    files.map(async file => {
      const fd = await open(file, 'r')
      const buff = Buffer.alloc(100)
      const { buffer } = await read(fd, buff, 0, 100, 0)
      const time = getTime(buffer)
      return { file, time }
    })
  )
  const res = {
    视频总数: videos.length,
    视频总时长: getLocaleTime(
      videos.reduce((prev, e) => {
        return prev + e.time
      }, 0)
    ),
  }

  console.log(res)
  return res
})()

```
