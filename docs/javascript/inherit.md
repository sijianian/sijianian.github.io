---
title: 继承相关
---

## 组合继承

```js
function Parent(value) {
  this.value = value
}

Parent.prototype.getValue = function() {
  console.log(this.value)
}

function Child(value) {
  Parent.call(this, value)
}

Child.prototype = new Parent()

const child = new Child(1)
child.getValue()

console.log(child instanceof Parent)
```

## 组合寄生继承

```js
function Parent(value) {
  this.value = value
}

Parent.prototype.getValue = function() {
  console.log(this.value)
}

function Child(value) {
  Parent.call(this, value)
}

Child.prototype = Object.create(Parent.prototype)
Child.prototype.constructor = Child

const child = new Child(1)
child.getValue()

console.log(child instanceof Parent)
```

## ES6 继承

```js
class Parent {
  constructor(value) {
    this.val = value
  }

  getValue() {
    console.log(this.val)
  }
}

export class Child extends Parent {
  // eslint-disable-next-line no-useless-constructor
  constructor(value) {
    super(value)
  }
}
```
