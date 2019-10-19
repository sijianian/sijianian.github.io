const jsMd5 = require('js-md5')

module.exports = {
  extendPageData($page) {
    const { frontmatter = {} } = $page
    const { permalink } = frontmatter

    frontmatter.commentid = jsMd5(permalink || $page.path)
  },
}
