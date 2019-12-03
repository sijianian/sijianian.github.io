---
title: 排序
categories:
  - 算法
---

## 公用函数

```js
const swap = (array, left, right) => {
  const rightValue = array[right]

  array[right] = array[left]
  array[left] = rightValue
}
```

## 冒泡排序

![](https://static.skynian.cn/20191021221826)

```js
const bubble = array => {
  for (let i = array.length - 1; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      if (array[j] > array[j + 1]) {
        swap(array, j, j + 1)
      }
    }
  }

  return array
}
```

## 插入排序

![](https://static.skynian.cn/20191021221827)

```js
const insertion = array => {
  for (let i = 1; i < array.length; i++) {
    for (let j = i - 1; j >= 0 && array[j] > array[j + 1]; j--) {
      swap(array, j, j + 1)
    }
  }

  return array
}
```

## 选择排序

![](https://static.skynian.cn/20191021221828)

```js
const selection = array => {
  for (let i = 0; i < array.length - 1; i++) {
    let minIndex = i

    for (let j = i + 1; j < array.length; j++) {
      minIndex = array[j] < array[minIndex] ? j : minIndex
    }

    swap(array, i, minIndex)
  }
  return array
}
```

## 归并排序

![](https://static.skynian.cn/20191021222141)

```js
function sort(array) {
  if (!checkArray(array)) {
    return
  }

  mergeSort(array, 0, array.length - 1)

  return array
}

function mergeSort(array, left, right) {
  // 左右索引相同说明已经只有一个数
  if (left === right) {
    return
  }

  // 等同于 `left + (right - left) / 2`
  // 相比 `(left + right) / 2` 来说更加安全，不会溢出
  // 使用位运算是因为位运算比四则运算快

  let mid = parseInt(left + ((right - left) >> 1))

  mergeSort(array, left, mid)
  mergeSort(array, mid + 1, right)

  let help = []
  let i = 0
  let p1 = left
  let p2 = mid + 1

  while (p1 <= mid && p2 <= right) {
    help[i++] = array[p1] < array[p2] ? array[p1++] : array[p2++]
  }

  while (p1 <= mid) {
    help[i++] = array[p1++]
  }

  while (p2 <= right) {
    help[i++] = array[p2++]
  }

  for (let i = 0; i < help.length; i++) {
    array[left + i] = help[i]
  }

  return array
}
```

## 快速排序

![](https://static.skynian.cn/20191021222105)

```js
const quickSort = array => {
  const left = []
  const right = []

  const index = Math.floor(array.length / 2)
  const mid = array.splice(index, 1)[0]

  for (let i = 0; i < array.length; i++) {
    if (array[i] < mid) {
      left.push(array[i])
    } else {
      right.push(array[i])
    }
  }

  return quickSort(left).concat(mid, quickSort(right))
}
```
