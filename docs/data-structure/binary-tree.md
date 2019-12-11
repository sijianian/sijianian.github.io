---
title: 探索二叉树
date: 2019-11-27 02:45:17
sidebarDepth: 2
categories:
  - 数据结构
---

`树`是一种经常用到的数据结构，用来模拟具有树状结构性质的数据集合

树里的每一个节点有一个根植和一个包含所有子节点的列表。从图的观点来看，树也可视为一个拥有 `N 个节点`和 `N-1 条边`的一个有向无环图。

`二叉树`是一种更为典型的树树状结构。如它名字所描述的那样，二叉树是每个节点最多有`两个子树`的树结构，通常子树被称作“左子树”和“右子树”。

## 一、树的遍历

### 前序遍历

[[144] 二叉树的前序遍历](https://leetcode-cn.com/problems/binary-tree-preorder-traversal/)

#### 题解

```js
// 递归实现
const preorderTraversal = (root, array = []) => {
  if (!root) {
    return array
  }

  array.push(root.val)
  preorderTraversal(root.left, array)
  preorderTraversal(root.right, array)

  return array
}

// 非递归实现
const preorderTraversal2 = root => {
  const result = []
  const stack = []

  let current = root

  while (current || stack.length > 0) {
    while (current) {
      result.push(current.val)
      stack.push(current)
      current = current.left
    }

    current = stack.pop()
    current = current.right
  }

  return result
}
```

### 中序遍历

[[94] 二叉树的中序遍历](https://leetcode-cn.com/problems/binary-tree-inorder-traversal/)

#### 题解

```js
// 递归实现
const inorderTraversal = (root, array = []) => {
  if (!root) {
    return array
  }

  inorderTraversal(root.left, array)
  array.push(root.val)
  inorderTraversal(root.right, array)

  return array
}

// 非递归实现
const inorderTraversal2 = root => {
  const stack = []
  const result = []

  let current = root

  while (current || stack.length > 0) {
    while (current) {
      stack.push(current)
      current = current.left
    }

    current = stack.pop()
    result.push(current.val)
    current = current.right
  }

  return result
}
```

### 后序遍历

[[145] 二叉树的后序遍历](https://leetcode-cn.com/problems/binary-tree-postorder-traversal/)

#### 思路

- 取跟节点为目标节点，开始遍历
- 左孩子入栈 -> 直至左孩子为空的节点
- 栈顶节点的右节点为空或右节点被访问过 -> 节点出栈并访问他，将节点标记为已访问
- 栈顶节点的右节点不为空且未被访问，以右孩子为目标节点，再依次执行 1、2、3

#### 题解

```js
// 递归实现
const postorderTraversal = (root, array = []) => {
  if (!root) {
    return array
  }

  postorderTraversal(root.left, array)
  postorderTraversal(root.right, array)
  array.push(root.val)

  return array
}

// 非递归实现
const postorderTraversal2 = root => {
  const result = []
  const stack = []

  let last = null
  let current = root

  while (current || stack.length > 0) {
    while (current) {
      stack.push(current)
      current = current.left
    }

    current = stack[stack.length - 1]

    if (!current.right || current.right === last) {
      current = stack.pop()
      result.push(current.val)
      last = current
      current = null
    } else {
      current = current.right
    }
  }
}
```

### 层次遍历

[[102] 二叉树的层次遍历](https://leetcode-cn.com/problems/binary-tree-level-order-traversal/)

#### 题解

```js
const levelOrder = root => {
  if (!root) {
    return []
  }

  const result = []
  let queue = [root]

  while (queue.length) {
    const arr = []
    const temp = []

    while (queue.length) {
      const curr = queue.shift()
      arr.push(curr.val)

      if (curr.left) {
        temp.push(curr.left)
      }

      if (curr.right) {
        temp.push(curr.right)
      }
    }

    queue = temp
    result.push(arr)
  }

  return result
}
```

## 二、运用递归解决问题

### 二叉树的最大深度

[[104] https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/](https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/)

#### 题解

```js
const maxDepth = root => {
  return !root ? 0 : Math.max(maxDepth(root.left), maxDepth(root.right)) + 1
}
```

### 对称二叉树

[[101] https://leetcode-cn.com/problems/symmetric-tree/](https://leetcode-cn.com/problems/symmetric-tree/)

#### 描述

给定一个二叉树，检查它是否是镜像对称的。

#### 题解

```js
const isSymmetricalTree = (node1, node2) => {
  if (!node1 && !node2) {
    return true
  }

  if (!node1 || !node2) {
    return false
  }

  if (node1.val !== node2.val) {
    return false
  }

  return (
    isSymmetricalTree(node1.left, node2.right) &&
    isSymmetricalTree(node1.right, node2.left)
  )
}

/**
 * @param {TreeNode} root
 * @return {boolean}
 */
const isSymmetric = root => {
  return isSymmetricalTree(root, root)
}
```

### 路径总和

[[112] https://leetcode-cn.com/problems/path-sum/](https://leetcode-cn.com/problems/path-sum/)

#### 描述

给定一个二叉树和一个目标和，判断该树中是否存在根节点到叶子节点的路径，这条路径上所有节点值相加等于目标和。

#### 题解

```js
const hasPathSumCore = (node, expectNumber, stack, sum, result) => {
  stack.push(node.val)
  sum += node.val

  if (!node.left && !node.right && sum === expectNumber) {
    result.push(stack.slice(0))
  }

  if (node.left) {
    hasPathSumCore(node.left, expectNumber, stack, sum, result)
  }

  if (node.right) {
    hasPathSumCore(node.right, expectNumber, stack, sum, result)
  }

  stack.pop()
}

const hasPathSum = (root, sum) => {
  const result = []

  if (root) {
    hasPathSumCore(root, sum, [], 0, result)
  }

  return result
}
```

## 三、进阶

### 从中序与后序遍历序列构造二叉树

[[106] https://leetcode-cn.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/](https://leetcode-cn.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/)

### 从前序与中序遍历序列构造二叉树

[[105] https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/](https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)

### 填充每个节点的下一个右侧节点指针

[[116] https://leetcode-cn.com/problems/populating-next-right-pointers-in-each-node/](https://leetcode-cn.com/problems/populating-next-right-pointers-in-each-node/)

### 填充每个节点的下一个右侧节点指针 II

[[117] https://leetcode-cn.com/problems/populating-next-right-pointers-in-each-node-ii/](https://leetcode-cn.com/problems/populating-next-right-pointers-in-each-node-ii/)

### 二叉树的最近公共祖先

[[236] https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-tree/](https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-tree/)

### 二叉树的序列化与反序列化

[[297] https://leetcode-cn.com/problems/serialize-and-deserialize-binary-tree/](https://leetcode-cn.com/problems/serialize-and-deserialize-binary-tree/)
