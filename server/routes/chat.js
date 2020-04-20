var express = require('express');
var router = express.Router();
var sql = require('../sql/contact');
var conn = require('../sql/conn');

/* GET 添加聊天对象 */
router.post('/chat/add', function(req, res, next) {
  conn.getConnection((err, connection) => {
    connection.query(sql.updateContactStatus, ['1', req.session.user.id, req.body.id], (error, result) => {
      res.json({
        code: '000000',
        success: true,
        data: result
      })
    })
    connection.release();
  })
});

/* GET 删除聊天对象 */
router.post('/chat/remove', function(req, res, next) {
  conn.getConnection((err, connection) => {
    connection.query(sql.queryAll, ['0', req.session.user.id, req.body.id], (error, result) => {
      res.json({
        code: '000000',
        success: true,
        data: result
      })
    })
    connection.release();
  })
});

module.exports = router