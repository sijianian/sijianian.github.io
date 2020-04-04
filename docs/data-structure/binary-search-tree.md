---
title: 二叉搜索树
date: 2020-04-04 13:57:17
sidebarDepth: 2
categories:
  - 数据结构
---

## 定义

- 每个节点中的值必须大于（或等于）存储在左侧子树中的任何值
- 每个节点中的值必须小于（或等于）存储在其右子树中的任何值

## 基础操作

### [[98] 验证二叉搜索树](https://leetcode-cn.com/problems/validate-binary-search-tree/description/)

#### 描述

- 给定一个二叉树，判断其是否是一个有效的二叉搜索树
- 假设一个二叉树具有以下特征：
  - 节点的左子树只包含小于当前节点的数。
  - 节点的右子树只包含大于当前节点的数。
  - 所有左子树和右子树自身必须也是二叉搜索树。

#### 题解

```js
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
const isValidBST = function (root) {
  const stack = []
  let current = root
  let lastNode = ''

  while (current !== null || stack.length !== 0) {
    while (current !== null) {
      stack.push(current)
      current = current.left
    }

    current = stack.pop()

    if (lastNode !== '' && current.val <= lastNode) {
      return false
    }

    lastNode = current.val
    current = current.right
  }

  return true
}
```

### [[701] 二叉搜索树中的插入操作](https://leetcode-cn.com/problems/insert-into-a-binary-search-tree/description/)

#### 描述

- 给定二叉搜索树（BST）的根节点和要插入树中的值，将值插入二叉搜索树。 返回插入后二叉搜索树的根节点。 保证原始二叉搜索树中不存在新值。
- 注意，可能存在多种有效的插入方式，只要树在插入后仍保持为二叉搜索树即可。 你可以返回任意有效的结果。

#### 思路

- 若 `root === null`，则返回 `TreeNode(val)`
- 若 `val > root.val`，插入到右子树
- 若 `val < root.val`，插入到左子树
- 返回 `root`

#### 题解

```js
/**
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 */
const insertIntoBST = function (root, val) {
  if (root === null) {
    return new TreeNode(val)
  }

  if (val > root.val) {
    root.right = insertIntoBST(root.right, val)
  } else {
    root.left = insertIntoBST(root.left, val)
  }

  return root
}
```

### [[450] 删除二叉搜索树中的节点](https://leetcode-cn.com/problems/delete-node-in-a-bst/description/)

#### 描述

- 给定一个二叉搜索树的根节点 root 和一个值 key，删除二叉搜索树中的  key
- 对应的节点，并保证二叉搜索树的性质不变。返回二叉搜索树（有可能被更新）的根节点的引用。

#### 思路

- 如果 `key > root.val`，说明要删除的节点在右子树，`root.right = deleteNode(root.right, key)`
- 如果 `key < root.val`，说明要删除的节点在左子树，`root.left = deleteNode(root.left, key)`
- 如果 `key == root.val`，则该节点就是我们要删除的节点，则
  - 如果该节点是叶子节点，则直接删除它：`root = null`。
  - 如果该节点不是叶子节点且有右节点，则用它的后继节点的值替代 `root.val = successor.val`，然后删除后继节点。
  - 如果该节点不是叶子节点且只有左节点，则用它的前驱节点的值替代 `root.val = predecessor.val`，然后删除前驱节点。

#### 题解

```js
const successor = node => {
  node = node.right
  while (node.left) {
    node = node.left
  }
  return node.val
}
const predecessor = node => {
  node = node.left
  while (node.right) {
    node = node.right
  }
  return node.val
}
/**
 * @param {TreeNode} root
 * @param {number} key
 * @return {TreeNode}
 */
const deleteNode = function (root, key) {
  if (!root) {
    return null
  }
  if (root.val < key) {
    root.right = deleteNode(root.right, key)
  } else if (root.val > key) {
    root.left = deleteNode(root.left, key)
  } else {
    if (root.left) {
      root.val = predecessor(root)
      root.left = deleteNode(root.left, root.val)
    } else if (root.right) {
      root.val = successor(root)
      root.right = deleteNode(root.right, root.val)
    } else {
      root = null
    }
  }
  return root
}
```

#### 复杂度

- 时间复杂度 O(logN)
- 空间复杂度 O(H)

## 小结

### 二叉搜索树的优点

- 即使在最坏的情况下，也允许你在 `O(h)` 的时间复杂度内执行所有的搜索、插入、删除操作
- 通常来说，如果需要有序着存储或者需要同时执行搜索、插入、删除等多步操作，二叉搜索树这个数据结构是一个很好的选择

### [703. 数据流中的第 K 大元素](https://leetcode-cn.com/problems/kth-largest-element-in-a-stream/description/)

### [[235] 二叉搜索树的最近公共祖先](https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-search-tree/description/)

#### 描述

- 给定一个二叉搜索树, 找到该树中两个指定节点的最近公共祖先。
- 百度百科中最近公共祖先的定义为：“对于有根树 T 的两个结点 p、q，最近公共祖先表示为一个结点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）。”

#### 思路

- 从根节点开始遍历树
- 如果节点 pp 和节点 qq 都在右子树上，那么以右孩子为根节点继续 1 的操作
- 如果节点 pp 和节点 qq 都在左子树上，那么以左孩子为根节点继续 1 的操作
- 如果条件 2 和条件 3 都不成立，这就意味着我们已经找到节 pp 和节点 qq 的 LCA 了

#### 题解

```js
const lowestCommonAncestor = (root, p, q) => {
  if (p.val > root.val && q.val > root.val) {
    return lowestCommonAncestor(root.right, p, q)
  } else if (p.val < root.val && q.val < root.val) {
    return lowestCommonAncestor(root.left, p, q)
  } else {
    return root
  }
}
```

#### 复杂度

- 时间复杂度：O(N)
  - 其中 NN 为 BST 中节点的个数，在最坏的情况下我们可能需要访问 BST 中所有的节点。
- 空间复杂度：O(N)
  - 所需开辟的额外空间主要是递归栈产生的，之所以是 NN 是因为 BST 的高度为 NN。

## 附录：高度平衡的二叉搜索树

### [[110] 平衡二叉树](https://leetcode-cn.com/problems/balanced-binary-tree/)

#### 思路

- 后续遍历二叉树
- 在遍历二叉树每个节点前都会遍历其左右子树
- 比较左右子树的深度，若差值大于 1 则返回一个标记 - 1，表示当前子树不平衡
- 左右子树有一个不是平衡的，或左右子树差值大于 1，则整颗树不平衡
- 若左右子树平衡，返回当前树的深度（左右子树的深度最大值 +1）

#### 题解

```js
const isBalanced = root => {
  return balanced(root) !== -1
}

const balanced = node => {
  if (!node) {
    return 0
  }

  const left = balanced(node.left)
  const right = balanced(node.right)

  if (left === -1 || right === -1 || Math.abs(left - right) > 1) {
    return -1
  }

  return Math.max(left, right) + 1
}
```
