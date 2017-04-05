import Vue from 'vue'
import Router from 'vue-router'
import Topics from '@/components/topics'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    component: Topics
  }, {
    path: '/topics',
    name: 'Topics',
    component: Topics
  }]
})
