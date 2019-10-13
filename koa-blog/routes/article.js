

const router= require('koa-router')();
const Admin = require('../controller/admin/admin')
const Article = require('../controller/admin/article')


router.prefix('/article');

router.post('/create', Article.createArticle)
router.get('/list', Article.getArticleList)
router.get('/detail', Article.getArticleDetail)

module.exports = router;