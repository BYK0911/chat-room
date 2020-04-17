var express = require('express');
var route = express.Router();

var sql = require('../sql/user');
var conn = require('../sql/conn');

route.post('/session/login', (req, res, next) => {
  var username = req.body.username;
  var password = req.body.password;

  conn.getConnection((err, connection) => {
    connection.query(sql.checkUser, [username, password], (err, result) => {
      if (result && result.length > 0) {
        req.session.user = result[0]
        res.json({
          code: '000000',
          success: true,
          data: result[0]
        })
      } else {
        res.json({
          code: '000002',
          success: false,
          msg: '用户名或密码错误',
          data: null
        })
      }
    })
    connection.release();
  })
})

route.post('/session/logout', (req, res, next) => {
  req.session.user = null;
  res.json({
    code: '000000',
    success: true,
    data: null
  })
})

module.exports = route;