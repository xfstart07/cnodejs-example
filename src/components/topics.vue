<template>
  <section id="page">
    <ul class="posts-list">
      <li v-for="item in topics" :key="item.id">
          <h3 v-text="item.title"></h3>
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
                <time>{{item.create_at}}</time>
                <time>{{item.last_reply_at}}</time>
              </p>
            </div>
          </div>
      </li>
    </ul>
  </section>
</template>
<script>
  import $ from 'webpack-zepto';
  import '@/assets/stylesheets/app.scss';

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
      }
    }
  }
</script>