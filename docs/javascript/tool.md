---
title: 工具函数
sidebarDepth: 5
---

> 转载

- [127 Helpful JavaScript Snippets You Can Learn in 30 Seconds or Less — Part 1 of 6](https://medium.com/better-programming/127-helpful-javascript-snippets-you-can-learn-in-30-seconds-or-less-part-1-of-6-bc2bc890dfe5)
- [30 seconds of code](https://github.com/30-seconds/30-seconds-of-code)

## 数组

### 1、all: 布尔全等判断

```js
const all = (arr, fn = Boolean) => arr.every(fn)

all([4, 2, 3], x => x > 1) // true
all([1, 2, 3]) // true
```

### 2、allEqual: 检查数组各项相等

```js
const allEqual = arr => arr.every(val => val === arr[0])

allEqual([1, 2, 3, 4, 5, 6]) // false
allEqual([1, 1, 1, 1]) // true
```

### 3、approximatelyEqual: 约等于

```js
const approximatelyEqual = (v1, v2, epsilon = 0.001) =>
  Math.abs(v1 - v2) < epsilon

approximatelyEqual(Math.PI / 2.0, 1.5708) // true
```

### 4、arrayToCSV: 数组转 CSV 格式

```js
const arrayToCSV = (arr, delimiter = ',') =>
  arr.map(v => v.map(x => `"${x}"`).join(delimiter)).join('\n')

arrayToCSV([['a', 'b'], ['c', 'd']]) // '"a","b"\n"c","d"'
arrayToCSV([['a', 'b'], ['c', 'd']], ';') // '"a";"b"\n"c";"d"'
```

### 5、arrayToHtmlList: 数组转 li 列表

此代码段将数组的元素转换为 \<li\> 标签，并将其附加到给定 ID 的列表中。

```js
const arrayToHtmlList = (arr, listID) =>
  (el => (
    (el = document.querySelector('#' + listID)),
    (el.innerHTML += arr.map(item => `<li>${item}</li>`).join(''))
  ))()

arrayToHtmlList(['item 1', 'item 2'], 'myListID')
```

### 6、average: 平均数

```js
const average = (...nums) =>
  nums.reduce((acc, val) => acc + val, 0) / nums.length

average(...[1, 2, 3]) // 2
average(1, 2, 3) // 2
```

### 7、averageBy: 数组对象属性平均数

此代码段将获取数组对象属性的平均值

```js
const averageBy = (arr, fn) =>
  arr
    .map(typeof fn === 'function' ? fn : val => val[fn])
    .reduce((acc, val) => acc + val, 0) / arr.length

averageBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], o => o.n) // 5
averageBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], 'n') // 5
```

### 8、bifurcate: 拆分断言后的数组

可以根据每个元素返回的值，使用 reduce()和 push() 将元素添加到第二次参数 fn 中 。

```js
const bifurcate = (arr, filter) =>
  arr.reduce((acc, val, i) => (acc[filter[i] ? 0 : 1].push(val), acc), [[], []])

bifurcate(['beep', 'boop', 'foo', 'bar'], [true, true, false, true]) // [ ['beep', 'boop', 'bar'], ['foo'] ]
```

### 9、castArray: 其它类型转数组

```js
const castArray = val => (Array.isArray(val) ? val : [val])

castArray('foo') // ['foo']
castArray([1]) // [1]
castArray(1) // [1]
```

### 10、compact: 去除数组中的无效 / 无用值

```js
const compact = arr => arr.filter(Boolean)

compact([0, 1, false, 2, '', 3, 'a', 'e' * 23, NaN, 's', 34] // [ 1, 2, 3, 'a', 's', 34 ]
```

### 11、countOccurrences: 检测数值出现的次数

```js
const countOccurrences = (arr, val) =>
  arr.reduce((a, v) => (v === val ? a + 1 : a), 0)

countOccurrences([1, 1, 2, 1, 2, 3], 1) // 3
```

### 12、deepFlatten: 递归扁平化数组

```js
const deepFlatten = arr =>
  [].concat(...arr.map(v => (Array.isArray(v) ? deepFlatten(v) : v)))

deepFlatten([1, [2], [[3], 4], 5]) // [1,2,3,4,5]
```

### 13、difference: 寻找差异（并返回第一个数组独有的）

此代码段查找两个数组之间的差异，并返回第一个数组独有的。

```js
const difference = (a, b) => {
  const s = new Set(b)
  return a.filter(x => !s.has(x))
}

difference([1, 2, 3], [1, 2, 4]) // [3]
```

### 14、differenceBy: 先执行再寻找差异

在将给定函数应用于两个列表的每个元素之后，此方法返回两个数组之间的差异。

```js
const differenceBy = (a, b, fn) => {
  const s = new Set(b.map(fn))
  return a.filter(x => !s.has(fn(x)))
}

differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor) // [1.2]
differenceBy([{ x: 2 }, { x: 1 }], [{ x: 1 }], v => v.x) // [ { x: 2 } ]
```

### 15、dropWhile: 删除不符合条件的值

此代码段从数组顶部开始删除元素，直到传递的函数返回为 true。

```js
const dropWhile = (arr, func) => {
  while (arr.length > 0 && !func(arr[0])) {
    arr = arr.slice(1)
  }

  return arr
}

dropWhile([1, 2, 3, 4], n => n >= 3) // [3,4]
```

### 16、flatten: 指定深度扁平化数组

此代码段第二参数可指定深度。

```js
const flatten = (arr, depth = 1) =>
  arr.reduce(
    (a, v) =>
      a.concat(depth > 1 && Array.isArray(v) ? flatten(v, depth - 1) : v),
    []
  )

flatten([1, [2], 3, 4]) // [1, 2, 3, 4]
flatten([1, [2, [3, [4, 5], 6], 7], 8], 2) // [1, 2, 3, [4, 5], 6, 7, 8]
```

### 17、indexOfAll: 返回数组中某值的所有索引

此代码段可用于获取数组中某个值的所有索引，如果此值中未包含该值，则返回一个空数组。

```js
const indexOfAll = (arr, val) =>
  arr.reduce((acc, el, i) => (el === val ? [...acc, i] : acc), [])

indexOfAll([1, 2, 3, 1, 2, 3], 1) // [0,3]
indexOfAll([1, 2, 3], 4) // []
```

### 18、intersection: 两数组的交集

```js
const intersection = (a, b) => {
  const s = new Set(b)
  return a.filter(x => s.has(x))
}

intersection([1, 2, 3], [4, 3, 2]) // [2, 3]
```

### 19、intersectionWith: 两数组都符合条件的交集

此片段可用于在对两个数组的每个元素执行了函数之后，返回两个数组中存在的元素列表。

```js
const intersectionBy = (a, b, fn) => {
  const s = new Set(b.map(fn))
  return a.filter(x => s.has(fn(x)))
}

intersectionBy([2.1, 1.2], [2.3, 3.4], Math.floor) // [2.1]
```

### 20、intersectionWith: 先比较后返回交集

```js
const intersectionWith = (a, b, comp) =>
  a.filter(x => b.findIndex(y => comp(x, y)) !== -1)

intersectionWith(
  [1, 1.2, 1.5, 3, 0],
  [1.9, 3, 0, 3.9],
  (a, b) => Math.round(a) === Math.round(b)
) // [1.5, 3, 0]
```

### 21、minN: 返回指定长度的升序数组

```js
const minN = (arr, n = 1) => [...arr].sort((a, b) => a - b).slice(0, n)

minN([1, 2, 3]) // [1]
minN([1, 2, 3], 2) // [1,2]
```

### 22、negate: 根据条件反向筛选

```js
const negate = func => (...args) => !func(...args)

;[1, 2, 3, 4, 5, 6].filter(negate(n => n % 2 === 0)) // [ 1, 3, 5 ]
```

### 23、randomIntArrayInRange: 生成两数之间指定长度的随机数组

```js
const randomIntArrayInRange = (min, max, n = 1) =>
  Array.from(
    { length: n },
    () => Math.floor(Math.random() * (max - min + 1)) + min
  )

randomIntArrayInRange(12, 35, 10) // [ 34, 14, 27, 17, 30, 27, 20, 26, 21, 14 ]
```

### 24、sample: 在指定数组中获取随机数

```js
const sample = arr => arr[Math.floor(Math.random() * arr.length)]

sample([3, 7, 9, 11]) // 9
```

### 25、sampleSize: 在指定数组中获取指定长度的随机数

此代码段可用于从数组中获取指定长度的随机数，直至穷尽数组。 使用 Fisher-Yates 算法对数组中的元素进行随机选择。

```js
const sampleSize = ([...arr], n = 1) => {
  let m = arr.length
  while (m) {
    const i = Math.floor(Math.random() * m--)
    ;[arr[m], arr[i]] = [arr[i], arr[m]]
  }
  return arr.slice(0, n)
}

sampleSize([1, 2, 3], 2) // [3,1]
sampleSize([1, 2, 3], 4) // [2,3,1]
```

### 26、shuffle: “洗牌”数组

此代码段使用 Fisher-Yates 算法随机排序数组的元素。

```js
const shuffle = ([...arr]) => {
  let m = arr.length
  while (m) {
    const i = Math.floor(Math.random() * m--)
    ;[arr[m], arr[i]] = [arr[i], arr[m]]
  }
  return arr
}

const foo = [1, 2, 3]
shuffle(foo) // [2, 3, 1], foo = [1, 2, 3]
```

### 27、nest: 根据 parent_id 生成树结构（阿里一面真题）

```js
const nest = (items, id = null, link = 'parent_id') =>
  items
    .filter(item => item[link] === id)
    .map(item => ({ ...item, children: nest(items, item.id) }))

const comments = [
  { id: 1, parent_id: null },
  { id: 2, parent_id: 1 },
  { id: 3, parent_id: 1 },
  { id: 4, parent_id: 2 },
  { id: 5, parent_id: 4 },
]
const nestedComments = nest(comments) // [{ id: 1, parent_id: null, children: [...] }]
```

![](https://static.skynian.cn/20191022232102.png)

![](https://static.skynian.cn/20191022232111.png)

## 函数

## 字符串

## 对象

## 数字

## 浏览器操作及其他
