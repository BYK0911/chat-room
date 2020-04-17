import http from './http'

export function login (username, password) {
  return http({
    method: 'post',
    url: '/api/session/login',
    data: { username, password }
  })
}

export function logout () {
  return http({
    method: 'post',
    url: '/api/session/logout'
  })
}
