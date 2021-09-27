//db.template.js

//DB info template
var mysql = require('mysql');
var db = mysql.createConnection({
    host: '',
    user: '',
    password: '',
    database: ''
  });
db.connect();

module.exports = db;