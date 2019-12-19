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

### [[707] 设计链表](https://leetcode-cn.com/problems/design-linked-list/description/)

#### 描述

设计链表的实现。您可以选择使用单链表或双链表。单链表中的节点应该具有两个属性：val  和  next。val  是当前节点的值，next  是指向下一个节点的指针/引用。如果要使用双向链表，则还需要一个属性  prev  以指示链表中的上一个节点。假设链表中的所有节点都是 0-index 的。

在链表类中实现这些功能：

- get(index)：获取链表中第  index  个节点的值。如果索引无效，则返回-1。
- addAtHead(val)：在链表的第一个元素之前添加一个值为  val  的节点。插入后，新节点将成为链表的第一个节点。
- addAtTail(val)：将值为  val 的节点追加到链表的最后一个元素。
- addAtIndex(index,val)：在链表中的第  index  个节点之前添加值为  val  的节点。如果  index  等于链表的长度，则该节点将附加到链表的末尾。如果 index 大于链表长度，则不会插入节点。如果 index 小于 0，则在头部插入节点。
- deleteAtIndex(index)：如果索引  index 有效，则删除链表中的第  index 个节点。

#### 题解

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

### [[141] 环形链表](https://leetcode-cn.com/problems/linked-list-cycle/description/)

#### 描述

给定一个链表，判断链表中是否有环。

为了表示给定链表中的环，我们使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。 如果 pos 是 -1，则在该链表中没有环。

#### 题解

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

### [[142] 环形链表 II](https://leetcode-cn.com/problems/linked-list-cycle-ii/description/)

#### 描述

给定一个链表，返回链表开始入环的第一个节点。  如果链表无环，则返回  null。

为了表示给定链表中的环，我们使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。 如果 pos 是 -1，则在该链表中没有环。

说明：不允许修改给定的链表。

#### 题解

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

### [[160] 相交链表](https://leetcode-cn.com/problems/intersection-of-two-linked-lists/description/)

#### 描述

编写一个程序，找到两个单链表相交的起始节点。

如下面的两个链表：

![](https://static.skynian.cn/20191220001435.png)

在节点 c1 开始相交

#### 题解

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

### [[19] 删除链表的倒数第 N 个节点](https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/description/)

#### 描述

![](https://static.skynian.cn/20191220001435.png)

#### 思路

- 整体思路是让前面的指针先移动 n 步，之后前后指针共同移动直到前面的指针到尾部为止
- 首先设立预先指针 pre，预先指针是一个小技巧，在第 2 题中进行了讲解
- 设预先指针 pre 的下一个节点指向 head，设前指针为 fast，后指针为 slow，二者都等于 pre fast 先向前移动 n 步
- 之后 fast 和 slow 共同向前移动，此时二者的距离为 n，当 fast 到尾部时，slow 的位置恰好为倒数第 n 个节点
- 因为要删除该节点，所以要移动到该节点的前一个才能删除，所以循环结束条件为 fast.next != null
- 删除后返回 pre.next，为什么不直接返回 head 呢，因为 head 有可能是被删掉的点
- 时间复杂度：O(n)O(n)

#### 题解

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

### [[206] 反转链表](https://leetcode-cn.com/problems/reverse-linked-list/description/)

#### 描述

反转一个单链表。

#### 题解

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

### [[203] 移除链表元素](https://leetcode-cn.com/problems/remove-linked-list-elements/description/)

#### 描述

删除链表中等于给定值 val 的所有节点。

#### 题解

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

### [[328] 奇偶链表](https://leetcode-cn.com/problems/odd-even-linked-list/description/)

#### 描述

给定一个单链表，把所有的奇数节点和偶数节点分别排在一起。请注意，这里的奇数节点和偶数节点指的是节点编号的奇偶性，而不是节点的值的奇偶性。

请尝试使用原地算法完成。你的算法的空间复杂度应为 O(1)，时间复杂度应为 O(nodes)，nodes 为节点总数。

#### 题解

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

### [[234] 回文链表](https://leetcode-cn.com/problems/palindrome-linked-list/description/)

#### 描述

请判断一个链表是否为回文链表。

#### 题解

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

### [[21] 合并两个有序链表](https://leetcode-cn.com/problems/merge-two-sorted-lists/description/)

#### 描述

将两个有序链表合并为一个新的有序链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。

#### 题解

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

### [[2] 两数相加](https://leetcode-cn.com/problems/add-two-numbers/description/)

#### 描述

给出两个非空 的链表用来表示两个非负的整数。其中，它们各自的位数是按照逆序的方式存储的，并且它们的每个节点只能存储一位数字。

如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。

您可以假设除了数字 0 之外，这两个数都不会以 0  开头。

#### 题解

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

### [[61] 旋转链表](https://leetcode-cn.com/problems/rotate-list/description/)

#### 描述

给定一个链表，旋转链表，将链表每个节点向右移动 k 个位置，其中 k 是非负数。

#### 题解

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

### [[430] 扁平化多级双向链表](https://leetcode-cn.com/problems/flatten-a-multilevel-doubly-linked-list/description/)

#### 描述

您将获得一个双向链表，除了下一个和前一个指针之外，它还有一个子指针，可能指向单独的双向链表。这些子列表可能有一个或多个自己的子项，依此类推，生成多级数据结构，如下面的示例所示。

扁平化列表，使所有结点出现在单级双链表中。您将获得列表第一级的头部。

#### 题解

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

### [[138] 复制带随机指针的链表](https://leetcode-cn.com/problems/copy-list-with-random-pointer/description/)

#### 描述

给定一个链表，每个节点包含一个额外增加的随机指针，该指针可以指向链表中的任何节点或空节点。

要求返回这个链表的深拷贝。

#### 题解

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
