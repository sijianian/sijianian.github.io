const router = require('../plugins/router')

module.exports = [
  router,
  ['seo'],
  ['vuepress-plugin-viewer'],
  ['vuepress-plugin-code-copy'],
  ['@vuepress/active-header-links'],
  [
    'vuepress-plugin-baidu-tongji',
    {
      hm: '22b23eb5d33d6f77e51d576fe375f632',
    },
  ],
  [
    '@vuepress/pwa',
    {
      serviceWorker: false,
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
]
