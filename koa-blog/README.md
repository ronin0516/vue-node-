

    1、前后端ajax数据交互code的值与意义

        401：请求授权失败，常用在用户登录
        10014：用户已存在，用在注册，code=200，的基础上返回对应的status=10014










    用户
    文章
    评论

    一个用户可以发布多篇文章，
    一篇文章可以有多条评论和多个赞 

    
    var articleSchema = new Schema({
        id: String,
        content: String,
        create_date: {
            type: Date,
            defualt: Date.now()
        },
        anonyous: Boolean,
        approve: Number,
        comment_number: Number,
        user: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
    })


    articleModel.findOne({id}).populate('user').




    User.find({ username: user_name })
    .populate('city')
    .exec(function (err, docs) {
      City.find({ _id: docs[0].city._id })
        .populate('state')
        .exec(function (err, doc) {
          State.find({ _id: doc[0].state._id })
            .populate('country')
            .exec(function (err, result) {
              const userInfo = {};
              userInfo.username = docs[0].username;
              userInfo.userpwd = docs[0].userpwd;
              userInfo.userage = docs[0].userage;
              userInfo.usercity = doc[0].name;
              userInfo.userstate = result[0].name;
              userInfo.usercountry = result[0].country.name;
              respondData.data.push(userInfo);
              return res.json(respondData);
            })
        })
    });
    

    const Schema = mongoose.Schema;
  const ObjectId = Schema.Types.ObjectId;
  const UserSchema = new Schema({
    username: { type: String },
    userpwd: { type: String },
    userage: { type: Number },
    city: { type: Schema.Types.ObjectId, ref: 'City' },
  });
  const CitySchema = new Schema({
    name: { type: String },
    state: { type: Schema.Types.ObjectId, ref: 'State' }
  });
  const StateSchema = new Schema({
    name: { type: String },
    country: { type: Schema.Types.ObjectId, ref: 'Country' }
  });
  const CountrySchema = new Schema({
    name: { type: String }
  });
  const User = mongoose.model('User', UserSchema);
  const City = mongoose.model('City', CitySchema);
  const State = mongoose.model('State', StateSchema);
  const Country = mongoose.model('Country', CountrySchema);





  ??????????????????????????????????层层嵌套太麻烦，有没有一次性查询的内容呢？
  层层嵌套如何添加数据？
    



参考网上例子，评论说新建了两条数据，有点脱裤子放屁

var studentSchema = new Schema({
    name  : String,
    age   : String,
    school: {
        type: Schema.Types.ObjectId,
        ref : 'school'
    }
});
var schoolSchema = new Schema({
    name    : String,
    students: [
        {
            type: Schema.Types.ObjectId,
            ref : 'student'
        }
    ],
    city    : {
        type: Schema.Types.ObjectId,
        ref : 'city'
    }
});
var citySchema = new Schema({
    name  : String,
    school: [
        {
            type: Schema.Types.ObjectId,
            ref : 'school'
        }
    ]
});
var Student = mongoose.model('student', studentSchema);
var School = mongoose.model("school", schoolSchema);
var City = mongoose.model("city", citySchema);


// 初始化数据
var city = new City({
    name  : '北京'，
    school: []
});

city.save(function (err, city) {
    var school = new School({
        name    : 'Test',
        students: [],
        city    : city._id
    });
    school.save(function (err, school) {
        var student = new Student({
            name  : 'Tom',
            age   : 20,
            school: school._id
        });
        student.save();
    });
});

// 关联查询
Student.findOne({name: 'Tom'})
       .populate({
           path: 'school',
           populate: {path: 'city'}
       })
       .exec(function (err, data) {
          console.log(data.name + ' 所在学校为：' + data.school.name + "，所在城市为：" + data.school.city.name);
})

// 结果
Tom 所在学校为：Test，所在城市为：北京








    查询
        
        Model.find({}， '-_id')表示查找出来的数据去掉_id这个参数
        Model.find({'skus.id': id}): foods = {id:1, skus: [{id: 1}]}。查找数组


    更新或创建
        category.foods.push(food);
        category.markModified('foods'); // 使用save方式保存对象的数据，需要使用markModified以完成修改操作。 否则无法嵌套数据
        category.save()
    


    条件查询
        根据名称、类别喝时间进行搜索查询。

        下面的方案在单个条件进行判断时，这样处理没有任何问题。
        Model.$where('this.idnum == "' + idnum + '"').exec(function(){})

        多个条件查询
        Model.find({name: 'name', age: 18, sex: 1});这种方式


    

    修改器和更新器

        更新修改器

            $inc：增减修改器，只对数字有效。下面实例：找到age=22的文档，修改文档的age值自增1
                Model.update({'age': 22}, {'$inc': {'age': 1}}) 执行后: age = 23

            $set：指定一个键的值，这个键不存在就创建它，可以是任何MongoDB支持的类型
                Model.update({'age': 22}, {'$set': {'age': 'haha'}}); 执行后age = 'haha'

            $unset: 跟$set取反，删除一个键
                Model.update({'age': 20}, {'$unset': {'age': '哈哈'}}) ;执行后，age键不存在

        
        数组修改器

            $push: 给一个键push一个数组成员，键不存在回创建键

                Model.update({'age': 22}, {'$push': {'array': 10}}) // 执行后：增加一个Array键，类型为数组，有一个成员 10

            $addToSet：向数组中添加一个元素，如果不存在就不添加

                Model.update({'age': 20}, {'$addToSet': {'array': 10}})// 执行后，array中有10所以不会添加

            $each：遍历数组，和$push修改器配合可以插入多个值

                Model.update({'age': 22}, {'$push': {'array': {'$each': [1,2,3,4,5]}}}) // 执行后array = [10, 1, 2, 3, 4, 5]

            $pop：向数组尾部删除一个元素

                Model.update({'age': 22}, {'$pop': {'array': 1}}) 执行后 array: [10,1,2,3,4]。tips：将1改成-1可以删除数组首部元素

            $pull向数组中删除指定元素
                Model.update({'age': 22}, {'$pull': {'array': 10}}); 执行后，array: [1,2,3,4]匹配到array中的10后将其删除


        条件查询

            $lt: 小于
            $lte：小于等于
            $gt：大于
            $gte：大于等于
            $ne：不等于

            Model.find({'age': {'$gte': 18, '$lte'}}) 查询大于等于18 并小于等于30的文档

        或查询 
            $in 一个键对应多个值
            $nin：同上取反，一个键不对应指定值
            $or：多个条件匹配，可以嵌套$in使用
            $not：同上取反，查询与特定模式不匹配的文档

            Model.find({'age': {'$in': [20, 21,22,'haha']}}) 查找age等于 20 21 22 或haha的文档

            Model.find({'$or': [ {'age': 18} , {'name': 'xueyou'} ] }) 查询age等于18，或name等于xueyou的文档


        类型查询

            null能匹配自身和不存在的值，想要匹配键的值为null，就要通过 $exists 条件判断键值已经存在 $exists表示是否存在的意思。

            Model.find({'age': {'$in': [null], '$exists': true}}) 查询age值为null的文档

            Model.find({'name': {'$exists': true}}, function(err, docs){}) // 查询所有存在name属性的文档
            
            Model.find({'telephone': {'$exists': false}}, function(err, docs){}) // 查询所有不存在telephone属性的文档
            
    正则表达式

        MongoDB使用Prel兼容的正则表达式库来匹配正则表达式

            find({'name': /joe/i})  查询name为joe的文档，并忽略大小写

            find({'name': /joe?/i}) 查询匹配各种大小写组合

    $where

    Model.findOneAndUpdate(conditions, {$set: })























