var express = require('express');
var router = express.Router();
var sql = require('../sql/user');
var conn = require('../sql/conn');

/* GET users listing. */
router.get('/user/list', function(req, res, next) {
  conn.getConnection((err, connection) => {
    connection.query(sql.queryAll, (error, result) => {
      res.json({
        code: '000000',
        success: true,
        data: result
      })
    })
    connection.release();
  })
});

/* create user. */
router.post('/user/add', function(req, res, next) {
  conn.getConnection((err, connection) => {
    var username = req.body.username;
    var password = req.body.password;

    if (!username || !password) {
      res.json({
        code: '000003',
        msg: '用户名、密码不能为空',
        success: false,
        data: null
      })
    }

    connection.query(sql.hasUser, [req.body.username], (error, result) => {
      if (result && result.length > 0) {
        res.json({
          code: '000004',
          success: false,
          data: null,
          msg: '用户名已经被占用！'
        })
        return
      }
      connection.query(sql.insert, [req.body.username, req.body.password], (error, result) => {
        res.json({
          code: '000000',
          success: true,
          data: null
        })
      })
    })
    connection.release();
  })
});

/* delete user. */
router.post('/user/delete', function(req, res, next) {
  conn.getConnection((err, connection) => {
    connection.query(sql.delete, [req.body.id], (error, result) => {
      res.json({
        code: '000000',
        success: true,
        data: null
      })
    })
    connection.release();
  })
});

module.exports = router;
