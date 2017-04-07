// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Timeago from 'timeago.js'
import '@/assets/stylesheets/app.scss';

Vue.config.productionTip = false
Vue.prototype.$http = axios;

window.Timeago = new Timeago();

/* eslint-disable no-new */
let app = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})
