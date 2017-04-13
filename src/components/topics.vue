<template>
  <div class="topics">
    <NvHead :page-type="getTitleStr(searchKey.tab)"
      ref="head"
      :fix-head="true"
      :need-add="true">
    </NvHead>

    <section id="page">
      <ul class="posts-list">
        <li v-for="item in topics" :key="item.id">
          <router-link :to="{name: 'Topic', params: {id: item.id}}">
            <h3 class="topic-title">
            <span class="title-label" :class="getTitleLabelClass(item)" v-text="getTitleStr(item.tab)"></span>
            {{item.title}}</h3>
            <div class="content">
              <img :src="item.author.avatar_url" alt="Avatar">
              <div class="info">
                <p>
                  <span class="name">{{item.author.loginname}}</span>
                  <span class="status">
                    <b>{{item.reply_count || 0}}</b>/{{item.visit_count || 0}}
                  </span>
                </p>
                <p>
                  <time class="created_at">{{item.create_at | getLastTimeStr}}</time>
                  <time class="last_reply_at">{{item.last_reply_at | getLastTimeStr}}</time>
                </p>
              </div>
            </div>
          </router-link>
        </li>
      </ul>
    </section>
  </div>
</template>
<script>
  import $ from 'webpack-zepto';
  import NvHead from '@/components/nv-head';
  import Timeago from 'timeago.js';

  export default {
    data() {
      return {
        topics: [],
        index: {},
        busy: false,
        searchKey: {
          page: 1,
          limit: 20,
          tab: 'all',
          mdrender: true
        }
      }
    },
    mounted() {
      if (this.$route.query && this.$route.query.tab) {
        this.searchKey.tab = this.$route.query.tab;
      }

      this.getTopics();
    },
    created() {
      window.addEventListener('scroll', this.getLoadMore);
    },
    destroyed() {
      window.removeEventListener('scroll', this.getLoadMore);
    },
    methods: {
      getTopics() {
        let params = $.param(this.searchKey);
        console.log(params);
        this.busy = true;

        this.$http.get('https://cnodejs.org/api/v1/topics?' + params).then(response => {
          this.busy = false;
          console.log(response.data);
          if (response && response.data) {
            response.data.data.forEach(this.mergeTopics);
          }
        }).catch(response => {
          console.log(response);
        });
      },
      mergeTopics(topic) {
        if (typeof this.index[topic.id] === 'number') {
          const topicsIndex = this.index[topic.id];
          this.topics[topicsIndex] = topic;
        } else {
          this.index[topic.id] = this.topics.length;
          this.topics.push(topic);
        }
      },
      getTitleStr(tab) {
        const tabs = {
          share: '分享',
          ask: '问答',
          job: '招聘',
          good: '精华',
          all: '全部'
        }

        return tabs[tab];
      },
      getTitleLabelClass(item) {
        return item.top ? 'top' : item.tab;
      },
      getLoadMore() {
        //Fixme 返回时无法滚动到之前点击进入的位置
        console.log("document height" + $(document).height()); //document.documentElement.scrollHeight
        console.log("window height" + $(window).height());   // window.innerHeight
        console.log("window scroll Top" + $(window).scrollTop()); // window.pageYOffset

        if (this.busy === false) {
          if ($(window).scrollTop() + $(window).height() + 20 >= $(document).height()) {
            this.searchKey.page = this.searchKey.page + 1;
            setTimeout(this.getTopics(), 2000);
          }
        }
      }
    },
    filters: {
      getLastTimeStr(time) {
        return window.Timeago.format(time, 'zh_CN');
      }
    },
    watch: {
      '$route' (to, from) {
          if (to.query && to.query.tab) {
            this.searchKey.tab = to.query.tab;
            this.topics = [];
            this.index = {};
          }
          this.searchKey.page = 1;
          this.getTopics();

          //隐藏导航栏
          this.$refs.head.show = false;
      }
    },
    components: {
      NvHead
    }
  }
</script>
<style lang="scss">
  span.name, time.created_at{
    float: left;
    margin-left: 10px;
  }
  .title-label {
    &.top,&.good {
      background: #80bd01;
    }
    padding: 2px 4px;
    color: #fff;
    font-size: 12px;
  }
  .title-label {
    &.ask,&.share,&.job {
      background: #e5e5e5;
    }
  }
</style>