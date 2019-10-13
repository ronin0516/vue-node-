

const ArticleSchema = require('../../models/admin/article.js');
const AdminSchema = require('../../models/admin/admin');
const url = require('url');
// const ObjectId = require('mongodb').ObjectId;  ObjectId(id)
const mongoose = require('mongoose');

class Article{
    constructor(){
        this.createArticle = this.createArticle.bind(this);
    }

    async createArticle(ctx,next) {
        console.log("发布文章请求接进来没有")
        let {content, imageList, anonymous} = ctx.request.body;
        let createData = {
            content,
            images: imageList,
            anonymous,
            user_id: ctx.session.user_id
        }
        console.log(content, imageList)
        let article = await new ArticleSchema(createData).save();
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

        // promiseArr.push(AdminSchema.findOne({username: keyword}, {'id': ''}));
        // promiseArr.push(ArticleSchema.find(
        //     {
        //         $or: [{content: {$regex: reg}}]
        //     },
        //     {},
        //     {
        //         sort: { '_id' : 1}, // 按照_id升序排序
        //         limit: (limit + 20) // 查询多少条
        //     }
        //     ))
        let articles = await ArticleSchema.find(
            {
                $or: [{content: {$regex: reg}}]
            },
            {},
            {
                sort: { '_id' : 1}, // 按照_id升序排序
                limit: (limit + 20), // 查询多少条
                offset: offset+ 20,  // 从哪开始查起
            }
            );
        if(articles && articles.length) {
            ctx.body = {
                data: {
                    code: 200,
                    list: articles,
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
       
        console.log('查询结果', articles)
            

    }

    async getArticleDetail(ctx, next) {
        let query = url.parse(ctx.request.url, true).query;
        console.log('前端传过来的参数', query)
        let article = await ArticleSchema.findById({'_id': mongoose.Types.ObjectId(query.id)});
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