const jsMd5 = require('js-md5')
const routePfx = '/passages/'

module.exports = {
  extendPageData($page) {
    const { frontmatter } = $page

    if (!frontmatter || JSON.stringify(frontmatter) === '{}') {
      return
    }

    if (frontmatter.permalink) {
      frontmatter.permalink = `${routePfx}${frontmatter.permalink}`
    }

    frontmatter.commentid = frontmatter.permalink || jsMd5($page.path)
  },
}
