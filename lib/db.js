//DB info
var mysql = require('mysql');
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '960305',
    database: 'opentutorials'
  });
db.connect();

module.exports = db;