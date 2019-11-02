---
title: git reflog 命令总结
date: 2019-03-07 17:35:44
tags:
  - Git
---

## 介绍

> [http://www.runoob.com/w3cnote/android-tutorial-git-repo-operate.html](http://www.runoob.com/w3cnote/android-tutorial-git-repo-operate.html)

## 使用

```bash
git reflog

b7057a9 HEAD@{0}: reset: moving to b7057a9

98abc5a HEAD@{1}: commit: more stuff added to foo

b7057a9 HEAD@{2}: commit (initial): initial

commit
```

回退后，你突然后悔了，想回退回新的那个版本， 可是遗憾的是，你键入`git log`却发现没有了最新的那个版本号，这怎么办呢...

没事，Git 中给你提供了这颗"后悔药"，Git 记录着你输入的每一条指令呢！键入：

```bash
git reflog

get reset --hard xxxxxx
```

![](https://static.skynian.cn/20190315143010.png)
