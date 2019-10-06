<template>
  <div class="login">
    <div class="login-container">
      <h1>注册</h1>
      <div class="login-form">
        <van-cell-group>
          <van-field
            v-model="form.username"
            required
            clearable
            label="用户名"
            right-icon="question-o"
            placeholder="请输入用户名"
            @click-right-icon="$toast('点你妹~')"
          />
          <van-field
            v-model="form.password"
            type="password"
            label="密码"
            placeholder="请输入密码"
            required
          />
          <van-uploader  
                v-model="fileList"
                :after-read="upload"
                :max-count="1"
            >
            <!-- <img :src="form.avatar"/> -->
          </van-uploader>
          <div class="login-btn">
            <van-button type="info" @click.stop="register">确定</van-button>
            <van-button type="info">取消</van-button>
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
            form: {
                username: '',
                password: '',
                avatar: '',
            },
            fileList:[],
        }
    },
    methods: {
        register(){
            let {username, password, avatar} = this.form;
            if(username.trim() && password.trim()) {
                let options = {
                    url: '/apis/user/register',
                    data: {
                        username,
                        password,
                        avatar
                    }
                };
                POST(options).then(res => {
                    console.log('111111111111111', res)
                    this.$toast(res.data.message);
                    if(res.data.code == 200 && res.data.status == 200) {
                        console.log('注册成功', res)
                        this.$router.push('login')
                    } else {
                        console.log('注册失败', res)
                    }
                   
                }).catch(err => {
                    console.log('走err', err)
                })
            }
        },
        upload(file){
            console.log('上传文件', file, this.fileList)
            let formData = new FormData();
            formData.append('file', file.file);
            let options = {
                url: '/apis/user/uploadImage',
                data: formData,
                headers: {
                    'Content-Type': 'application/form-data'
                },
            };
            POST(options).then(res => {
                console.log('后端接收返回的数据', res)
                this.form.avatar = "http://localhost:3000/images/" + res.data.filename
            }).catch(err => {
                console.log('12345678',err)
            })
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
    },
    
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