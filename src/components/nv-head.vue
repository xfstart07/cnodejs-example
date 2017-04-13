<template>
  <div class="header">
    <div class="page-cover" v-if="show&&fixHead" @click="showMenus"></div>
    <header :class="{'show': show&&fixHead, 'fix-header': fixHead, 'no-fix': !fixHead}" id="hd">
      <div class="nv-toolbar">
        <div class="toolbar-nav" @click="openMenu" v-if="fixHead"></div>
        <span v-text="pageType"></span>
        <router-link to="/login" class="login-btn" v-if="!userInfo.loginname && this.$route.path !== '/login'">登录</router-link>
      </div>
    </header>
    <nvMenu :show-menu="show"
            :page-type="pageType"
            :nick-name="nickname"
            :profile-url="profileimgurl"
            v-if="fixHead"></nvMenu>
  </div>
</template>

<script>
  import $ from 'webpack-zepto'
  import Menu from '@/components/menu.vue'
  import { mapGetters } from 'vuex';

  export default {
    replace: true,
    props: {
      pageType: String,
      fixHead: Boolean,
      messageCount: Number,
      needAdd: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        nickname: '',
        profileimgurl: '',
        show: false,
        isShowLogin: false
      }
    },
    mounted() {
    },
    methods: {
      openMenu() {
        $('#page').addClass('scroll-hide');
        this.show = !this.show;;
      },
      showMenus() {
        $('#page').removeClass('scroll-hide');
        this.show = !this.show;;
      }
    },
    computed: {
      ...mapGetters({
        userInfo: 'getUserInfo'
      })
    },
    components: {
      'nvMenu': Menu
    }
  }
</script>
<style lang="scss">
  .login-btn {
    width: 50px;
  }
</style>