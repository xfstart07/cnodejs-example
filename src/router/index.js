import Vue from 'vue'
import Router from 'vue-router'
import Topics from '@/components/topics'
import Topic from '@/components/topic'
import Login from '@/components/login'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'homePage',
    component: Topics
  }, {
    path: '/topics',
    name: 'Topics',
    component: Topics
  }, {
    path: '/topics/:id',
    name: 'Topic',
    component: Topic
  }, {
    path: '/login',
    name: 'login',
    component: Login
  }]
})
