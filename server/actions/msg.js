
var sql = require('../sql/msg');
var conn = require('../sql/conn');

module.exports = {
  insert: function (data, cb) {
    conn.getConnection((err, connection) => {
      connection.query(sql.insert, [data.type || '0', data.content, data.receiver, data.sender, data.status || '0'], (error, result) => {
        cb(error, result);
      })
      connection.release();
    })
  }
}
