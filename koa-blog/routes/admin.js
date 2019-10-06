

const router = require('koa-router')();
const Admin  = require('../controller/admin/admin');
const Circle = require('../controller/admin/circle');

const multer = require('koa-multer');
const storage = multer.diskStorage({
    //文件保存路径
    destination: function (req, file, cb) {
      cb(null, 'public/images/')
    },
    //修改文件名称
    filename: function (req, file, cb) {
      var fileFormat = (file.originalname).split(".");
      cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
  });

const upload = multer({storage: storage});


router.get('/users', function(ctx,next){ctx.body={code:200, message:'获取数据'}})
router.post('/user/login', Admin.login);
router.post('/user/register', Admin.register);
router.post('/user/uploadImage', upload.single('file'), Admin.uploadImage);

module.exports = router;