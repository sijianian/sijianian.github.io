---
title: 动态规划
date: 2019-12-10 23:38:17
categories:
  - 算法
---

![](https://static.skynian.cn/20191211222151.png)

## [[70] 爬楼梯](https://leetcode-cn.com/problems/climbing-stairs/description/)

### 描述

假设你正在爬楼梯。需要 n 阶你才能到达楼顶。

每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？

注意：给定 n 是一个正整数。

### 示例

```bash
输入： 2
输出： 2
解释： 有两种方法可以爬到楼顶。
1.  1 阶 + 1 阶
2.  2 阶
```

```bash
输入： 3
输出： 3
解释： 有三种方法可以爬到楼顶。
1.  1 阶 + 1 阶 + 1 阶
2.  1 阶 + 2 阶
3.  2 阶 + 1 阶
```

### 题解

```js
// 常规解法
const climbStairs = (n, hash = {}) => {
  if (n <= 2) {
    return n
  }

  if (!hash[n]) {
    hash[n] = climbStairs(n - 1, hash) + climbStairs(n - 2, hash)
  }

  return hash[n]
}

// 动态规划
const climbStairs2 = () => {
  if (n <= 2) {
    return n
  }

  let a = 1
  let b = 2
  let temp

  for (let i = 3; i <= n; i++) {
    temp = a + b
    a = b
    b = temp
  }

  return temp
}

// 尾递归
const climbStairs3 = (n, a = 1, b = 2) => {
  if (n <= 1) {
    return a
  }

  return climbStairs(n - 1, b, a + b)
}
```
