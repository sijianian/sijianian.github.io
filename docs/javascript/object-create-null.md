---
title: 简析 Object.create(null)
date: 2019-05-21 14:15:47
tags:
  - JavaScript
categories: JavaScript
---

## 前言

在阅读 Vue 和 Vuex 的源码中，我们会发现，作者都使用了 **Object.create(null)** 来初始化一个新的对象。

作为 ES5 继承中更优解的**组合寄生继承**中，也同样用 **Object.create(prototype)** 来处理原型链。

那么问题来了，我们为什么不用更加简洁的 **{}** 呢？

通过自己查找一些资料，总结在这里，温故知新。

## 定义

首先，我们先照搬 MDN 上的定义:

[Object.create](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create)

```js
Object.create(proto, [propertiesObject])
```

- proto: 新创建对象的原型对象
- propertiesObject: 可选。要添加到新对象的可枚举（新添加的属性是其自身的属性，而不是其原型链上的）属性

eg:

```js
const car = {
  isSportsCar: false,
  introduction: function() {
    console.log(`Hi girl, this is a ${this.name}.
    Do you like to have a drink with me ? ${this.isSportsCar}`)
  },
}

const porsche = Object.create(car, {
  //color成为porsche的数据属性
  //颜色不喜欢，可以改色或贴膜，所以可修改
  color: {
    writable: true,
    configurable: true,
    value: 'yellow',
  },
  //type成为porsche的访问器属性
  type: {
    // writable、configurable等属性，不显式设置则默认为false
    // 想把普通车改成敞篷，成本有点大了，所以就设成不可配置吧
    get: function() {
      return 'convertible'
    },
    set: function(value) {
      'change this car to', value
    },
  },
})

porsche.name = 'Porsche 911' // "name"是"porsche"的属性, 而不是"car"的
porsche.isSportsCar = true // 继承的属性可以被覆写

porsche.introduction()
// expected output: "Hi girl, this is a Porsche 911. Do you like to have a drink with me ? true"
```

其实很简单，只要过一下上面的例子，我们就能掌握了。

## Object.create()、{...} 的区别

先看看我们经常使用的 {} 创建的对象那个是什么样子的：

```js
let a = { b: 1 }

console.log(a)
```

在 chrome 控制台打印如下

![](https://static.skynian.cn/20190521143355.png)

从上图中可以看到，新创建的对象继承了 **Object** 自身的方法，如 **hasOwnProperty**、**toString** 等，在新对象上面可以直接使用。

再看看使用 **Object.create()** 创建对象

```js
let o = Object.create(null, {
  a: {
    writable: true,
    configurable: true,
    value: '1',
  },
})
console.log(o)
```

![](https://static.skynian.cn/20190521143632.png)

可以看到，新创建的对象除了自身属性 a 之外，原型链上没有任何属性，也就是没有继承 Object 的任何东西，此时如果我们调用 o.toString()会报 Uncaught TypeError 的错误。

大家可能会注意到，第一个参数使用了 null。也就是说将 null 设置成了新创建对象的原型，自然就不会有原型链上的属性。我们再把上面的例子改一改：

```js
let o = Object.create(
  {},
  {
    a: {
      writable: true,
      configurable: true,
      value: '1',
    },
  }
)
console.log(o)
```

![](https://static.skynian.cn/20190521143801.png)

我们看到，这样创建的对象和使用{}创建对象已经很相近了，但是还是有一点区别：多了一层 proto 嵌套。

我们最后再来改一下：

```js
let o = Object.create(Object.prototype, {
  a: {
    writable: true,
    configurable: true,
    value: '1',
  },
})
console.log(o)
```

![](https://static.skynian.cn/20190521143843.png)

这次就和使用{}创建的对象一模一样了。至此，我相信大家已经对两者的区别十分清楚了。

## Object.create(null)的使用场景

再回到文章开头的问题，为什么很多源码作者会使用 Object.create(null)来初始化一个新对象呢？这是作者的习惯，还是一个最佳实践？

其实都不是，这并不是作者不经思考随便用的，也不是 javascript 编程中的最佳实践，而是需要因地制宜，具体问题具体分析。

我们进一步比较一下 Object.create(null)和{}创建控对象的区别：

在 chrome 打印如下：

![](https://static.skynian.cn/20190521143946.png)

从上图可以看到，使用 create 创建的对象，没有任何属性，显示 No properties，我们可以把它当作一个非常纯净的 map 来使用，我们可以自己定义 hasOwnProperty、toString 方法，不管是有意还是不小心，我们完全不必担心会将原型链上的同名方法覆盖掉。举个例子：

```js
//Demo1:
let a= {...省略很多属性和方法...};
//如果想要检查a是否存在一个名为toString的属性，你必须像下面这样进行检查：
if(Object.prototype.hasOwnProperty.call(a,'toString')){
    ...
}
//为什么不能直接用a.hasOwnProperty('toString')?因为你可能给a添加了一个自定义的hasOwnProperty
//你无法使用下面这种方式来进行判断,因为原型上的toString方法是存在的：
if(a.toString){}

//Demo2:
let a=Object.create(null)
//你可以直接使用下面这种方式判断，因为存在的属性，都将定义在a上面，除非手动指定原型：
if(a.toString){}
```

另一个使用 create(null)的理由是，在我们使用 for..in 循环的时候会遍历对象原型链上的属性，使用 create(null)就不必再对属性进行检查了，当然，我们也可以直接使用 Object.keys[]。

## 总结 🆙

- 你需要一个非常干净且高度可定制的对象当作数据字典的时候
- 想节省 hasOwnProperty 带来的一丢丢性能损失并且可以偷懒少些一点代码的时候
- 组合寄生继承的时候

用 Object.create(null)吧！其他时候，请用{}。
