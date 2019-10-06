

const mongoose = require('mongoose');
// const md5 = require('md5-node');
const Schema = mongoose.Schema;

/**
 * 用户信息包含哪些字段
 */

const adminSchema = new Schema({
    username: String,
    password: String,
    avatar: String,
    token: String,
    id: Number,
    city: {
        type: String,
        default: '深圳'
    },
    create_date: {
        type: Date,
        default: Date.now()
    }
});

adminSchema.index({id:1}); // 建索引

const Admin = mongoose.model('admin', adminSchema);

module.exports = Admin;