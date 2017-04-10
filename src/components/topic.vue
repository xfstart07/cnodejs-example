<template>
  <div class="topic">
    <NvHead :page-type="pageType"
      :show-menu="showMenu"
      :fix-head="true"
      :need-add="true">
    </NvHead>

    <div id="page">
      <h2 class="topic-title" v-text="topic.title"></h2>
      <section class="markdown-body topic-content" v-html="topic.content"></section>
      <div class="replies">
        <div class="replies-count">
          <span>回复数: {{topic.reply_count}} </span>
        </div>
        <ul>
          <li v-for="reply in topic.replies" class="reply">
            <div class="reply-user">
              <img :src="reply.author.avatar_url" width="32" height="32">
              <span class="name">{{reply.author.loginname}}</span>
              <span class="create_at">&nbsp;* {{reply.create_at | getLastTimeStr}}</span>
            </div>
            <div class="reply-content clearfix" v-html="reply.content"></div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import NvHead from '@/components/nv-head';

  export default {
    data() {
      return {
        pageType: '主题',
        showMenu: false,
        topic: {},
        topicId: ''
      }
    },
    mounted() {
      this.topicId = this.$route.params.id;
      this.getTopic();
    },
    methods: {
      getTopic() {
        this.$http.get(`https://cnodejs.org/api/v1/topic/${this.topicId}`).then(response => {
          let result = response.data;
          if (result && result.data) {
            this.topic = result.data;
            console.log(this.topic);
            document.title = this.topic.title;
          }
        }).catch(response => {
          console.log(response);
        });
      }
    },
    filters: {
      getLastTimeStr(time) {
        return window.Timeago.format(time, 'zh_CN');
      }
    },
    components: {
      NvHead
    }
  }
</script>