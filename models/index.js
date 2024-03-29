const dbConfig = require('../config/db.config.js');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {}
db.mongoose = mongoose;
db.url = dbConfig.url;
db.googleUser = require('./googleUser.js')(mongoose);
db.users = require('./users.js')(mongoose);

module.exports = db;