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

## leetcode

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
