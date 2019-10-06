


const admin = require('./admin.js');

module.exports = (app) => {
  app.use(admin.routes(), admin.allowedMethods());
}
