<template>
  <div class="user-info">
    <ul class="login-no" v-if="!userInfo.loginname">
      <li class="login" @click="goEnter"><a>登录</a></li>
    </ul>
    <div class="login-yes" v-if="userInfo.loginname">
      <div class="avatar">
        <img :src="userInfo.avatar_url" v-if="userInfo.avatar_url" alt="Avatar">
      </div>
      <div class="info">
        <p v-text="userInfo.loginname"></p>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex';

  export default {
    replace: true,
    computed: {
      ...mapGetters({
        userInfo: 'getUserInfo'
      })
    },
    methods: {
      goEnter() {
        this.$router.push({
          name: 'login'
        })
      }
    }
  }
</script>

