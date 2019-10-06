
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const circleScheme = new Schema({
    id: String,
    content: String,
    images: Array,
    username: String,
    company: String,
    avatar: String,
    token: String,
    date: String,
    comments: Number,
    approve: Number,
    anonymous: Boolean, // 是否匿名发布
});


circleScheme.index({id:1});

const Circle = mongoose.model('circle', circleScheme);
module.exports = Circle;