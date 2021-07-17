(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{548:function(t,v,_){"use strict";_.r(v);var a=_(8),r=Object(a.a)({},(function(){var t=this,v=t.$createElement,_=t._self._c||v;return _("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[_("h2",{attrs:{id:"识别和模板"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#识别和模板"}},[t._v("#")]),t._v(" 识别和模板")]),t._v(" "),_("h3",{attrs:{id:"如何识别二分查找"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#如何识别二分查找"}},[t._v("#")]),t._v(" 如何识别二分查找")]),t._v(" "),_("p",[t._v("如前所熟，二分查找是一种在每次比较后将查找空间一分为二的算法。每次需要查找集合中的索引或元素时，都应该考虑二分查找。如果集合是无序的，我们可以总是在应用二分查找之前先对其进行排序。")]),t._v(" "),_("h3",{attrs:{id:"成功的二分查找的-3-个部分"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#成功的二分查找的-3-个部分"}},[t._v("#")]),t._v(" 成功的二分查找的 3 个部分")]),t._v(" "),_("ol",[_("li",[_("strong",[t._v("预处理")]),t._v("---如果集合未排序，则进行排序")]),t._v(" "),_("li",[_("strong",[t._v("二分查找")]),t._v("---使用循环或递归在每次比较后将查找空间划分为两半")]),t._v(" "),_("li",[_("strong",[t._v("后处理")]),t._v("---在剩余空间中确定可行的候选者")])]),t._v(" "),_("h2",{attrs:{id:"二分查找模板分析"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#二分查找模板分析"}},[t._v("#")]),t._v(" 二分查找模板分析")]),t._v(" "),_("p",[_("img",{attrs:{src:"https://i.loli.net/2020/03/21/uOGEPy7TiakxgZD.png",alt:""}})]),t._v(" "),_("p",[t._v("这三个模板的不同之处在于：")]),t._v(" "),_("ul",[_("li",[t._v("左、中、右索引的分配")]),t._v(" "),_("li",[t._v("循环或递归终止条件")]),t._v(" "),_("li",[t._v("后处理的必要性")])]),t._v(" "),_("h3",{attrs:{id:"模板-1-left-right"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#模板-1-left-right"}},[t._v("#")]),t._v(" 模板#1 "),_("code",[t._v("(left <= right>)")])]),t._v(" "),_("ul",[_("li",[t._v("二分查找的最基础和最基本的形式。")]),t._v(" "),_("li",[t._v("查找条件可以在不与元素的两侧进行比较的情况下确定（或使用它周围的特定元素）。")]),t._v(" "),_("li",[t._v("不需要后处理，因为每一步中，你都在检查是否找到了元素。如果到达末尾，则知道未找到该元素。")])]),t._v(" "),_("h3",{attrs:{id:"模板-2-left-right"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#模板-2-left-right"}},[t._v("#")]),t._v(" 模板#2 "),_("code",[t._v("(left < right>)")])]),t._v(" "),_("ul",[_("li",[t._v("一种实现二分查找的高级方法。")]),t._v(" "),_("li",[t._v("查找条件需要访问元素的直接右邻居。")]),t._v(" "),_("li",[t._v("使用元素的右邻居来确定是否满足条件，并决定是向左还是向右。")]),t._v(" "),_("li",[t._v("保证查找空间在每一步中至少有 2 个元素。")]),t._v(" "),_("li",[t._v("需要进行后处理。 当你剩下 1 个元素时，循环 / 递归结束。 需要评估剩余元素是否符合条件。")])]),t._v(" "),_("h3",{attrs:{id:"模板-3-left-1-right"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#模板-3-left-1-right"}},[t._v("#")]),t._v(" 模板#3 "),_("code",[t._v("(left + 1 < right>)")])]),t._v(" "),_("ul",[_("li",[t._v("实现二分查找的另一种方法。")]),t._v(" "),_("li",[t._v("搜索条件需要访问元素的直接左右邻居。")]),t._v(" "),_("li",[t._v("使用元素的邻居来确定它是向右还是向左。")]),t._v(" "),_("li",[t._v("保证查找空间在每个步骤中至少有 3 个元素。 -需要进行后处理。 当剩下 2 个元素时，循环 / 递归结束。 需要评估其余元素是否符合条件。")])]),t._v(" "),_("h2",{attrs:{id:"时间和空间复杂度"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#时间和空间复杂度"}},[t._v("#")]),t._v(" 时间和空间复杂度")]),t._v(" "),_("h3",{attrs:{id:"时间-o-log-n-算法时间"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#时间-o-log-n-算法时间"}},[t._v("#")]),t._v(" 时间 O(log n) --- 算法时间")]),t._v(" "),_("p",[t._v("因为二分查找是通过对查找空间中间的值应用一个条件来操作的，并因此将查找空间折半，在更糟糕的情况下，我们将不得不进行 "),_("code",[t._v("O(log n)")]),t._v(" 次比较，其中 n 是集合中元素的数目")]),t._v(" "),_("blockquote",[_("p",[t._v("为什么是 log n ？")])]),t._v(" "),_("ul",[_("li",[t._v("二分查找是通过将现有数组一分为二来执行的。")]),t._v(" "),_("li",[t._v("因此，每次调用子例程(或完成一次迭代)时，其大小都会减少到现有部分的一半。")]),t._v(" "),_("li",[t._v("首先 N 变成 N/2，然后又变成 N/4，然后继续下去，直到找到元素或尺寸变为 1。")]),t._v(" "),_("li",[t._v("迭代的最大次数是 log N (base 2) 。")])]),t._v(" "),_("h3",{attrs:{id:"空间-o-1-藏量空间"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#空间-o-1-藏量空间"}},[t._v("#")]),t._v(" 空间 "),_("code",[t._v("O(1)")]),t._v(" 藏量空间")]),t._v(" "),_("p",[t._v("虽然二分查找确实需要跟踪 3 个指标，但迭代解决方案通常不需要任何其他额外空间，并且可以直接应用于集合本身，因此需要 "),_("code",[t._v("O(1)")]),t._v(" 或常量空间。")])])}),[],!1,null,null,null);v.default=r.exports}}]);