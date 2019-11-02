const jsMd5 = require('js-md5')

module.exports = {
  extendPageData($page) {
    const { frontmatter = {}, lastUpdated = '' } = $page
    let { permalink = '', date = '' } = frontmatter

    frontmatter.commentId = jsMd5(permalink || $page.path)
    date = date || lastUpdated
    if (date) {
      frontmatter.date = new Date(date)
    }
  },
}
