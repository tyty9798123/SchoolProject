var mysql = require('mysql');
require('dotenv').config()

var con = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_NAME,
  charset: 'utf8mb4'
});

con.connect(function(err) {
  if (err) throw err;
  console.log("MySQL Connected");
});

module.exports = con;