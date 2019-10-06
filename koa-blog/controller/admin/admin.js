
const AdminModel = require('../../models/admin/admin.js');
const md5 = require('md5-node');

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
            console.log('查询结果', user)
            if(!user) {
                let createData = {
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
        console.log('获得用户上传图片', ctx.request.body)
        ctx.body = {
            data: {
                code: 200,
                filename: ctx.req.file.filename
            }
            
        };
        next()
    }


}

module.exports = new Admin()