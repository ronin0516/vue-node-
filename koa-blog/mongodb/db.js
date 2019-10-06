

const mongoose =  require('mongoose');

const dbUrl = "mongodb://localhost:27017/blog";
mongoose.connect(dbUrl, {autoReconnect: true});

const conn = mongoose.connection;

conn.once('open', function(){
    console.log('数据库连接成功')
})

conn.on('error', function(error) {
    console.log('数据库连接出错，关闭连接')
    mongoose.disconnect();
})

conn.on('close',function(){
    console.log('数据库连接关闭，尝试重新联俄籍')
    mongoose.connect(deUrl,{autoReconnect: true})
})

module.exports = conn;