var msg = {
  insert:'INSERT INTO msg(type, content, receiver, sender, status) VALUES(?,?,?,?,?)',
  delete: 'DELETE FROM msg WHERE id=?'
}

module.exports = msg;