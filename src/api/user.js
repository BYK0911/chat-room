import http from './http'

export function queryUsers () {
  return http({
    method: 'get',
    url: '/api/user/list'
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
