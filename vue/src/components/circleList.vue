<template>
    <div class="list">
        <div class="container" v-for="item in newList" :key="item.id" 
        @click="toDetailPage(item)">
            <div class="top">
                <img class="avatar" :src="item.avatar">
                <div class="info">
                    <span class="info-username">昵称</span>
                    <span class="info-time">一天前</span>
                    <div class="info-company">{{item.company}}</div>
                </div>
            </div>
            <div class="content">
                <div class="text" :class="{'ellipsis': !isDetailPage }">{{item.content}}</div>
                <div class="images">
                    <img class="img" v-for="(childItem, ChildIndex) in item.images.slice(0,3)" 
                        :key="ChildIndex" :src="childItem"/>
                    <span class="mask-tip" v-show="item.images.length > 3">+5</span>
                </div>
            </div>
            <div class="bottom">
                <div class="operate-item">
                    <img class="operate-item__icon" src="@/assets/images/icon-share.png"/>
                    <span class="operate-item__text">分享</span>
                </div>
                <div class="operate-item">
                    <img class="operate-item__icon" src="@/assets/images/icon-comment.png"/>
                    <span class="operate-item__text">{{item.comments ? item.comments : '评论'}}</span>
                </div>
                <div class="operate-item">
                    <img class="operate-item__icon" src="@/assets/images/icon-zan.png"/>
                    <span class="operate-item__text">{{item.approve ? item.approve : '赞'}}</span>
                </div>
            </div>
        </div>
                
    </div>
</template>

<script>
export default {
  name: 'circleList',
  props: {
      list: {
          type: Array,
          default: function(){
              return []
          }
      }
  },
  data() {
    return {
        isDetailPage: false,
        count:0,
        newList: [
            {
                id: 12,
                avatar: 'https://ss2.bdstatic.com/6Ot1bjeh1BF3odCf/it/u=1854692222,114449154&fm=74&app=80&f=JPEG&size=f121,140?sec=1880279984&t=750689c181ce34cd3263716d1c94fb30',
                username: '',
                company: '自由职业前端开发',
                date: Date.now(),
                content: '听说哪哪开了一家很好吃的店，改天有空去尝尝呀听说哪哪开了一家很好吃的店，改天有空去尝尝呀听说哪哪开了一家很好吃的店，改天有空去尝尝呀听说哪哪开了一家很好吃的店，改天有空去尝尝呀听说哪哪开了一家很好吃的店，改天有空去尝尝呀听说哪哪开了一家很好吃的店，改天有空去尝尝呀听说哪哪开了一家很好吃的店，改天有空去尝尝呀听说哪哪开了一家很好吃的店，改天有空去尝尝呀听说哪哪开了一家很好吃的店，改天有空去尝尝呀听说哪哪开了一家很好吃的店，改天有空去尝尝呀听说哪哪开了一家很好吃的店，改天有空去尝尝呀听说哪哪开了一家很好吃的店，改天有空去尝尝呀听说哪哪开了一家很好吃的店，改天有空去尝尝呀听说哪哪开了一家很好吃的店，改天有空去尝尝呀听说哪哪开了一家很好吃的店，改天有空去尝尝呀听说哪哪开了一家很好吃的店，改天有空去尝尝呀听说哪哪开了一家很好吃的店，改天有空去尝尝呀听说哪哪开了一家很好吃的店，改天有空去尝尝呀',
                comments: 5,
                approve: 5,
                images: [
                    'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1717349155,715302079&fm=26&gp=0.jpg',
                    'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4169342964,2265822782&fm=26&gp=0.jpg',
                    'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1017742345,2401854046&fm=26&gp=0.jpg',
                    'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4169342964,2265822782&fm=26&gp=0.jpg'
                ]
            }
        ]
    };
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    //   onLoad(){
    //       setTimeout(() => {
    //           for(let i = 0; i < 10; i++) {
    //             //   this.newList = this.newList.concat(this.newList)
    //           }
    //           this.loading = false;
              
    //       }, 500) 

    //   },
    //   onRefresh(){
    //       this.count++
    //       this.isLoading = false
    //   }
    toDetailPage(item) {
        this.$router.push({
            name: 'detail',
            params: {
                id: item.id
            }
        })
    }
  },
  components: {}
};
</script>

<style scoped lang="scss">
    // .container{
    //     // background: #f5f5f5;
    // }
    .top{
        width: 100%;
        height: 100px;
        overflow: hidden;
        .avatar{
            float: left;
            width: 80px;
            height: 80px;
            border-radius: 50%;
            margin-right: 20px;
        }
        .info{
            &-username{
                float: left;
            }
            &-time{
                float: right;
            }
            &-company{
                text-align: left;
                padding-top: 40px;
            }
        }
    }
    .content{
        .text{
            margin: 20px 0;
        }
        .ellipsis{
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 5;
            text-overflow: ellipsis;
            overflow: hidden;
            text-align: left;
        }
        .images{
            position: relative;
            display: flex;
            display: -webkit-flex;
            justify-content: space-between;
            flex-wrap: nowrap;
            width: 100%;
            height: 120px;
            overflow: hidden;
            border-spacing:10px;
            img{
                width: 232px;
                // flex: 1;
            }
            .mask-tip{
                position: absolute;
                width: 232px;
                height: 120px;
                line-height: 120px;
                right: 0;
                background: rgba(0,0,0,0.5);
                color: #fff;
                font-size: 40px;
            }
        }
    }
    .bottom{
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        width: 100%;
        height: 60px;
        line-height: 60px;
        .operate-item{
            flex: 1;
            background: #fff;
            &__icon{
                width: 40px;
                height: 40px;
                vertical-align: middle;
                margin-right: 10px;
            }

        }
    }

</style>
