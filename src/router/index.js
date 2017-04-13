import Vue from 'vue'
import Router from 'vue-router'
import Topics from '@/components/topics'
import Topic from '@/components/topic'
import Login from '@/components/login'

//TODO READ

// scrollBehavior:
// - only available in html5 history mode
// - defaults to no scroll behavior
// - return false to prevent scroll
const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    // savedPosition is only available for popstate navigations.
    return savedPosition
  } else {
    const position = {}
    // new navigation.
    // scroll to anchor by returning the selector
    if (to.hash) {
      position.selector = to.hash
    }
    // check if any matched route config has meta that requires scrolling to top
    if (to.matched.some(m => m.meta.scrollToTop)) {
      // cords will be used if no selector is provided,
      // or if the selector didn't match any element.
      position.x = 0
      position.y = 0
    }
    // if the returned position is falsy or an empty object,
    // will retain current scroll position.
    return position
  }
};

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: __dirname,
  scrollBehavior,
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
    component: Topic,
    meta: {
      scrollToTop: true
    }
  }, {
    path: '/login',
    name: 'login',
    component: Login
  }]
})
