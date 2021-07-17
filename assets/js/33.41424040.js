(window.webpackJsonp=window.webpackJsonp||[]).push([[33],{596:function(t,a,s){"use strict";s.r(a);var n=s(8),e=Object(n.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("p",[t._v("最近一直在回溯自己的的前端知识体系，发现，工作一段时间后，再去回顾之前的知识，体会真的不一样。")]),t._v(" "),s("p",[t._v("这次就简单了解一下 JavaScript 中的内存管理，涉及到了闭包，内存泄漏等前端常见问题。")]),t._v(" "),s("h2",{attrs:{id:"写在前面"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#写在前面"}},[t._v("#")]),t._v(" 写在前面")]),t._v(" "),s("p",[t._v("JavaScript 中的内存管理，给我的感觉可能一种偏科。我们平时可能不太重视，但是一旦出了问题，又会很棘手。其次，项目优化的时候也避免不了要踩坑。")]),t._v(" "),s("p",[t._v("可以通过多了解一些内存管理问题，写代码的时候通过一些习惯，避免内存泄漏的问题。在项目 pr 流程中，也可以根据此给同事提供一些意见。")]),t._v(" "),s("h2",{attrs:{id:"内存生命周期"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#内存生命周期"}},[t._v("#")]),t._v(" 内存生命周期")]),t._v(" "),s("p",[s("img",{attrs:{src:"https://i.loli.net/2020/01/12/13zdJxKqwSupO5V.png",alt:""}})]),t._v(" "),s("p",[t._v("上图的流程是：")]),t._v(" "),s("ol",[s("li",[t._v("分配所需的内存")]),t._v(" "),s("li",[t._v("使用分配到的内存（读、写）")]),t._v(" "),s("li",[t._v("不需要时候释放/归还")])]),t._v(" "),s("p",[t._v("在 C 语言中，有专门的内存管理接口，像 malloc() 和 free()，而在 JS 中有着一个自动的垃圾回收机制。")]),t._v(" "),s("h2",{attrs:{id:"javascript-中的内存回收-gc-garbage-collecation"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#javascript-中的内存回收-gc-garbage-collecation"}},[t._v("#")]),t._v(" JavaScript 中的内存回收 (GC:Garbage Collecation)")]),t._v(" "),s("h3",{attrs:{id:"引用计数垃圾收集"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#引用计数垃圾收集"}},[t._v("#")]),t._v(" \b 引用计数垃圾收集")]),t._v(" "),s("p",[t._v("引用计数的含义是跟踪记录每个值被引用的次数，当声明了一个变量并将一个引用类型赋值给该变量时，则这个值的引用次数就是 1 。相反，如果包含 \b 对这个值的变量又取得了另外一个值，则这个值的引用册数就减 1 。")]),t._v(" "),s("p",[t._v("当这个引用次数变成 0 时，则说明没有办法再访问这个值了，因而就可以将其所占的内存空间给收回来。这样，垃圾收集器下次再运行时，它就会释放那些引用次数为 0 的值所占的内存。")]),t._v(" "),s("p",[t._v("但是这个是存在问题的：")]),t._v(" "),s("p",[t._v("eg：")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("problem")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" objA "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Object")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" objB "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Object")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n  objA"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("someOtherObject "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" objB\n  objb"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("anotherObject "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" objA\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[t._v("在这个例子中，objA 和 objB 通过各自的属性相互引用；也就是说这两个对象的引用次数都是 2。在采用引用计数的策略中，由于函数执行之后，这两个对象都离开了作用域，函数执行完成之后，objA 和 objB 还将会继续存在，因为他们的引用次数永远不会是 0。这样的相互引用如果说很大量的存在就会导致大量的内存泄露。")]),t._v(" "),s("p",[t._v("我们知道，IE 中有一部分对象并不是原生 JavaScript 对象。例如，其 BOM 和 DOM 中的对象就是使用 C++ 以 COM（Component Object\nModel，组件对象）对象的形式实现的，而 COM 对象的垃圾回收器就是采用的引用计数的策略。因此，即使 IE 的 Javascript 引擎使用标记清除的策略来实现的，但 JavaScript 访问的 COM 对象依然是基于引用计数的策略的。说白了，只要 IE 中涉及 COM 对象，就会存在循环引用的问题。看看下面的这个简单的例子：")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" element "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" document"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("getElementById")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'some_element'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" myObj "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Object")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\nmyObj"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("element "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" element\nelement"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("someObject "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" myObj\n")])])]),s("p",[t._v("上面这个例子中，在一个 DOM 元素 (element) 与一个原生 JavaScript 对象(myObj)之间建立了循环引用。其中，变量 myObj 有一个名为 element 的属性指向 element ；而变量 element 有一个名为 someObject 的属性回指到 myObj。由于循环引用，即使将例子中的 DOM 从页面中移除，内存也永远不会回收。")]),t._v(" "),s("p",[t._v("不过上面的问题也不是不能解决，我们可以手动切断他们的循环引用。")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[t._v("myObj"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("element "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),t._v("\nelement"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("someObject "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),t._v("\n")])])]),s("p",[t._v("IE 6, 7 使用引用计数方式对 DOM 对象进行垃圾回收. 该方式常常造成对象被循环引用时内存发生泄漏. 现代浏览器通过使用标记-清除内存回收算法, 来解决这一问题。")]),t._v(" "),s("h3",{attrs:{id:"标记-清除算法"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#标记-清除算法"}},[t._v("#")]),t._v(" 标记-清除算法")]),t._v(" "),s("p",[t._v('这个算法把"对象是否不再需要"简化定义为"对象是否可以获得"。这个算法假定设置一个叫做根 root 的对象（在 Javascript 里，根是全局对象。定期的, 垃圾回收器将从根开始, 找所有从根开始引用的对象, 然后找这些对象引用的对象, 从根开始,垃圾回收器将找到所有可以获得的对象和所有不能获得的对象。')]),t._v(" "),s("p",[t._v("从 2012 年起, 所有现代浏览器都使用了标记-清除内存回收算法. 所有对 JavaScript 垃圾回收算法的改进都是基于标记-清除算法的改进。")]),t._v(" "),s("p",[t._v("到目前为止，IE、Firefox、Opera、Chrome、Safari 的 js 实现使用的都是标记清除的垃圾回收策略或类似的策略，只不过垃圾收集的时间间隔互不相同。")]),t._v(" "),s("p",[s("img",{attrs:{src:"https://i.loli.net/2020/01/12/YRUdnEPXLF5r8Qq.png",alt:""}})]),t._v(" "),s("h2",{attrs:{id:"自动-gc-的问题"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#自动-gc-的问题"}},[t._v("#")]),t._v(" 自动 GC 的问题")]),t._v(" "),s("p",[t._v("尽管自动 GC 很方便, 但是我们不知道 GC 什么时候会进行. 这意味着如果我们在使用过程中使用了大量的内存, 而 GC 没有运行的情况下, 或者 GC 无法回收这些内存的情况下, 程序就有可能假死, 这个就需要我们在程序中手动做一些操作来触发内存回收。")]),t._v(" "),s("h2",{attrs:{id:"常见的内存泄露案例"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#常见的内存泄露案例"}},[t._v("#")]),t._v(" 常见的内存泄露案例")]),t._v(" "),s("h3",{attrs:{id:"全局变量"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#全局变量"}},[t._v("#")]),t._v(" 全局变量")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("foo")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("arg")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  bar "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'some text'")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[t._v("在 JS 中处理未被声明的变量, 上述范例中的 bar 时, 会把 bar , 定义到全局对象中, 在浏览器中就是 window 上. 在页面中的全局变量, 只有当页面被关闭后才会被销毁.")]),t._v(" "),s("p",[t._v("所以这种写法就会造成内存泄露, 当然在这个例子中泄露的只是一个简单的字符串, 但是在实际的代码中, 往往情况会更加糟糕. 另外一种意外创建全局变量的情况。")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("foo")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("var1 "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'potential accidental global'")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Foo 被调用时, this 指向全局变量(window)")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("foo")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),s("p",[t._v("在这种情况下调用 foo, this 被指向了全局变量 window, 意外的创建了全局变量. 我们谈到了一些意外情况下定义的全局变量, 代码中也有一些我们明确定义的全局变量.")]),t._v(" "),s("p",[t._v("如果使用这些全局变量用来暂存大量的数据, 记得在使用后, 对其重新赋值为 null.")]),t._v(" "),s("h3",{attrs:{id:"未销毁的定时器和回调函数"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#未销毁的定时器和回调函数"}},[t._v("#")]),t._v(" 未销毁的定时器和回调函数")]),t._v(" "),s("p",[t._v("在很多库中, 如果使用了观察着模式, 都会提供回调方法, 来调用一些回调函数. 要记得回收这些回调函数. 举一个 setInterval 的例子.")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" serverData "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("loadData")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("setInterval")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" renderer "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" document"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("getElementById")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'renderer'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("renderer"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    renderer"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("innerHTML "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token constant"}},[t._v("JSON")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("stringify")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("serverData"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("5000")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 每 5 秒调用一次")]),t._v("\n")])])]),s("p",[t._v("如果后续 renderer 元素被移除, 整个定时器实际上没有任何作用. 但如果你没有回收定时器, 整个定时器依然有效, 不但定时器无法被内存回收, 定时器函数中的依赖也无法回收. 在这个案例中的 serverData 也无法被回收.")]),t._v(" "),s("h2",{attrs:{id:"闭包"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#闭包"}},[t._v("#")]),t._v(" 闭包")]),t._v(" "),s("p",[t._v("在 JS 开发中, 我们会经常用到闭包, 一个内部函数, 有权访问包含其的外部函数中的变量. 下面这种情况下, 闭包也会造成内存泄露.")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" theThing "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("replaceThing")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" originalThing "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" theThing\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("unused")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("originalThing"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 对于 'originalThing'的引用")]),t._v("\n      console"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'hi'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  theThing "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    longStr"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Array")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1000000")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("join")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'*'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("someMethod")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      console"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'message'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("setInterval")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("replaceThing"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1000")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),s("p",[t._v("这段代码, 每次调用 replaceThing 时, theThing 获得了包含一个巨大的数组和一个对于新闭包 someMethod 的对象. 同时 unused 是一个引用了 originalThing 的闭包.")]),t._v(" "),s("p",[t._v("这个范例的关键在于, 闭包之间是共享作用域的, 尽管 unused 可能一直没有被调用, 但是 someMethod 可能会被调用, 就会导致内存无法对其进行回收. 当这段代码被反复执行时, 内存会持续增长. 该问题的更多描述可见"),s("a",{attrs:{href:"https://blog.meteor.com/an-interesting-kind-of-javascript-memory-leak-8b47d2e7f156?gi=a92ddcd69bbf",target:"_blank",rel:"noopener noreferrer"}},[t._v("Meteor 团队的这篇文章"),s("OutboundLink")],1),t._v("\b。")]),t._v(" "),s("h3",{attrs:{id:"dom-引用"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#dom-引用"}},[t._v("#")]),t._v(" DOM 引用")]),t._v(" "),s("p",[t._v("很多时候, 我们对 Dom 的操作, 会把 Dom 的引用保存在一个数组或者 Map 中.")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" elements "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  image"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" document"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("getElementById")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'image'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("doStuff")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  elements"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("image"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("src "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'http://example.com/image_name.png'")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("removeImage")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  document"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("body"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("removeChild")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("document"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("getElementById")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'image'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 这个时候我们对于 #image 仍然有一个引用, Image 元素, 仍然无法被内存回收.")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[t._v("上述案例中, 即使我们对于 image 元素进行了移除, 但是仍然有对 image 元素的引用, 依然无法对齐进行内存回收.")]),t._v(" "),s("p",[t._v("另外需要注意的一个点是, 对于一个 Dom 树的叶子节点的引用. 举个例子: 如果我们引用了一个表格中的 td 元素, 一旦在 Dom 中删除了整个表格, 我们直观的觉得内存回收应该回收除了被引用的 td 外的其他元素. 但是事实上, 这个 td 元素是整个表格的一个子元素, 并保留对于其父元素的引用. 这就会导致对于整个表格, 都无法进行内存回收. 所以我们要小心处理对于 Dom 元素的引用.")]),t._v(" "),s("h3",{attrs:{id:"es6"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#es6"}},[t._v("#")]),t._v(" ES6")]),t._v(" "),s("p",[t._v("ES6 中引入 WeakSet 和 WeakMap 两个新的概念, 来解决引用造成的内存回收问题. WeakSet 和 WeakMap 对于值的引用可以忽略不计, 他们对于值的引用是弱引用,内存回收机制, 不会考虑这种引用. 当其他引用被消除后, 引用就会从内存中被释放.")]),t._v(" "),s("h2",{attrs:{id:"总结"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#总结"}},[t._v("#")]),t._v(" 总结")]),t._v(" "),s("p",[t._v("在 Javascript 中，彻底避免垃圾回收是非常困难的。垃圾回收机制与实时软件（例如：游戏）的实时性要求，从根本上就是对立的。")]),t._v(" "),s("p",[t._v("但是，为了减少内存垃圾，我们还是可以对 Javascript 代码进行彻底检查，有些代码中存在明显的产生过多内存垃圾的问题代码，这些正是我们需要检查并且完善的。")]),t._v(" "),s("p",[t._v("我认为，只要我们投入更多的精力和关注，实现实时的、低垃圾收集的 Javascript 应用还是很有可能的。毕竟，对于可交互性要求较高的游戏或应用来说，实时性和低垃圾收集，两者都是至关重要。")]),t._v(" "),s("h2",{attrs:{id:"参考-😬"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#参考-😬"}},[t._v("#")]),t._v(" 参考 😬")]),t._v(" "),s("p",[s("a",{attrs:{href:"http://www.cnblogs.com/hustskyking/archive/2013/04/27/garbage-collection.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("Barret Lee JavaScript 垃圾回收机制"),s("OutboundLink")],1)]),t._v(" "),s("p",[s("a",{attrs:{href:"http://www.ruanyifeng.com/blog/2017/04/memory-leak.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("阮一峰 JavaScript 内存泄漏教程"),s("OutboundLink")],1)])])}),[],!1,null,null,null);a.default=e.exports}}]);