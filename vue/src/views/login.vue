<template>
  <div class="login">
    <div class="login-container">
      <h1>登录</h1>
      <div class="login-form">
        <van-cell-group>
          <van-field
            v-model="loginForm.username"
            required
            clearable
            label="用户名"
            right-icon="question-o"
            placeholder="请输入用户名"
            @click-right-icon="$toast('点你妹~')"
          />
          <van-field
            v-model="loginForm.password"
            type="password"
            label="密码"
            placeholder="请输入密码"
            required
          />
          <div class="login-btn">
            <van-button type="info" @click.stop="login">登录</van-button>
            <van-button type="info">注册</van-button>
          </div>
        </van-cell-group>
      </div>  
    </div>  
  </div>
</template>
<script>
// import {userLogin} from '@/api/login.js';
import {GET, POST } from '@/common/axios.js';
// import axios from 'axios';
// axios.defaults.headers["Content-Type"] = "application/json"
export default {
    data(){
        return {
            loginForm: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        login(){
            let {username, password} = this.loginForm;
            if(username.trim() && password.trim()) {
                let options = {
                    url: '/apis/user/login',
                    method: 'post',
                    data: {
                        username,
                        password
                    }
                };
                POST(options).then(res => {
                    console.log('1234567890', res)
                    if(res.data.code == 200) {
                        Cookies.set('token', res.data.token)
                        this.$router.push('index')
                        console.log('请求成功', res)
                    } else {
                        console.log('请求失败', res)
                    }
                }).catch(err => {
                    console.log('走err1234567890', err)
                })
            }
        }
    },
    created(){
       GET({
           url: '/apis/users',
           method: 'get',
           params: {}
       }).then(res => {
           console.log('结果', res)
       }).catch(err => {
           console.log('失败', err)
       })
    }
}

</script>
<style scoped lang="scss">

.login{
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: url('../assets/images/login-bg.jpg') no-repeat;
  background-size: cover;
  &-container{
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translate(-50%, 0);
    width: 100%;
    padding: 20px 0;
    background: #fff;
  }
  &-btn{
    padding: 20px;
    display: flex;
    justify-content: space-around;
    button{
      flex-grow: 0.4;
      
    }
  }
}


</style>