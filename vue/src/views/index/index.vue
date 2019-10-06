<template>
    <div class="index-wrap">
        <div class="index">
            <div class="search-wrap" @click="onSearch">
                <van-search 
                    placeholder="请输入搜索关键词" 
                    disabled show-action>
                        <div slot="action" @click="onSearch">搜索</div>
                </van-search>
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
                <circleList :list="list"></circleList>
                    </van-list>
                </van-pull-refresh>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
        images: [
        'https://img.yzcdn.cn/vant/apple-1.jpg',
        'https://img.yzcdn.cn/vant/apple-2.jpg'
      ],
      list: [],
      loading: false,
        isLoading: false,
        finished:true,
    };
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
      onSearch(){
          this.$router.push('search')
      },

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

</style>
