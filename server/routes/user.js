var express = require('express');
var router = express.Router();
var sql = require('../sql/user');
var contactSql = require('../sql/contact');
var conn = require('../sql/conn');

/* GET users listing. */
router.get('/user/info', function(req, res, next) {
  conn.getConnection((err, connection) => {
    // 查询用户信息（或者直接取req.session.user）
    // 查询用户联系人
    // 查询用户分组
    // 查询用户聊天列表
    // 根据聊天列表查询聊天记录

    connection.query(contactSql.queryAllContacts, [req.session.user.id], (error, result) => {
      const contacts = []
      const groups = []
      const chatList = []

      result.forEach(item => {
        if (item.type == '0') {
          contacts.push(item)
        } else {
          groups.push(item)
        }

        if (item.status === '1') {
          chatList.push(item)
        }
      })

      if (!chatList.length) {
        res.json({
          code: '000000',
          success: true,
          data: {
            ...req.session.user,
            contacts,
            groups,
            chatList
          }
        })
        connection.release();
        return
      }

      let n = 0
      const cb = (item, error, result) => {
        if (error) {
          res.json({
            code: '000000',
            success: true,
            data: {
              ...req.session.user,
              contacts,
              groups,
              chatList
            }
          })

          connection.release();
        } else {
          item.msgs = result;
          n++;
          if (n === chatList.length) {
            res.json({
              code: '000000',
              success: true,
              data: {
                ...req.session.user,
                contacts,
                groups,
                chatList
              }
            })

            connection.release();
          }
        }
      }

      chatList.forEach(item => {
        const num = 20 + item.msg_unread

        if (item.type === '0') {
          connection.query(
            contactSql.queryMsgLastN,
            [req.session.user.id, item.contact_id, item.contact_id, req.session.user.id, num],
            function (error, result) {
              cb(item, error, result)
          })
        } else {
          connection.query(
            contactSql.queryGroupMsgLastN,
            [item.contact_id, num],
            function (error, result) {
              cb(item, error, result)
          })
        }
      })
    })
  })
});

/* GET users listing. */
router.get('/user/list', function(req, res, next) {
  conn.getConnection((err, connection) => {
    connection.query(sql.queryByName, ['%' + req.query.username + '%'], (error, result) => {
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
