<template>
  <div class="login-page">
    <nvHead page-type="登录"></nvHead>

    <section class="page-body">
      <div class="label">
        <input type="text" class="txt" placeholder="Access Token" v-model="token">
      </div>
      <div class="label">
        <a class="button" @click="login">登录</a>
      </div>
    </section>
  </div>
</template>

<script>
  import $ from 'webpack-zepto';
  import nvHead from '@/components/nv-head.vue';

  export default {
    data() {
      return {
        token: ''
      }
    },
    methods: {
      login() {
        if (this.token === '') {
          this.$alert("令牌错误");
          return false;
        }

        this.$http.post('https://cnodejs.org/api/v1/accesstoken', {
          accesstoken: this.token
        }).then(response => {
          console.log(response);
          const data = response.data;
          let user = {
            loginname: data.loginname,
            avatar_url: data.avatar_url,
            userId: data.id,
            token: this.token
          }

          window.sessionStorage.user = JSON.stringify(user);
          this.$store.dispatch('setUserInfo', user);

          this.$router.push({
              name: 'homePage'
            });
        }).catch(error => {
          console.log(error.response);
        });
      }
    },
    components: {
      nvHead
    }
  }
</script>
<style lang="scss">

.label {
  margin: 10px;
}

.page-body .label .txt{
  padding:12px 0;
  border:none;
  border-bottom:1px solid #4fc08d;
  background-color:transparent;
  width:100%;
  font-size:14px;
  color:#313131
}
.page-body .label .button{
  display:inline-block;
  width:99%;
  height:42px;
  line-height:42px;
  border-radius:3px;
  color:#fff;
  font-size:16px;
  background-color:#4fc08d;
  border:none;
  border-bottom:2px solid #3aa373;
  text-align:center;
  vertical-align:middle
}
</style>