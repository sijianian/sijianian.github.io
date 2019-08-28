module.exports = {
  locales: {
    '/': {
      lang: 'zh-CN',
      title: "moke's blog",
      description: 'Write the code , Change the world',
    },
  },
  themeConfig: {
    sidebar: 'auto',
    lastUpdated: '最后更新时间',
    nav: [
      {
        text: '最新',
        link: '/guide/',
      },
      {
        text: 'Github',
        link: 'https://github.com/sijianian',
      },
    ],
  },
  plugins: [
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
          id: '<%- frontmatter.commentid || frontmatter.permalink %>',
          title: '「Comment」<%- frontmatter.title %>',
          body:
            '<%- frontmatter.title %>：<%-window.location.origin %><%- frontmatter.to.path || window.location.pathname %>',
          clientID: '7f4f5de62697a83f9e4a',
          clientSecret: process.env.GITALK_SECRET || '',
          repo: 'blog',
          owner: 'sijianian',
          admin: [
            'sijianian',
          ],
          distractionFreeMode: false,
        },
      },
    ],
  ],
}
