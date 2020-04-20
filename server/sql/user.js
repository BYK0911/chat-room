var user = {
  insert:'INSERT INTO user(username, password) VALUES(?,?)',
  update:'UPDATE user SET name=? WHERE id=?',
  delete: 'DELETE FROM user WHERE id=?',
  queryById: 'SELECT id, username, unix_timestamp(time_sign_up) * 1000 as time_sign_up FROM user WHERE id=?',
  queryByName: 'SELECT id, username, unix_timestamp(time_sign_up) * 1000 as time_sign_up FROM user WHERE username LIKE ?',
  hasUser: 'SELECT id, username, unix_timestamp(time_sign_up) * 1000 as time_sign_up FROM user WHERE username=?',
  checkUser: 'SELECT id, username, unix_timestamp(time_sign_up) * 1000 as time_sign_up FROM user WHERE username=? and password=?',
  queryAll: 'SELECT id, username, unix_timestamp(time_sign_up) * 1000 as time_sign_up FROM user'
}

module.exports = user;