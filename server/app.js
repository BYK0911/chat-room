
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var http = require('http')
var socket = require('socket.io')
var msgAction = require('./actions/msg')

var router = require('./routes/index');

var app = express();
var server = http.Server(app);
var io = socket(server);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));

io.on('connection', function (socket) {
  socket.on('sign', function () {
    io.emit('sign')
  })
  socket.on('login', function (data) {
    data.groups.forEach(g => {
      socket.join('room' + g)
    })
    socket.join('room' + data.id)
  })
  socket.on('logout', function (data) {
    data.groups.forEach(g => {
      socket.leave('room' + g)
    })
    socket.leave('room' + data.id)
  })

  socket.on('msg', function (data) {
    data.isSend = false;
    io.to('room' + data.receiver).emit('msg', data);
    msgAction.insert(data, function (err, result) {})
  })
})

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

var paths = [
  '/session/login',
  '/user/add'
]
app.use('/api', (req, res, next) => {
  if (!req.session.user && paths.indexOf(req.path) === -1) {
    res.json({
      code: '000001',
      msg: '用户未登录',
      data: null
    });
  } else {
    next()
  }
})

app.use('/api', router);

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

server.listen('3000', () => {
  console.log('App running on http://localhost:3000')
})
