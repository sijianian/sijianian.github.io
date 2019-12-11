---
title: 回溯算法
date: 2019-11-01 10:59:17
categories:
  - 算法
---

## 介绍

简单来说，就是从多个解决问题的选项中找出一个可行的解决方案

在某一步选择一个选项后，进入下一步，然后面临新的选项。重复选择，直到达到最终目标

- 在某一步有 n 个可能的选项，该步骤可看作树中一个节点
- 节点每个选项看成节点连线，到达它的 n 个子节点
- 叶节点对应终结状态
- 叶节点满足约束条件，则为一个可行的解决方案
- 叶节点不满足约束条件，回溯到上一个节点，并尝试其他叶子节点
- 节点所有子节点均不满足条件，再回溯到上一个节点
- 所有状态均不能满足条件，问题无解

![](https://static.skynian.cn/20191103130058.png)

> 回溯算法适合由多个步骤组成的问题，并且每个步骤都有多个选项

## 解题模板

```js
const backtrack = (result, tempList, nums) => {
  for (let i = 0; i < nums.length; i++) {
    tempList.push(nums[i])
    backtrack(result, tempList, nums)
    tempList.pop()
  }
}

const permute = nums => {
  const result = []

  backtrack(result, [], nums)

  return result
}
```

## 组合总和

[[39] 组合总和](https://leetcode-cn.com/problems/combination-sum/)

## 组合总和 II

[[40] 组合总和 II](https://leetcode-cn.com/problems/combination-sum-ii/)

## 全排列

[[46] 全排列](https://leetcode-cn.com/problems/permutations/)

```js
const backtrack = (result, tempList, nums) => {
  if (tempList.length === nums.length) {
    return result.push([...tempList])
  }

  for (let i = 0; i < nums.length; i++) {
    if (tempList.includes(nums[i])) {
      continue
    }

    tempList.push(nums[i])
    backtrack(result, tempList, nums)
    tempList.pop()
  }
}

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const permute = nums => {
  const result = []

  backtrack(result, [], nums)

  return result
}
```

## 全排列 II

[[46] 全排列 II](https://leetcode-cn.com/problems/permutations-ii/)

## 子集

[[78] 子集](https://leetcode-cn.com/problems/subsets/)

```js
const backtrack = (list, tempList, nums, start) => {
  list.push([...tempList])

  for (let i = start; i < nums.length; i++) {
    tempList.push(nums[i])
    backtrack(list, tempList, nums, i + 1)
    tempList.pop()
  }
}

const subsets = nums => {
  const list = []
  backtrack(list, [], nums, 0)
  return list
}
```

## 子集 II

[[90] 子集 II](https://leetcode-cn.com/problems/subsets-ii/)

## 二叉树中和为某一值的路径

### 描述

输入一颗二叉树的跟节点和一个整数，打印出二叉树中结点值的和为输入整数的所有路径。路径定义为从树的根结点开始往下一直到叶结点所经过的结点形成一条路径。

> `二叉树` `回溯`

### 思路

套用回溯算法的思路

设定一个结果数组 result 来存储所有符合条件的路径

设定一个栈 stack 来存储当前路径中的节点

设定一个和 sum 来标识当前路径之和

步骤：

- 从根结点开始深度优先遍历，每经过一个节点，将节点入栈

- 到达叶子节点，且当前路径之和等于给定目标值，则找到一个可行的解决方案，将其加入结果数组

- 遍历到二叉树的某个节点时有 2 个可能的选项，选择前往左子树或右子树

- 若存在左子树，继续向左子树递归

- 若存在右子树，继续向右子树递归

- 若上述条件均不满足，或已经遍历过，将当前节点出栈，向上回溯

### 代码

```js
const findPathCore = (node, expectNumber, stack, sum, result) => {
  stack.push(node.val)

  sum += node.val

  if (!node.left && !node.right && sum === expectNumber) {
    result.push(stack.slice(0))
  }

  if (node.left) {
    findPathCore(node.left, expectNumber, stack, sum, result)
  }

  if (node.right) {
    findPathCore(node.right, expectNumber, stack, sum, result)
  }

  stack.pop()
}

export const findPath = (root, expectNumber) => {
  const result = []

  if (root) {
    findPathCore(node, expectNumber, [], 0, result)
  }

  return result
}
```

## 字符串的排列

### 描述

输入一个字符串,按字典序打印出该字符串中字符的所有排列。例如输入字符串 `abc`,则打印出由字符 `a,b,c` 所能排列出来的所有字符串 `abc,acb,bac,bca,cab`和 `cba`。

### 思路

使用回溯法

记录一个字符`temp`，用于存储当前需要进入排列的字符

记录一个字符串`current`，用于记录当前已经排列好的字符

记录一个队列`queue`，用于存储还未被排列的字符

每次排列将 `temp` 添加到 `current`
如果 `queue` 为空，则本次排列完成，将 `current` 加入到结果数组中，结束递归
如果 `queue` 不为空，说明还有未排列的字符
递归排列 `queue` 中剩余的字符
为了不影响后续排列，每次递归完成，将当前递归的字符 `temp` 加回队列

### 代码

```js
const permutationCore = (queue, result, temp = '', current = '') => {
  current += temp

  if (queue.length === 0) {
    result.push(current)
    return
  }

  for (let i = 0; i < queue.length; i++) {
    temp = queue.shift()
    permutationCore(queue, result, temp, current)
    queue.push(temp)
  }
}

export const permutation = str => {
  const result = []

  if (str) {
    queue = str.split('')
    permutationCore(queue, result)
  }

  result.sort()
  return [...new Set(result)]
}
```

## 和为 sum 的 n 个数

### 描述

给定无序、不重复的数组 `data`，取出 `n` 个数，使其相加和为 `sum`

### 思路

基于上面字符串排列题目的变形，我们从 `array` 中取出 `n` 个数的全排列，在取的同时判断是否符合条件

### 代码

```js
const getAll = (array, n, sum, temp) => {
  if (temp.length === n) {
    if (temp.reduce((t, c) => t + c) === sum) {
      return temp
    }

    return
  }

  for (let i = 0; i < array.length; i++) {
    const current = array.shift()
    temp.push(current)
    const result = getAll(array, n, sum, temp)
    if (result) {
      return result
    }
    temp.pop()
    array.push(current)
  }
}

const arr = [1, 2, 3, 4, 5, 6]

console.log(getAll(arr, 3, 10, []))
```

## 矩阵中的路径

## 机器人的运动范围

## N 皇后的问题

## N 皇后的问题 2
