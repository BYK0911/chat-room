import http from './http'

export function queryUsers () {
  return http({
    method: 'get',
    url: '/api/user/list'
  })
}

export function queryUserInfo () {
  return http({
    method: 'get',
    url: '/api/user/info'
  })
}

export function addChat (id) {
  return http({
    method: 'post',
    url: '/api/chat/add',
    data: { id }
  })
}

export function removeChat (id) {
  return http({
    method: 'post',
    url: '/api/chat/remove',
    data: { id }
  })
}

export function addContact (id) {
  return http({
    method: 'post',
    url: '/api/contact/add',
    data: { id }
  })
}

export function removeContact (id) {
  return http({
    method: 'post',
    url: '/api/contact/remove',
    data: { id }
  })
}

export function removeGroup (id) {
  return http({
    method: 'post',
    url: '/api/group/list',
    data: { id }
  })
}

export function addMember (id) {
  return http({
    method: 'post',
    url: '/api/group/add',
    data: { id }
  })
}

export function removeMember (id) {
  return http({
    method: 'post',
    url: '/api/group/add',
    data: { id }
  })
}

export function signUp (username, password) {
  return http({
    method: 'post',
    url: '/api/user/add',
    data: {
      username,
      password
    }
  })
}
