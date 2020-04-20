import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

import Login from '@/views/Login.vue'
import SignUp from '@/views/SignUp.vue'
import Home from '@/views/Home.vue'
import Chat from '@/views/chat'
import Contact from '@/views/contact'
import Group from '@/views/group'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/chat',
    children: [
      {
        path: '/chat',
        name: 'Chat',
        component: Chat
      },
      {
        path: '/contact',
        name: 'Contact',
        component: Contact
      },
      {
        path: '/group',
        name: 'Group',
        component: Group
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/sign_up',
    name: 'SignUp',
    component: SignUp
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (!store.state.user && to.name !== 'Login' && to.name !== 'SignUp') {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
