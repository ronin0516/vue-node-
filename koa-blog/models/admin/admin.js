

const mongoose = require('mongoose');
// const md5 = require('md5-node');
const Schema = mongoose.Schema;

/**
 * 用户信息包含哪些字段
 */

const adminSchema = new Schema({
    username: {type: String, default: '包租公'},
    password: {type: String, default: '123456'},
    avatar: {type: String, default: 'default.png'},
    token: {type: String, default: 'werghrthtre'},
    id: {type: String, default: '1'},
    company: {type: String, default: '自由职业'}, // 哪家公司
    city: {
        type: String,
        default: '深圳'
    },
    create_date: {
        type: Date,
        default: Date.now()
    },
    article_id: Number,
    // articles: [{type: Schema.Types.ObjectId, ref: 'article'}]
    // articles: [{type: String, ref: 'article'}]
});

adminSchema.index({id:1}); // 建索引

const Admin = mongoose.model('admin', adminSchema);

module.exports = Admin;