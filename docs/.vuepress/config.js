const nav = require('./config/nav')
const head = require('./config/head')
const plugins = require('./config/plugins')
const sidebar = require('./config/sidebar')
const themeConfig = require('./config/theme-config')

module.exports = {
  theme: 'reco',
  title: "moke's blog",
  description: 'Write the code , Change the world',
  themeConfig: {
    ...nav,
    ...sidebar,
    ...themeConfig,
  },
  head,
  plugins,
}
