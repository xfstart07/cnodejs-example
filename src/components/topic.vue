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
            document.title = this.topic.title;
          }
        }).catch(response => {
          console.log(response);
        });
      }
    },
    components: {
      NvHead
    }
  }
</script>