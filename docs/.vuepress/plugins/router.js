const jsMd5 = require('js-md5')

module.exports = {
  extendPageData($page) {
    const { frontmatter = {}, lastUpdated = '' } = $page
    const { permalink } = frontmatter

    frontmatter.commentid = jsMd5(permalink || $page.path)
    frontmatter.date = frontmatter.date || new Date(lastUpdated)
  },
}
