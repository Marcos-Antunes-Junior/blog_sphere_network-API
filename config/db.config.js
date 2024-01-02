const dotenv = require('dotenv');
dotenv.config().error
module.exports = {
    url: process.env.DATABASE_URI,
}