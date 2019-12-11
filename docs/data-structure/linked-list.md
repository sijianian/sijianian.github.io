---
title: 探索链表
date: 2019-11-30 18:35:17
sidebarDepth: 2
categories:
  - 数据结构
---

## 一、介绍

与数组相似，链表也是一种线性数据结构。这里有一个例子：

![](https://static.skynian.cn/20191130183814.png)

正如你看到的，链表中的每个元素实际上是一个单独的对象，而所有对象都通过每个元素中的引用字段链接在一起。

链表有两种类型：单链表和双链表。上面给出的例子是一个单链表，这里有一个双链表的例子：

![](https://static.skynian.cn/20191130183921.png)

## 二、单链表

### 设计链表

[[707] 设计链表](https://leetcode-cn.com/problems/design-linked-list/description/)

```js
let Node = function(val) {
  this.val = val
  this.next = null
}
let MyLinkedList = function() {
  this.head = null
  this.tail = null
  this.size = 0
}
MyLinkedList.prototype.get = function(index) {
  if (this.size === 0 || index > this.size - 1 || index < 0) {
    return -1
  }

  let curr = this.head

  for (let i = 0; i < index; i++) {
    curr = curr.next
  }

  return curr.val
}
MyLinkedList.prototype.addAtHead = function(val) {
  const newNode = new Node(val)

  if (!this.head) {
    this.head = newNode
    this.tail = newNode
  } else {
    newNode.next = this.head
    this.head = newNode
  }

  this.size++

  return this
}
MyLinkedList.prototype.addAtTail = function(val) {
  const newNode = new Node(val)

  if (!this.head) {
    this.head = newNode
    this.tail = newNode
  } else {
    this.tail.next = newNode
    this.tail = newNode
  }

  this.size++

  return this
}
MyLinkedList.prototype.addAtIndex = function(index, val) {
  const newNode = new Node(val)

  if (index > this.size) {
    return
  }

  if (index <= 0) {
    return this.addAtHead(val)
  }

  if (index === this.size) {
    return this.addAtTail(val)
  }

  let curr = this.head

  for (let i = 0; i < index - 1; i++) {
    curr = curr.next
  }

  newNode.next = curr.next ? curr.next : null
  curr.next = newNode
  this.size++

  return this
}
MyLinkedList.prototype.deleteAtIndex = function(index) {
  if (index >= this.size || index < 0) return
  if (index === 0) {
    this.head = this.head.next
    this.size--
    return this
  }

  let curr = this.head
  for (let i = 0; i < index - 1; i++) {
    curr = curr.next
  }

  curr.next = curr.next.next ? curr.next.next : null
  if (!curr.next) {
    this.tail = curr
  }
  this.size--
  return this
}
```

## 三、双指针技巧

让我们从一个经典问题开始：

> 给定一个链表，判断链表中是否有环。

你可能已经使用`哈希表`提出了解决方案。但是，使用`双指针技巧`有一个更有效的解决方案。在阅读接下来的内容之前，试着自己仔细考虑一下。

想象一下，有两个速度不同的跑步者。如果他们在直路上行驶，快跑者将首先到达目的地。但是，如果它们在圆形跑道上跑步，那么快跑者如果继续跑步就会追上慢跑者。

这正是我们在链表中使用两个速度不同的指针时会遇到的情况：

1. 如果没有环，快指针将停在链表的末尾
2. 如果有环，快指针最终将于慢指针相遇

### 环形链表

[[141] 环形链表](https://leetcode-cn.com/problems/linked-list-cycle/description/)

```js
const hasCycle = head => {
  let slow = head
  let fast = head

  while (fast && fast.next) {
    slow = slow.next
    fast = fast.next.next

    if (slow === fast) {
      return true
    }
  }

  return false
}
```

### 环形链表 II

[[142] 环形链表 II](https://leetcode-cn.com/problems/linked-list-cycle-ii/description/)

```js
const detectCycle = head => {
  const map = new WeakMap()

  while (head) {
    map.set(head, true)
    head = head.next

    if (map.has(head)) {
      return head
    }
  }

  return null
}
```

### 相交链表

[[160] 相交链表](https://leetcode-cn.com/problems/intersection-of-two-linked-lists/description/)

```js
const getIntersectionNode = function(headA, headB) {
  if (!headA || !headB) {
    return null
  }

  let currA = headA
  let currB = headB

  while (currA !== currB) {
    currA = currA === null ? headB : currA.next
    currB = currB === null ? headA : currB.next
  }

  return currA
}
```

### 删除链表的倒数第 n 个节点

[[19] 删除链表的倒数第 N 个节点](https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/description/)

思路

- 整体思路是让前面的指针先移动 n 步，之后前后指针共同移动直到前面的指针到尾部为止
- 首先设立预先指针 pre，预先指针是一个小技巧，在第 2 题中进行了讲解
- 设预先指针 pre 的下一个节点指向 head，设前指针为 fast，后指针为 slow，二者都等于 pre fast 先向前移动 n 步
- 之后 fast 和 slow 共同向前移动，此时二者的距离为 n，当 fast 到尾部时，slow 的位置恰好为倒数第 n 个节点
- 因为要删除该节点，所以要移动到该节点的前一个才能删除，所以循环结束条件为 fast.next != null
- 删除后返回 pre.next，为什么不直接返回 head 呢，因为 head 有可能是被删掉的点
- 时间复杂度：O(n)O(n)

```js
const removeNthFromEnd = function(head, n) {
  const pre = new ListNode(0)

  pre.next = head

  let slow = pre
  let fast = pre

  while (n !== 0) {
    fast = fast.next
    n--
  }

  while (fast.next !== null) {
    fast = fast.next
    slow = slow.next
  }

  slow.next = slow.next.next

  return pre.next
}
```

## 四、经典问题

- 通过一些测试用例可以节省您的时间。

使用链表时不易调试。因此，在编写代码之前，自己尝试几个不同的示例来验证您的算法总是很有用的。

- 你可以同时使用多个指针

有时，当你为链表问题设计算法时，可能需要同时跟踪多个结点。您应该记住需要跟踪哪些结点，并且可以自由地使用几个不同的结点指针来同时跟踪这些结点。

如果你使用多个指针，最好为它们指定适当的名称，以防将来必须调试或检查代码。

- 在许多情况下，你需要跟踪当前结点的前一个结点

你无法追溯单链表中的前一个结点。因此，您不仅要存储当前结点，还要存储前一个结点。这在双链表中是不同的，我们将在后面的章节中介绍。

### 反转链表

[[206] 反转链表](https://leetcode-cn.com/problems/reverse-linked-list/description/)

```js
const reverseList = head => {
  if (head === null) {
    return null
  }

  let pre = null
  let next = null

  while (head !== null) {
    next = head.next
    head.next = pre
    pre = head
    head = next
  }

  return pre
}
```

### 移除链表元素

[[203] 移除链表元素](https://leetcode-cn.com/problems/remove-linked-list-elements/description/)

```js
const removeElements = function(head, val) {
  if (!head) {
    return head
  }

  while (head) {
    if (head.val === val) {
      head = head.next
    } else {
      break
    }
  }

  let curr = head

  while (curr && curr.next) {
    if (curr.next.val === val) {
      curr.next = curr.next.next
    } else {
      curr = curr.next
    }
  }

  return head
}
```

### 奇偶链表

[[328] 奇偶链表](https://leetcode-cn.com/problems/odd-even-linked-list/description/)

```js
const oddEvenList = function(head) {
  if (!head) {
    return head
  }

  let odd = head
  let even = head.next
  let evenHead = even

  while (even !== null && even.next !== null) {
    odd.next = even.next
    odd = odd.next
    even.next = odd.next
    even = even.next
  }

  odd.next = evenHead

  return head
}
```

### 回文链表

[[234] 回文链表](https://leetcode-cn.com/problems/palindrome-linked-list/description/)

```js
const isPalindrome = head => {
  if (head === null || head.next === null) {
    return true
  }

  let slow = head
  let fast = head

  while (fast.next !== null && fast.next.next !== null) {
    slow = slow.next
    fast = fast.next.next
  }

  // 链表反转
  slow.next = reverseList(slow.next)
  slow = slow.next

  while (slow !== null) {
    if (head.val !== slow.val) {
      return false
    }

    head = head.next
    slow = slow.next
  }

  return true
}
```

### 合并两个有序链表

[[21] 合并两个有序链表](https://leetcode-cn.com/problems/merge-two-sorted-lists/description/)

```js
const mergeTwoLists = (l1, l2) => {
  if (l1 === null) {
    return l2
  }

  if (l2 === null) {
    return l1
  }

  if (l1.val < l2.val) {
    l1.next = mergeTwoLists(l1.next, l2)
    return l1
  } else {
    l2.next = mergeTwoLists(l1, l2.next)
    return l2
  }
}
```

### 两数相加

[[2] 两数相加](https://leetcode-cn.com/problems/add-two-numbers/description/)

```js
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

### 旋转链表

[[61] 旋转链表](https://leetcode-cn.com/problems/rotate-list/description/)

```js
const rotateRight = (head, k) => {
  let target = head,
    last = null,
    len = 1

  while (target && target.next) {
    target = target.next
    len++
  }

  last = target
  target = head

  if (k % len === 0) {
    return head
  }

  let diff = len - (k % len)
  let pre = null

  while (target && diff--) {
    pre = target
    target = target.next
  }

  pre.next = null
  last.next = head

  return target
}
```

### 扁平化多级双向链表

[[430] 扁平化多级双向链表](https://leetcode-cn.com/problems/flatten-a-multilevel-doubly-linked-list/description/)

```js
const flatten = function(head) {
  const arr = []
  const helper = node => {
    if (!node) return
    arr.push(node)
    helper(node.child)
    helper(node.next)
  }

  helper(head)

  for (let i = 0; i < arr.length; i++) {
    arr[i].prev = arr[i - 1] || null
    arr[i].next = arr[i + 1] || null
    arr[i].child = null
  }

  return arr[0] || null
}
```

### 复制带随机指针的链表

[[138] 复制带随机指针的链表](https://leetcode-cn.com/problems/copy-list-with-random-pointer/description/)

```js
const copyRandomList = function(head) {
  if (!head) {
    return null
  }
  const clones = new Map()
  let n = head
  while (n) {
    clones.set(n, new Node(n.val))
    n = n.next
  }
  n = head
  while (n) {
    clones.get(n).next = clones.get(n.next) || null
    clones.get(n).random = clones.get(n.random) || null
    n = n.next
  }
  return clones.get(head)
}
```
