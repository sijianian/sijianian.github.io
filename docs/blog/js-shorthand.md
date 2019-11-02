---
title: JS 简写技术
date: 2018-07-22 22:21:25
tags:
  - JavaScript
categories:
  - 博客
---

> 转载 [19 个 JS 常用的简写技术](https://juejin.im/post/5948db9661ff4b006c061b2b)

<!-- more -->

## 三元操作符

当想写 if...else 语句时，使用三元操作符来代替

```js
const x = 20
let answer
if (x > 10) {
  answer = 'is greater'
} else {
  answer = 'is lesser'
}
```

简写：

```js
const answer = x => (10 ? 'is greater' : 'is lesser')
```

也可以嵌套 if 语句

```js
const big = x > 10 ? 'greater 10' : x
```

## 短路求值简写方式

当给一个变量分配另一个值的时候，想确定源值是不是 null,undefined 或空值。可以撰写一个多重条件的 if 语句

测试 ing

```js
if (temp !== null || temp !== undefined || temp !== '') {
  let temp2 = temp
}
```

或者可以使用短路求值方法：

```js
const temp2 = temp || 'new'
```

## 声明变量简写方法

```js
let x
let y
let z = 3
```

简写方法:

```js
let x,
  y,
  z = 3
```

## if 存在条件简写方法

```js
  if(likeJavaScript===true)
```

简写：

```js
  if(likeJavaScript)
```

只有 likeJavaScript 是真值的时候，二者语句才相等

如果判断值不是真值，则可以这样

```js
let a
if (a !== true) {
  //do something...
}
```

简写：

```js
let a
if (!a) {
  //do something
}
```

## JS 循环简写方法

```js
for (let i=0;i<allImgs.length;i++)
```

简写：

```js
for(let index in allImgs)
```

也可以使用 Array.forEach

```js
function logArrayElements(element,index,array){
    console.log('a['+index+']='+element);
}
[2.5.9].forEach(logArrayElements);
```

## 短路评价

给一个变量分配的值是通过判断其值是否为 null 或者 undefined，则可以：

```js
let dbhost
if (process.env.DB_HOST) {
  dbHost = process.env.DB_HOST
} else {
  dbHost = 'localhost'
}
```

简写:

```js
const dbHost = process.env.DB_HOST || 'localhost'
```

## 十进制指数

当需要写数字带有很多零时(如 10000000)，可以采用指数(1e7)来代替这个数字：

```js
for (let i = 0; i < 10000; i++) {}
```

简写：

```js
for (let i = 0; i < 1e7; i++) {}
```

## 对象属性简写

如果属性名与 key 名相同，则可以采用 es6 的方法：

```js
const obj = { x: x, y: y }
```

简写：

```js
const obj = { x, y }
```

## 箭头函数简写

传统函数编写方法很容易让人理解和编写，但是当嵌套在另一个函数中，则这些优势就荡然无存

```js
function sayHello(name) {
  console.log('hello', name)
}
setTimeout(function() {
  console.log('Loaden')
}, 2000)
list.forEach(function(item) {
  console.log(item)
})
```

简写：

```js
sayHello = nae => console.log('Hello', name)

setTimeout(() => console.log('Loaden'), 2000)

list.forEach(item => console.log(item))
```

## 隐式返回值简写

经常使用 return 语句来返回最终结果，一个单独语句的箭头函数能隐试返回其值（函数必须省略{}为了省略 return 关键字）

为返回多行语句（例如对象字面表达式)，则需要使用()包围函数体

```js
function calcCircumference(diameter) {
  return Math.PI * diameter
}
var func = function func() {
  return { foo: 1 }
}
```

简写：

```js
calcCircumference = diameter => {
  Math.PI * diameter
}
var func = () => ({ foo: 1 })
```

## 默认参数值

为了给函数中参数传递默认值，通常使用 if 语句来编写，但是使用 es6 定义默认值，则会很简洁：

```js
function valume(l, w, h) {
  if (w === undefined) w = 3
  if (h === undefined) h = 4
  return l * w * h
}
```

简写：

```js
volume = (l, w = 3, h = 4) => l * w * h
volume(2)
```

## 模板字符串

传统的 JS 语言，输出模板通常是这样写的

```js
const welcome = 'you have logged in as' + first + '  ' + last + '.'
const db = 'http://' + host + ':' + port + '/' + database
```

es6 可以使用反引号和\${}简写：

```js
const welcome = `you have logged in as ${first} ${last}`
const db = `http://${host}/${database}`
```

## 结构赋值简写方法

在 web 框架中，经常需要从组件和 API 之间来回传递数组或对象字面形式的数据，然后需要解构它

```js
const observable = require('mobx/observable')
const action = require('mobx/action')
const runInAction = require('mobx/runInAction')

const store = this.props.store
const form = this.props.form
const loading = this.props.loading
const errors = this.props.errors
const entity = this.props.entity
```

简写：

```js
import { observable, action, runInAction } from 'mobx'
const { store, form, loading, errors, entity } = this.props
```

也可以分配变量名：

```js
const { store, form, loading, errors, entity: contact } = this.props
```

## 多行字符串简写

需要输出多行字符串，需要使用+来拼接：

```js
const lorem =
  'Lorem ipsum dolor sit amet, consectetur\n\t' +
  'adipisicing elit, sed do eiusmod tempor incididunt\n\t' +
  'ut labore et dolore magna aliqua. Ut enim ad minim\n\t' +
  'veniam, quis nostrud exercitation ullamco laboris\n\t' +
  'nisi ut aliquip ex ea commodo consequat. Duis aute\n\t' +
  'irure dolor in reprehenderit in voluptate velit esse.\n\t'
```

使用反引号，则可以达到简写作用：

```js
const lorem = `Lorem ipsum dolor sit amet, consectetur
    adipisicing elit, sed do eiusmod tempor incididunt
    ut labore et dolore magna aliqua. Ut enim ad minim
    veniam, quis nostrud exercitation ullamco laboris
    nisi ut aliquip ex ea commodo consequat. Duis aute
    irure dolor in reprehenderit in voluptate velit esse.`
```

## 扩展运算符简写

扩展运算符有几种用例让 JS 代码更加有效使用，可以用来代替某个数组函数

```js
//joining arrays
const odd = [1, 3, 5]
const nums = [2, 4, 6].concat(odd)
//cloning arrays
const arr = [1, 2, 3, 4]
const arr2 = arr.slice()
```

简写:

```js
// joining arrays
const odd = [1, 3, 5]
const nums = [2, 4, 6, ...odd]
console.log(nums) // [ 2, 4, 6, 1, 3, 5 ]

// cloning arrays
const arr = [1, 2, 3, 4]
const arr2 = [...arr]
```

不像 concat()函数，可以使用扩展运算符在一个数组中任意处插入另一个数组

```js
const odd = [1, 3, 5]
const nums = [2, ...odd, 4, 6]
```

也可以使用扩展运算符解构

```js
const { a, b, ...z } = { a: 1, b: 2, c: 3, d: 4 }
console.log(a) // 1
console.log(b) // 2
console.log(z) // { c: 3, d: 4 }
```

## 强制参数简写

JS 中如果没有向函数参数传递值，则参数为 undefined。为了增强参数赋值，可以使用 if 语句来抛出异常，或使用强制参数简写方法

```js
function foo(bar) {
  if (bar === undefined) {
    throw new Error('Missing parameter!')
  }
  return bar
}
```

简写：

```js
mandatory = () => {
  throw new Error('Missing parameter!')
}
foo = (bar = mandatory()) => {
  return bar
}
```

## Array.find 简写

想从数组中查找某个值，则需要循环在 ES6 中，find()函数能实现同样效果

```js
const pets = [
  { type: 'Dog', name: 'Max' },
  { type: 'Cat', name: 'Karl' },
  { type: 'Dog', name: 'Tommy' },
]

function findDog(name) {
  for (let i = 0; i < pets.length; ++i) {
    if (pets[i].type === 'Dog' && pets[i].name === name) {
      return pets[i]
    }
  }
}
```

简写：

```js
pet = pets.find(pet => pet.type === 'Dog' && pet.name === 'Tommy')
console.log(pet)
```

## Object[key]简写

考虑一个验证函数

```js
function validate(values) {
  if (!values.first) return false
  if (!values.last) return false
  return true
}
console.log(validate({ first: 'Bruce', last: 'Wayne' }))
```

假设当需要不同域和规则来验证，能否编写一个通用函数在运行时确认

```js
// 对象验证规则
const schema = {
  first: {
    required: true,
  },
  last: {
    required: true,
  },
}

// 通用验证函数
const validate = (schema, values) => {
  for (field in schema) {
    if (schema[field].required) {
      if (!values[field]) {
        return false
      }
    }
  }
  return true
}

console.log(validate(schema, { first: 'Bruce' })) // false
console.log(validate(schema, { first: 'Bruce', last: 'Wayne' })) // true
```

## 双重非位运算简写

有一个有效用于双重非运算操作符。可以用来代替 Math.floor()，其优势在于运行更快

```js
Math.floor(4.9) === 4
```

简写

```js
~~4.9 === 4
```
