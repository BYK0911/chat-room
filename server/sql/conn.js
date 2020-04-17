var mysql = require('mysql');

var conf = {
  host: 'localhost',
  user: 'root',
  password: 'b19920911',
  database: 'chat_room'
}

var pool = mysql.createPool(conf)

module.exports = pool;