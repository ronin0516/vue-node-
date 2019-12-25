

const ArticleModel = require('../../models/admin/article.js');
const AdminModel = require('../../models/admin/admin');
const url = require('url');
// const ObjectId = require('mongodb').ObjectId;  ObjectId(id)
const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId; // ObjectId(id)
class Article{
    constructor(){
        this.createArticle = this.createArticle.bind(this);
    }

    async createArticle(ctx,next) {
        let user_id = ctx.session.user_id;
        
        let user = await AdminModel.findOne({id: user_id});
        console.log("发布文章请求接进来没有", user_id, user.article_id);

        let {content, imageList, anonymous} = ctx.request.body;
        let createData = {
            content,
            images: imageList,
            anonymous,
            user_id: ctx.session.user_id,
            user: user.article_id
        }
        let article = await new ArticleModel(createData).save();
        if(article) {
            ctx.body = {
                data: {
                    code: 200,
                    message: '发布成功'
                }
            }
        } else{
            ctx.body = {
                data: {
                    code: -1,
                    message: '发布失败'
                }
            }
        }
    }

    /**
     * 首页--搜索列表
     * @param {*} offset : 已经查了几条数据 
     * @param {*} limit ：每次查询几条数据 , 默认20条
     * @param {*} keyword : 查询关键字：发布者跟发布内容模糊搜索
     */
    async getArticleList(ctx, next){
        let {offset , limit , keyword} = ctx.request.body;
        let promiseArr = [], reg = new RegExp(keyword, 'i');

        console.log('keyword', keyword)
        let user = await AdminModel.findOne({id: ctx.session.user_id})
        console.log('==========================',keyword, user.article_id) 
        let articles = await ArticleModel.find(
            {
                'content': {$regex: reg}
                // $or: [{content: {$regex: reg}}],
                // user_id: ctx.session.user_id
            },
            {},
            {
                sort: { 'create_date' : -1}, // 按照_id升序排序
                // limit: (limit + 20), // 查询多少条
                // offset: offset+ 20,  // 从哪开始查起
            }
            )
            // .populate('user')
            // .exec(function(err, article){
            //     console.log('----1234567890--------', article)
            // });
        
        // console.log('populate--------------', articles.user)
        if(articles && articles.length) {
            ctx.body = {
                data: {
                    code: 200,
                    list: articles,
                    user: articles[0].user
                }
            }
        } else {
            ctx.body = {
                data: {
                    code: -1,
                    list: []
                }
            }
        }
       
        // console.log('查询结果', articles)
            

    }

    async getArticleDetail(ctx, next) {
        let query = url.parse(ctx.request.url, true).query;
        console.log('前端传过来的参数', query)
        let article = await ArticleModel.findById({'_id': mongoose.Types.ObjectId(query.id)});
        console.log('数据库查询结果', article)
        if(article) {
            ctx.body = {
                data: {
                    code: 200,
                    data: article
                }
            }
        } else {
            ctx.body = {
                data: {
                    code: -1,
                    data: null
                }
            }
        }
    }
}

module.exports = new Article()