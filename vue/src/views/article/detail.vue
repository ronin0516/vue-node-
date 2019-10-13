<template>
    <div class="list">
        <div class="container">
            <div class="top">
                <img class="avatar" :src="detail.avatar">
                <div class="info">
                    <span class="info-username">昵称</span>
                    <span class="info-time">{{formatDate(detail.create_date)}}</span>
                    <div class="info-company">{{detail.company}}</div>
                </div>
            </div>
            <div class="content">
                <div class="text">{{detail.content}}</div>
                <div class="images">
                    <img class="img" v-for="(childItem, ChildIndex) in detail.images" 
                        :key="ChildIndex" :src="childItem"/>
                </div>
            </div>
            <div class="bottom">
                <div class="operate-item">
                    <img class="operate-item__icon" src="@/assets/images/icon-share.png"/>
                    <span class="operate-item__text">分享</span>
                </div>
                <div class="operate-item">
                    <img class="operate-item__icon" src="@/assets/images/icon-comment.png"/>
                    <span class="operate-item__text">{{detail.comments ? detail.comments : '评论'}}</span>
                </div>
                <div class="operate-item">
                    <img class="operate-item__icon" src="@/assets/images/icon-zan.png"/>
                    <span class="operate-item__text">{{detail.approve ? detail.approve : '赞'}}</span>
                </div>
            </div>
        </div>
                
    </div>
</template>

<script>
import {GET, POST} from '../../common/axios';
export default {
  name: 'circleList',
  props: {
    
  },


  data() {
    return {
        isDetailPage: false,
        count:0,
        detail: {
                // id: 12,
                // avatar: 'https://ss2.bdstatic.com/6Ot1bjeh1BF3odCf/it/u=1854692222,114449154&fm=74&app=80&f=JPEG&size=f121,140?sec=1880279984&t=750689c181ce34cd3263716d1c94fb30',
                // username: '',
                // company: '自由职业前端开发',
                // date: Date.now(),
                // content: '听说哪哪开了一家很好吃的店，改天有空去尝尝呀听说哪哪开了一家很好吃的店，改天有空去尝尝呀听说哪哪开了一家很好吃的店，改天有空去尝尝呀听说哪哪开了一家很好吃的店，改天有空去尝尝呀听说哪哪开了一家很好吃的店，改天有空去尝尝呀听说哪哪开了一家很好吃的店，改天有空去尝尝呀听说哪哪开了一家很好吃的店，改天有空去尝尝呀听说哪哪开了一家很好吃的店，改天有空去尝尝呀听说哪哪开了一家很好吃的店，改天有空去尝尝呀听说哪哪开了一家很好吃的店，改天有空去尝尝呀听说哪哪开了一家很好吃的店，改天有空去尝尝呀听说哪哪开了一家很好吃的店，改天有空去尝尝呀听说哪哪开了一家很好吃的店，改天有空去尝尝呀听说哪哪开了一家很好吃的店，改天有空去尝尝呀听说哪哪开了一家很好吃的店，改天有空去尝尝呀听说哪哪开了一家很好吃的店，改天有空去尝尝呀听说哪哪开了一家很好吃的店，改天有空去尝尝呀听说哪哪开了一家很好吃的店，改天有空去尝尝呀',
                // comments: 5,
                // approve: 5,
                // images: [
                //     'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1717349155,715302079&fm=26&gp=0.jpg',
                //     'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4169342964,2265822782&fm=26&gp=0.jpg',
                //     'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1017742345,2401854046&fm=26&gp=0.jpg',
                //     'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4169342964,2265822782&fm=26&gp=0.jpg'
                // ]
            }
    };
  },
  computed: {},
  created() {
      console.log('获取动态参数', this.$router.history.current.params.id)
      this.getDetail()
  },
  mounted() {},
  watch: {},
  methods: {
    getDetail(){
        let options = {
            url: '/apis/article/detail',
            params: {id: this.$router.history.current.params.id}
        };
        GET(options).then(res => {
            if(res.data.code == 200) {
                this.detail = res.data.data
                
            } else {
                this.$toast("参数错误")
            }
        }).catch(err => {
            this.$toast(err.data.message)
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
    .list{
        padding: 20px;
    }
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
            text-align: left;
            margin: 20px 0;
        }
        .ellipsis{
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 5;
            text-overflow: ellipsis;
            overflow: hidden;
            
        }
        .images{
            position: relative;
            width: 100%;
            text-align: left;
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
