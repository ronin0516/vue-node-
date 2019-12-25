<template>
    <div>
        <div class="search-wrap" @click="onSearch">
                <van-search 
                    placeholder="请输入搜索关键词" 
                    v-model="searchValue"
                    show-action>
                        <div slot="action" @click="onSearch">搜索</div>
                </van-search>
        </div>
        <div class="search-container">
            <div class=""></div>
        </div>
    </div>
</template>

<script>
import {GET, POST } from '@/common/axios.js';
export default {
    props: {

    },
    data() {
        return {
            searchValue: '',
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
        onSearch(){
            console.log(11111111, '搜索', this.searchValue)
            let options = {
                url: '/apis/article/list',
                params: {
                    keyword: this.searchValue
                }
            };
            if(this.searchValue && this.searchValue.trim()) {
                GET(options).then(res => {
                    console.log('打印结果', res)
                }).catch(err => {
                    console.log('失败的结果', err)
                })
            } else {
                console.log('++++++++++=')
            }
            

        }
    },
    components: {

    },
};
</script>

<style scoped lang="scss">

</style>
