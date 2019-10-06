<template>
    <div class="tabbar-wrap">
        <div class="tabbar">
            <ul class="tabbar-list">
                <li class="tabbar-item" 
                    v-for="(item, index) in tabbar" :key="index"
                    @click="jump(item,index)">
                    <img class="tabbar-item__icon" :src="currentIndex == (index+1) ? item.selectedIcon : item.icon"/>
                    <div class="tabbar-item__text"
                        :class="{'selected': (currentIndex == index+1)}">{{item.text}}</div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'tabbar',
    props: {
        tabbar: {
            type: Array,
            default: function(){
                return [{
                    text: '首页',
                    icon: '',
                    selectedIcon: '',
                    path: '/index'
                }]
            }
        }
    },
    data() {
        return {
            currentIndex: 1,

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
        jump(item, index) {
            this.currentIndex = index + 1;
            this.$router.push(item.path)
        }
    },
    components: {

    },
};
</script>

<style scoped lang="scss">
.tabbar-wrap{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100px;
    background: #fff;
    border-top: 1px solid #f5f5f5;
    .tabbar{
        height:100%;
        &-list{
            display: flex;
            display: -webkit-flex;
            justify-content: space-around;
            // height: 100%;
            padding: 20px 0;
        }
        &-item{
            flex-grow: 1;
            // line-height: 50px;
            &__icon{
                width: 40px;
                height: 40px;
            }
        }
    }
    .selected{
        color: #0000FF;
    }
}
</style>
