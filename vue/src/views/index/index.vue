<template>
    <div class="index-wrap">
        <div class="index">
            <div class="header-nav">
                <div class="header-container">
                    <div class="nav-item">
                        <div class="nav-item__left">
                            <span class="text" 
                                v-for="(item, index) in navList" 
                                :key="index"
                                :class="{'selected': currentIndex == (index+1)}"
                                >{{item}}</span>
                        </div>
                        <div class="nav-item__right" @click.stop="toPage">
                            <img class="icon" src="@/assets/images/sousuo.png" data-path="search"/>
                            <img class="icon" src="@/assets/images/bianji.png" data-path="create"/>
                        </div>
                    </div>
                </div>
            </div>
            <div class="index-header">
                <van-swipe :autoplay="3000" :height="100" indicator-color="white">
                    <van-swipe-item v-for="(image, index) in images" :key="index">
                        <!-- <img :src="image" /> -->
                        <van-image
                            width="100%"
                            height= "100%"
                            fit="contain"
                            :src="image"
                            />
                    </van-swipe-item>
                </van-swipe>
            </div>
            <div class="index-body">
                <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
                    <van-list
                        v-model="loading"
                        :finished="finished"
                        finished-text="没有更多了"
                        @load="onLoad"
                        >
                <articleList :list="list"></articleList>
                    </van-list>
                </van-pull-refresh>
            </div>
        </div>
    </div>
</template>

<script>
import {GET, POST} from '../../common/axios';
export default {
  props: {},
  data() {
    return {
        images: [
        'https://img.yzcdn.cn/vant/apple-1.jpg',
        'https://img.yzcdn.cn/vant/apple-2.jpg'
      ],
      navList: [
          "首页",
          "头条"
      ],
      currentIndex: 1,
      list: [],
      loading: false,
        isLoading: false,
        finished:true,
    };
  },
  computed: {},
  created() {
      this.getArticles()
  },
  mounted() {},
  watch: {},
  methods: {
    getArticles(){
        let options = {
            url: '/apis/article/list',
            params: {
                limit: 20,
                offset: 0,
                keyword: ''
            }
        };
        GET(options).then(res => {
            console.log('首页列表', res)
            this.list = res.data.list;
        }).catch(err => {
            console.log('首页列表-err', err)
            // this.list = []; // 搜索出错要现实空白？
        })
    },
    //   onSearch(){
    //       this.$router.push('search')
    //   },

      onLoad(){
          setTimeout(() => {
              for(let i = 0; i < 10; i++) {
                //   this.newList = this.newList.concat(this.newList)
              }
              this.loading = false;
              
          }, 500) 

      },
      onRefresh(){
          this.count++
          this.isLoading = false
      },
      toPage(e) {
          let path = e.target.dataset.path;
          console.log(122222222222222222222,e.target)
          this.$router.push(path);
      }
  },
  components: {}
};
</script>

<style scoped lang="scss">
    .index{
        height: 100vh;
        &-header{
            img{
                width: 100%;
            }
        }
        &-body{
            height: calc(100% - 100px);
            overflow-x: hidden;
            overflow-y: scroll;
            -webkit-overflow-scrolling: touch;
            margin-top: 30px;
            padding: 20px;
            background: #f5f5f5;
            .van-cell{
                background: #f5f5f5;
            }
        }
    }
    .header-nav{
        width: 100%;
        height: 100px;
        overflow: hidden;
        background: url('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1570376536912&di=cffa68c3c5d90391e3a4967dffb3eba7&imgtype=0&src=http%3A%2F%2Fd.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2Fb8014a90f603738df2ce9c71b51bb051f919ecd9.jpg') no-repeat;
        background-size: 100% 100%;
        .header-container{
            padding: 20px;
            line-height: 40px;
            .nav-item__left{
                float:left;
                width: 80%;
                text-align: left;
                .text{
                    font-size: 32px;
                    padding: 0 40px 0 0;
                    color: #fff;
                }
                .selected{
                    font-size: 50px;
                    font-weight: bold;
                }
            }
            .nav-item__right{
                display: flex;
                display: -webkit-flex;
                justify-content: space-around;
                img{
                    width: 40px;
                    height: 40px;
                }
            }
        }
    }
    

</style>
