<template>
  <section id="page">
    <ul class="posts-list">
      <li v-for="item in topics" :key="item.id">
        <router-link :to="{name: 'topic', params: {id: item.id}}"></router-link>
        <h3 v-text="item.title" :class="getTabInfo(item.tab, item.good, item.top, ture)"
          :title="getTabInfo(item.tab,item.good, item.top, false)"></h3>
      </li>
    </ul>
  </section>
</template>
<script>
  export default {
    data() {
      return {
        topics: [],
        searchKey: {
          page: 1
        }
      }
    }
  }
</script>