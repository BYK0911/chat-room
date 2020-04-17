import axios from 'axios'
import router from '@/router'

const http = axios.create()

http.interceptors.response.use(res => {
  const data = res.data

  if (!data.success) {
    if (data.code === '000001') {
      router.push({ name: 'Login' })
    } else {
      alert(data.msg)
    }
  }

  return data
}, _ => {
  alert('请求失败！')
})

export default http
