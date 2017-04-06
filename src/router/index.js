import Vue from 'vue'
import Router from 'vue-router'
import Topics from '@/components/topics'
import Topic from '@/components/topic'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    component: Topics
  }, {
    path: '/topics',
    name: 'Topics',
    component: Topics
  }, {
    path: '/topics/:id',
    name: 'Topic',
    component: Topic
  }]
})
