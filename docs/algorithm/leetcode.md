---
title: leetcode
categories:
  - 算法
tags:
  - leetcode
---

## [1] 两数之和

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const twoSum = (nums, target) => {
  const hash = {}

  for (let i = 0; i < nums.length; i++) {
    if (hash[target - nums[i]] !== undefined) {
      return [hash[target - nums[i]], i]
    } else {
      hash[nums[i]] = i
    }
  }

  return []
}
```

## [2] 两数相加

```js
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
const addTwoNumbers = (l1, l2) => {
  let pre = new ListNode(0)
  let head = pre

  let sum = 0
  let carry = 0

  while (l1 !== null || l2 !== null || sum > 0) {
    if (l1 !== null) {
      sum += l1.val
      l1 = l1.next
    }

    if (l2 !== null) {
      sum += l2.val
      l2 = l2.next
    }

    if (sum >= 10) {
      carry = 1
      sum = sum - 10
    }

    head.next = new ListNode(sum)
    head = head.next

    sum = carry
    carry = 0
  }

  return pre.next
}
```

## [3] 无重复字符的最长子串

```js
/**
 * @param {string} s
 * @return {number}
 */
const lengthOfLongestSubstring = s => {
  const map = {}
  let left = 0

  return s.split('').reduce((max, v, i) => {
    left = map[v] >= left ? map[v] + 1 : left
    map[v] = i

    return Math.max(max, i - left + 1)
  }, 0)
}
```

## [4] 寻找两个有序数组的中位数

```js
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
const findMedianSortedArrays = (nums1, nums2) => {
  const arr = [...nums1, ...nums2].sort((a, b) => a - b)
  const { length } = arr

  return length % 2
    ? arr[Math.floor(length / 2)]
    : (arr[length / 2] + arr[length / 2 - 1]) / 2
}
```

## [5] 最长回文子串

```js
const longestPalindrome = s => {
  if (!s || s.length === 0) {
    return ''
  }

  let res = s[0]
  const dp = []

  for (let i = s.length - 1; i >= 0; i--) {
    dp[i] = []

    for (let j = i; j < s.length; j++) {
      if (j - i === 0) {
        dp[i][j] = true
      } else if (j - i === 1 && s[i] === s[j]) {
        dp[i][j] = true
      } else if (s[i] === s[j] && dp[i + 1][j - 1]) {
        dp[i][j] = true
      }

      if (dp[i][j] && j - i + 1 > res.length) {
        res = s.slice(i, j + 1)
      }
    }
  }

  return res
}
```

## [7] 整数反转

```js
const reverse = x => {
  let str = x
    .toString()
    .split('')
    .reverse()
    .join('')
  let num = parseInt(x < 0 ? `-${str}` : str)

  if (num > Math.pow(2, 31) - 1 || num < Math.pow(-2, 31)) {
    return 0
  }

  return num
}
```

## [8] 字符串转换整数 (atoi)

```js
/**
 * @param {string} str
 * @return {number}
 */
const myAtoi = str => {
  const result = str.trim().match(/^(-|\+)?\d+/g)

  return result
    ? Math.max(
        Math.min(Number(result[0]), Math.pow(2, 31) - 1),
        Math.pow(-2, 31)
      )
    : 0
}
```

## [9] 回文数

```js
const isPalindrome = x =>
  String(x) ===
  String(x)
    .split('')
    .reverse()
    .join('')
```

## [11] 盛最多水的容器

```js
// 暴力法
/**
 * @param {number[]} height
 * @return {number}
 */
const maxArea1 = height => {
  let maxArea = 0

  for (let i = 0; i < height.length; i++) {
    for (let j = i + 1; j < height.length; j++) {
      maxArea = Math.max(maxArea, Math.min(height[i], height[j]) * (j - i))
    }
  }

  return maxArea
}

// 双指针法
const maxArea = height => {
  let maxArea = 0
  let left = 0
  let right = height.length - 1

  for (let i = 0; i < height.length; i++) {
    maxArea = Math.max(
      maxArea,
      Math.min(height[left], height[right]) * (right - left)
    )

    if (height[left] < height[right]) {
      left++
    } else {
      right--
    }
  }

  return maxArea
}
```

## [13] 罗马数字转整数

```js
/**
 * @param {string} s
 * @return {number}
 */
const map = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000,
}

const romanToInt = function(s) {
  let value = 0

  for (let i = 0; i < s.length; i++) {
    if (map[s[i]] < map[s[i + 1]]) {
      value -= map[s[i]]
    } else {
      value += map[s[i]]
    }
  }

  return value
}
```

## [14] 最长公共前缀

```js
/**
 * @param {string[]} strs
 * @return {string}
 */
const longestCommonPrefix = strs => {
  if (!strs || strs.length === 0) {
    return ''
  }

  return strs.reduce((pre, next) => {
    let i = 0

    while (pre[i] && next[i] && pre[i] === next[i]) {
      i++
    }

    return pre.slice(0, i)
  })
}
```

## 正在总结中...^_^

不要着急
