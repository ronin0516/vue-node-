


const admin = require('./admin.js');
const article = require('./article.js');

module.exports = (app) => {
  app.use(admin.routes(), admin.allowedMethods());
  app.use(article.routes(), article.allowedMethods());
}
