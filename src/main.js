// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import Timeago from 'timeago.js'
import Alert from './libs/alert';
import '@/assets/stylesheets/app.scss';

Vue.config.productionTip = false
Vue.prototype.$http = axios;
Vue.use(Alert);

window.Timeago = new Timeago();

// 处理刷新的时候vuex被清空但是用户已经登录的情况
if (window.sessionStorage.user) {
  store.dispatch('setUserInfo', JSON.parse(window.sessionStorage.user));
}

/* eslint-disable no-new */
let app = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
