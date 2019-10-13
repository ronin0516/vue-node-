
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ArticleScheme = new Schema({
    id: String,
    content: String,
    images: Array,
    user_id: String,// 谁发布的文章
    company: {type: String, default: '自由职业'},
    create_date: {type: Date, default: Date.now()}, // 创建日期
    approve: {type: Number, default: 0}, // 点赞数
    comments: {type: Number, default: 0},// 评论数
    anonymous: {type: Number, default: false}, // 是否匿名发布
});


ArticleScheme.index({id:1});

const Article = mongoose.model('article', ArticleScheme);
module.exports = Article;