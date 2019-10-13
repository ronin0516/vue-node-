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
            <!--v-model="createForm.imageList" :after-read="uploadImage" @delete="deleteImage"-->
            <van-uploader 
                v-model="images"
                multiple>
            <!-- <img class="preview-image"
                 v-for="(item , index) in createForm.imageList" 
                 :key="index"
                 :src="item"/> -->
            </van-uploader>
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
import {GET, POST} from '@/common/axios';
export default {
    props: {

    },
    data() {
        return {
            createForm: {
                content: '',
                anonymous: '', // 是否匿名
                imageList:[]
            },
            images: [],
            
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
        async submit(){
            
            console.log(111111111111,this.createForm)
            // let response = await this.uploadImage(this.images);
            // console.log(123456789, response);

            // let p = new Promise((resolve, reject) => {
            //     response && resolve()
            // })
            await this.uploadImage(this.images);
            
        },
        uploadImage(files) {
            console.log('上传前校验', files)
            let formData = new FormData();
            let images = [];
            if(files && files.length) {
                files.forEach(file => {
                    formData.append('file', file.file)
                })
            } else {
                formData.append('file', files.file)
            }
            
            let options = {
                url: '/apis/user/uploadImage',
                data: formData
            };
            POST(options).then(res => {
                console.log(1111111111000, res)
                if(res.data.code == 200) {
                    if(res.data.filename) {
                        this.createForm.imageList.push(`http://localhost:3000/images/${res.data.filename}`)
                    } else if (res.data.files) {
                        res.data.files.forEach(filename => {
                            this.createForm.imageList.push(`http://localhost:3000/images/${filename}`)
                        })
                    }
                    let options = {
                        url: '/apis/article/create',
                        data: this.createForm
                    };
                    POST(options).then(res => {
                        console.log("发表文章成功", res)
                        this.$toast(res.data.message)
                        this.$router.push('index')
                    }).catch(err => {
                        console.log("发表文章失败", err)
                        this.$toast(err.data.message)
                        this.$router.push('index')
                    })
                }
                return true
            }).catch(err => {
                console.log(22222222222000, err)
            })
            return true
        },
        deleteImage(file) {
            console.log("删除图片", file)
            let index = this.createForm.imageList.findIndex(file);
            this.createForm.imageList.splice(index, 1);
            console.log(1234567890, this.createForm.imageList)
        }

    },
    components: {

    },
};15717101807
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
.preview-image{
    position: relative;
    width: 156px;
    height: 156px;
    object-fit:fill;
    margin: 10px 10px 0 0 ;
    &:before{
        content: " ";
        position: absolute;
        top: 50%;
        right: 50%;
        transform: translate(-50%, -50%);
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: #ccc;

    }
}

</style>
