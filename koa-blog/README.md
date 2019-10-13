

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



































