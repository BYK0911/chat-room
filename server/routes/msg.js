var express = require('express');
var router = express.Router();
var sql = require('../sql/msg');
var conn = require('../sql/conn');

/* GET users listing. */
router.get('/msg/clear/:id', function(req, res, next) {
  conn.getConnection((err, connection) => {
    connection.query(sql.delete, (error, result) => {
      res.json({
        code: '000000',
        success: true,
        data: result
      })
    })
    connection.release();
  })
});
