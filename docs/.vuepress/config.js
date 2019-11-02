module.exports = {
  title: "moke's blog",
  description: 'Write the code , Change the world',
  head: [
    [
      'meta',
      {
        name: 'viewport',
        content: 'width=device-width,initial-scale=1,user-scalable=no',
      },
    ],
  ],
  theme: 'reco',
  themeConfig: {
    author: 'moke',
    type: 'blog',
    themePicker: false,
    GAID: 'UA-110022311-1',
    sidebar: 'auto',
    blogConfig: {
      category: {
        location: 1,
        text: '分类',
      },
      tag: {
        location: 2,
        text: '标签',
      },
    },
    lastUpdated: '最后更新时间',
    repo: 'sijianian',
    docsDir: 'docs',
    docsBranch: 'vuepress',
    editLinks: true,
    editLinkText: '在 GitHub 上编辑此页',
    nav: [
      {
        text: '前端',
        items: [
          {
            text: '知识体系',
            link: '/docs/fe-system/',
          },
          {
            text: 'JavaScript 专题',
            link: '/javascript/',
          },
          {
            text: 'JavaScript 基础',
            link: '/docs/js-base/',
          },
          {
            text: 'JavaScript 进阶',
            link: '/docs/js-advance/',
          },
        ],
      },
      {
        text: '算法',
        items: [
          {
            text: '算法分类',
            link: '/algorithm/',
          },
          {
            text: 'leetcode',
            link: '/algorithm/leetcode',
          },
        ],
      },
      {
        text: 'TimeLine',
        link: '/timeLine/',
        icon: 'reco-date',
      },
    ],
  },
  plugins: [
    require('./plugins/router'),
    ['@vuepress/back-to-top'],
    ['vuepress-plugin-viewer'],
    ['@vuepress/active-header-links'],
    [
      'vuepress-plugin-baidu-tongji',
      {
        hm: '96aa37ccd951cae93b8933a2366c5470',
      },
    ],
    [
      '@vuepress/pwa',
      {
        serviceWorker: true,
        updatePopup: {
          message: '发现页面有新内容',
          buttonText: '刷新',
        },
      },
    ],
    [
      'vuepress-plugin-comment',
      {
        choosen: 'gitalk',
        options: {
          id:
            '<%- frontmatter.commentId || frontmatter.permalink || window.location.pathname %>',
          title: '「Comment」<%- frontmatter.title %>',
          body:
            '<%- frontmatter.title %>：<%-window.location.origin %><%- frontmatter.to.path || window.location.pathname %>',
          clientID: '7f4f5de62697a83f9e4a',
          clientSecret: process.env.GITALK_SECRET || '',
          repo: 'sijianian.github.io',
          owner: 'sijianian',
          admin: ['sijianian'],
          labels: ['Gitalk', 'Comment'],
          distractionFreeMode: false,
        },
      },
    ],
  ],
}
