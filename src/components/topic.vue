<template>
  <div class="topic">
    <h2 class="topic-title" v-text="topic.title"></h2>
    <section class="markdown-body topic-content" v-html="topic.content"></section>
  </div>
</template>
<script>
  export default {
    data() {
      return {
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
          }
        }).catch(response => {
          console.log(response);
        });
      }
    }
  }
</script>