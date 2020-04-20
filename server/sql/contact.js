var contact = {
  addContact:'INSERT INTO contact(user_id, contact_id, remarks) VALUES(?, ?, ?)',
  updateContactStatus:'UPDATE contact SET status=? WHERE id=?',
  updateContactRemarks:'UPDATE contact SET remarks=? WHERE id=?',
  deleteContact: 'DELETE FROM contact WHERE id=?',
  deleteGroup: 'DELETE FROM group WHERE id=?',
  queryAllContacts: 'SELECT id, user_id, contact_id, remarks, type, status, msg_unread, unix_timestamp(time_create) * 1000 as time_create FROM Contact WHERE user_id=?',
  queryMsgLastN: 'SELECT * FROM msg WHERE sender=? AND receiver=? OR sender=? AND receiver=? ORDER BY time_create LIMIT ?',
  queryGroupMsgLastN: 'SELECT * FROM msg WHERE receiver=? ORDER BY time_create LIMIT ?',
  deleteMsg: 'DELETE FROM msg WHERE sender=? AND receiver=? OR sender=? AND receiver=?',
}

module.exports = contact;