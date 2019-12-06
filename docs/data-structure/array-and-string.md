---
title: 数组和字符串
date: 2019-10-6 23:41:17
categories:
  - 数据结构
---

## 数组简介

### 寻找数组的中心索引

[[724] 寻找数组的中心索引](https://leetcode-cn.com/problems/find-pivot-index/description/)

#### 描述

给定一个整数类型的数组 nums，请编写一个能够返回数组“中心索引”的方法。

我们是这样定义数组中心索引的：数组中心索引的左侧所有元素相加的和等于右侧所有元素相加的和。

如果数组不存在中心索引，那么我们应该返回 -1。如果数组有多个中心索引，那么我们应该返回最靠近左边的那一个。

示例一

```bash
输入:
nums = [1, 7, 3, 6, 5, 6]
输出: 3
解释:
索引3 (nums[3] = 6) 的左侧数之和(1 + 7 + 3 = 11)，与右侧数之和(5 + 6 = 11)相等。
同时, 3 也是第一个符合要求的中心索引。
```

示例二

```bash
输入:
nums = [1, 2, 3]
输出: -1
解释:
数组中不存在满足此条件的中心索引。
```

#### 思路

- 算出 nums 的总和
- 遍历 nums，并且同时计算 leftSum 的值
- 每次循环，判断右侧的值，是否与 leftSum 相等，即可得出结果

#### 题解

```js
const pivotIndex = function(nums) {
  const sum = nums.reduce((prev, next) => prev + next, 0)

  let leftSum = 0

  for (let i = 0; i < nums.length; i++) {
    if (leftSum === sum - nums[i] - leftSum) {
      return i
    }

    leftSum += nums[i]
  }

  return -1
}
```

### 至少是其他数字两倍的最大数

[[747] 至少是其他数字两倍的最大数](https://leetcode-cn.com/problems/largest-number-at-least-twice-of-others/description/)

#### 描述

在一个给定的数组 nums 中，总是存在一个最大元素 。

查找数组中的最大元素是否至少是数组中每个其他数字的两倍。

如果是，则返回最大元素的索引，否则返回-1。

#### 思路

- 扫描数组找到唯一的最大元素 m，并记录它的索引 maxIndex。
- 再次扫描数组，如果我们找到 x != m，m < 2\*x，我们应该返回 -1。
- 否则返回 maxIndex

#### 题解

```js
const dominantIndex = function(nums) {
  let maxIndex = 0

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > nums[maxIndex]) {
      maxIndex = i
    }
  }

  for (let i = 0; i < nums.length; i++) {
    if (maxIndex !== i && nums[maxIndex] < 2 * nums[i]) {
      return -1
    }
  }

  return maxIndex
}
```
