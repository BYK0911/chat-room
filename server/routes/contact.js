var express = require('express');
var router = express.Router();
var sql = require('../sql/contact');
var conn = require('../sql/conn');

/* GET 添加联系人 */
router.post('/contact/add', function(req, res, next) {
  conn.getConnection((err, connection) => {
    console.log(req.session.user.id, req.body.id, req.body.remarks)
    connection.query(sql.addContact, [req.session.user.id, req.body.id, req.body.remarks], (error, result) => {
      res.json({
        code: '000000',
        success: true,
        data: result
      })
    })
    connection.release();
  })
});

/* GET 删除联系人 */
router.post('/contact/remove', function(req, res, next) {
  conn.getConnection((err, connection) => {
    connection.query(sql.deleteContact, [req.body.id], (error, result) => {
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