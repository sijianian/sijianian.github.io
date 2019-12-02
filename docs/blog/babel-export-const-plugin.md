---
title: 使用 Babel 转换对象 为 export const
date: 2019-12-02 15:24:44
tags:
  - Babel
  - Node
  - Prettier
categories:
  - 博客
---

## 背景

### 转换前数据格式

```js
const data = [
  {
    id: 'crm.functional.base',
    desc: 'CRM模块',
  },
  {
    id: 'crm.setting.email.manage',
    desc: '设置管理-邮箱绑定',
  },
  {
    id: 'crm.setting.email.template',
    desc: '设置管理-邮件模板',
  },
]
```

### 转换后数据格式

```js
/**
 * @description CRM模块
 */
export const functionalBase = 'crm.functional.base'

/**
 * @description 设置管理-邮箱绑定
 */
export const settingEmailManage = 'crm.setting.email.manage'

/**
 * @description 设置管理-邮件模板
 */
export const settingEmailTemplate = 'crm.setting.email.template'
```

## 方案

- 使用 Babel 对数据进行处理
- Prettier 对代码进行格式化

## 核心代码

```js
const fs = require('fs')
const path = require('path')
const axios = require('axios')
const prettier = require('prettier')
const babel = require('@babel/core')

const types = babel.types

const resolve = dir => path.join(__dirname, '../../', dir)

const DIST_PATH = resolve('xxx/xxx.js')

const commentBefore = date => `*
 * @更新日期 ${date}
 `

const periodToHump = str =>
  str.replace(/\.(\w)/g, (all, letter) => letter.toUpperCase())

const elementsToExportNamedDeclaration = elements =>
  elements.map(node => {
    const { properties = [], leadingComments } = node
    const [idProperty] = properties
    const currentValue = idProperty.value.value
    const currentHumpValue = periodToHump(currentValue)
    const variable = types.VariableDeclaration('const', [
      types.variableDeclarator(
        types.identifier(currentHumpValue),
        types.stringLiteral(currentValue)
      ),
    ])
    const resultNode = types.exportNamedDeclaration(variable, [])

    resultNode.leadingComments = leadingComments

    return resultNode
  })

const originVisitor = {
  ObjectExpression(path) {
    const { node } = path
    const { properties = [] } = node
    const [, descProperty] = properties
    const currentValue = descProperty.value.value
    const commentStr = `*
     * @description ${currentValue}
    `

    path.addComment('leading', commentStr, false)
  },
}

const visitor = {
  ExpressionStatement(path) {
    const node = path.node
    const { expression } = node
    const { elements } = expression

    path.traverse(originVisitor)

    if (types.isArrayExpression(expression)) {
      path.replaceWithMultiple(elementsToExportNamedDeclaration(elements))
    }
  },
}

const dataStr = JSON.stringify(data)
const currentDate = new Date().toLocaleString()
const result = babel.transformSync(dataStr, {
  plugins: [{ visitor }],
  auxiliaryCommentBefore: commentBefore(currentDate),
})
const prettierCode = prettier.format(result.code, {
  semi: false,
  singleQuote: true,
  trailingComma: 'es5',
  parser: 'babel',
})

fs.writeFileSync(distPath, prettierCode)
```

## TODO: 细节待整理
