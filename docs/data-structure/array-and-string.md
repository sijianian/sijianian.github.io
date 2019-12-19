---
title: 数组和字符串
date: 2019-10-6 23:41:17
categories:
  - 数据结构
sidebarDepth: 2
---

## 一、数组

`数组`是一种基本的数据结构，用于按顺序`存储元素的集合`。但是元素可以随机存取，因为数组中的每个元素都可以通过数组`索引`来识别。

数组可以有一个或多个维度。这里我们从一维数组开始，它也被称为线性数组。这里有一个例子：

![](https://static.skynian.cn/20191211204844.png)

在上面的例子中，数组 A 中有 6 个元素。也就是说，A 的长度是 6 。我们可以使用 A[0] 来表示数组中的第一个元素。因此，A[0] = 6 。类似地，A[1] = 3，A[2] = 8，依此类推。

### [[724] 寻找数组的中心索引](https://leetcode-cn.com/problems/find-pivot-index/description/)

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

### [[747] 至少是其他数字两倍的最大数](https://leetcode-cn.com/problems/largest-number-at-least-twice-of-others/description/)

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

### [[66] 加一](https://leetcode-cn.com/problems/plus-one/description/)

#### 描述

给定一个由整数组成的非空数组所表示的非负整数，在该数的基础上加一。

最高位数字存放在数组的首位， 数组中每个元素只存储单个数字。

你可以假设除了整数 0 之外，这个整数不会以零开头。

#### 题解

```js
const plusOne = function(digits, index = digits.length - 1) {
  if (digits[index] === 9) {
    digits[index] = 0

    if (index <= 0) {
      return [1, ...digits]
    } else {
      return plusOne(digits, index - 1)
    }
  }

  digits[index]++

  return digits
}
```

## 二、二维数组

### [[498] 对角线遍历](https://leetcode-cn.com/problems/diagonal-traverse/description/)

#### 描述

给定一个含有 M x N 个元素的矩阵（M 行，N 列），请以对角线遍历的顺序返回这个矩阵中的所有元素

#### 思路

- i + j 为偶数的时候，往右上角走
- i + j 为奇数的时候，往左下角走
- 剩下的是一些边界条件...

#### 题解

```js
const findDiagonalOrder = function(matrix) {
  if (matrix.length < 1 || matrix[0].length < 1) {
    return []
  }

  let i = 0
  let j = 0
  let m = matrix.length
  let n = matrix[0].length

  let res = []

  for (let k = 0; k < m * n; k++) {
    res.push(matrix[i][j])

    if ((i - j) % 2 === 0) {
      if (j === n - 1) {
        i++
      } else if (i === 0) {
        j++
      } else {
        i--
        j++
      }
    } else {
      if (i === m - 1) {
        j++
      } else if (j === 0) {
        i++
      } else {
        i++
        j--
      }
    }
  }

  return res
}
```

### [[54] 螺旋矩阵](https://leetcode-cn.com/problems/spiral-matrix/description/)

#### 描述

给定一个包含  m x n  个元素的矩阵（m 行, n 列），请按照顺时针螺旋顺序，返回矩阵中的所有元素。

#### 题解

```js
const spiralOrder = function(matrix) {
  if (!matrix.length) {
    return []
  }

  const res = []
  const dirs = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ]
  const range = [matrix[0].length, matrix.length - 1]

  let d = 0
  let r = 0
  let c = -1

  while (range[d % 2] > 0) {
    for (let i = 0; i < range[d % 2]; i++) {
      r += dirs[d][0]
      c += dirs[d][1]
      res.push(matrix[r][c])
    }

    range[d % 2]--
    d = (d + 1) % 4
  }

  return res
}
```

### [[118] 杨辉三角](https://leetcode-cn.com/problems/pascals-triangle/description/)

#### 描述

给定一个非负整数 numRows，生成杨辉三角的前 numRows 行。

![](https://upload.wikimedia.org/wikipedia/commons/0/0d/PascalTriangleAnimated2.gif)

#### 题解

```js
const generate = numRows => {
  if (numRows === 0) {
    return []
  }

  const result = []

  for (let i = 0; i < numRows; i++) {
    let currRow = []

    for (let j = 0; j <= i; j++) {
      if (j === 0 || j === i) {
        currRow.push(1)
      } else {
        currRow.push(result[i - 1][j - 1] + result[i - 1][j])
      }
    }

    result.push(currRow)
  }

  return result
}
```

## 三、字符串

字符串实际上是一个 `unicode` 字符数组。你可以执行几乎所有我们在数组中使用的操作，自己试试看吧。

然而，二者之间还是存在一些区别。在这篇文章中，我们将介绍一些在处理字符串时应该注意的问题。这些特性在不同的语言之间可能有很大不同。

### [[67] 二进制求和](https://leetcode-cn.com/problems/add-binary/description/)

#### 描述

给定两个二进制字符串，返回他们的和（用二进制表示）。

输入为非空字符串且只包含数字 1 和 0。

#### 题解

```js
const addBinary = function(a, b) {
  const aBin = `0b${a}`
  const bBin = `0b${b}`
  const sum = BigInt(aBin) + BigInt(bBin)
  return sum.toString(2)
}
```

### [[28] 实现 strStr()](https://leetcode-cn.com/problems/implement-strstr/description/)

#### 描述

实现 strStr() 函数。

给定一个 haystack 字符串和一个 needle 字符串，在 haystack 字符串中找出 needle 字符串出现的第一个位置 (从 0 开始)。如果不存在，则返回 -1。

#### 题解

```js
const strStr = (haystack, needle) => {
  if (needle === '') {
    return 0
  }

  for (let i = 0; i < haystack.length; i++) {
    if (haystack[i] === needle[0]) {
      if (haystack.substring(i, i + needle.length) === needle) {
        return i
      }
    }
  }

  return -1
}
```

### [[14] 最长公共前缀](https://leetcode-cn.com/problems/longest-common-prefix/description/)

#### 描述

编写一个函数来查找字符串数组中的最长公共前缀。

如果不存在公共前缀，返回空字符串 ""。

#### 题解

```js
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

## 四、双指针技巧

在前面，我们通过迭代数组来解决一些问题。通常，我们只使用从第一个元素开始并在最后一个元素结束的一个指针来进行迭代。 但是，有时候，我们可能需要同时使用两个指针来进行迭代。

### [[344] 反转字符串](https://leetcode-cn.com/problems/reverse-string/description/)

#### 描述

编写一个函数，其作用是将输入的字符串反转过来。输入字符串以字符数组 char[] 的形式给出。

不要给另外的数组分配额外的空间，你必须原地修改输入数组、使用 O(1) 的额外空间解决这一问题。

你可以假设数组中的所有字符都是 ASCII 码表中的可打印字符。

#### 题解

```js
// js api 解法
const reverseString1 = s => s.reverse()

// 双指针解法
const swap = (v, i, j) => {
  let temp = v[i]
  v[i] = v[j]
  v[j] = temp
}

const reverseString = s => {
  let left = 0
  let right = s.length - 1

  while (left < right) {
    swap(s, left, right)
    left++
    right--
  }
}
```

### [[561] 数组拆分 I](https://leetcode-cn.com/problems/array-partition-i/description/)

#### 描述

给定长度为 2n 的数组, 你的任务是将这些数分成 n 对, 例如 (a1, b1), (a2, b2), ..., (an, bn) ，使得从 1 到 n 的 min(ai, bi) 总和最大。

#### 题解

```js
// js api 解法
const arrayPairSum = function(nums) {
  return nums
    .sort((a, b) => a - b)
    .filter((x, index) => index % 2 === 0)
    .reduce((a, b) => a + b)
}
```

### [[167] 两数之和 II - 输入有序数组](https://leetcode-cn.com/problems/two-sum-ii-input-array-is-sorted/description/)

#### 描述

给定一个已按照升序排列 的有序数组，找到两个数使得它们相加之和等于目标数。

函数应该返回这两个下标值 index1 和 index2，其中 index1 必须小于 index2。

说明:

- 返回的下标值（index1 和 index2）不是从零开始的。
- 你可以假设每个输入只对应唯一的答案，而且你不可以重复使用相同的元素。

#### 题解

```js
const twoSum = (numbers, target) => {
  let left = 0
  let right = numbers.length - 1

  while (numbers[left] + numbers[right] !== target) {
    if (numbers[left] + numbers[right] > target) {
      right--
    } else {
      left++
    }
  }

  return [left + 1, right + 1]
}
```

### [[27] 移除元素](https://leetcode-cn.com/problems/remove-element/description/)

#### 描述

给定一个数组 nums 和一个值 val，你需要原地移除所有数值等于 val 的元素，返回移除后数组的新长度。

不要使用额外的数组空间，你必须在原地修改输入数组并在使用 O(1) 额外空间的条件下完成。

元素的顺序可以改变。你不需要考虑数组中超出新长度后面的元素。

#### 思路

- 两个指针，一个仍然用于迭代，而第二个指针总是指向下一次添加的位置
- 一个快指针 i 和一个慢指针 k 。i 每次移动一步，而 k 只在添加新的被需要的值时才移动一步。

#### 题解

```js
const removeElement = function(nums, val) {
  let k = 0

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== val) {
      nums[k] = nums[i]
      k++
    }
  }

  return k
}
```

### [[485] 最大连续 1 的个数](https://leetcode-cn.com/problems/max-consecutive-ones/description/)

#### 描述

给定一个二进制数组， 计算其中最大连续 1 的个数。

#### 题解

```js
const findMaxConsecutiveOnes = function(nums) {
  let max = 0
  let curr = 0

  for (let k of nums) {
    max = Math.max(max, (curr += k))

    if (!k) {
      curr = 0
    }
  }

  return max
}
```

### [[209] 长度最小的子数组](https://leetcode-cn.com/problems/minimum-size-subarray-sum/description/)

#### 描述

给定一个含有  n  个正整数的数组和一个正整数  s ，找出该数组中满足其和 ≥ s 的长度最小的连续子数组。如果不存在符合条件的连续子数组，返回 0。

#### 思路

- 初始化 left 指向 0 且初始化 sum 为 0
- 遍历 nums 数组：
  - 将 nums[i] 添加到 sum
  - 当 sum 大于等于 s 时
    - 更新 ans = min(ans, i + 1 - left)，其中 i + 1 - left 是当前子数组的长度
    - 然后我们可以移动左端点，因为以它为开头的满足 sum >= s 条件的最短数组已经求出来了
    - 将 sum 减去 nums[left] 然后增加 left

#### 题解

```js
const minSubArrayLen = function(s, nums) {
  let min = Infinity
  let left = 0
  let sum = 0

  for (let i = 0; i < nums.length; i++) {
    sum += nums[i]
    while (sum >= s) {
      min = Math.min(min, i + 1 - left)
      sum -= nums[left++]
    }
  }

  return min === Infinity ? 0 : min
}
```

#### 复杂度分析

- 时间复杂度：O(n)O(n) 。每个指针移动都需要 O(n)O(n) 的时间。
  - 每个元素至多被访问两次，一次被右端点访问，一次被左端点访问。
- 空间复杂度：O(1)O(1) 。left，sum，ans 以及 i 这些变量只需要常数个空间。

## 五、小结

### [[189] 旋转数组](https://leetcode-cn.com/problems/rotate-array/description/)

#### 描述

给定一个数组，将数组中的元素向右移动 k 个位置，其中 k 是非负数。

#### 思路

最简单的方法是旋转 k 次，每次将数组旋转 1 个元素。

#### 题解

```js
const rotate = (nums, k) => {
  let temp
  let prev

  for (let i = 0; i < k; i++) {
    prev = nums[nums.length - 1]

    for (let j = 0; j < nums.length; j++) {
      temp = nums[j]
      nums[j] = prev
      prev = temp
    }
  }
}
// 时间复杂度：O(n*k)O(n∗k) 。每个元素都被移动 1 步（O(n)O(n)） k次（O(k)O(k)） 。
// 空间复杂度：O(1)O(1) 。没有额外空间被使用。
```

### [[119] 杨辉三角 II](https://leetcode-cn.com/problems/pascals-triangle-ii/description/)

#### 描述

给定一个非负索引  k，其中 k ≤ 33，返回杨辉三角的第 k 行。

#### 题解

```js
const getRow = function(rowIndex) {
  let row = [1]

  for (let i = 1; i <= rowIndex; i++) {
    for (let j = i; j > 0; j--) {
      if (j === i) {
        row[j] = 1
      } else {
        row[j] = row[j - 1] + row[j]
      }
    }
  }

  return row
}
```

### [[151] 翻转字符串里的单词](https://leetcode-cn.com/problems/reverse-words-in-a-string/description/)

#### 描述

给定一个字符串，逐个翻转字符串中的每个单词。

#### 题解

```js
const reverseWords = function(s) {
  return s
    .trim()
    .split(' ')
    .filter(item => item)
    .reverse()
    .join(' ')
}
```

### [[557] 反转字符串中的单词 III](https://leetcode-cn.com/problems/reverse-words-in-a-string-iii/description/)

#### 描述

给定一个字符串，你需要反转字符串中每个单词的字符顺序，同时仍保留空格和单词的初始顺序。

#### 题解

```js
const reverseWords = s =>
  s
    .split(' ')
    .map(word =>
      word
        .split('')
        .reverse()
        .join('')
    )
    .join(' ')
```

### [[26] 删除排序数组中的重复项](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array/description/)

#### 描述

给定一个排序数组，你需要在原地删除重复出现的元素，使得每个元素只出现一次，返回移除后数组的新长度。

不要使用额外的数组空间，你必须在原地修改输入数组并在使用 O(1) 额外空间的条件下完成。

#### 题解

```js
const removeDuplicates = nums => {
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === nums[i + 1]) {
      nums.splice(i, 1)
      i--
    }
  }
}
```

### [[283] 移动零](https://leetcode-cn.com/problems/move-zeroes/description/)

#### 描述

给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。

#### 题解

```js
const moveZeroes = function(nums) {
  for (let i = nums.length - 1; i >= 0; i--) {
    if (nums[i] === 0) {
      nums.splice(i, 1)
      nums.push(0)
    }
  }
}
```
