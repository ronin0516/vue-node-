<template>
    <div>
        <div class="search-wrap" @click="onSearch">
                <van-search 
                    placeholder="请输入搜索关键词" 
                    :value="searchValue"
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
        }
    },
    components: {

    },
};
</script>

<style scoped lang="scss">

</style>
