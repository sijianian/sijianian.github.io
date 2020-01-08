---
title: Facebook 应用审核
date: 2019-05-14 14:30:05
sidebar: auto
tags:
  - 经验
  - Facebook
categories:
  - 博客
---

## 背景

[小满营销](https://crm.xiaoman.cn/marketing)有一个社交发件箱的功能，作用是整合几个社交平台，统一管理社交动态。

![](http://q3roqx7vi.bkt.clouddn.com/20190513151408.png)

由于 Facebook 平台 Api 机制的更新，[https://developers.facebook.com/docs/apps/review/](https://note.youdao.com/)，导致在小满营销中无法发布 Facebook 个人内容。

因此期望能够通过 Facebook “公共主页” 的形式来发布社交内容。

由于 Facebook 近来频频被爆出用户隐私暴露的问题，所以审核机制越来越严格。我们在申请和准备材料的过程中也是踩了不少坑，也解决了不少问题，所以对此做一份总结。如果后续有类似的问题，可能会有所帮助。

## 需要申请的权限

![](http://q3roqx7vi.bkt.clouddn.com/20190513152832.png)
![](http://q3roqx7vi.bkt.clouddn.com/20190513152910.png)

我们的申请操作主要在 [Facebook 开发者平台](https://note.youdao.com/) 进行。

我们需要实现的功能是管理用户的公共主页，和发布公共主页内容，所以需要申请的权限为 ==manage_pages== 和 ==publish_pages==。

可以看到，这两个权限最终都需要公司或者个人验证，以及额外签署合同。不难得出，Facebook 对这两个权限是非常的谨慎。因此我们也需要严格按照 Facebook 的规范来准备材料和申请。

## 审核标准

![](http://q3roqx7vi.bkt.clouddn.com/20190513154016.png)

Facebook 的审核标准其实写得很清晰，如果严格按照上面的标准，理论上都能够成功。

但是我们在这个过程中也多次失败，有一个很重要的原因是，没有遵守 [Facebook 品牌使用准则](https://developers.facebook.com/docs/facebook-login/userexperience/#buttondesign)。

具体的内容可以进入到 Facebook 品牌使用准则进行查看

这里需要留意的的是：

- Facebook 品牌的 logo

在我们自己的应用中，不要对 Facebook 的 logo 进行加工，或者调整。在我们申请的过程中，因为小满营销中 Facebook 的 logo 颜色改成了非 Facebook 品牌推荐的颜色，导致申请失败。

- 带有 Facebook logo 操作的一致性

由于小满营销，前期有绑定雅虎邮箱的功能（已下线），因此在这里，点击带有 Facebook logo 的按钮会跳转到雅虎邮箱登录页，这样也是不允许的。

- 用户需要明确知道，应用获取的是什么权限，作用是什么，用在什么地方。

这里我们的处理是，用户在绑定 Facebook 账号的过程中，会弹窗显示权限内容和作用。

![](http://q3roqx7vi.bkt.clouddn.com/20190513155801.png)

## 审核材料

![](http://q3roqx7vi.bkt.clouddn.com/20190513160315.png)

从上图中我们可以看到，我们需要准备的信息有：

- 说明如何使用此权限或者功能
  - 这里简单描述一下使用场景就好
- 展示平台如何使用这项权限或者功能（分步步骤）
  - 这部分很重要，因为审核团队会依据这里面所给的步骤和信息，进行审核
  - 因为语言环境不同，所以最好准备两个版本
  - 网站需要在美国地区能够正常登陆
  - 需要提供能够直接测试的账号
- 测试应用
  - 因为审核没有通过，所以我们是没有办法走通整个流程的
  - Facebook 提供了测试应用，我们可以用这个来进行模拟、测试和录屏
- 录屏文件
  - 包含内容
    - 用户如何使用 Facebook 登录
    - 用户如何查看应用对此权限的使用
  - 视频内容需要清晰可见
  - 使用测试应用来录屏

## 测试应用

### 创建测试应用

![](http://q3roqx7vi.bkt.clouddn.com/20190513163711.png)

### 管理员管理

![](http://q3roqx7vi.bkt.clouddn.com/20190513163813.png)

### 账号管理

![](http://q3roqx7vi.bkt.clouddn.com/20190513163856.png)

## 审核反馈

在申请审核后，等待 3 天左右，如果没有通过，就会得到一条审核反馈。

如果对审核的建议的内容不清楚的话，可以进行提问。

![](http://q3roqx7vi.bkt.clouddn.com/20190513164209.png)

但是因为 Facebook 工作人员反馈比较慢，所以建议还是不要依赖这个。

做好的做法是，在提交疑问的同时，回顾一下我们的审核材料，提高审核效率。

## 总结

- 参阅[提交准则](https://developers.facebook.com/docs/apps/review/submission-guidelines)，主要是 Facebook 官方要求执行的
- 查看[审核示例](https://developers.facebook.com/docs/apps/review/?translation)，可以查阅一些实例
- 可以结合我们总结的一些重点，提高审核效率
- 因为审核时间比较久，并且失败的几率还是挺高的，我们需要做的是，耐心等候审核完成
