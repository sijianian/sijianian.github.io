<template>
  <div class="ui-recent-update">
    <div class="list-wrap">
      <div class="list-item" v-for="(item, index) of realPosts" :key="index">
        <a :href="item.path">{{ item.title }}</a>
        <span>{{ item.formatDay }}</span>
      </div>
    </div>

    <div class="load-more-wrap" v-if="btnVisible">
      <div class="load-more-btn" @click="handleLoadMore">加载更多</div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'

const LOAD_MORE_TEXT = '加载更多'
const LOAD_COMPLETE = '加载完成'

const FILTER_LIST = ['/', '/guide.html']

export default {
  data() {
    return {
      posts: [],
      step: 15,
      page: 1,
      num: 0,
      btnText: LOAD_MORE_TEXT,
      btnVisible: true,
      timeout: null,
    }
  },
  mounted() {
    this.posts = this.$site.pages
    this.num = this.posts.length
  },
  computed: {
    realPosts() {
      return this.getTopPosts(this.page * this.step)
    },
  },
  methods: {
    getTopPosts(num) {
      const re = /.*\/(.*?)\.(html|md)/

      return this.posts
        .filter(({ path }) => !FILTER_LIST.includes(path))
        .map(post => {
          const execs = re.exec(post.relativePath)
          return {
            ...post,
            updateTimestamp: new Date(post.lastUpdated).getTime(),
            formatDay: dayjs(post.lastUpdated).format('YYYY-MM-DD'),
            filename: execs ? execs['1'] : '',
          }
        })
        .sort((a, b) => b.updateTimestamp - a.updateTimestamp)
        .sort((a, b) => a.path.indexOf('javascript') || b.path.indexOf('javascript'))
        .slice(0, num)
    },
    handleLoadMore() {
      if (this.timeout) {
        return
      }

      if (this.page * this.step >= this.num) {
        this.btnText = LOAD_COMPLETE
        this.timeout = setTimeout(() => {
          this.btnVisible = false
        }, 300)
      } else {
        this.page += 1
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.ui-recent-update {
  margin-top: 30px 0;
  .list-wrap {
    .list-item {
      position: relative;
      display: inline-flex;
      width: 100%;
      line-height: 2;

      align-items: center;
      justify-content: space-between;
      &::after {
        position: absolute;
        top: 50%;
        right: 0;
        width: 100%;
        content: ' ';
        border-bottom: 1px dashed #aaa;
      }
      a,
      span {
        z-index: 1;
        background: white;
      }
      a {
        max-width: 50%;
        padding-right: 20px;
      }
      span {
        padding-left: 20px;
        color: #aaa;
      }
    }
  }
  .load-more-wrap {
    margin: 30px 0;
    text-align: center;

    .load-more-btn {
      display: inline-block;
      box-sizing: border-box;
      padding: 0.6rem 1.2rem;
      color: #fff;
      background-color: #3eaf7c;
      border-bottom: 1px solid #389d70;
      border-radius: 4px;
      transition: all 0.3s ease;
      &:hover {
        cursor: pointer;
        background-color: #4abf8a;
      }
    }
  }
}
</style>
