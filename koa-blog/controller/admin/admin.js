
const AdminModel = require('../../models/admin/admin.js');
const md5 = require('md5-node');
const url = require('url'); // 解析get请求数据
// uuid/v1基于时间戳生成的id  uuid/v4基于随机数生成的id  uuidv4(); // ⇨ 57751a52-db27-4b2f-8a08-7e02f9e94a42
const uuidv4 = require('uuid/v4'); 

class Admin {
    constructor() {
        // super();
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
    }

    async login(ctx,next) {
        let {username, password} = ctx.request.body;

        let user = await AdminModel.findOne({username, password});
        // console.log('用户登录，数据库查询结果', user)
        if(!user) {
            ctx.body={
                data: {
                    code: 401,
                    message: '账号密码错误或用户不存在'
                }
            }
        } else {
            ctx.session.user_id = user.id;
            ctx.body = {
                data: {
                    code: 200,
                    status: 200,
                    message: '登录成功',
                    token: user.token
                }
            }
        }

    }

    async register(ctx, next) {
        let {username, password, avatar} = ctx.request.body;
        
        if(!username || !password || !avatar) {
            ctx.body = {
                data: {
                    code: 200,
                    message: '少了些数据',
                    status: 10015
                }   
                
            }
        } else {
            let user = await AdminModel.findOne({username});
            ctx.session.user_id = uuidv4();
            console.log('查询结果', user)
            if(!user) {
                let createData = {
                    id: uuidv4(),
                    username,
                    password,
                    avatar,
                    token: md5(username)
                };
                await new AdminModel(createData).save();
    
                ctx.body={
                    data: {
                        code: 200,
                        message: '注册成功',
                        status: 200
                    }
                    
                }
            } else{
                ctx.body = {
                    data: {
                        code: 200,
                        message: '该用户名已存在',
                        status: 10014
                    }
                    
                }
            }
            
        }
        next()
    }

    async uploadImage(ctx, next) {
        console.log('获得用户上传图片', ctx.req.files,ctx.req.file)
        if(ctx.req.files && ctx.req.files.length > 1) {

            let arr = ctx.req.files.map(file => {
                return file.filename
            })
            ctx.body = {
                data: {
                    code: 200,
                    files: arr
                }
                
            };
            console.log('多张图片111111111',ctx.req.files)
        } else {
            ctx.body = {
                data: {
                    code: 200,
                    filename: ctx.req.files[0].filename
                }
            };
            console.log('单张图片22222', ctx.req.files[0].filename)
        }
        
        next()
    }

    async userInfo(ctx, next) {
        let query = url.parse(ctx.request.url, true).query;

        console.log('数据数据----------',ctx.request.querystring, query)
        let user = await AdminModel.findOne({token: query.token});
        
        if(!user) {
            ctx.body = {
                data: {
                    code: 401, // 用户授权出错，需要登录
                    message: '用户未注册/登录'
                }
            }
        } else {
            ctx.body = {
                data: {
                    code: 200,
                    message: '用户信息',
                    user
                }
            }
        }
    }


}

module.exports = new Admin()