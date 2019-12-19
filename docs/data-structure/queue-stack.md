---
title: 队列 & 栈
date: 2019-11-30 21:25:17
sidebarDepth: 2
categories:
  - 数据结构
---

![](https://static.skynian.cn/20191130211217.png)

在 `FIFO` 数据结构中，将`首先处理添加到队列中的第一个元素`。

如上图所示，队列是典型的 FIFO 数据结构。插入（insert）操作也称作入队（enqueue），新元素始终被添加在`队列的末尾`。 删除（delete）操作也被称为出队（dequeue)。 你只能移除`第一个元素`。

## 一、队列: 先入先出的数据结构

### [[622] 设计循环队列](https://leetcode-cn.com/problems/design-circular-queue/description/)

#### 描述

设计你的循环队列实现。 循环队列是一种线性数据结构，其操作表现基于 FIFO（先进先出）原则并且队尾被连接在队首之后以形成一个循环。它也被称为“环形缓冲器”。

循环队列的一个好处是我们可以利用这个队列之前用过的空间。在一个普通队列里，一旦一个队列满了，我们就不能插入下一个元素，即使在队列前面仍有空间。但是使用循环队列，我们能使用这些空间去存储新的值。

你的实现应该支持如下操作：

- MyCircularQueue(k): 构造器，设置队列长度为 k 。
- Front: 从队首获取元素。如果队列为空，返回 -1 。
- Rear: 获取队尾元素。如果队列为空，返回 -1 。
- enQueue(value): 向循环队列插入一个元素。如果成功插入则返回真。
- deQueue(): 从循环队列中删除一个元素。如果成功删除则返回真。
- isEmpty(): 检查循环队列是否为空。
- isFull(): 检查循环队列是否已满。

#### 题解

```js
const MyCircularQueue = function(k) {
  this.storage = []
  this.currentSize = 0
  this.maxSize = k
  this.front = 0
  this.rear = -1
}

MyCircularQueue.prototype.enQueue = function(value) {
  if (this.currentSize >= this.maxSize) {
    return false
  }

  this.rear = ++this.rear % this.maxSize
  this.storage[this.rear] = value
  this.currentSize++

  return true
}

MyCircularQueue.prototype.deQueue = function() {
  if (this.currentSize === 0) {
    return false
  }

  this.front = ++this.front % this.maxSize
  this.currentSize--

  return true
}

MyCircularQueue.prototype.Front = function() {
  return this.currentSize === 0 ? -1 : this.storage[this.front]
}

MyCircularQueue.prototype.Rear = function() {
  return this.currentSize === 0 ? -1 : this.storage[this.rear]
}

MyCircularQueue.prototype.isEmpty = function() {
  return this.currentSize === 0
}

MyCircularQueue.prototype.isFull = function() {
  return this.currentSize === this.maxSize
}
```

## 二、队列和广度优先搜索

广度优先搜索（BFS）的一个常见应用是找出从根结点到目标结点的最短路径。在本文中，我们提供了一个示例来解释在 BFS 算法中是如何逐步应用队列的。

### [[200] 岛屿数量](https://leetcode-cn.com/problems/number-of-islands/description/)

### [[752] 打开转盘锁](https://leetcode-cn.com/problems/open-the-lock/description/)

### [[279] 完全平方数](https://leetcode-cn.com/problems/perfect-squares/description/)

## 三、栈：后入先出的数据结构

![](https://static.skynian.cn/20191130212234.png)

### [[155] 最小栈](https://leetcode-cn.com/problems/min-stack/description/)

#### 描述

设计一个支持 push，pop，top 操作，并能在常数时间内检索到最小元素的栈。

- push(x) -- 将元素 x 推入栈中。
- pop() -- 删除栈顶的元素。
- top() -- 获取栈顶元素。
- getMin() -- 检索栈中的最小元素。

#### 示例

```js
MinStack minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.getMin();   --> 返回 -3.
minStack.pop();
minStack.top();      --> 返回 0.
minStack.getMin();   --> 返回 -2.
```

#### 题解

```js
const MinStack = function() {
  this.minStack = []
  this.container = []
}
MinStack.prototype.push = function(x) {
  this.container.push(x)

  if (
    this.minStack.length === 0 ||
    x <= this.minStack[this.minStack.length - 1]
  ) {
    this.minStack.push(x)
  }
}
MinStack.prototype.pop = function() {
  let x = this.container.pop()

  if (x === this.minStack[this.minStack.length - 1]) {
    this.minStack.pop()
  }
}
MinStack.prototype.top = function() {
  return this.container[this.container.length - 1]
}
MinStack.prototype.getMin = function() {
  return this.minStack[this.minStack.length - 1]
}
```

### [[20] 有效的括号](https://leetcode-cn.com/problems/valid-parentheses/description/)

#### 描述

给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。

有效字符串需满足：

左括号必须用相同类型的右括号闭合。
左括号必须以正确的顺序闭合。
注意空字符串可被认为是有效字符串。

#### 题解

```js
const isValid = s => {
  const map = {
    '(': ')',
    '[': ']',
    '{': '}',
  }
  const stack = []

  for (let str of s) {
    if (str in map) {
      stack.push(str)
    } else {
      if (str !== map[stack.pop()]) {
        return false
      }
    }
  }

  return !stack.length
}
```
