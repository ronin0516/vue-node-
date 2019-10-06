<template>
    <div class="mine-wrap">
        <div class="mine">
            <div class="mine-header">
                <div class="mine-header__avatar">
                    <img src=""/>
                </div>
                <p class="mine-header__username">{{username}}</p>
            </div>
            <div class="mine-body">
                <ul class="mine-list">
                    <li class="mine-item" v-for="(item, index) in profile" :key="index">
                        <img class="mine-item__icon"
                             src=""/>
                        <p class="mine-item__text">{{item}}</p>
                        <img class="mine-item__arrow"
                             src=""/>
                    </li>
                </ul>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    props: {

    },
    data() {
        return {
            username: '南村杂货铺老板',
            profile: ["美团红包", "收货地址","常见问题","美团协议与说明","退出登录"]
        };
    },
    computed: {

    },
    created() {

    },
    mounted() {

    },
    watch: {

    },
    methods: {

    },
    components: {

    },
};
</script>

<style scoped lang="scss">
.mine-wrap{

}
.mine{
    height: 100vh;
    background: rgb(240, 240, 240);
    &-header{
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 320px;
        background: url(//s3plus.meituan.net/v1/mss_e2821d7f0cfe4ac1bf9202ecf9590e67/cdn-prod/file:9096d347/78890a8f1859bc10152151fc64aff5cc.png) no-repeat;
        background-size: cover;
        &__avatar{
            width: 164px;
            height: 164px;
            border-radius: 50%;
            margin: auto;
            background: url(//p1.meituan.net/codeman/e32b47a07b818bf9a1d4086a882c18a62282.png) no-repeat;
            background-size: 100%;
        }
    }
    &-body{
        width: 100%;
        height: calc(100% - 320px);
        
    }
    &-list{
        display: inline-block;
        width: 100%;
        background: #fff;
        padding: 0 0 0 20px;
        box-sizing: border-box;
    }
    &-item{
        position: relative;
        width: 100%;
        height: 80px;
        border-bottom: 1px solid #f5f5f5;
        &__icon{
            float:left;
            width: 40px;
            height: 40px;
            border: 1px solid red;
            margin-right: 20px;
        }
        &__text{
            
            text-align: left;
        }
        &__arrow{
            position: absolute;
            top: 50%;
            right: 20px;
            width: 40px;
            height: 40px;
            border: 1px solid red;
        }
    }
}
</style>





















