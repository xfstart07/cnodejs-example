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
            <h3 class="topic-title" v-text="item.title"></h3>
            <div class="content">
              <img :src="item.author.avatar_url" alt="Avatar">
              <div class="info">
                <p>
                  <span class="name">{{item.author.loginname}}</span>
                  <span class="status" v-if="item.reply_count > 0">
                    <b>{{item.reply_count}}</b>/{{item.visit_count}}
                  </span>
                </p>
                <p>
                  <time>{{item.create_at | getLastTimeStr}}</time>
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
        scroll: true,
        topics: [],
        index: {},
        searchKey: {
          page: 1,
          limit: 20,
          tab: 'all',
          mdrender: true
        },
        searchDataStr: ''
      }
    },
    mounted() {
      if (this.$route.query && this.$route.query.tab) {
        this.searchKey.tab = this.$route.query.tab;
      }

      this.getTopics();
    },
    methods: {
      getTopics() {
        let params = $.param(this.searchKey);
        console.log(params);
        this.$http.get('https://cnodejs.org/api/v1/topics?' + params).then(response => {
          this.scroll = true;
          console.log(response.data.data);
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
        let str = '';
        const tabs = {
          share: '分享',
          ask: '问答',
          job: '招聘',
          good: '精华',
          all: '全部'
        }

        return tabs[tab];
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