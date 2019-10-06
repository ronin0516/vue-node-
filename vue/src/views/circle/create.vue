<!--
文章标题、分类、内容、发布时间、发布人、评论
-->

<template>
    <div>
        <van-cell-group>
            <van-field
                v-model="createForm.content"
                label="内容"
                type="textarea"
                required
                placeholder="听说你的文章最有料"
                rows="1"
                autosize
            />
            <van-uploader 
                v-model="createForm.imageList" 
                :before-read="beforeUpload"
                @delete="deleteImage"
                multiple />
            <van-switch-cell v-model="createForm.anonymous" 
                size="24px"
                title="是否匿名" />
            <div class="submit-btn-wrap">
                <van-button type="info" @click.stop="submit">提交</van-button>
                <van-button type="info">取消</van-button>
            </div>
        </van-cell-group>
    </div>
</template>

<script>
export default {
    props: {

    },
    data() {
        return {
            createForm: {
                content: '',
                anonymous: '', // 是否匿名
                imageList:[]
            }
            
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
        submit(){
            console.log(111111111111,this.createForm)
        },
        beforeUpload(file) {
            console.log('上传前校验', file)
            // this.createForm.imageList = file;
            return true
        },
        deleteImage(file) {
            console.log("删除图片", file)
        }

    },
    components: {

    },
};
</script>

<style scoped lang="scss">
.submit-btn-wrap{
    display: flex;
    display: -webkit-flex;
    padding: 20px;
    justify-content: space-between;
    button{
        flex-grow: 0.4;
    }
}

</style>
