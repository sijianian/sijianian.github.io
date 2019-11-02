module.exports = {
  locales: {
    '/': {
      lang: 'zh-CN',
      title: "moke's blog",
      description: 'Write the code , Change the world',
    },
  },
  markdown: {
    anchor: { permalink: true },
    toc: { includeLevel: [1, 2] },
  },
  themeConfig: {
    lastUpdated: '最后更新时间',
    repo: 'sijianian/sijianian.github.io',
    docsDir: 'docs',
    docsBranch: 'vuepress',
    editLinks: true,
    editLinkText: '在 GitHub 上编辑此页',
    nav: [
      {
        text: '最新',
        link: '/guide/',
      },
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
    ],
    sidebar: {
      '/javascript/': [
        '/javascript/',
        '/javascript/tool',
        '/javascript/manual-implementation-call-apply-bind',
        '/javascript/event-emitter',
        '/javascript/debounce-throttle',
        '/javascript/deep-shallow-clone',
        '/javascript/instanceof',
        '/javascript/new',
        '/javascript/promise',
        '/javascript/inherit',
        '/javascript/router',
        '/javascript/curry',
      ],
      '/algorithm/': [
        '/algorithm/',
        '/algorithm/complexity',
        '/algorithm/sort',
      ],
    },
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
    ['@vuepress/google-analytics', { ga: 'UA-110022311-1' }],
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
