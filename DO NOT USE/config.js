const JWTSECRET = process.env.JWTSECRET;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;

module.exports = {
    jwtSecret: JWTSECRET,
    mongodburi: 'mongodb://' + DB_USERNAME + ':' + DB_PASSWORD + '@ds247827.mlab.com:47827/heroku_9lgcjlsf'
};
