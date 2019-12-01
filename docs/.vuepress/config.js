module.exports = {
  title: "moke's blog",
  description: 'Write the code , Change the world',
  theme: 'reco',
  head: [
    [
      'meta',
      {
        name: 'viewport',
        content: 'width=device-width,initial-scale=1,user-scalable=no',
      },
    ],
  ],
  themeConfig: {
    type: 'blog',
    author: 'moke',
    sidebar: 'auto',
    startYear: '2017',
    themePicker: false,
    GAID: 'UA-110022311-1',
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
    docsDir: 'docs',
    editLinks: true,
    repo: 'sijianian',
    docsBranch: 'vuepress',
    lastUpdated: '最后更新时间',
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
    ['seo'],
    ['@vuepress/back-to-top'],
    ['vuepress-plugin-viewer'],
    require('./plugins/router'),
    ['vuepress-plugin-code-copy'],
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
          owner: 'sijianian',
          admin: ['sijianian'],
          distractionFreeMode: false,
          repo: 'sijianian.github.io',
          labels: ['Gitalk', 'Comment'],
          clientSecret: process.env.GITALK_SECRET || '',
          id:
            '<%- frontmatter.commentId || frontmatter.permalink || window.location.pathname %>',
          title: '「Comment」<%- frontmatter.title %>',
          body:
            '<%- frontmatter.title %>：<%-window.location.origin %><%- frontmatter.to.path || window.location.pathname %>',
          clientID: '7f4f5de62697a83f9e4a',
        },
      },
    ],
  ],
}
